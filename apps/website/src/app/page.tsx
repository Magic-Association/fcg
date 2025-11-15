import db, { user } from "@db";
import { SignInButton } from "@/lib/components/auth/sign-in-button";

export default async function Home() {
  const test = await db.select().from(user);
  console.log("Users: ", test);
  return (
    <main>
      <SignInButton />
    </main>
  );
}
