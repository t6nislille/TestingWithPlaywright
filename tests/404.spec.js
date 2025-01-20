import { test, expect } from '@playwright/test';

const home = 'https://epicbet.com/et/sport';

// Add CookieConsent before navigating
const cookie = {
  name: 'CookieConsent',
  value: '{"stamp":"SfrYDKnlOVglQf+DqNdxNUcQvSp6cTnFm8MTJCTqOKUzKF2omDklzA==","necessary":true,"preferences":false,"statistics":false,"marketing":false,"method":"explicit","ver":1,"utc":1737019629222,"region":"ee"}',
  domain: 'epicbet.com', 
  path: '/',
  httpOnly: false, 
  secure: true, 
  sameSite: 'Lax',
};

test.describe('Error Page', () => {
  test.beforeEach(async ({ page }) => {
    // Set the cookie to bypass the cookie banner
    await page.context().addCookies([cookie]);
  });

  test('404 Page Test', async ({ page }) => {

    await page.goto(home, { waitUntil: 'domcontentloaded' });

    // Navigate to a non-existent URL
    await page.goto('https://epicbet.com/et/notreal', { waitUntil: 'domcontentloaded' });

    // Assert the 404 page is visible
    const errorMessage = page.locator('text=404');
    await expect(errorMessage).toBeVisible();
  });

});
