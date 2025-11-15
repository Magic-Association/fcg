import { createAuthClient } from "better-auth/client";

console.log(process.env)

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
});

export const signIn = () => {
  return authClient.signIn.social({
    provider: "discord",
    callbackURL: "/play",
  });
};

export const signOut = () => {
  return authClient.signOut();
};
