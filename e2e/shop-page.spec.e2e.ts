import { ROUTES_PATH } from '@core/constants/routes-path.const';
import { test, expect, Page } from '@playwright/test';


test.beforeEach(async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/${ROUTES_PATH.SHOP}`);
});

test("Should properly add item to cart", async ({ page }) => {
  const addToCartButton1 = await page.locator(".add__item__button").nth(0);
  const addToCartButton2 = await page.locator(".add__item__button").nth(1);
  const addToCartButton3 = await page.locator(".add__item__button").nth(2);
  const cartItemsCount = await page.locator("#cart__counter");

  const expectedValue = "5";

  await addToCartButton1.click();
  await addToCartButton2.click();
  await addToCartButton3.click();
  await addToCartButton1.click();
  await addToCartButton2.click();

  expect((await cartItemsCount.textContent()).trim()).toBe(expectedValue);
});

test("Should properly list added items in cart", async ({ page, baseURL }) => {
  const addToCartButton1 = await page.locator(".add__item__button").nth(0);
  const addToCartButton2 = await page.locator(".add__item__button").nth(1);
  const addToCartButton3 = await page.locator(".add__item__button").nth(2);
  const cartButtonLink = await page.locator("#go-to-cart-link");

  await addToCartButton1.click();
  await addToCartButton2.click();
  await addToCartButton3.click();
  await addToCartButton1.click();
  await addToCartButton2.click();

  await cartButtonLink.click();
  await page.waitForURL(`${baseURL}/${ROUTES_PATH.CART}`);

  const cartItemsList = await page.locator(".cart__item").all();
  expect(cartItemsList?.length).toBe(5);
});

test("Should properly remove item from cart", async ({ page, baseURL }) => {
  const addToCartButton1 = await page.locator(".add__item__button").nth(0);
  const addToCartButton2 = await page.locator(".add__item__button").nth(1);
  const addToCartButton3 = await page.locator(".add__item__button").nth(2);
  const cartButtonLink = await page.locator("#go-to-cart-link");

  await addToCartButton1.click();
  await addToCartButton2.click();
  await addToCartButton3.click();
  await addToCartButton1.click();
  await addToCartButton2.click();

  await cartButtonLink.click();
  await page.waitForURL(`${baseURL}/${ROUTES_PATH.CART}`);
  const removeItemButton1 = await page.locator(".remove__item__button").nth(0);
  const removeItemButton2 = await page.locator(".remove__item__button").nth(1);

  await removeItemButton1.click();
  await removeItemButton2.click();
  const cartItemsList = await page.locator(".cart__item").all();
  expect(cartItemsList?.length).toBe(3);

  const backLink = await page.locator("#back-link");
  await backLink.click();
  await page.waitForURL(`${baseURL}/${ROUTES_PATH.SHOP}`);

  const cartItemsCount = await page.locator("#cart__counter");

  expect((await cartItemsCount.textContent()).trim()).toBe("3");
});