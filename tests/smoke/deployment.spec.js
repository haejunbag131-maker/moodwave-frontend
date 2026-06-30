import { expect, test } from "@playwright/test";

test("배포 프론트에서 실제 홈 API 응답을 받아 기본 화면을 렌더링한다", async ({
  page,
  request,
}) => {
  const response = await request.get("/api/home");
  const responseBody = await response.text();

  expect(response.status(), responseBody).toBe(200);

  const homeData = JSON.parse(responseBody);

  expect(homeData).toEqual(
    expect.objectContaining({
      midMixes: expect.any(Array),
      popular: expect.any(Array),
      latest: expect.any(Array),
    }),
  );

  await page.goto("/");

  await expect(page).toHaveTitle(/MOOD WAVE/i);
  await expect(page.getByRole("heading", { name: "Popular" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Latest" })).toBeVisible();
});
