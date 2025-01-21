"use client";

import Link from "next/link";
import { Meteors } from "~/components/animations/metors";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { redirect } from "next/navigation";
import { register } from "~/server/actions/auth";

export default function Signup() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  if (session) {
    redirect("/");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ email, password, name });
      window.location.href = "/login";
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  return (
    <main className="mt-24 w-full overflow-hidden lg:mt-0 lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="text-balance text-muted-foreground">
              Enter your details below to create your account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                className="focus-visible:border-indigo-600 focus-visible:ring-indigo-600 focus:dark:border-indigo-400 focus:dark:ring-indigo-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                className="focus-visible:border-indigo-600 focus-visible:ring-indigo-600 focus:dark:border-indigo-400 focus:dark:ring-indigo-400"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                className="focus-visible:border-indigo-600 focus-visible:ring-indigo-600 focus:dark:border-indigo-400 focus:dark:ring-indigo-400"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Must be at least 8 characters long
              </p>
            </div>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            <Button type="submit" className="w-full hover:bg-indigo-500">
              Sign Up
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </div>
        <Meteors number={20} />
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/placeholder.jpg"
          alt="Image"
          className="max-h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </main>
  );
}
