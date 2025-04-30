'use client';

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';

export function CartButton() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  
  // Calculate the total price
  const totalPrice = cartItems.reduce((total, item) => {
    if (item.price === 'Free') return total;
    return total + Number(item.price);
  }, 0);
  
  const itemCount = cartItems.length;
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Your Cart</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {cartItems.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="max-h-80 overflow-auto">
              {cartItems.map((item) => (
                <DropdownMenuItem key={item.id} className="p-0 focus:bg-transparent" asChild>
                  <div className="flex items-center gap-3 p-2 w-full hover:bg-accent rounded-md">
                    <div className="relative h-12 w-12 rounded overflow-hidden">
                      <Image 
                        src={item.thumbnailUrls[0]} 
                        alt={item.title} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.price === 'Free' ? 'Free' : `$${item.price}`}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            
            <DropdownMenuSeparator />
            
            <div className="p-4 space-y-4">
              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              
              <Button className="w-full" asChild>
                <Link href="/checkout">
                  Checkout
                </Link>
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 