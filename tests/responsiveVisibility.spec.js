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

test.describe('Responsive Visibility', () => {
  test.beforeEach(async ({ page }) => {

    // Set the cookie to bypass the cookie banner
    await page.context().addCookies([cookie]);

  });

  test('Mobile menu', async ({ page }) => {

    // Set viewport and visit page
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(home, { waitUntil: 'domcontentloaded' });

    // Wait explicitly for the mobile menu to be visible
    const mobileMenu = page.locator('[data-testid="menu-button"]');
    await page.waitForSelector('[data-testid="menu-button"]:visible', { timeout: 30000 });
    
    // Screenshot for verification
    await page.screenshot({ path: 'screenshots/mobile-menu.png' });

    // Assert that the mobile menu is visible
    await expect(mobileMenu).toBeVisible();

    // Additional log to verify visibility in case of failure
    const isMobileMenuVisible = await mobileMenu.isVisible();
    console.log('Is mobile menu visible:', isMobileMenuVisible);

    // Assert the visibility directly (additional check to log in case of failure)
    expect(isMobileMenuVisible).toBeTruthy();
  });

  test('Desktop menu', async ({ page }) => {
    
    // Update the viewport for desktop and revisit the page
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(home, { waitUntil: 'domcontentloaded' });

    // Wait for desktop menu to be visible
    const desktopMenu = page.locator('[tab-id="sports"]');
    await page.waitForSelector('[tab-id="sports"]:visible', { timeout: 30000 });

    // Screenshot for verification
    await page.screenshot({ path: 'screenshots/desktop-menu.png' });

    // Assert that the desktop menu is visible
    await expect(desktopMenu).toBeVisible();

    // Additional log to verify visibility in case of failure
    const isDesktopMenuVisible = await desktopMenu.isVisible();
    console.log('Is desktop menu visible:', isDesktopMenuVisible);

    // Assert the visibility directly (additional check to log in case of failure)
    expect(isDesktopMenuVisible).toBeTruthy();
  });
});
