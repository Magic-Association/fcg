import { config as base } from "./packages/eslint-config/base.js";
import { nextJsConfig } from "./packages/eslint-config/next.js";
import { config as reactInternal } from "./packages/eslint-config/react-internal.js";
import globals from "globals";

const withFiles = (arr, files) => arr.map((c) => ({ ...c, files }));

export default [
  ...base,

  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },

  {
    files: ["scripts/**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  ...withFiles(nextJsConfig, ["apps/web/**/*.{ts,tsx,js,jsx,mjs,cjs}"]),

  {
    files: ["apps/web/**/*.{ts,tsx,js,jsx,mjs,cjs}"],
    settings: {
      next: {
        rootDir: ["apps/web/"],
      },
    },
  },

  ...withFiles(reactInternal, ["packages/ui/**/*.{ts,tsx,js,jsx}"]),

  {
    ignores: [
      "**/dist/**",
      "apps/web/.next/**",
      "apps/web/out/**",
      "apps/web/public/export/**",
      "apps/web/next-env.d.ts",
      "node_modules/**",
    ],
  },
];
