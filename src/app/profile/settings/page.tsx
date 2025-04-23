"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import axios from "@/api/axios";
import {
    deleteUser,
    EmailAuthProvider,
    getAuth,
    reauthenticateWithCredential,
    updateProfile,
} from "firebase/auth";
import LoadingPage from "@/components/loading-page";
import { DeleteAccountSchema, UpdateNameSchema } from "./settings-schemas";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";

export default function SettingsPage() {
    const [user, userLoading] = useAuthState(auth);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (!userLoading && !user) {
            router.push("/login");
        }
    }, [userLoading, user]);

    const deleteAccountForm = useForm<z.infer<typeof DeleteAccountSchema>>({
        resolver: zodResolver(DeleteAccountSchema),
        defaultValues: {
            password: "",
        },
    });

    const updateNameForm = useForm<z.infer<typeof UpdateNameSchema>>({
        resolver: zodResolver(UpdateNameSchema),
        defaultValues: {
            name: "",
        },
    });

    if (userLoading || (!user && typeof window !== "undefined")) {
        return <LoadingPage />;
    }

    const onSubmitUpdateName = async ({
        name,
    }: z.infer<typeof UpdateNameSchema>) => {
        if (!user) return;

        try {
            const res = await updateProfile(user, { displayName: name });
        } catch (e) {
            console.error("Error updating name");
        }
    };

    const onSubmitDeleteAccount = async ({
        password,
    }: z.infer<typeof DeleteAccountSchema>) => {
        if (!user) return;

        try {
            const token = await user.getIdToken();
            if (!user.email) return;

            await axios.delete("/products", {
                headers: { Authorization: `Bearer ${token}` },
            });

            await reauthenticateWithCredential(
                user,
                EmailAuthProvider.credential(user.email, password)
            );
            await deleteUser(user);
            router.push("/");
        } catch (e) {
            console.error("Error deleting account:", e);
        }
    };

    // return (
    //     <section className="py-10 max-w-lg mx-auto">
    //         <Card>
    //             <CardHeader>
    //                 <CardTitle>Settings</CardTitle>
    //             </CardHeader>
    //             <CardContent>
    //                 <Form {...updateNameForm}>
    //                     <form
    //                         onSubmit={updateNameForm.handleSubmit(
    //                             onSubmitUpdateName
    //                         )}
    //                         className="space-y-8"
    //                     >
    //                         <FormField
    //                             control={updateNameForm.control}
    //                             name="name"
    //                             render={({ field }) => (
    //                                 <FormItem>
    //                                     <FormLabel>Name</FormLabel>
    //                                     <FormControl>
    //                                         <Input
    //                                             placeholder="Your Name"
    //                                             {...field}
    //                                         />
    //                                     </FormControl>
    //                                     <FormMessage />
    //                                 </FormItem>
    //                             )}
    //                         />
    //                         <Button type="submit" className="w-full">
    //                             Update Name
    //                         </Button>
    //                         {error && (
    //                             <p className="text-red-500 text-sm">{error}</p>
    //                         )}
    //                     </form>
    //                 </Form>
    //                 <div className="mt-6">
    //                     <Button
    //                         variant="destructive"
    //                         className="w-full"
    //                         onClick={() => setDialogOpen(true)}
    //                     >
    //                         Delete Account
    //                     </Button>

    //                     <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
    //                         <DialogContent className="sm:max-w-[425px]">
    //                             <DialogHeader>
    //                                 <DialogTitle>
    //                                     Confirm account deletion
    //                                 </DialogTitle>
    //                                 <DialogDescription>
    //                                     You need to re-authenticate to delete
    //                                     your account
    //                                 </DialogDescription>
    //                             </DialogHeader>
    //                             <Form {...deleteAccountForm}>
    //                                 <form
    //                                     onSubmit={deleteAccountForm.handleSubmit(
    //                                         onSubmitDeleteAccount
    //                                     )}
    //                                     className="space-y-8"
    //                                 >
    //                                     <FormField
    //                                         control={deleteAccountForm.control}
    //                                         name="password"
    //                                         render={({ field }) => (
    //                                             <FormItem>
    //                                                 <FormLabel>
    //                                                     Confirm Password
    //                                                 </FormLabel>
    //                                                 <FormControl>
    //                                                     <Input
    //                                                         type="password"
    //                                                         placeholder=""
    //                                                         {...field}
    //                                                     />
    //                                                 </FormControl>
    //                                                 <FormMessage />
    //                                             </FormItem>
    //                                         )}
    //                                     />
    //                                     <DialogFooter>
    //                                         <Button
    //                                             variant="destructive"
    //                                             className="w-full"
    //                                         >
    //                                             Confirm
    //                                         </Button>
    //                                         {error && (
    //                                             <p className="text-red-500 text-sm">
    //                                                 {error}
    //                                             </p>
    //                                         )}
    //                                     </DialogFooter>
    //                                 </form>
    //                             </Form>
    //                         </DialogContent>
    //                     </Dialog>
    //                 </div>
    //             </CardContent>
    //         </Card>
    //     </section>
    // );
    return (
        <section>
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="account">Account Settings</TabsTrigger>
                    <TabsTrigger value="deleteAccount">
                        Delete Account
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <Form {...updateNameForm}>
                        <form
                            onSubmit={updateNameForm.handleSubmit(
                                onSubmitUpdateName
                            )}
                            className="space-y-8"
                        >
                            <FormField
                                control={updateNameForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Your Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">
                                Update Name
                            </Button>
                            {error && (
                                <p className="text-red-500 text-sm">{error}</p>
                            )}
                        </form>
                    </Form>
                </TabsContent>
                <TabsContent value="deleteAccount">
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Warning</AlertTitle>
                        <AlertDescription>
                            Deleting your account will delete all of the
                            products you are tracking and all the data about you
                            account.
                        </AlertDescription>
                    </Alert>
                    <div className="mt-6">
                        <Button
                            variant="destructive"
                            className="w-full"
                            onClick={() => setDialogOpen(true)}
                        >
                            Delete Account
                        </Button>

                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>
                                        Confirm account deletion
                                    </DialogTitle>
                                    <DialogDescription>
                                        You need to re-authenticate to delete
                                        your account
                                    </DialogDescription>
                                </DialogHeader>
                                <Form {...deleteAccountForm}>
                                    <form
                                        onSubmit={deleteAccountForm.handleSubmit(
                                            onSubmitDeleteAccount
                                        )}
                                        className="space-y-8"
                                    >
                                        <FormField
                                            control={deleteAccountForm.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Confirm Password
                                                    </FormLabel>
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
                                        <DialogFooter>
                                            <Button
                                                variant="destructive"
                                                className="w-full"
                                            >
                                                Confirm
                                            </Button>
                                            {error && (
                                                <p className="text-red-500 text-sm">
                                                    {error}
                                                </p>
                                            )}
                                        </DialogFooter>
                                    </form>
                                </Form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </TabsContent>
            </Tabs>
        </section>
    );
}
