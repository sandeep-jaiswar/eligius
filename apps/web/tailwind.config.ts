// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@eligius/tailwind-config";

const config: Pick<Config, "content" | "presets"> = {
  content: ["./app/**/*.tsx", "../../packages/ui/**/*.tsx"],
  presets: [sharedConfig],
};

export default config;
