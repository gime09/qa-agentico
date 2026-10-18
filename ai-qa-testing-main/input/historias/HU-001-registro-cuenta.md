
# Historia de Usuario: HU-001 - Registro de Nueva Cuenta de Cliente

**Como** visitante de la tienda ToolShop,  
**Quiero** registrar una cuenta completando mis datos personales y credenciales,  
**Para** acceder a las funciones de compra, historial de pedidos y facturación.

---

## Contexto y Precondiciones
* El usuario no debe estar autenticado en la plataforma.
* La URL de registro web es `/auth/register` y el endpoint backend es `POST /users/register`.

---

## Criterios de Aceptación

### CA-1: Registro Exitoso (Camino Feliz)
* **Dado que** el usuario ingresa a la página de registro,
* **Cuando** completa todos los campos requeridos con datos válidos:
  * Nombre y Apellido
  * Fecha de nacimiento (mayor de 18 años)
  * Dirección, Ciudad, Estado, País, Código Postal
  * Teléfono válido
  * Email no registrado previamente
  * Contraseña segura (mínimo 8 caracteres, al menos 1 número y 1 carácter especial)
* **Y** presiona el botón "Register",
* **Entonces** el sistema debe registrar el usuario, mostrar un mensaje de éxito ("Registration was successful") y redirigir al formulario de inicio de sesión (`/auth/login`).
* **Respuesta API esperada:** Código HTTP `201 Created` con el objeto del usuario creado (excluyendo el hash de la contraseña).

### CA-2: Validación de Email Duplicado
* **Dado que** ya existe un usuario registrado con el email `cliente_existente@test.com`,
* **Cuando** otro usuario intenta registrarse usando ese mismo email,
* **Entonces** el sistema debe bloquear el registro, mostrar un mensaje de error visible ("A customer with this email address already exists") y no redirigir.
* **Respuesta API esperada:** Código HTTP `422 Unprocessable Entity` con detalle del error en el campo `email`.

### CA-3: Validación de Campos Obligatorios y Formatos
* **Dado que** el formulario está en pantalla,
* **Cuando** el usuario intenta enviar el formulario con campos vacíos o con formato de email inválido (ej: `usuario@@dominio`),
* **Entonces** cada campo inválido debe mostrar un mensaje de error en línea debajo del input y el botón de registro debe permanecer inhabilitado o bloquear la petición.
* **Respuesta API esperada:** Código HTTP `422 Unprocessable Entity`.