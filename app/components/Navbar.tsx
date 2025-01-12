import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold">STEM ZNANJE WARMUP</Link>
          </div>
          <div className="flex items-center">
            <Button asChild className="mr-4">
              <Link href="/prijava">Prijavi se</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/rang-lista">Rang Lista</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

