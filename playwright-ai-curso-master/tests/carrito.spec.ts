import { test, expect } from '@playwright/test';
import { loginTestData } from './fixtures/login-fixtures';

test.describe('Flujo de Carrito y Checkout', () => {
  
  test.beforeEach(async ({ page }) => {
    // 1. Inicio de Sesión
    await page.goto(loginTestData.urls.login);
    
    // Verificaciones iniciales de la página de login
    await expect(page.getByRole('heading', { name: loginTestData.uiText.loginHeading })).toBeVisible();
    
    // Llenado de credenciales
    await page.getByRole('textbox', { name: loginTestData.uiText.emailPlaceholder }).fill(loginTestData.validUser.email);
    await page.getByRole('textbox', { name: loginTestData.uiText.passwordPlaceholder }).fill(loginTestData.validUser.password);
    await page.getByRole('button', { name: loginTestData.uiText.loginButton }).click();
    
    // Verificar que el login fue exitoso redireccionando al home
    await expect(page).toHaveURL(loginTestData.urls.home);
  });

  test('Debe completar una compra exitosa de Bandas Elásticas de Resistencia', async ({ page }) => {
    // 2. Selección de Producto
    // Navegamos directamente a la página del producto para mayor precisión
    await page.goto('https://www.laboratoriodetesting.com/products/bandas-elasticas-de-resistencia');
    
    // Verificar que estamos en el producto correcto
    await expect(page.getByRole('heading', { name: 'Bandas Elásticas de Resistencia', level: 1 })).toBeVisible();
    
    // El precio unitario debe ser $350.00
    await expect(page.locator('main').getByText('$350.00').first()).toBeVisible();

    // Incrementar cantidad a 2 usando el botón '+'
    // Usamos first() porque puede haber otros botones '+' en secciones de productos relacionados
    await page.getByRole('button', { name: '+' }).first().click();
    
    // Verificar que el contador de cantidad se actualizó a 2
    // El contador está en un div adyacente al botón, buscamos el texto '2' en el contenedor de cantidad
    await expect(page.locator('main').getByText('2', { exact: true })).toBeVisible();

    // Añadir el producto al carrito
    await page.getByRole('button', { name: 'Añadir al carrito' }).first().click();

    // 3. Verificación en el Sidebar del Carrito
    // El sidebar es un elemento 'complementary' según el snapshot
    const cartSidebar = page.getByRole('complementary');
    await expect(cartSidebar).toBeVisible();
    
    // Verificar detalles del producto en el carrito
    await expect(cartSidebar.getByText('Bandas Elásticas de Resistencia')).toBeVisible();
    await expect(cartSidebar.getByText('2', { exact: true })).toBeVisible();
    
    // El total debe ser $700.00 (350 * 2)
    await expect(cartSidebar.getByText('Total: $700.00')).toBeVisible();

    // Proceder al Checkout
    const checkoutButton = cartSidebar.getByRole('button', { name: 'Ir al checkout' });
    await expect(checkoutButton).toBeVisible();
    await checkoutButton.evaluate((button: HTMLElement) => button.click());
    
    // Verificar redirección a la página de checkout
    await expect(page).toHaveURL(/.*checkout/);

    // 4. Proceso de Checkout - Información del comprador
    // Usamos los placeholders reales encontrados en el sitio
    await page.getByRole('textbox', { name: 'John', exact: true }).fill('Juan');
    await page.getByRole('textbox', { name: 'Doe', exact: true }).fill('Duarte');
    await page.getByRole('textbox', { name: 'mail@domain.com' }).fill('juan.duarte@example.com');
    await page.getByRole('textbox', { name: '1234 Calle Primavera' }).fill('Calle Falsa 123');
    await page.getByLabel('Pais').selectOption('Argentina');

    // Información de Pago
    await page.getByRole('textbox', { name: 'John Doe' }).fill('Juan Duarte');
    await page.getByRole('textbox', { name: '1234 5678 9012 3456' }).fill('4301822375925071');
    
    // El campo de fecha es un input de tipo month (YYYY-MM)
    await page.locator('input[name="expiryDate"]').fill('2029-09');
    await page.locator('input[name="securityCode"]').fill('668');

    // Verificación del Resumen de Orden en la página de checkout
    const orderSummary = page.locator('article').filter({ hasText: 'Resumen de Orden' });
    await expect(orderSummary.getByText('Bandas Elásticas de Resistencia')).toBeVisible();
    await expect(orderSummary.getByText('Cantidad: 2')).toBeVisible();
    await expect(orderSummary.getByText('$700.00').first()).toBeVisible();

    // 5. Finalizar Compra
    const completePaymentBtn = page.getByRole('button', { name: 'Completar Pago' });
    
    // El botón debería habilitarse tras completar los campos obligatorios
    await expect(completePaymentBtn).toBeEnabled();
    await completePaymentBtn.click();

    // Validar mensaje de éxito en el diálogo modal
    const successDialog = page.getByRole('dialog', { name: 'Orden creada' });
    await expect(successDialog).toBeVisible();
    await expect(successDialog.getByText('Tu orden se ha creado con éxito')).toBeVisible();
    
    // Verificar que existe el botón para volver a la cuenta
    await expect(successDialog.getByRole('button', { name: 'Ir a mi cuenta' })).toBeVisible();
  });

});
