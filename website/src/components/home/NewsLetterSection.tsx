import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell } from "lucide-react";

export default function NewsLetterSection() {
  return (
    <section className="py-20 px-4 md:px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 p-10 bg-card rounded-2xl shadow-lg border border-border">
          {/* Text Section */}
          <div className="text-center md:text-left md:max-w-md">
            <div className="mb-4 inline-flex items-center justify-center p-3 rounded-full bg-primary/10">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Stay Updated
            </h2>
            <p className="text-muted-foreground">
              Subscribe to our newsletter and be the first to know about new
              templates, product updates, and exclusive offers.
            </p>
          </div>

          {/* Form Section */}
          <div className="w-full md:w-auto flex-1">
            <form className="flex flex-col sm:flex-row items-center gap-3 w-full">
              <Input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
                className="w-full sm:w-72"
                required
              />
              <Button type="submit" className="w-full sm:w-auto">
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-3 text-center sm:text-left">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
