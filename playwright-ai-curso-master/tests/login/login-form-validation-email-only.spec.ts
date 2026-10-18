// spec: specs/login.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Functionality', () => {
  test('Login form validation - email only', async ({ page }) => {
    await page.goto('https://www.laboratoriodetesting.com/auth/login');

    await expect(page.getByRole('heading', { name: 'Inicia Sesión' })).toBeVisible();

    await page.getByRole('textbox', { name: 'Ingresa tu email' }).fill('juanduarte@test.com');
    await expect(page.getByRole('button', { name: 'Iniciar Sesión' })).toBeDisabled();

    await page.getByRole('textbox', { name: 'Ingresa tu contraseña' }).focus();
    await page.keyboard.press('Tab');

    await expect(page.getByRole('button', { name: 'Iniciar Sesión' })).toBeDisabled();
    await expect(page.getByRole('button', { name: 'Iniciar Sesión' })).toBeDisabled();
  });
});