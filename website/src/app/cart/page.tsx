"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { removeFromCart, clearCart } from "@/lib/slices/cartSlice";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const paidItems = cartItems.filter((item) => item.price !== "Free");

  const subtotal = paidItems.reduce((total, item) => total + Number(item.price), 0);

  const handleRemoveItem = (templateId: string) => {
    dispatch(removeFromCart(templateId));
    toast.info("Item removed from cart");
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.info("Cart cleared");
  };

  return (
    <div className="container py-12 px-8">
      <div className="mb-8">
        <Link href="/templates" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to templates
        </Link>
        <h1 className="text-3xl font-bold mt-4">Your Cart</h1>
      </div>
      {paidItems.length === 0 ? (
        <div className="text-center text-muted-foreground py-16">
          <p>Your cart is empty.</p>
          <Button asChild className="mt-4">
            <Link href="/templates">Browse Templates</Link>
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-8">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Cart Items</h2>
            </div>
            <div className="divide-y">
              {paidItems.map((item) => (
                <div key={item._id} className="p-6 flex items-center gap-4">
                  <div className="relative w-20 h-20 overflow-hidden rounded-md flex-shrink-0">
                    <Image src={item.thumbnailUrls[0]} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-medium">${item.price}</div>
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="text-sm text-red-500 hover:text-red-700 flex items-center mt-1"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={handleClearCart}>
                Clear Cart
              </Button>
            </div>
          </div>
          <div className="border rounded-lg shadow-sm p-6 space-y-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <Button asChild className="w-full mt-4">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 