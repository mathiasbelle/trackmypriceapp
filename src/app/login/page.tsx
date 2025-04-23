"use client";

import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { z } from "zod";
import LoginForm from "@/components/login-form";
import { LoginFormSchema } from "./login-form.schema";

export default function LoginPage() {
    const [error, setError] = useState("");
    const router = useRouter();
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const [dialogOpen, setDialogOpen] = useState(false);

    const onSubmit = async ({
        email,
        password,
    }: z.infer<typeof LoginFormSchema>) => {
        try {
            const res = await signInWithEmailAndPassword(email, password);
            if (!res) {
                setError("Signin failed");
            } else {
                setDialogOpen(true);
            }
        } catch (error) {
            setError("Signin failed");
        }
    };

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm
                    error={error}
                    onSubmit={onSubmit}
                    router={router}
                    dialogOpen={dialogOpen}
                    setDialogOpen={setDialogOpen}
                />
            </div>
        </div>
    );
}
