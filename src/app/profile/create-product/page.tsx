"use client";

import { useState, useEffect } from "react";
import { CreateProductForm } from "@/components/create-product-form";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import axios from "@/api/axios";
import LoadingPage from "@/components/loading-page";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { CreateProductSchema } from "./create-product-schema";
import { isAxiosError } from "axios";

export default function CreateProductPage() {
    const [user, userLoading] = useAuthState(auth);
    const [error, setError] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [disableButton, setDisableButton] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (!userLoading && !user) {
            router.push("/login");
        }
    }, [userLoading, user, router]);

    if (userLoading || (!user && typeof window !== "undefined")) {
        return <LoadingPage />;
    }

    const onSubmit = async ({ url }: z.infer<typeof CreateProductSchema>) => {
        if (!user) return;

        try {
            setDisableButton(true);
            const token = await user.getIdToken();
            await axios.post(
                "/products",
                { url },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setError("");
            setDisableButton(false);
            setDialogOpen(true);
        } catch (error: any) {
            if (isAxiosError(error)) {
                if (error.response?.status === 400) {
                    setError(
                        `Error submitting data: "${error.response.data.message}"`
                    );
                } else {
                    setError("An unexpected server error occurred.");
                }
            } else {
                setError("An unexpected error occurred.");
            }
            setDisableButton(false);
        }
    };

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <CreateProductForm
                    onSubmit={onSubmit}
                    dialogOpen={dialogOpen}
                    setDialogOpen={setDialogOpen}
                    error={error}
                    disableButton={disableButton}
                />
            </div>
        </div>
    );
}
