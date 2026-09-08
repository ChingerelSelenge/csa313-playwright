import { test, expect } from '@playwright/test';

test('Амжилттай нэвтрэх', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Products', { exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
  
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});