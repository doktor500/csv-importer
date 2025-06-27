"use client";

import { FormEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Store } from "@/modules/domain/store";
import { Product } from "@/modules/domain/product";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ProductDialogProps = {
  stores: Store[];
  onSubmitAction: (data: Product) => Promise<void>;
  product?: Product;
  mode?: "add" | "edit";
};

export const ProductDialog = ({ stores, onSubmitAction, product, mode = "add" }: ProductDialogProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState<Product>({
    id: product?.id ?? 0,
    sku: product?.sku ?? "",
    description: product?.description ?? "",
    quantity: product?.quantity ?? 0,
    storeId: product?.storeId ?? stores[0]?.id ?? 0,
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await onSubmitAction(formData).catch(() => {
      return toast({ title: "Error submitting form", description: "Please try again", variant: "negative" });
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className={
            mode === "add"
              ? "cursor-pointer rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              : "cursor-pointer rounded bg-gray-600 px-3 py-1 text-white transition hover:bg-gray-700"
          }
        >
          {mode === "add" ? "Add Product" : "Edit"}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New Product" : "Edit Product"}</DialogTitle>
          <DialogDescription className="text-gray-400">
            {mode === "add" ? "Fill in the details for the new product" : "Edit the product details"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300">SKU</label>
            <input
              aria-label="sku"
              type="text"
              value={formData.sku}
              onChange={(event) => setFormData({ ...formData, sku: event.target.value })}
              className="mt-1 w-full rounded bg-gray-800 p-2 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300">Description</label>
            <input
              aria-label="description"
              type="text"
              value={formData.description ?? ""}
              onChange={(event) => setFormData({ ...formData, description: event.target.value })}
              className="mt-1 w-full rounded bg-gray-800 p-2 text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300">Quantity</label>
            <input
              aria-label="quantity"
              type="number"
              value={formData.quantity.toString()}
              onChange={(event) => setFormData({ ...formData, quantity: parseInt(event.target.value) ?? 0 })}
              className="mt-1 w-full rounded bg-gray-800 p-2 text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300">Store</label>
            <Select
              value={formData.storeId.toString()}
              onValueChange={(value) => setFormData({ ...formData, storeId: parseInt(value) })}
              required
            >
              <SelectTrigger className="mt-1 w-full rounded bg-gray-800 p-2 text-white" aria-label="store">
                <SelectValue placeholder="Store" />
              </SelectTrigger>
              <SelectContent>
                {stores.map((store) => (
                  <SelectItem key={store.id} value={store.id.toString()} aria-label={`store ${store.id}`}>
                    {store.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => setOpen(false)}
              className="cursor-pointer rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button type="submit" className="cursor-pointer rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
