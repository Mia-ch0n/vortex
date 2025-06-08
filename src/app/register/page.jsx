"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import { IconBrandGoogle } from "@tabler/icons-react";
import { useAuth } from "@/contexts/AuthContext";

export default function SignupForm() {
    const { signUp, signInWithGoogle } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await signUp(formData.email, formData.password, formData.username);
        setLoading(false);
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        await signInWithGoogle();
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
                <div className="flex flex-col items-center gap-4 mb-8">
                    <img
                        src="/logo/logo.png"
                        alt="logo"
                        width={40}
                        height={40}
                        className="rounded-full border border-white p-1"
                    />
                    <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                        Create your account
                    </h2>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 text-center">
                        Join our community and start exploring games
                    </p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <LabelInputContainer>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            placeholder="you@example.com"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            placeholder="johndoe"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            required
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
                            minLength={6}
                        />
                        <p className="text-xs text-neutral-500 mt-1">
                            Password must be at least 6 characters long
                        </p>
                    </LabelInputContainer>

                    <button
                        className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Creating account..." : "Sign up with Email"}
                        <BottomGradient />
                    </button>

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-300 dark:border-neutral-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-black text-neutral-500">Or continue with</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        className="group/btn relative flex h-10 w-full items-center justify-center space-x-2 rounded-md bg-white px-4 font-medium text-black shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                    >
                        <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">
                            Sign up with Google
                        </span>
                        <BottomGradient />
                    </button>

                    <p className="text-center text-sm text-neutral-600 dark:text-neutral-300">
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-500 hover:underline">
                            Sign in
                        </a>
                    </p>
                </form>
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
    className
}) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
            {children}
        </div>
    );
};
