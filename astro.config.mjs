import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://zacharyhutz-sudo.github.io",
  base: "Sherri-Beach-Home",
  integrations: [tailwind()],
});
