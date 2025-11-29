import db, { user } from "fcg-database";

export const dynamic = "force-dynamic";

export default async function Home() {
  const test = await db.select().from(user);
  console.log("Users: ", test);
  return (
    <main>
      {test.map((u, index) => (
        <div key={index}>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(u, null, 2)}
          </pre>
        </div>
      ))}
    </main>
  );
}
