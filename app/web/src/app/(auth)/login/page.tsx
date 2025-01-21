"use client";

import Link from "next/link";
import { Meteors } from "~/components/animations/metors";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { signIn, useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function Login() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (session) {
      redirect("/");
    }
  }, []);
  return (
    <main className="mt-24 w-full overflow-hidden lg:mt-0 lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
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
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                className="focus-visible:border-indigo-600 focus-visible:ring-indigo-600 focus:dark:border-indigo-400 focus:dark:ring-indigo-400"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            <Button 
              onClick={async (e) => {
                e.preventDefault();
                try {
                  const result = await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                  });
                  if (result?.error) {
                    setError("Invalid email or password");
                  } else {
                    window.location.href = "/";
                  }
                } catch (error) {
                  setError("Something went wrong. Please try again.");
                }
              }}
              className="w-full hover:bg-indigo-500"
            >
              Login
            </Button>
            <Button
              onClick={() => signIn("google", {
                callbackUrl: "/",
                redirect: true,
              }).catch((error) => {
                console.error("Google sign-in error:", error);
              })}
              variant="outline"
              className="w-full hover:bg-indigo-200 dark:hover:bg-opacity-60 dark:hover:bg-gradient-to-r dark:hover:from-[#34A853] dark:hover:via-[#FBBC05] dark:hover:to-[#EA4335]"
            >
              Login with Google
            </Button>
            <Button
              onClick={() => signIn("discord", {
                callbackUrl: "/",
                redirect: true,
              }).catch((error) => {
                console.error("Discord sign-in error:", error);
              })}
              variant="outline"
              className="w-full hover:bg-indigo-200 dark:hover:bg-violet-700 dark:hover:bg-opacity-60"
            >
              Login with Discord
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
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
