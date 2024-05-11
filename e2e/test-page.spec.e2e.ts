import { ROUTES_PATH } from '@core/constants/routes-path.const';
import { test, expect, Page } from '@playwright/test';

const getActionButtons = async (page: Page) => {
  const incrementButton = await page.locator("#increment-button");
  const incrementWithMiddleware = await page.locator("#increment-with-middleware-button");
  const decrementButton = await page.locator("#decrement-button");
  const intervalButton = await page.locator("#interval-button");
  const resetButton = await page.locator("#reset-button");

  return {
    incrementButton,
    incrementWithMiddleware,
    decrementButton,
    intervalButton,
    resetButton
  };
};

const getResultsSpan = async (page: Page) => {
  const selectResult = await page.locator("#select-result");
  const selectorResult = await page.locator("#selector-result");
  const signalSelectResult = await page.locator("#signal-select-result");
  const signalSelectorResult = await page.locator("#signal-selector-result");

  return {
    selectResult,
    selectorResult,
    signalSelectResult,
    signalSelectorResult
  };
};

test.beforeEach(async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/${ROUTES_PATH.TEST}`);
});

test.describe("Should basic actions work", () => {
  test("Should increment button work", async ({ page }) => {
    const { incrementButton } = await getActionButtons(page);
    const { selectResult, selectorResult, signalSelectResult, signalSelectorResult } = await getResultsSpan(page);

    await incrementButton.click();
    await incrementButton.click();
    await incrementButton.click();

    const expectedValue = "3";

    expect((await selectResult.textContent()).trim()).toBe(expectedValue);
    expect((await selectorResult.textContent()).trim()).toBe(expectedValue);
    expect((await signalSelectResult.textContent()).trim()).toBe(expectedValue);
    expect((await signalSelectorResult.textContent()).trim()).toBe(expectedValue);
  });

  test("Should decrement button work", async ({ page }) => {
    const { decrementButton } = await getActionButtons(page);
    const { selectResult, selectorResult, signalSelectResult, signalSelectorResult } = await getResultsSpan(page);

    await decrementButton.click();
    await decrementButton.click();
    await decrementButton.click();

    const expectedValue = "-3";

    expect((await selectResult.textContent()).trim()).toBe(expectedValue);
    expect((await selectorResult.textContent()).trim()).toBe(expectedValue);
    expect((await signalSelectResult.textContent()).trim()).toBe(expectedValue);
    expect((await signalSelectorResult.textContent()).trim()).toBe(expectedValue);
  });

  test("Should reset button work", async ({ page }) => {
    const { incrementButton, resetButton } = await getActionButtons(page);
    const { selectResult, selectorResult, signalSelectResult, signalSelectorResult } = await getResultsSpan(page);

    await incrementButton.click();
    await incrementButton.click();
    await incrementButton.click();
    await resetButton.click();

    const expectedValue = "0";

    expect((await selectResult.textContent()).trim()).toBe(expectedValue);
    expect((await selectorResult.textContent()).trim()).toBe(expectedValue);
    expect((await signalSelectResult.textContent()).trim()).toBe(expectedValue);
    expect((await signalSelectorResult.textContent()).trim()).toBe(expectedValue);
  });

  test("Should add with middleware button work", async ({ page }) => {
    const { incrementWithMiddleware } = await getActionButtons(page);
    const { selectResult, selectorResult, signalSelectResult, signalSelectorResult } = await getResultsSpan(page);

    await incrementWithMiddleware.click();
    await incrementWithMiddleware.click();

    const expectedValue = "4";

    expect((await selectResult.textContent()).trim()).toBe(expectedValue);
    expect((await selectorResult.textContent()).trim()).toBe(expectedValue);
    expect((await signalSelectResult.textContent()).trim()).toBe(expectedValue);
    expect((await signalSelectorResult.textContent()).trim()).toBe(expectedValue);
  });

  test("Should mix of actions work", async ({ page }) => {
    const { incrementButton, decrementButton, resetButton, incrementWithMiddleware } = await getActionButtons(page);
    const { selectResult, selectorResult, signalSelectResult, signalSelectorResult } = await getResultsSpan(page);

    await incrementButton.click();
    await incrementButton.click();
    await incrementButton.click();
    await resetButton.click();
    await decrementButton.click();
    await decrementButton.click();
    await incrementWithMiddleware.click();
    await incrementWithMiddleware.click();

    const expectedValue = "2";

    expect((await selectResult.textContent()).trim()).toBe(expectedValue);
    expect((await selectorResult.textContent()).trim()).toBe(expectedValue);
    expect((await signalSelectResult.textContent()).trim()).toBe(expectedValue);
    expect((await signalSelectorResult.textContent()).trim()).toBe(expectedValue);
  });
});

test.describe("Should interval action work", () => {
  test("Should interval button work", async ({ page }) => {
    const { intervalButton } = await getActionButtons(page);

    await intervalButton.click();

    await page.waitForFunction(() => {
      const expectedValue = "2";
      const selectValue = document.querySelector("#select-result").textContent.trim();
      const selectorValue = document.querySelector("#selector-result").textContent.trim();
      const signalSelectValue = document.querySelector("#signal-select-result").textContent.trim();
      const signalSelectorValue = document.querySelector("#signal-selector-result").textContent.trim();

      return selectValue === expectedValue && selectorValue === expectedValue && signalSelectValue === expectedValue && signalSelectorValue === expectedValue;
    })

  });

  test("Should reset button reset interval", async ({ page }) => {
    const { intervalButton, resetButton } = await getActionButtons(page);

    await intervalButton.click();

    await page.waitForFunction(() => {
      const expectedValue = "2";
      const selectValue = document.querySelector("#select-result").textContent.trim();
      const selectorValue = document.querySelector("#selector-result").textContent.trim();
      const signalSelectValue = document.querySelector("#signal-select-result").textContent.trim();
      const signalSelectorValue = document.querySelector("#signal-selector-result").textContent.trim();

      return selectValue === expectedValue && selectorValue === expectedValue && signalSelectValue === expectedValue && signalSelectorValue === expectedValue;
    })

    await resetButton.click();

    await page.waitForFunction(() => {
      const expectedValue = "0";
      const selectValue = document.querySelector("#select-result").textContent.trim();
      const selectorValue = document.querySelector("#selector-result").textContent.trim();
      const signalSelectValue = document.querySelector("#signal-select-result").textContent.trim();
      const signalSelectorValue = document.querySelector("#signal-selector-result").textContent.trim();

      return selectValue === expectedValue && selectorValue === expectedValue && signalSelectValue === expectedValue && signalSelectorValue === expectedValue;
    })
  });
});