import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.SMOKE_BASE_URL;

if (!baseURL) {
  throw new Error("SMOKE_BASE_URL 환경변수가 필요합니다.");
}

const target = new URL(baseURL);

if (!["http:", "https:"].includes(target.protocol)) {
  throw new Error("SMOKE_BASE_URL은 http 또는 https URL이어야 합니다.");
}

export default defineConfig({
  testDir: "./tests/smoke",
  timeout: 30_000,
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: [
    ["list"],
    ["html", { open: "never" }],
  ],
  use: {
    baseURL: target.origin,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
