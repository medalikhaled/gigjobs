"use client";

import Link from "next/link";
import { Meteors } from "~/components/animations/metors";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useAuthStore } from "~/stores/authStore";
import { redirect, useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (session) {
    redirect("/");
  }

  const setUser = useAuthStore((state) => state.setUser);
  const { data: sessionData } = useSession();

  useEffect(() => {
    if (sessionData?.user) {
      setUser({
        id: sessionData.user.id,
        email: sessionData.user.email!,
        name: sessionData.user.name,
        image: sessionData.user.image,
        role: sessionData.user.role,
      });
    }
  }, [sessionData, setUser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        return;
      }

      if (result?.ok) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="grid h-screen w-full overflow-hidden lg:grid-cols-2">
      <div className="flex items-center justify-center">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-balance text-muted-foreground">
              Enter your details below to sign in to your account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                className="focus-visible:border-primary focus-visible:ring-primary"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                className="focus-visible:border-primary focus-visible:ring-primary"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="w-full hover:bg-accent hover:text-accent-foreground"
            >
              Continue with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
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
