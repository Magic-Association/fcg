import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db, { schema } from "fcg-database";
import "./envConfig";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema, // since the auth-schema.ts doesnt exist here we need to pass the schema manually
  }),
  socialProviders: {
    discord: {
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      disableDefaultScope: true,
      scope: ["identify"],
      mapProfileToUser: (profile) => {
        console.log(profile);
        return {
          email: `${profile.id}@no-email.local`,
        };
      },
    },
  },
});
