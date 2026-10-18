# 🛒 ToolShop E-Commerce — QA Testing Suite & AI-Driven STLC Framework

> Proyecto de aseguramiento de calidad (QA) funcional, BDD y de API sobre **Practice Software Testing (ToolShop)**, ejecutado mediante **Agentes de Inteligencia Artificial (k0lmena + Claude Code + Playwright MCP)**.

---

## 📊 1. Resumen Ejecutivo del Testing (Mis Resultados)

* **Sistema Bajo Prueba (SUT):** [Practice Software Testing](https://practicesoftwaretesting.com/) y su [REST API](https://api.practicesoftwaretesting.com/api/documentation)
* **Historias Cubiertas:** `HU-001` (Registro), `HU-002` (Búsqueda/Filtros) y `HU-003` (Paginación/Orden).
* **Métricas:** 117 pruebas ejecutadas (94 aprobadas, 17 fallidas, 6 bloqueadas).
* **Veredicto Final:** ⛔ **No Apto (NO-GO)** debido a 10 bugs reportados (entre ellos, bloqueo en registro por formato de teléfono `BUG-004` y validación errónea de edad en 18 años `BUG-006`).

---

## 🪖 2. Framework de Agentes de IA Utilizado (k0lmena + Claude Code)

Para acelerar el ciclo STLC sin perder rigurosidad técnica, implementé un equipo de agentes especializados que interactúan dentro de VS Code mediante Claude Code CLI:

* 🔍 **Analista de historias:** Análisis estático de requerimientos y mitigación de ambigüedades.
* 🗺️ **Estratega de pruebas:** Generación del plan de pruebas y matriz de riesgos en HTML interactivo.
* 📝 **Casos manuales & 🥒 BDD:** Diseño de casos en Excel (`.xlsx`) y escenarios Gherkin (`.feature`).
* 🔌 **Casos de API & 🧪 Newman:** Diseño y ejecución de colecciones Postman contra la API REST.
* ▶️ **Ejecutor E2E:** Automatización de flujos web en navegador real con Playwright MCP.
* 🐞 **Reportes de bug:** Estandarización de reportes de defectos con logs y severidad.
* 🏁 **Informe de cierre:** Consolidación de métricas y evaluación ejecutiva Go/No-Go.

---


---

## 🔄 3. Fases del Ciclo STLC Demostradas

1. **Shift-Left & Refinamiento:** Análisis estático de requerimientos y levantamiento de 41 ambigüedades funcionales para el Product Owner.
2. **Estrategia & Planificación:** Definición de matriz de riesgos, alcance y criterios de entrada/salida (`output/planes-de-prueba/`).
3. **Diseño de Casos:** Matriz de 49 casos manuales y 46 escenarios Gherkin con cobertura 100% de los criterios de aceptación.
4. **Ejecución E2E & API:**
   - Pruebas en navegador simulando flujos reales de usuario con Playwright.
   - Ejecución de 20 peticiones HTTP con Newman validando status codes (`200`, `201`, `401`, `404`, `422`) y contratos JSON.
5. **Defect Tracking:** Formalización de 10 reportes de bug estructurados con severidad, logs de red y pasos de reproducción.
6. **Informe Ejecutivo:** Consolidación de métricas y evaluación de release en un dashboard HTML.

---

## 📂 4. Entregables del Proyecto

* 🗺️ **Plan de Pruebas:** `output/planes-de-prueba/`
* 📝 **Casos de Prueba (Excel y Markdown):** `output/casos/`
* 🥒 **Escenarios BDD (Gherkin):** `output/bdd/`
* 🐞 **Reportes de Defectos:** `output/bugs/` (BUG-001 al BUG-010)
* 🏁 **Dashboard de Cierre:** `output/informes-cierre/`

---

## 👤 Autor

* **QA Tester:** Gimena Gauna 
* **LinkedIn:** https://www.linkedin.com/in/gimena-gauna-08925a197/
* **Email:** gimegauna12345678@gmail.com