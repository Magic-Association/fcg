import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import globals from "globals";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      "apps/client/**",
      "apps/website/public/**",
      "apps/website/.next/**",
      "apps/website/build/**",
      "packages/database/drizzle/**",
      "**/*.d.ts",
      "**/node_modules/**",
      "**/dist/**",
    ],
  },
  js.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.eslintRecommended,
  eslintConfigPrettier,
  nextVitals,
  nextTs,
  {
    settings: {
      react: {
        version: "19.2.0",
      },
      next: {
        rootDir: ["apps/website"],
      },
    },
    // disable page router rules
    rules: {
      "@next/next/no-document-import-in-page": "off",
      "@next/next/no-head-import-in-document": "off",
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-title-in-document-head": "off",
      "@next/next/no-styled-jsx-in-document": "off",
      "@next/next/no-duplicate-head": "off",
    },
  },
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        projectService: true,
      },
      globals: globals.node,
    },
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-base-to-string": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-misused-promises": "off",
    },
  },
  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    ...tseslint.configs.disableTypeChecked,
    languageOptions: {
      globals: globals.node,
    },
  },
]);
