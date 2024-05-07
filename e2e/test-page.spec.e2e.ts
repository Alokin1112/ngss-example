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