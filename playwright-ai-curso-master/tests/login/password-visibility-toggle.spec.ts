// spec: specs/login.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Functionality', () => {
  test('Password visibility toggle functionality', async ({ page }) => {
    await page.goto('https://www.laboratoriodetesting.com/auth/login');

    await expect(page.getByRole('heading', { name: 'Inicia Sesión' })).toBeVisible();

    await page.getByRole('textbox', { name: 'Ingresa tu contraseña' }).fill('mypassword123');
    await expect(page.getByRole('textbox', { name: 'Ingresa tu contraseña' })).toHaveAttribute('type', 'password');

    const toggleButton = page.locator('input[placeholder="Ingresa tu contraseña"] ~ button');
    await toggleButton.scrollIntoViewIfNeeded();
    await toggleButton.evaluate((b: HTMLElement) => (b as HTMLElement).click());

    const typeAfterFirst = await page.locator('input[name="password"]').evaluate((el: HTMLInputElement) => el.type);
    expect(typeAfterFirst).toBe('text');

    await toggleButton.evaluate((b: HTMLElement) => (b as HTMLElement).click());
    const typeAfterSecond = await page.locator('input[name="password"]').evaluate((el: HTMLInputElement) => el.type);
    expect(typeAfterSecond).toBe('password');
  });
});