"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { IconBrandGoogle } from "@tabler/icons-react";

export default function LoginPage() {
    const { signIn, signInWithGoogle } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (loading) return;
        
        setLoading(true);
        try {
            await signIn(formData.email, formData.password);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        if (loading) return;
        
        setLoading(true);
        try {
            await signInWithGoogle();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="shadow-input w-full max-w-md p-4 rounded-2xl md:p-8 bg-zinc-900 mx-6">
                <div className="flex flex-col items-center gap-4">
                    <img
                        src="/logo/logo.png"
                        alt="logo"
                        width={40}
                        height={40}
                        className="rounded-full border border-white p-1"
                    />
                    <h2 className="text-xl font-bold font-mono text-neutral-200">
                        Login to Vortex
                    </h2>
                </div>

                <form className="my-8 space-y-4" onSubmit={handleSubmit}>
                    <LabelInputContainer>
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                            id="email" 
                            placeholder="you@example.com" 
                            type="email" 
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    </LabelInputContainer>

                    <LabelInputContainer>
                        <Label htmlFor="password">Password</Label>
                        <Input 
                            id="password" 
                            placeholder="••••••••" 
                            type="password" 
                            value={formData.password}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    </LabelInputContainer>

                    <button
                        className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br font-medium text-white bg-zinc-800 from-zinc-900 to-zinc-900 shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] disabled:opacity-50 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                                Logging in...
                            </div>
                        ) : (
                            "Log in →"
                        )}
                        <BottomGradient />
                    </button>

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-zinc-900 text-neutral-500">Or continue with</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        className="group/btn relative flex h-10 w-full items-center justify-center space-x-2 rounded-md bg-white px-4 font-medium text-black shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black mr-2"></div>
                                Signing in...
                            </div>
                        ) : (
                            <>
                                <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                                    Sign in with Google
                                </span>
                            </>
                        )}
                        <BottomGradient />
                    </button>
                </form>

                <div className="flex justify-end">
                    <span className="text-neutral-400">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="font-mono font-bold text-blue-500 hover:underline">
                            Register
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
            {children}
        </div>
    );
};
