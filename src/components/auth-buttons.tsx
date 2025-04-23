"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { JSX } from "react";

export default function AuthButtons(): JSX.Element {
    const [user, userLoading] = useAuthState(auth);
    const router = useRouter();

    const handleLogout = async () => {
        await auth.signOut();
        router.push("/");
    };

    if (userLoading) {
        return <div></div>;
    }

    if (!userLoading && user) {
        return (
            <div className="flex gap-2">
                <Button asChild size="sm">
                    <Link href="/profile">
                        <User /> Profile
                    </Link>
                </Button>
                <Button size="sm" onClick={handleLogout}>
                    <LogOut />
                    Logout
                </Button>
            </div>
        );
    }

    return (
        <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
                <Link href="/login">Login</Link>
            </Button>
            <Button asChild size="sm">
                <Link href="/signup">Signup</Link>
            </Button>
        </div>
    );
}
