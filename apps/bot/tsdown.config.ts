import { defineConfig } from "tsdown";

export default defineConfig({
  entry: "src/**/*.ts",
  outDir: "dist",
  format: "esm",
  unbundle: true,
  sourcemap: true,
  deps: {
    skipNodeModulesBundle: true,
  },
});
