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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAuth } from "@/hooks/useAuth"
import type { UserRole } from "@/lib/types"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function LoginPage() {
  const { login } = useAuth();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const role = formData.get('role') as UserRole;
    if (role) {
      login(role);
    }
  };
  
  const logo = PlaceHolderImages.find(p => p.id === 'davangere-university-logo');


  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="mx-auto w-full max-w-md shadow-2xl">
        <CardHeader className="text-center space-y-4">
          {logo && <Image src={logo.imageUrl} alt={logo.description} width={150} height={150} data-ai-hint={logo.imageHint} className="mx-auto rounded-full" />}
          <CardTitle className="text-3xl font-headline">ThesisFlow</CardTitle>
          <CardDescription>
            Davangere University PhD Workflow Portal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
             <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@davangereuniversity.ac.in"
                required
                defaultValue="user1@davangereuniversity.ac.in"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required defaultValue="password" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="role-select">Select Role (for demo)</Label>
              <Select name="role" defaultValue="student">
                  <SelectTrigger id="role-select">
                      <SelectValue placeholder="Select a role to login as" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="guide">Guide</SelectItem>
                      <SelectItem value="hod">HOD</SelectItem>
                      <SelectItem value="research_admin">Research Admin</SelectItem>
                  </SelectContent>
              </Select>
            </div>


            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
