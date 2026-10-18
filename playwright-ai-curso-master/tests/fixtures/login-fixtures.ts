export const loginTestData = {
  // Valid credentials
  validUser: {
    email: 'juanduarte@test.com',
    password: '12345678'
  },

  // Invalid credentials
  invalidCredentials: {
    email: 'invalid@test.com',
    password: 'wrongpassword'
  },

  // Valid email with invalid password
  validEmailInvalidPassword: {
    email: 'juanduarte@test.com',
    password: 'wrongpass'
  },

  // Invalid email formats
  invalidEmailFormats: [
    {
      email: 'invalidemail.com',
      description: 'missing @ symbol'
    },
    {
      email: 'test@',
      description: 'missing domain'
    },
    {
      email: 'test @test.com',
      description: 'contains spaces'
    },
    {
      email: 'invalid',
      description: 'incomplete email'
    }
  ],

  // Valid email format for testing
  validEmailFormat: 'valid@test.com',

  // Test password for format validation
  testPassword: 'password123',

  // Password for visibility toggle test
  visibilityTestPassword: 'mypassword123',

  // URLs
  urls: {
    login: 'https://www.laboratoriodetesting.com/auth/login',
    home: 'https://www.laboratoriodetesting.com/',
    signup: 'https://www.laboratoriodetesting.com/auth/signup'
  },

  // UI Text
  uiText: {
    loginHeading: 'Inicia Sesión',
    emailPlaceholder: 'Ingresa tu email',
    passwordPlaceholder: 'Ingresa tu contraseña',
    loginButton: 'Iniciar Sesión',
    invalidEmailMessage: 'Email inválido',
    requiredFieldMessage: 'Este campo es requerido',
    invalidCredentialsMessage: 'No pudimos iniciar sesión con estas credenciales. Intenta de nuevo.',
    myAccountLink: 'Mi Cuenta',
    logoutLink: 'Cerrar Sesión',
    createAccountLink: '¿No tienes una cuenta? Crea una',
    forgotPasswordButton: '¿Olvidaste tu contraseña?',
    logoLink: 'Laboratorio De Testing',
    forgotPasswordModalHeading: 'Ingresa tu dirección email',
    forgotPasswordModalCancelButton: 'No'
  }
};