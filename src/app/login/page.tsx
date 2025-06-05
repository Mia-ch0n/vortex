"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import Link from "next/link";

export default function LoginPage() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Login submitted");
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

                <form className="my-8" onSubmit={handleSubmit}>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" placeholder="yourusername" type="text" />
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-8">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" placeholder="••••••••" type="password" />
                    </LabelInputContainer>

                    <button
                        className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br font-medium text-white bg-zinc-800 from-zinc-900 to-zinc-900 shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                        type="submit"
                    >
                        Log in &rarr;
                        <BottomGradient />
                    </button>
                </form>
                <div className="flex justify-end">
                    <span>Don&apos;t have an account? <Link href='/register' className="font-mono font-bold">Register</Link></span>
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
