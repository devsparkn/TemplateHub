import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Ghost } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <Ghost className="w-16 h-16 text-primary mb-6" />
      <h1 className="text-3xl font-bold mb-2 text-foreground">Page Not Found</h1>
      <p className="text-muted-foreground mb-6">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Link href="/">
        <Button variant="default">Go back home</Button>
      </Link>
    </div>
  )
}
