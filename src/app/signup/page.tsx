"use client";

import SignupForm from "@/components/signup-form";
import { useEffect, useState } from "react";
import {
    useAuthState,
    useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";

import { z } from "zod";

import { SignupFormSchema } from "@/app/signup/signup-form-schema";
import LoadingPage from "../../components/loading-page";

export default function SignupPage() {
    const [errorMessage, setErrorMessage] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [user, userLoading] = useAuthState(auth);

    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(
        auth,
        {
            sendEmailVerification: true,
        }
    );

    const router = useRouter();

    useEffect(() => {
        if (!userLoading && user && !dialogOpen) {
            router.push("/profile");
        }
    }, [userLoading, user, router, dialogOpen]);

    const onSubmit = async ({
        name,
        email,
        password,
        confirmPassword,
    }: z.infer<typeof SignupFormSchema>) => {
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }
        try {
            const res = await createUserWithEmailAndPassword(email, password);
            if (!res) {
                setErrorMessage("Signin failed");
                return;
            }
            if (!auth.currentUser) {
                return;
            }
            await updateProfile(auth.currentUser, {
                displayName: name,
            });
            setDialogOpen(true);
        } catch (error: any) {
            setErrorMessage(`Signin failed. ${error.message || ""}`);
        }
        setErrorMessage("");
    };

    if (userLoading || (user && !dialogOpen && typeof window !== "undefined")) {
        return <LoadingPage />;
    }

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <SignupForm
                    error={errorMessage}
                    dialogOpen={dialogOpen}
                    setDialogOpen={setDialogOpen}
                    onSubmit={onSubmit}
                    router={router}
                />
            </div>
        </div>
    );
}
