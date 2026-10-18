# Reporte de Ejecución - Flujo de Carrito

**Fecha:** 29 de mayo de 2026
**Herramienta:** Playwright CLI

## Resumen
Se ejecutó el flujo completo de compra en el sitio Laboratorio de Testing, desde el inicio de sesión hasta la confirmación de la orden.

## Pasos del Flujo

### 1. Inicio de Sesión
Se navegó a `https://www.laboratoriodetesting.com/auth/login` e ingresaron las credenciales correspondientes.
- **Usuario:** `juanduarte@test.com`
- **Resultado:** Redirección exitosa a la página de inicio.

![Página de Login](login-page.png)

### 2. Selección de Producto
Se navegó a la página del producto "Bandas Elásticas de Resistencia", se incrementó la cantidad a 2 y se añadió al carrito.
- **Producto:** Bandas Elásticas de Resistencia
- **Cantidad:** 2
- **Resultado:** Producto visible en el sidebar del carrito con el total de $700.00.

![Home Page](home-page.png)
![Producto Añadido](cart-added.png)

### 3. Proceso de Checkout
Se accedió a la página de checkout y se completó la información del comprador y los datos de pago.
- **Datos del comprador:** Juan Duarte, Calle Falsa 123, Argentina.
- **Datos de pago:** Tarjeta Visa finalizada en 5071.

![Página de Checkout](checkout-page.png)
![Información de Checkout](checkout-filled.png)

### 4. Confirmación de Orden
Se presionó el botón "Completar Pago" y se verificó la aparición del mensaje de éxito.
- **Resultado esperado:** Diálogo "Orden creada" con mensaje "Tu orden se ha creado con éxito".
- **Estado:** ✅ Exitoso

![Orden Confirmada](order-confirmed.png)

---
**Observaciones:** El flujo se ejecutó correctamente sin errores críticos. Se utilizó `playwright-cli` para todas las interacciones.
