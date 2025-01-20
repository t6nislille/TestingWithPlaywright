import { test, expect, devices } from '@playwright/test';
const testData = require('./testData.json');

const home = 'https://epicbet.com/et/sport';

test.use({
  ...devices['iPhone 12'],
});

async function testButton(page, homeUrl, buttonSelector, expectedUrl, expectedSelector, expectedText) {
  
  // Add CookieConsent before navigating
  await page.context().addCookies([{
    name: 'CookieConsent',
    value: '{"stamp":"SfrYDKnlOVglQf+DqNdxNUcQvSp6cTnFm8MTJCTqOKUzKF2omDklzA==","necessary":true,"preferences":false,"statistics":false,"marketing":false,"method":"explicit","ver":1,"utc":1737019629222,"region":"ee"}',
    domain: 'epicbet.com',
    path: '/',
    httpOnly: false,
    secure: true,
    sameSite: 'Lax',
  }]);

  await page.goto(homeUrl, { waitUntil: 'domcontentloaded' });

  // Locate and scroll to the button if not visible
  const button = page.locator(buttonSelector);
  await button.scrollIntoViewIfNeeded(); 
  await expect(button).toBeVisible();   

  // Retry clicking the button
  let clicked = false;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await button.click(); 
      clicked = true;
      break; 
    } catch (error) {
      console.log(`Click attempt ${attempt + 1} failed: ${error.message}`);
      if (attempt < 2) await page.waitForTimeout(1000); 
    }
  }

  if (!clicked) {
    throw new Error('Failed to click the button after 3 attempts');
  }

  // Wait for the expected URL and verify navigation
  await page.waitForURL(expectedUrl, { timeout: 5000 });
  expect(page.url()).toBe(expectedUrl);

  // Check the expected content on the new page
  const pageContent = page.locator(expectedSelector, { hasText: expectedText });
  await expect(pageContent).toBeVisible();
}

test.describe('Button functionality test', () => {
  for (const [key, data] of Object.entries(testData.buttons)) {
    test(key, async ({ page }) => {
      await testButton(page, home, data.selector, data.url, data.pageSelector, data.text);
    });
  }
});
