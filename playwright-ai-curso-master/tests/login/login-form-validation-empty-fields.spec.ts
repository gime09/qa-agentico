// spec: specs/login.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Functionality', () => {
  test('Login form validation - empty fields', async ({ page }) => {
    await page.goto('https://www.laboratoriodetesting.com/auth/login');

    await expect(page.getByRole('heading', { name: 'Inicia Sesión' })).toBeVisible();

    await expect(page.getByRole('textbox', { name: 'Ingresa tu email' })).toHaveValue('');
    await expect(page.getByRole('textbox', { name: 'Ingresa tu contraseña' })).toHaveValue('');
    await expect(page.getByRole('button', { name: 'Iniciar Sesión' })).toBeDisabled();

    await page.getByRole('textbox', { name: 'Ingresa tu email' }).focus();
    await page.getByRole('textbox', { name: 'Ingresa tu contraseña' }).focus();
    await page.keyboard.press('Tab');

    await expect(page.getByRole('button', { name: 'Iniciar Sesión' })).toBeDisabled();
  });
});