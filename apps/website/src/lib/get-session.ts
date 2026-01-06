import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const skipAuth =
  process.env.NODE_ENV === "development" && process.env.SKIP_AUTH === "true";

const devUser = {
  id: "dev-user-id-5026",
  name: "Magic Association Dev",
  email: "dev@magic-association.local",
  image:
    "https://avatars.githubusercontent.com/u/242818993?s=400&u=0e71d68ff4bb93d938fb74b3104ab5dfa07f0e82&v=4",
};

export async function getSession() {
  if (skipAuth) {
    return { user: devUser };
  }
  return await auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireSession() {
  const session = await getSession();
  if (!session) {
    redirect("/");
  }
  return session;
}
