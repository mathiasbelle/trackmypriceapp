"use client";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpDown, Trash } from "lucide-react";
import Link from "next/link";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import AlertMessage from "./alert-message";
import ProductInterface from "@/app/profile/product-interace";

interface ProductTableProps {
    products: ProductInterface[];
    isLoading: boolean;
    sortByPrice: () => void;
    dialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setProductIdToDelete: React.Dispatch<React.SetStateAction<string>>;
    deleteProduct: () => Promise<void>;
    error: string;
}

export default function ProductTable({
    products,
    isLoading,
    sortByPrice,
    dialogOpen,
    setDialogOpen,
    setProductIdToDelete,
    deleteProduct,
    error,
}: ProductTableProps) {
    return (
        <div className="overflow-x-auto w-full p-4">
            {error && <AlertMessage message={error} />}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead
                            className="cursor-pointer"
                            onClick={sortByPrice}
                        >
                            Price{" "}
                            <ArrowUpDown className="inline-block w-4 h-4 ml-1" />
                        </TableHead>
                        <TableHead>Last Checked</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {isLoading
                        ? Array.from({ length: 5 }).map((_, index) => (
                              <TableRow key={index}>
                                  <TableCell>
                                      <Skeleton className="h-4 w-24" />
                                  </TableCell>
                                  <TableCell>
                                      <Skeleton className="h-4 w-16" />
                                  </TableCell>
                                  <TableCell>
                                      <Skeleton className="h-4 w-24" />
                                  </TableCell>
                                  <TableCell>
                                      <Skeleton className="h-10 w-10 rounded-md" />
                                  </TableCell>
                              </TableRow>
                          ))
                        : products.map((product) => (
                              <TableRow key={product.id}>
                                  <TableCell>
                                      <Link
                                          href={product.url}
                                          rel="noopener noreferrer"
                                          target="_blank"
                                      >
                                          {product.name}
                                      </Link>
                                  </TableCell>
                                  <TableCell>
                                      ${" "}
                                      {Number(product.current_price).toFixed(2)}
                                  </TableCell>
                                  <TableCell>
                                      {new Date(
                                          product.last_checked_at
                                      ).toLocaleString("pt-BR")}
                                  </TableCell>
                                  <TableCell>
                                      <Button
                                          variant="destructive"
                                          size="icon"
                                          onClick={() => {
                                              setProductIdToDelete(
                                                  product.id.toString()
                                              );
                                              setDialogOpen(true);
                                          }}
                                      >
                                          <Trash className="w-4 h-4" />
                                      </Button>
                                  </TableCell>
                              </TableRow>
                          ))}
                </TableBody>
            </Table>
            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This will remove the product from the tracking list,
                            and you will no longer receive notifications about
                            it
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={deleteProduct}>
                            OK
                        </AlertDialogAction>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
