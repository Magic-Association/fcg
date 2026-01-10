import { exec } from "child_process";
import { readdir, unlink } from "fs/promises";
import path from "path";

async function deleteOldExports() {
  const exportDir = path.resolve("apps/website/public/export");
  const files = await readdir(exportDir);
  await Promise.all(
    files
      .filter((file) => file !== ".gitkeep")
      .map((file) => unlink(path.join(exportDir, file))),
  );
}

function getGitHash() {
  return new Promise((resolve) => {
    exec("git rev-parse --short HEAD", (_err, stdout) => {
      resolve(stdout.trim());
    });
  });
}

function godotExport(hash) {
  return new Promise((resolve, reject) => {
    exec(
      `godot --headless --path apps/client --export-release "Web" ../../apps/website/public/export/FrierenCardGame-${hash}.html`,
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
