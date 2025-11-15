import { requireSession } from "@/lib/get-session";
import fs from "fs/promises";
import path from "path";
import GameWindow from "./gameWindow";

export default async function Play() {
  const session = await requireSession();

  const exportDir = path.join(process.cwd(), "public/export");
  const files = await fs.readdir(exportDir);
  const exportFile =
    files
      .filter((f) => /^FrierenCardGame-[a-f0-9]+\.html$/.test(f))
      .sort()
      .pop() || "FrierenCardGame.html";

  const username = session?.user?.name ?? "";
  const image = session?.user?.image ?? "";

  const res = await fetch(image);
  const avatar = Buffer.from(await res.arrayBuffer()).toString("base64");

  return (
    <main>
      <GameWindow src={`/export/${exportFile}`} info={{ username, avatar }} />
    </main>
  );
}
