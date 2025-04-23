"use client";

import SignupForm from "@/components/signup-form";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";

import { z } from "zod";

import { SignupFormSchema } from "@/app/signup/signup-form-schema";

export default function SignupPage() {
    const [error, setError] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);

    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(
        auth,
        {
            sendEmailVerification: true,
        }
    );

    const router = useRouter();

    const onSubmit = async ({
        name,
        email,
        password,
        confirmPassword,
    }: z.infer<typeof SignupFormSchema>) => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            const res = await createUserWithEmailAndPassword(email, password);
            if (!res) {
                setError("Signin failed");
                return;
            }
            if (!auth.currentUser) {
                return;
            }
            const user = await updateProfile(auth.currentUser, {
                displayName: name,
            });
            setDialogOpen(true);
        } catch (e) {
            setError("Signin failed");
        }
        setError("");
    };

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <SignupForm
                    error={error}
                    dialogOpen={dialogOpen}
                    setDialogOpen={setDialogOpen}
                    onSubmit={onSubmit}
                    router={router}
                />
            </div>
        </div>
    );
}
