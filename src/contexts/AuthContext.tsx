"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface User {
    id: string;
    email: string;
    role: string;
}

interface Profile {
    id: string;
    username: string;
    avatar_url: string;
}

interface AuthContextType {
    user: User | null;
    profile: Profile | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    signUp: (email: string, password: string, username: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    profile: null,
    loading: true,
    signIn: async () => { },
    signInWithGoogle: async () => { },
    signUp: async () => { },
    signOut: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const supabase = createClientComponentClient();

    // Check for existing session and set up auth state listener
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                // Get initial session
                const { data: { session } } = await supabase.auth.getSession();

                if (session?.user) {
                    setUser(session.user as User);
                    // Fetch profile
                    const { data: profileData } = await supabase
                        .from("profiles")
                        .select("*")
                        .eq("id", session.user.id)
                        .single();
                    if (profileData) {
                        setProfile(profileData as Profile);
                    }
                }
            } catch (error) {
                console.error("Error initializing auth:", error);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log("Auth state changed:", event, session);

            if (session?.user) {
                setUser(session.user as User);
                // Fetch profile
                const { data: profileData } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", session.user.id)
                    .single();
                if (profileData) {
                    setProfile(profileData as Profile);
                }
            } else {
                setUser(null);
                setProfile(null);
            }
            setLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [supabase]);

    const signIn = async (email: string, password: string) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                if (error.message === "Invalid login credentials") {
                    toast.error("Invalid email or password");
                } else {
                    toast.error(error.message);
                }
                return;
            }

            if (data.user) {
                // Check if user has a profile
                const { data: profileData, error: profileError } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", data.user.id)
                    .single();

                if (profileError || !profileData) {
                    // Create profile if it doesn't exist
                    const { error: createError } = await supabase
                        .from("profiles")
                        .insert([
                            {
                                id: data.user.id,
                                username: email.split("@")[0],
                                avatar_url: "",
                            },
                        ]);

                    if (createError) {
                        console.error("Error creating profile:", createError);
                    }
                }

                toast.success("Successfully logged in!");
                router.push("/dashboard");
            }
        } catch (error) {
            console.error("Error signing in:", error);
            toast.error("An error occurred during sign in");
        }
    };

    const signInWithGoogle = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) {
                toast.error(error.message);
            }
        } catch (error) {
            console.error("Error signing in with Google:", error);
            toast.error("An error occurred during Google sign in");
        }
    };

    const signUp = async (email: string, password: string, username: string) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        username,
                    },
                },
            });

            if (error) {
                toast.error(error.message);
                return;
            }

            if (data.user) {
                // Create profile
                const { error: profileError } = await supabase
                    .from("profiles")
                    .insert([
                        {
                            id: data.user.id,
                            username,
                            avatar_url: "",
                        },
                    ]);

                if (profileError) {
                    console.error("Error creating profile:", profileError);
                    toast.error("Error creating profile");
                    return;
                }

                toast.success("Successfully registered! Please check your email for verification.");
                router.push("/login");
            }
        } catch (error) {
            console.error("Error signing up:", error);
            toast.error("An error occurred during sign up");
        }
    };

    const signOut = async () => {
        try {
            // Clear local state first
            setUser(null);
            setProfile(null);

            // Supabase sign out
            const { error } = await supabase.auth.signOut();

            if (error) {
                toast.error(error.message);
                return;
            }

            // Optional: Remove any custom localStorage items
            localStorage.removeItem("supabase.auth.token");

            // Show success toast
            toast.success("Successfully logged out!");

            // Wait a bit so the toast has time to animate before hard reload
            setTimeout(() => {
                // Replace current route and force refresh
                router.replace("/");
                window.location.href = "/";
            }, 1000); // 1 second delay
        } catch (error) {
            console.error("Error signing out:", error);
            toast.error("An error occurred during sign out");
        }
    };


    return (
        <AuthContext.Provider
            value={{
                user,
                profile,
                loading,
                signIn,
                signInWithGoogle,
                signUp,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
} 