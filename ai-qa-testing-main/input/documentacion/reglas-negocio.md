# Tienda de Comercio Electrónico (Practice Software Testing)

Es una tienda de comercio electrónico moderna y completa de herramientas y productos para el hogar.

---

### Enlaces y Accesos

* **Front-End (Web):** [practicesoftwaretesting.com](https://practicesoftwaretesting.com)
* **Documentación de API (Swagger / OpenAPI):** [api.practicesoftwaretesting.com/api/documentation](https://api.practicesoftwaretesting.com/api/documentation)

---

### ¿Por qué es ideal para tu portafolio?

* **Autenticación completa:** Login, Registro y manejo de tokens JWT / Bearer.
* **Funcionalidades completas:** Catálogo con filtros, paginación, carrito de compras, checkout y panel de administración.
* **Sincronización total:** Si creás un usuario o hacés una compra por API, aparece reflejado en el Front-End en tiempo real.
* **Integración directa:** Podés descargar directamente su archivo OpenAPI/JSON para incluirlo en tu carpeta `input/api/`.

# Reglas de Negocio del Sistema — ToolShop (Practice Software Testing)

Este documento define las políticas, validaciones y restricciones funcionales que rigen el comportamiento de la plataforma tanto en la interfaz web como en los endpoints de la API.

---

## 1. Gestión de Usuarios y Autenticación (RN-USR)

* **RN-USR-01 (Unicidad de Identidad):** No se permite el registro de dos cuentas con la misma dirección de correo electrónico. La API debe responder con código `422 Unprocessable Entity` ante intentos duplicados.
* **RN-USR-02 (Política de Contraseñas):** Las contraseñas deben contener un mínimo de 8 caracteres, al menos un número y un carácter especial.
* **RN-USR-03 (Restricción de Edad):** El registro está reservado exclusivamente para mayores de 18 años según la fecha de nacimiento ingresada (`dob`).
* **RN-USR-04 (Vigencia de Sesión):** El token JWT emitido tras un login exitoso (`POST /users/login`) tiene un tiempo de expiración fijo de 3600 segundos (1 hora).
* **RN-USR-05 (Bloqueo de Cuenta):** Tras 5 intentos fallidos consecutivos de autenticación, la cuenta debe suspenderse temporalmente por seguridad.

---

## 2. Catálogo, Búsqueda y Filtros (RN-CAT)

* **RN-CAT-01 (Paginación Estándar):** La grilla principal debe listar un máximo de 9 productos por página. La navegación no debe reiniciar los filtros activos.
* **RN-CAT-02 (Búsqueda Case-Insensitive):** Las búsquedas por texto deben devolver coincidencias parciales y totales sin distinguir entre mayúsculas y minúsculas (ej: "hammer" = "HAMMER").
* **RN-CAT-03 (Lógica de Filtros Combinados):** Los filtros de Categoría, Marca y Rango de Precios operan de forma acumulativa mediante operador lógico `AND`.
* **RN-CAT-04 (Rango de Precios Válido):** El precio mínimo del filtro no puede ser mayor que el precio máximo. El slider abarca valores de $1.00 a $200.00.
* **RN-CAT-05 (Manejo de Resultados Vacíos):** Si una búsqueda o combinación de filtros no produce coincidencias, la API debe devolver un array vacío (`"data": []`) con código `200 OK` y el front-end debe mostrar el mensaje: *"There are no products found."*

---

## 3. Inventario, Carrito y Checkout (RN-ORD)

| Código | Regla | Impacto Front-End | Impacto API / Backend |
|---|---|---|---|
| **RN-ORD-01** | Control de Stock | Productos con stock = 0 muestran badge "Agotado" y deshabilitan el botón "Add to Cart". | Bloquea el request con error `400 Bad Request` si se intenta agregar un ítem sin inventario. |
| **RN-ORD-02** | Cantidad Máxima | El selector de cantidad no puede superar el número de unidades disponibles en stock. | Valida el payload de orden contra el stock real en base de datos. |
| **RN-ORD-03** | Cálculo de Totales | El importe final debe satisfacer: `Total = Subtotal + Envío + Impuestos`. | La API recalcula y valida los totales; rechaza discrepancias enviadas por el cliente. |
| **RN-ORD-04** | Precondición de Compra | El checkout exige una sesión autenticada activa para confirmar el pago. | Retorna `401 Unauthorized` si la petición `POST /orders` carece de Bearer Token válido. |
| **RN-ORD-05** | Emisión de Factura | Toda orden confirmada genera inmediatamente un registro en `POST /invoices` con estado "Pending". | El inventario del producto adquirido se descuenta automáticamente tras la confirmación. |




## Glosario

- **HU:** Historia de Usuario.
- **CA:** Criterio de Aceptación.
- **CP:** Caso de Prueba.
- **SUT:** Sistema bajo prueba (System Under Test).
- **BDD:** Behavior-Driven Development (desarrollo guiado por comportamiento).
