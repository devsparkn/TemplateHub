import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell } from "lucide-react"

export default function NewsLetterSection() {
  return (
    <section className="py-16 px-4 md:px-6 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-xl g-gray-50 dark:bg-gray-900 shadow-sm">
          <div className="text-center md:text-left md:max-w-md">
            <div className="mb-4 inline-flex items-center justify-center p-2 rounded-full bg-primary/10">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight mb-2">Stay Updated</h2>
            <p className="text-muted-foreground">
              Subscribe to our newsletter to get notified about new templates and exclusive offers
            </p>
          </div>

          <div className="w-full md:w-auto">
            <form className="flex flex-col sm:flex-row gap-3 w-full">
              <Input type="email" placeholder="Enter your email" className="w-full sm:w-64" required />
              <Button type="submit">Subscribe</Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
