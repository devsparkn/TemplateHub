'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '@/lib/slices/cartSlice';
import { Button } from '@/components/ui/button';
import { CheckCircle, Home, FileText } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

const CheckoutSuccessPage = () => {
  const dispatch = useDispatch();

  // Clear the cart on successful checkout
  useEffect(() => {
    dispatch(clearCart());
    toast.success('Payment successful!', {
      description: 'Your templates are now available in your account',
    });
  }, [dispatch]);

  return (
    <div className="container max-w-3xl py-20 px-8">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-green-100 dark:bg-green-900 mb-4">
          <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-300" />
        </div>
        
        <h1 className="text-3xl font-bold">Thank You For Your Purchase!</h1>
        <p className="text-lg text-muted-foreground">
          Your payment was processed successfully and your templates are now available in your account.
          You should receive a confirmation email shortly.
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

export default CheckoutSuccessPage; 