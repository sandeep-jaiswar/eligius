import type { Config } from "tailwindcss";
import sharedConfig from "@eligius/tailwind-config";

const config: Pick<Config, "content" | "presets"> = {
  content: ["../../packages/ui/**/*.tsx"],
  presets: [sharedConfig],
};

export default config;
