import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig(
  {
    ignores: [
      "apps/client/**",
      "apps/website/public/**",
      "packages/database/drizzle/**",
      "**/*.d.ts",
      "**/node_modules/**",
      "**/dist/**",
      "**/.next/**",
      "**/build/**",
    ],
  },
  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.eslintRecommended,
  eslintConfigPrettier,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["{packages,apps}/*/tsconfig.json"],
      },
      globals: globals.node,
    },
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    ...tseslint.configs.disableTypeChecked,
    languageOptions: {
      globals: globals.node,
    },
  },
);
