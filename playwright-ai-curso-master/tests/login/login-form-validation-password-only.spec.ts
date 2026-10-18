// spec: specs/login.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Functionality', () => {
  test('Login form validation - password only', async ({ page }) => {
    await page.goto('https://www.laboratoriodetesting.com/auth/login');

    await expect(page.getByRole('heading', { name: 'Inicia Sesión' })).toBeVisible();

    await page.getByRole('textbox', { name: 'Ingresa tu contraseña' }).fill('12345678');
    await expect(page.getByRole('textbox', { name: 'Ingresa tu email' })).toHaveValue('');
    await expect(page.getByRole('button', { name: 'Iniciar Sesión' })).toBeEnabled();

    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    await expect(page.getByRole('heading', { name: 'Inicia Sesión' })).toBeVisible();
  });
});