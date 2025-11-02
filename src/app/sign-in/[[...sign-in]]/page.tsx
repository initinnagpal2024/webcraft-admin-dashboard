'use client'

import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Admin Login</h1>
        <SignIn 
          afterSignInUrl="/admin"
          redirectUrl="/admin"
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-lg border-0",
            }
          }}
        />
      </div>
    </main>
  )
}