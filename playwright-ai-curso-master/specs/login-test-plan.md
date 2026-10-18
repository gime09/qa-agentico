# Plan de Pruebas - Flujo de Login

## Application Overview

Plan de pruebas completo para el flujo de login de laboratoriodetesting.com basado en la historia de usuario: "Como usuario registrado, quiero poder ingresar con mi email y password. Si las credenciales son invalidas, quiero ver un mensaje de error claro".

## Test Scenarios

### 1. Login Functionality

**Seed:** `tests/seed.spec.ts`

#### 1.1. Login with valid credentials

**File:** `tests/login/login-with-valid-credentials.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: The login page loads successfully
    - expect: Email and password fields are visible
    - expect: Login button is initially disabled
  2. Enter valid email: juanduarte@test.com
    - expect: Login button becomes enabled
  3. Enter valid password: 12345678
    - expect: Login button remains enabled
  4. Click 'Iniciar Sesión' button
    - expect: User is redirected to home page
    - expect: User session is established (network requests to my-account and logout endpoints)

#### 1.2. Login with invalid credentials shows error message

**File:** `tests/login/login-with-invalid-credentials-shows-error-message.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: The login page loads successfully
  2. Enter invalid email: invalid@test.com
    - expect: Login button becomes enabled
  3. Enter invalid password: wrongpassword
    - expect: Login button remains enabled
  4. Click 'Iniciar Sesión' button
    - expect: Error dialog appears with title 'Error'
    - expect: Error message displays: 'No pudimos iniciar sesión con estas credenciales. Intenta de nuevo.'
    - expect: Dialog has 'Volver' button
  5. Click 'Volver' button in error dialog
    - expect: Error dialog closes
    - expect: User remains on login page

#### 1.3. Login with valid email and invalid password

**File:** `tests/login/login-with-valid-email-invalid-password.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: The login page loads successfully
  2. Enter valid email: juanduarte@test.com
    - expect: Login button becomes enabled
  3. Enter invalid password: wrongpass
    - expect: Login button remains enabled
  4. Click 'Iniciar Sesión' button
    - expect: Error dialog appears with title 'Error'
    - expect: Error message displays: 'No pudimos iniciar sesión con estas credenciales. Intenta de nuevo.'

#### 1.4. Login form validation - empty fields

**File:** `tests/login/login-form-validation-empty-fields.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: The login page loads successfully
  2. Verify both email and password fields are empty
    - expect: Login button is disabled
  3. Attempt to submit form or check field validation
    - expect: Error message 'Este campo es requerido' appears under email field
    - expect: Error message 'Este campo es requerido' appears under password field
    - expect: Login button remains disabled

#### 1.5. Login form validation - email only

**File:** `tests/login/login-form-validation-email-only.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: The login page loads successfully
  2. Enter valid email: juanduarte@test.com
    - expect: Login button becomes enabled
  3. Leave password field empty
    - expect: Login button remains enabled
  4. Check password field validation
    - expect: Error message 'Este campo es requerido' appears under password field
    - expect: Login button remains enabled (email validation passed)

#### 1.6. Login form validation - password only

**File:** `tests/login/login-form-validation-password-only.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: The login page loads successfully
  2. Enter valid password: 12345678
    - expect: Login button becomes enabled
  3. Leave email field empty
    - expect: Login button remains enabled
  4. Check email field validation
    - expect: Error message 'Este campo es requerido' appears under email field
    - expect: Login button remains enabled (password validation passed)

#### 1.7. Email format validation

**File:** `tests/login/email-format-validation.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: The login page loads successfully
  2. Enter invalid email format: invalidemail.com (missing @)
    - expect: Error message 'Email inválido' appears under email field
    - expect: Login button is disabled
  3. Enter invalid email format: test@ (missing domain)
    - expect: Error message 'Email inválido' appears under email field
    - expect: Login button is disabled
  4. Enter invalid email format: test @test.com (contains spaces)
    - expect: Error message 'Email inválido' appears under email field
    - expect: Login button is disabled
  5. Enter valid email format: valid@test.com
    - expect: Error message 'Email inválido' disappears
    - expect: Login button becomes enabled when password is also entered
  6. Verify validation occurs as user types
    - expect: Email validation works in real-time without requiring form submission

#### 1.8. Password visibility toggle functionality

**File:** `tests/login/password-visibility-toggle.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: The login page loads successfully
  2. Enter password in password field
    - expect: Password field shows placeholder text
  3. Click password visibility toggle button
    - expect: Password text becomes visible (type changes from password to text)
    - expect: Eye icon changes state
  4. Click password visibility toggle button again
    - expect: Password text becomes hidden again (type changes back to password)
    - expect: Eye icon returns to original state

#### 1.9. Navigation links functionality

**File:** `tests/login/navigation-links.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: The login page loads successfully
  2. Click 'Laboratorio De Testing' logo
    - expect: User is redirected to home page
  3. Click '¿No tienes una cuenta? Crea una' link
    - expect: User is redirected to signup page
  4. Click '¿Olvidaste tu contraseña?' button
    - expect: Forgot password functionality is accessible
