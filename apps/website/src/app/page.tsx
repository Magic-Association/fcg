import db, { user } from "@db";
import { SignInButton } from "@/lib/components/auth/sign-in-button";

// next.js tries to call the db at build time to render this as a static page, which is not possible if the db isn't running
// obviously, remove this all from the homepage later, the db call is just for testing the setup, and then this page can be made static
export const dynamic = "force-dynamic"

export default async function Home() {
  const test = await db.select().from(user);
  console.log("Users: ", test);
  return (
    <main>
      <SignInButton />
    </main>
  );
}
