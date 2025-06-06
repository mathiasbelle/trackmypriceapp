"use client";

import { useEffect, useRef, useState } from "react";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { z } from "zod";
import LoginForm from "@/components/login-form";
import { LoginFormSchema } from "./login-form.schema";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingPage from "../../components/loading-page";
import ReCAPTCHA from "react-google-recaptcha";
import { handleCaptchaSubmission } from "../captcha/captcha";

export default function LoginPage() {
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [user, userLoading] = useAuthState(auth);
    const [isVerified, setIsVerified] = useState(false);
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    useEffect(() => {
        if (!userLoading && user && !dialogOpen) {
            router.push("/profile");
        }
    }, [userLoading, user, router, dialogOpen]);

    const handleChange = (token: string | null) => {
        handleCaptchaSubmission(token, setIsVerified);
    };

    function handleExpired() {
        setIsVerified(false);
    }

    const onSubmit = async ({
        email,
        password,
    }: z.infer<typeof LoginFormSchema>) => {
        if (!isVerified) {
            recaptchaRef.current?.reset();
            setErrorMessage("Please verify you are not a robot");
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setDialogOpen(true);
        } catch (error: any) {
            setErrorMessage(
                error.code === "auth/invalid-credential"
                    ? "Invalid email or password"
                    : "Signin failed"
            );
        }
    };

    if (userLoading || (user && !dialogOpen && typeof window !== "undefined")) {
        return <LoadingPage />;
    }

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm
                    error={errorMessage}
                    onSubmit={onSubmit}
                    router={router}
                    dialogOpen={dialogOpen}
                    setDialogOpen={setDialogOpen}
                    recaptchaRef={recaptchaRef}
                    handleChange={handleChange}
                    handleExpired={handleExpired}
                />
            </div>
        </div>
    );
}
