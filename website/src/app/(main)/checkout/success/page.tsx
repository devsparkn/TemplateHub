"use client";

import { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "@/lib/slices/cartSlice";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, FileText } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

const CheckoutSuccessContent = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (sessionId) {
      const verifyOrder = async () => {
        setLoading(true);
        try {
          const itemsRaw =
            typeof window !== "undefined"
              ? window.sessionStorage.getItem("checkout_items")
              : null;
          const items = itemsRaw ? JSON.parse(itemsRaw) : [];

          const response = await fetch("/api/checkout/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ session_id: sessionId, items }),
          });

          if (response.ok) {
            dispatch(clearCart());
            if (typeof window !== "undefined") {
              window.sessionStorage.removeItem("checkout_items");
            }
            toast.success("Payment successful!", {
              description: "Your templates are now available in your account",
            });
          } else {
            toast.error("Could not verify payment. Please contact support.");
          }
        } catch {
          toast.error("An error occurred verifying your payment.");
        } finally {
          setLoading(false);
        }
      };
      verifyOrder();
    }
  }, [dispatch, searchParams]);

  return (
    <div className="container max-w-3xl py-20 px-8 mx-auto">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-green-100 dark:bg-green-900 mb-4">
          <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-300" />
        </div>

        <h1 className="text-3xl font-bold">Thank You For Your Purchase!</h1>
        <p className="text-lg text-muted-foreground">
          {loading
            ? "Verifying your payment and assigning templates..."
            : "Your payment was processed successfully and your templates are now available in your account. You should receive a confirmation email shortly."}
        </p>

        <div className="pt-8 grid gap-4 sm:grid-cols-2 max-w-md mx-auto">
          <Button asChild>
            <Link href="/templates">
              <Home className="mr-2 h-4 w-4" />
              Browse More Templates
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/account/downloads">
              <FileText className="mr-2 h-4 w-4" />
              View My Templates
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

const CheckoutSuccessPage = () => {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
};

export default CheckoutSuccessPage;
