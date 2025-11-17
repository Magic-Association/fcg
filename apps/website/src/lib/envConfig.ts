import { loadEnvConfig } from "@next/env";
import { resolve } from "path";

const rootDir = resolve(process.cwd(), "../..");
loadEnvConfig(rootDir);
