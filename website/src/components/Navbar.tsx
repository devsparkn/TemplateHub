// components/navbar.tsx - Main navigation bar
'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './ThemeToggle'
import { Menu } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'

export function Navbar() {
  const pathname = usePathname()
  
  const routes = [
    {
      href: '/templates',
      label: 'Templates',
      active: pathname === '/templates',
    },
    {
      href: '/pricing',
      label: 'Pricing',
      active: pathname === '/pricing',
    },
    {
      href: '/blog',
      label: 'Blog',
      active: pathname === '/blog',
    },
    {
      href: '/docs',
      label: 'Documentation',
      active: pathname?.startsWith('/docs'),
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2 items-center">
      <div className="flex h-16 items-center px-8 max-w-[88rem] mx-auto justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary h-8 w-8 rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold">N</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">9abel</span>
          </Link>
          
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Templates</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {[
                      {
                        title: "Admin Dashboards",
                        href: "/templates/category/admin",
                        description: "Beautiful admin panel templates with charts and UI components."
                      },
                      {
                        title: "Landing Pages",
                        href: "/templates/category/landing",
                        description: "High-converting marketing pages with animations and SEO features."
                      },
                      {
                        title: "E-commerce",
                        href: "/templates/category/ecommerce",
                        description: "Online store templates with product catalogs and checkout flows."
                      },
                      {
                        title: "Authentication",
                        href: "/templates/category/auth",
                        description: "Secure auth flows with social logins and user management."
                      },
                    ].map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                        description={item.description}
                      />
                    ))}
                  </ul>
                  <div className="bg-muted p-4 rounded-b-lg">
                    <Link href="/templates" className="text-sm text-primary hover:underline">
                      View all templates →
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {routes.slice(1).map((route) => (
                <NavigationMenuItem key={route.href}>
                  <Link href={route.href} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {route.label}
                    </NavigationMenuLink>
                  </Link>
                  </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-8 w-8" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-8 h-full">
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center gap-2">
                    <div className="bg-primary h-8 w-8 rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-bold">T</span>
                    </div>
                    <span className="font-bold text-xl">TemplateHub</span>
                  </Link>
                </div>
                <nav className="flex flex-col gap-4">
                  {routes.map((route) => (
                    <SheetClose key={route.href} asChild>
                      <Link
                        href={route.href}
                        className={cn(
                          "text-lg font-medium transition-colors hover:text-primary",
                          route.active ? "text-primary" : "text-muted-foreground"
                        )}
                      >
                        {route.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto flex flex-col gap-2">
                  <Button variant="outline" asChild>
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/register">Sign Up</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string,
    description: string
  }
>(({ className, title, description, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {description}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"