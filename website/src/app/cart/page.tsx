"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { removeFromCart, clearCart } from "@/lib/slices/cartSlice";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ChevronLeft, ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const paidItems = cartItems.filter((item) => item.price !== "Free");

  const subtotal = paidItems.reduce(
    (total, item) => total + Number(item.price),
    0
  );
  const total = subtotal;

  const handleRemoveItem = (templateId: string) => {
    dispatch(removeFromCart(templateId));
    toast.info("Item removed from cart");
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.info("Cart cleared");
  };

  return (
    <div className="container py-12 px-4 md:px-6 min-h-screen max-w-7xl mx-auto">
      <div className="mb-8">
        <Link
          href="/templates"
          className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to templates
        </Link>
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500 p-3 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Your Cart
            </h1>
          </div>
          <div className="text-sm text-muted-foreground">
            {paidItems.length} {paidItems.length === 1 ? "item" : "items"}
          </div>
        </div>
      </div>

      {paidItems.length === 0 ? (
        <div className="text-center py-16 max-w-md mx-auto">
          <div className="bg-gray-100 dark:bg-gray-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground mb-8">
            Browse our premium templates and add some to your cart
          </p>
          <Button asChild className="px-8 py-6 text-base">
            <Link href="/templates">Explore Templates</Link>
          </Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Cart Items
                </h2>
                <Button
                  variant="ghost"
                  onClick={handleClearCart}
                  className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cart
                </Button>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {paidItems.map((item) => (
                  <div
                    key={item._id}
                    className="p-6 flex items-start gap-4 sm:items-center"
                  >
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 overflow-hidden rounded-lg flex-shrink-0 border border-gray-200 dark:border-gray-700">
                      <Image
                        src={item.thumbnailUrls[0]}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 80px, 96px"
                      />
                    </div>

                    <div className="flex-grow">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        {item.category}
                      </p>
                      <div className="font-medium text-gray-900 dark:text-white">
                        ${item.price}
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">
                    Subtotal
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between text-lg font-bold">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-gray-900 dark:text-white">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                asChild
                className="w-full h-12 rounded-lg font-semibold text-base shadow-sm hover:shadow-md transition-shadow"
              >
                <Link
                  href="/checkout"
                  className="flex items-center justify-center"
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
