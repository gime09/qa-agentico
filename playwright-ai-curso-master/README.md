# Proyecto de Pruebas Automatizadas con Playwright

Este repositorio contiene una suite de pruebas automatizadas para la plataforma [laboratoriodetesting.com](http://laboratoriodetesting.com), desarrollada utilizando **Playwright** y **TypeScript**. El objetivo del proyecto es asegurar la calidad y el correcto funcionamiento de los flujos críticos como el inicio de sesión y la gestión del carrito de compras.

## 🚀 Características Principales

- **Automatización de Extremo a Extremo (E2E):** Pruebas de flujos completos de usuario.
- **Validación de Formularios:** Pruebas exhaustivas para el login, incluyendo casos de error y formatos de email.
- **Pruebas de Carrito:** Verificación de la funcionalidad de agregar productos y gestión del carrito.
- **Reportes Detallados:** Generación de reportes en HTML y trazas para depuración.
- **Integración Continua (CI):** Flujo de trabajo automatizado con GitHub Actions.

## 🛠️ Tecnologías Utilizadas

- [Playwright](https://playwright.dev/) - Framework de automatización.
- [TypeScript](https://www.typescriptlang.org/) - Lenguaje de programación.
- [Node.js](https://nodejs.org/) - Entorno de ejecución.
- [GitHub Actions](https://github.com/features/actions) - CI/CD.

## 📋 Requisitos Previos

Asegúrate de tener instalado:
- Node.js (versión LTS recomendada)
- npm (incluido con Node.js)

## 📦 Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd proyecto
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Instala los navegadores de Playwright:
   ```bash
   npx playwright install
   ```

## 🏃 Ejecución de Pruebas

### Ejecutar todas las pruebas
```bash
npx playwright test
```

### Ejecutar pruebas en modo UI (interactivo)
```bash
npx playwright test --ui
```

### Ejecutar una suite específica (ej. Login)
```bash
npx playwright test tests/login/
```

### Generar y ver el reporte
```bash
npx playwright show-report
```

## 📂 Estructura del Proyecto

```text
├── .github/workflows/    # Configuración de GitHub Actions
├── docs/                 # Historias de usuario y reportes de negocio
├── specs/                # Planes de prueba y especificaciones detalladas
├── tests/                # Archivos de prueba (.spec.ts)
│   ├── login/            # Suite de pruebas de autenticación
│   └── fixtures/         # Configuraciones y datos reutilizables
├── playwright.config.ts  # Configuración global de Playwright
└── package.json          # Dependencias y scripts del proyecto
```

## 📖 Documentación

Puedes encontrar documentación detallada sobre los requerimientos y planes de prueba en las siguientes carpetas:
- [Documentación de Negocio](./docs/)
- [Especificaciones Técnicas](./specs/)

## 🔗 Integración Continua

El proyecto cuenta con un workflow de GitHub Actions que se ejecuta en cada `push` o `pull_request` a las ramas `main` o `master`. Puedes ver los resultados en la pestaña **Actions** de GitHub.

## 📄 Licencia

Este proyecto está bajo la licencia ISC.
