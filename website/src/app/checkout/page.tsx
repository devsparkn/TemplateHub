"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Trash2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe";
import { toast } from "sonner";
import { Template } from "@/types/templates";

const CheckoutPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const buyNowMode = searchParams.get("buyNow") === "1";

  const [checkoutItems, setCheckoutItems] = useState<Template[]>([]);

  // Load checkout items
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

  // Only paid items in checkout
  const paidItems = checkoutItems.filter((item) => item.price !== "Free");

  // Calculate totals
  const subtotal = paidItems.reduce(
    (total, item) => total + Number(item.price),
    0
  );
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;

  const handleCheckout = async () => {
    if (paidItems.length === 0) {
      toast.info("No templates to checkout.");
      return;
    }

    try {
      setIsLoading(true);

      // Store checkout items in sessionStorage for after payment
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
    <div className="container py-12 px-8 min-h-screen">
      <div className="mb-8">
        <Link
          href="/templates"
          className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to templates
        </Link>
        <h1 className="text-3xl font-bold mt-4">Checkout</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {/* Left column - Order summary */}
        <div className="md:col-span-2 space-y-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Order Summary</h2>
          </div>
          <div className="divide-y">
            {paidItems.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                <p>No templates to checkout.</p>
              </div>
            ) : (
              paidItems.map((item) => (
                <div key={item._id} className="p-6 flex items-center gap-4">
                  <div className="relative w-20 h-20 overflow-hidden rounded-md flex-shrink-0">
                    <Image
                      src={item.thumbnailUrls[0]}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.category}
                    </p>
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
              ))
            )}
          </div>
        </div>

        {/* Right column - Payment summary */}
        <div className="md:col-span-1">
          <div className="border rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (5%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="pt-3 border-t flex justify-between font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <Elements stripe={stripePromise}>
              <Button
                className="w-full"
                size="lg"
                onClick={handleCheckout}
                disabled={isLoading || paidItems.length === 0}
              >
                {isLoading ? (
                  "Processing..."
                ) : (
                  <>
                    <CreditCard className="mr-2 h-5 w-5" />
                    Proceed to Payment
                  </>
                )}
              </Button>
            </Elements>

            <p className="text-xs text-center text-muted-foreground mt-4">
              By completing your purchase, you agree to our Terms of Service and
              Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
