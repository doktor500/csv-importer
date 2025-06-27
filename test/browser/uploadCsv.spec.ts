import { test, expect } from "@playwright/test";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test("should upload CSV file and display product list", async ({ page }) => {
  await page.goto("/");

  const csvPath = path.join(__dirname, "../data/example.csv");
  await page.setInputFiles('input[type="file"]', csvPath);
  await page.getByRole("button", { name: "Upload CSV" }).click();

  await expect(page).toHaveURL(/.*\/products/);
  await expect(page.getByText("UK-1011")).toBeVisible();
});
