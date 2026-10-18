// spec: specs/login.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Functionality', () => {
  test('Navigation links functionality', async ({ page }) => {
    await page.goto('https://www.laboratoriodetesting.com/auth/login');

    await expect(page.getByRole('heading', { name: 'Inicia Sesión' })).toBeVisible();

    await page.getByRole('link', { name: 'Laboratorio De Testing' }).click();
    await expect(page).toHaveURL('https://www.laboratoriodetesting.com/');

    await page.goto('https://www.laboratoriodetesting.com/auth/login');
    await page.getByRole('link', { name: '¿No tienes una cuenta? Crea una' }).click();
    await expect(page).toHaveURL('https://www.laboratoriodetesting.com/auth/signup');

    await page.goto('https://www.laboratoriodetesting.com/auth/login');
    await page.getByRole('button', { name: '¿Olvidaste tu contraseña?' }).click();
    await expect(page.getByRole('heading', { name: 'Ingresa tu dirección email' })).toBeVisible();
  });
});