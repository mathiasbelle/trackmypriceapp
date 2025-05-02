"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { LoginFormSchema } from "@/app/login/login-form.schema";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";

interface LoginFormProps {
    className?: string;
    error?: string;
    onSubmit: (data: z.infer<typeof LoginFormSchema>) => Promise<void>;
    dialogOpen?: boolean;
    setDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    router: AppRouterInstance;
    recaptchaRef: React.RefObject<ReCAPTCHA | null>;
    handleChange: (token: string | null) => void;
    handleExpired: () => void;
}

export default function LoginForm({
    className,
    error,
    onSubmit,
    router,
    dialogOpen,
    setDialogOpen,
    recaptchaRef,
    handleChange,
    handleExpired,
}: LoginFormProps) {
    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    return (
        <div className={cn("flex flex-col gap-6", className)}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="example@example.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder=""
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <ReCAPTCHA
                                sitekey={
                                    process.env
                                        .NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""
                                }
                                ref={recaptchaRef}
                                onChange={handleChange}
                                onExpired={handleExpired}
                            />
                            <Button type="submit" className="w-full">
                                Sign Up
                            </Button>
                            <div className="mt-4 text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <Link
                                    href="/signup"
                                    className="underline underline-offset-4"
                                >
                                    Sign up
                                </Link>
                            </div>
                            {error && (
                                <p className="text-red-400 text-sm">{error}</p>
                            )}
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Signin Successful</AlertDialogTitle>
                        <AlertDialogDescription>
                            You have successfully signed in.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction
                            onClick={() => router.push("/profile")}
                        >
                            OK
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
