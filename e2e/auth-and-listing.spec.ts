import { test, expect } from "@playwright/test";

test("register -> login -> create listing -> dashboard shows listing", async ({
  page,
}) => {
  const random = Math.random().toString(36).slice(2, 8);
  const name = `Test${random}`;
  const email = `test+${random}@example.com`;
  const password = "Password123!";

  // Register
  await page.goto("/register");
  await page.fill(
    'input[placeholder="Name"], input[name="name"], input[type="text"]',
    name
  );
  await page.fill('input[type="email"], input[name="email"]', email);
  await page.fill('input[type="password"]', password);
  await page.click("text=Create account");

  // Should redirect to profile
  await page.waitForURL("**/profile");
  await expect(page.locator("text=" + name)).toBeVisible();

  // Create a listing
  await page.goto("/listings/new");
  await page.fill(
    'input[name="title"], input[type="text"]',
    "E2E Test Listing"
  );
  await page.fill('input[type="number"]', "123");
  await page.click("text=Create");

  // Should redirect to host dashboard
  await page.waitForURL("**/host/dashboard");
  await expect(page.locator("text=E2E Test Listing")).toBeVisible();
});
