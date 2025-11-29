import { SignInButton } from "@/lib/components/auth/sign-in-button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <SignInButton />
	  <Link href="/play">Go to Play</Link>
    </main>
  );
}
