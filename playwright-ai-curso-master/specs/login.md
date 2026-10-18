# Plan de Pruebas - Login

## Application Overview

Plan de pruebas para el flujo de login de laboratoriodetesting.com basado en la historia de usuario sobre inicio de sesión con email y contraseña, validación de formato de email, credenciales incorrectas y manejo de campos vacíos.

## Test Scenarios

### 1. Login Functionality

**Seed:** `tests/seed.spec.ts`

#### 1.1. Login with valid credentials

**File:** `tests/login/login-with-valid-credentials.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page loads successfully
    - expect: Email and password fields are visible
    - expect: Login button is initially disabled
  2. Enter valid email
    - expect: Email field contains valid email
    - expect: Login button remains disabled until password is entered
  3. Enter valid password
    - expect: Password field contains valid password
    - expect: Login button becomes enabled
  4. Click Iniciar Sesión button
    - expect: User is redirected to authenticated home page
    - expect: User account navigation is visible

#### 1.2. Login with invalid credentials shows error message

**File:** `tests/login/login-with-invalid-credentials-shows-error-message.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page loads successfully
  2. Enter invalid email
    - expect: Login button remains disabled until password is entered
  3. Enter incorrect password
    - expect: Login button becomes enabled
  4. Click Iniciar Sesión button
    - expect: Error dialog is displayed
    - expect: Error message indicates login failure
  5. Close error dialog
    - expect: User remains on login page
    - expect: Login form is still visible

#### 1.3. Login with valid email and invalid password

**File:** `tests/login/login-with-valid-email-invalid-password.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page loads successfully
  2. Enter valid email
    - expect: Email field contains valid email
  3. Enter invalid password
    - expect: Login button becomes enabled
  4. Submit login
    - expect: Error dialog appears with invalid credentials message

#### 1.4. Login form validation - empty fields

**File:** `tests/login/login-form-validation-empty-fields.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page loads successfully
  2. Verify both fields are empty
    - expect: Email and password fields are empty
    - expect: Login button is disabled
  3. Trigger validation if needed
    - expect: Required field validation is shown for both fields
    - expect: Submission remains blocked

#### 1.5. Login form validation - email only

**File:** `tests/login/login-form-validation-email-only.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page loads successfully
  2. Enter valid email only
    - expect: Email field contains valid email
    - expect: Login button remains disabled
  3. Trigger validation for password field
    - expect: Password required validation is displayed
    - expect: User cannot submit without password

#### 1.6. Login form validation - password only

**File:** `tests/login/login-form-validation-password-only.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page loads successfully
  2. Enter valid password only
    - expect: Password field contains value
    - expect: Login button becomes enabled
  3. Verify email field remains empty
    - expect: Email field is empty
    - expect: Login form does not proceed to authenticated state

#### 1.7. Email format validation

**File:** `tests/login/email-format-validation.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page loads successfully
  2. Enter invalid email format
    - expect: Email invalid validation appears
    - expect: Login button remains disabled
  3. Enter valid email format
    - expect: Email validation clears
    - expect: Login button can become enabled when password is filled

#### 1.8. Password visibility toggle functionality

**File:** `tests/login/password-visibility-toggle.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page loads successfully
  2. Enter password
    - expect: Password field is populated and hidden
  3. Toggle password visibility
    - expect: Password becomes visible
    - expect: Toggle control works
  4. Toggle back
    - expect: Password is hidden again

#### 1.9. Navigation links functionality

**File:** `tests/login/navigation-links.spec.ts`

**Steps:**
  1. Navigate to login page
    - expect: Login page loads successfully
  2. Click site logo
    - expect: User is redirected to home page
  3. Click create account link
    - expect: User is redirected to signup page
  4. Click forgot password button
    - expect: Forgot password interaction is accessible
