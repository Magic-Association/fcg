import { execFile } from "child_process";
import { readdir, unlink } from "fs/promises";
import path from "path";

const exportDir = path.resolve("apps/website/public/export");

async function deleteOldExports() {
  const files = await readdir(exportDir);
  await Promise.all(
    files.filter((file) => file !== ".gitkeep").map((file) => unlink(path.join(exportDir, file))),
  );
}

function getGitHash() {
  return new Promise((resolve) => {
    execFile("git", ["rev-parse", "--short", "HEAD"], (_err, stdout) => {
      resolve(stdout.trim());
    });
  });
}

function godotExport(hash) {
  const exportHtmlDir = path.resolve(exportDir, `FrierenCardGame-${hash}.html`);
  return new Promise((resolve, reject) => {
    execFile(
      "godot",
      ["--headless", "--path", "apps/client", "--export-release", "Web", exportHtmlDir],
      (err, _stdout, stderr) => {
        if (err) {
          console.error(stderr);
          return reject(err);
        }
        resolve();
      },
    );
  });
}

const [hash] = await Promise.all([getGitHash(), deleteOldExports()]);
await godotExport(hash);
console.log(`Exported Godot project with version identifier: ${hash}`);
