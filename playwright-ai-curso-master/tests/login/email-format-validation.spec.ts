// spec: specs/login.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login Functionality', () => {
  test('Email format validation', async ({ page }) => {
    await page.goto('https://www.laboratoriodetesting.com/auth/login');

    await expect(page.getByRole('heading', { name: 'Inicia Sesión' })).toBeVisible();

    await page.getByRole('textbox', { name: 'Ingresa tu email' }).fill('usuario@dominio');
    await expect(page.getByText('Email inválido')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Iniciar Sesión' })).toBeDisabled();

    await page.getByRole('textbox', { name: 'Ingresa tu email' }).fill('juanduarte@test.com');
    await page.getByRole('textbox', { name: 'Ingresa tu contraseña' }).fill('12345678');
    await expect(page.getByText('Email inválido')).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Iniciar Sesión' })).toBeEnabled();
  });
});