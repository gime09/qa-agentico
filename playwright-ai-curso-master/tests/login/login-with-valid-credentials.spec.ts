// spec: specs/login.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Functionality', () => {
  test('Login with valid credentials', async ({ page }) => {
    await page.goto('https://www.laboratoriodetesting.com/auth/login');

    await expect(page.getByRole('heading', { name: 'Inicia Sesión' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Ingresa tu email' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Ingresa tu contraseña' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Iniciar Sesión' })).toBeDisabled();

    await page.getByRole('textbox', { name: 'Ingresa tu email' }).fill('juanduarte@test.com');
    await expect(page.getByRole('button', { name: 'Iniciar Sesión' })).toBeDisabled();

    await page.getByRole('textbox', { name: 'Ingresa tu contraseña' }).fill('12345678');
    await expect(page.getByRole('button', { name: 'Iniciar Sesión' })).toBeEnabled();

    await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
    await expect(page).toHaveURL('https://www.laboratoriodetesting.com/');
    await expect(page.getByRole('link', { name: 'Mi Cuenta' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Cerrar Sesión' })).toBeVisible();

  });
});