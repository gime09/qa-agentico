# API — Autenticación (Practice Software Testing)

**Base URL:** `https://api.practicesoftwaretesting.com`

---

## POST /users/login

Autentica a un usuario registrado y devuelve un token de sesión (Bearer/JWT).

**Request Body (JSON):**

```json
{
  "email": "customer@practicesoftwaretesting.com",
  "password": "your-password"
}