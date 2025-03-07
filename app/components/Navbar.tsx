"use client";

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Navbar() {
  const { user, error, isLoading } = useUser();
  const today = new Date();
  const targetDate = new Date('2025-01-20');

  const isDisabled = today < targetDate;
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold">WARMUP</Link>
          </div>
          <div className="flex items-center">
            {isLoading ? (
              <p>Loading...</p>
            ) : user ? (
              <>
                <p className="mr-4 text-sm text-gray-700">Bok, {user["username"] as string}</p>
                <Button asChild className="mr-4">
                  <a href="/api/auth/logout">Odjavi se</a>
                </Button>
              </>
            ) : (
              <Button asChild className="mr-4">
                <a href="/api/auth/login">Prijavi se</a>
              </Button>
            )}
            <Button asChild variant="outline" className="opacity-50 cursor-not-allowed" disabled>
              {isDisabled ? (
                <span onClick={(e) => e.preventDefault()}>Rang Lista</span>
              ) : (
                <Link href="/rang-lista">Rang Lista</Link>
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav >
  )
}

