"use client";
import { signIn } from "@/lib/auth-client";

export function SignInButton() {
  return (
    <button
      onClick={() => signIn()}
      className="bg-indigo-500 text-white px-4 py-2 rounded hover:cursor-pointer"
    >
      Sign in with Discord
    </button>
  );
}
