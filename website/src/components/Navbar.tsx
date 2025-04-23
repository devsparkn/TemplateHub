'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './ThemeToggle'
import { CartButton } from './CartButton'
import { 
  Menu, 
  User, 
  ShieldCheck,
  LogOut, 
  Settings, 
  Key, 
  Users as UsersIcon 
} from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function Navbar() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const isAdmin = session?.user?.role === 'admin'
  const isAdminEmail = session?.user?.email === 'nadeemchaudhary808@gmail.com'
  
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
      href: '/docs',
      label: 'Documentation',
      active: pathname?.startsWith('/docs'),
    },
    ...(isAdmin ? [
      {
        href: '/admin',
        label: 'Admin Dashboard',
        active: pathname === '/admin',
      },
      {
      href: '/admin/dashboard',
        label: 'Analytics',
        active: pathname === '/admin/dashboard',
      },
      {
        href: '/admin/users',
        label: 'Manage Users',
        active: pathname === '/admin/users',
      },
    ] : []),
    ...(isAdminEmail && !isAdmin ? [
      {
        href: '/become-admin',
        label: '🔑 Become Admin',
        active: pathname === '/become-admin',
      }
    ] : []),
  ]

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  // Get user initials for avatar
  const getUserInitials = (name: string | null | undefined): string => {
    if (!name) return 'U';
    
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

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
          <CartButton />
          <ThemeToggle />
          <div className="hidden md:flex items-center gap-2">
            {status === 'loading' ? (
              <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src={session.user?.image || ''} alt={session.user?.name || 'User'} />
                      <AvatarFallback>{getUserInitials(session.user?.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{session.user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/account" className="flex w-full cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Account</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account/settings" className="flex w-full cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  
                  {isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                          <Link href="/admin" className="flex w-full cursor-pointer">
                            <ShieldCheck className="mr-2 h-4 w-4 text-primary" />
                            <span className="font-medium">Admin Dashboard</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/admin/users" className="flex w-full cursor-pointer">
                            <UsersIcon className="mr-2 h-4 w-4" />
                            <span>Manage Users</span>
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </>
                  )}
                  
                  {isAdminEmail && !isAdmin && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/become-admin" className="flex w-full cursor-pointer">
                          <Key className="mr-2 h-4 w-4 text-yellow-500" />
                          <span className="font-medium">Become Admin</span>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            )}
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
                      <span className="text-primary-foreground font-bold">N</span>
                    </div>
                    <span className="font-bold text-xl">9abel</span>
                  </Link>
                </div>
                
                {/* Mobile user profile */}
                {session && (
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <Avatar>
                      <AvatarImage src={session.user?.image || ''} alt={session.user?.name || 'User'} />
                      <AvatarFallback>{getUserInitials(session.user?.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{session.user?.name}</p>
                      <p className="text-xs text-muted-foreground">{session.user?.email}</p>
                    </div>
                  </div>
                )}
                
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
                  {status === 'loading' ? (
                    <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
                  ) : session ? (
                    <>
                      <Button variant="outline" asChild>
                        <Link href="/account">Account</Link>
                      </Button>
                      <Button onClick={handleSignOut}>Sign Out</Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" asChild>
                        <Link href="/login">Sign In</Link>
                      </Button>
                      <Button asChild>
                        <Link href="/register">Sign Up</Link>
                      </Button>
                    </>
                  )}
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