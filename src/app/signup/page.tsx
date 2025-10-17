"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function SignupPage() {
    const logo = PlaceHolderImages.find(p => p.id === 'davangere-university-logo');

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
    <Card className="mx-auto w-full max-w-md shadow-2xl">
      <CardHeader className="text-center space-y-4">
        {logo && <Image src={logo.imageUrl} alt={logo.description} width={200} height={50} data-ai-hint={logo.imageHint} className="mx-auto" />}
        <CardTitle className="text-3xl font-headline">Create an Account</CardTitle>
        <CardDescription>
          Enter your information to create a new account.
          <br/>
          <span className="font-semibold text-primary">Registration is restricted to @davangereuniversity.ac.in emails.</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="full-name">Full Name</Label>
            <Input id="full-name" placeholder="Your Name" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="user@davangereuniversity.ac.in"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            Create Account
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}
