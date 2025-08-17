"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Trash2, CreditCard, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe";
import { toast } from "sonner";
import { Template } from "@/types/templates";
import TestCards from "@/components/TestCards";
const CheckoutPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const buyNowMode = searchParams.get("buyNow") === "1";

  const [checkoutItems, setCheckoutItems] = useState<Template[]>([]);

  useEffect(() => {
    if (buyNowMode) {
      const stored = sessionStorage.getItem("buy_now_item");
      if (stored) {
        setCheckoutItems([JSON.parse(stored)]);
      } else {
        router.push("/templates");
      }
    } else {
      setCheckoutItems(cartItems);
    }
  }, [buyNowMode, cartItems, router]);

  const paidItems = checkoutItems.filter((item) => item.price !== "Free");
  const subtotal = paidItems.reduce(
    (total, item) => total + Number(item.price),
    0
  );
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleCheckout = async () => {
    if (paidItems.length === 0) {
      toast.info("No templates to checkout.");
      return;
    }

    try {
      setIsLoading(true);
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "checkout_items",
          JSON.stringify(
            paidItems.map((item) => ({ ...item, templateId: item._id }))
          )
        );
      }

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: paidItems.map((item) => ({
            ...item,
            templateId: item._id,
          })),
        }),
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      } else {
        toast.error("Checkout failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Checkout failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveItem = (templateId: string) => {
    if (buyNowMode) {
      sessionStorage.removeItem("buy_now_item");
      router.push("/templates");
    } else {
      dispatch({
        type: "cart/removeFromCart",
        payload: templateId,
      });
      toast.info("Item removed from cart");
    }
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
        <h1 className="text-3xl font-bold mt-4 text-gray-900 dark:text-white">
          Checkout
        </h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <span className="bg-gray-100 dark:bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">
                  {paidItems.length}
                </span>
                Order Summary
              </h2>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {paidItems.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="bg-gray-100 dark:bg-gray-700 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Add templates to proceed to checkout
                  </p>
                  <Button asChild>
                    <Link href="/templates">Browse Templates</Link>
                  </Button>
                </div>
              ) : (
                paidItems.map((item) => (
                  <div
                    key={item._id}
                    className="p-6 flex items-start sm:items-center gap-4"
                  >
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 overflow-hidden rounded-lg flex-shrink-0 border border-gray-200 dark:border-gray-700">
                      <Image
                        src={item.thumbnailUrls[0]}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 80px, 100px"
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
                ))
              )}
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-[#f9fafb] to-[#f0f4f8] dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Payment Summary
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

              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  Tax (5%)
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  ${tax.toFixed(2)}
                </span>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between text-lg font-bold">
                <span className="text-gray-900 dark:text-white">Total</span>
                <span className="text-gray-900 dark:text-white">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <Elements stripe={stripePromise}>
              <Button
                className="w-full h-12 cursor-pointer rounded-lg font-semibold text-base shadow-sm hover:shadow-md transition-shadow"
                onClick={handleCheckout}
                disabled={isLoading || paidItems.length === 0}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-5 w-5" />
                    Proceed to Payment
                  </>
                )}
              </Button>
            </Elements>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Secure SSL encryption</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Instant download after payment</span>
                </li>
              </ul>
            </div>

            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-6">
              By completing your purchase, you agree to our{" "}
              <Link
                href="/terms"
                className="underline hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      <TestCards />
    </div>
  );
};

export default CheckoutPage;
