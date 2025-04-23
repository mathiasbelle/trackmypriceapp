"use client";

import { useEffect, useState } from "react";
import axios from "@/api/axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import ProductTable from "@/components/product-table";
import LoadingPage from "@/components/loading-page";
import ProductInterface from "./product-interace";

export default function ProfilePage() {
    const [user, userLoading] = useAuthState(auth);
    const [products, setProducts] = useState<ProductInterface[]>([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [isLoading, setIsLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState<string>("");
    const [error, setError] = useState("");
    const router = useRouter();

    const sortByPrice = () => {
        const sorted = [...products].sort((a, b) =>
            sortOrder === "asc"
                ? b.current_price - a.current_price
                : a.current_price - b.current_price
        );
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        setProducts(sorted);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            try {
                const token = await user.getIdToken();
                const { data } = await axios.get<ProductInterface[] | []>(
                    "/products",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setProducts(data);
            } catch (er) {
                setError("Failed to fetch products");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [user]);

    useEffect(() => {
        if (!userLoading && !user) {
            router.push("/login");
        }
    }, [userLoading, user]);

    if (userLoading || (!user && typeof window !== "undefined")) {
        return <LoadingPage />;
    }

    const deleteProduct = async () => {
        if (!user) return;

        const id = productIdToDelete;
        try {
            const token = await user.getIdToken();

            await axios.delete(`/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setProducts(
                products.filter((product) => product.id !== Number(id))
            );
            setProductIdToDelete("");
            setDialogOpen(false);
        } catch (err) {
            setError("Failed to delete item");
        }
    };

    return (
        <ProductTable
            products={products}
            isLoading={isLoading}
            sortByPrice={sortByPrice}
            deleteProduct={deleteProduct}
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            setProductIdToDelete={setProductIdToDelete}
            error={error}
        />
    );
}
