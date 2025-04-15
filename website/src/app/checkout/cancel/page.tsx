'use client';

import { Button } from '@/components/ui/button';
import { XCircle, ShoppingCart, HelpCircle } from 'lucide-react';
import Link from 'next/link';

const CheckoutCancelPage = () => {
  return (
    <div className="container max-w-3xl py-20 px-8">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-red-100 dark:bg-red-900 mb-4">
          <XCircle className="h-12 w-12 text-red-600 dark:text-red-300" />
        </div>
        
        <h1 className="text-3xl font-bold">Payment Canceled</h1>
        <p className="text-lg text-muted-foreground">
          Your payment was not completed. Your cart items have been saved and you can try again whenever you&#39;re ready.
        </p>
        
        <div className="pt-8 grid gap-4 sm:grid-cols-2 max-w-md mx-auto">
          <Button asChild>
            <Link href="/checkout">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Return to Checkout
            </Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link href="/contact">
              <HelpCircle className="mr-2 h-4 w-4" />
              Need Help?
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCancelPage; 