// spec: specs/login.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Functionality', () => {
  test('Login with invalid credentials shows error message', async ({ page }) => {
    await page.goto('https://www.laboratoriodetesting.com/auth/login');

    await expect(page.getByRole('heading', { name: 'Inicia Sesión' })).toBeVisible();

    await page.getByRole('textbox', { name: 'Ingresa tu email' }).fill('juanduarte@test.com');
    await page.getByRole('textbox', { name: 'Ingresa tu contraseña' }).fill('wrongpassword');
    await expect(page.getByRole('button', { name: 'Iniciar Sesión' })).toBeEnabled();

    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    await expect(page.getByRole('heading', { name: 'Error' })).toBeVisible();
    await expect(page.getByText('No pudimos iniciar sesión con estas credenciales. Intenta de nuevo.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Volver' })).toBeVisible();

    await page.getByRole('button', { name: 'Volver' }).click();
    await expect(page.getByRole('heading', { name: 'Inicia Sesión' })).toBeVisible();
  });
});