import react from "@vitejs/plugin-react";
import * as path from "path";
import { defineConfig } from "vitest/config";

import { rootConfig, plugins } from "../../vitest.config";

export default defineConfig({
  ...rootConfig,
  root: "./test/unit",
  plugins: [...plugins, react()],
  test: {
    ...rootConfig.test,
    environment: "jsdom",
    mockReset: true,
    setupFiles: [path.resolve(__dirname, "vitest-unit-tests-setup.ts")],
  },
});
