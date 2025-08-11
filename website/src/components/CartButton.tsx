"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { cn } from "@/lib/utils"; 
import { buttonVariants } from "@/components/ui/button";

export function CartButton() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const itemCount = cartItems.length;

  return (
    <Link
      href="/cart"
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        "relative"
      )}
      aria-label={`Cart with ${itemCount} items`}
    >
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-yellow-400 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
