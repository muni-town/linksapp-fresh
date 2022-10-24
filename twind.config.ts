import { Options } from "$fresh/plugins/twind.ts";
import typography from "@twind/typography";

export default {
  selfURL: import.meta.url,
  plugins: {
    ...typography({ className: "prose" }),
  },
} as Options;
