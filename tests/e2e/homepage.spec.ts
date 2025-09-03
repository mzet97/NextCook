import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load the homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check if the page title is correct
    await expect(page).toHaveTitle(/React Hook Next/);
    
    // Check if the main heading is visible
    await expect(page.getByRole('heading', { name: /React Hook Next/i })).toBeVisible();
    
    // Check if navigation is present
    await expect(page.getByRole('navigation')).toBeVisible();
  });

  test('should navigate to different sections', async ({ page }) => {
    await page.goto('/');
    
    // Test navigation to Hooks section
    await page.getByRole('link', { name: /hooks/i }).first().click();
    await expect(page).toHaveURL(/\/hooks/);
    
    // Go back to home
    await page.goto('/');
    
    // Test navigation to Next.js section
    await page.getByRole('link', { name: /next\.js/i }).first().click();
    await expect(page).toHaveURL(/\/nextjs/);
  });

  test('should be responsive', async ({ page }) => {
    await page.goto('/');
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('heading', { name: /React Hook Next/i })).toBeVisible();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.getByRole('heading', { name: /React Hook Next/i })).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.getByRole('heading', { name: /React Hook Next/i })).toBeVisible();
  });
});