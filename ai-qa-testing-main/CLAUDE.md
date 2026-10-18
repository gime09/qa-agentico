# Agentes k0lmena — Contexto del proyecto

Este repositorio es un conjunto de **agentes de QA para Claude Code**, pensados para que profesionales de testing manual aceleren sus tareas del día a día: planificar la estrategia de pruebas, analizar historias, escribir casos de prueba (manuales, BDD y de API), generar datos de prueba, redactar reportes de bug, ejecutar pruebas end-to-end en el navegador, ejecutar pruebas de API, generar reportes de resultados en HTML y armar el informe de cierre de la ronda.

Todo el trabajo y todas las salidas son **en español**.

---

## Cómo funciona el flujo

1. **`input/`** — Acá se ponen los insumos: historias de usuario, documentación del producto, contratos de API y observaciones de errores.
2. **Agentes** (`.claude/agents/`) — Cada agente es un especialista. Claude Code los invoca solo según lo que pida la persona; también se les puede pedir explícitamente.
3. **`plantillas/` y `scripts/`** — Definen el **formato de salida**. El **reporte de bug** sigue `plantillas/plantilla-reporte-bug.md`. Los **casos de prueba** se generan como planilla **Excel** (`.xlsx`) con `scripts/generar_casos.py` (referencia: `plantillas/plantilla-casos-prueba.xlsx`) y un **informe de cobertura** en Markdown (referencia: `plantillas/plantilla-cobertura.md`).
4. **`output/`** — Acá se guardan los artefactos generados, ordenados por tipo.

```
input/ → [ agente ] → output/
              ↑
   plantillas/ + scripts/  (formato)
```

---

## Agentes disponibles

| Agente | Para qué sirve | Guarda la salida en |
|--------|----------------|---------------------|
| `analista-historias` | Analiza historias y criterios de aceptación; detecta ambigüedades y arma preguntas de refinamiento | `output/analisis-historias/` |
| `estratega-pruebas` | Plan/estrategia de pruebas (alcance, riesgos, tipos de prueba, criterios) como dashboard HTML en modo oscuro | `output/planes-de-prueba/` |
| `generador-casos-manuales` | Casos de prueba en Excel (.xlsx) y Markdown (.md), + informe de cobertura (.md) con ambigüedades y preguntas para el PO | `output/casos-de-prueba/manuales/` |
| `generador-casos-bdd` | Escenarios en Gherkin (keywords en inglés, contenido en español) + informe de cobertura por criterio (.md) | `output/casos-de-prueba/bdd/` |
| `generador-reportes-bug` | Reportes de bug, siguiendo `plantillas/plantilla-reporte-bug.md` | `output/reportes-bug/` |
| `generador-datos-prueba` | Datos de prueba realistas (Markdown o CSV) | `output/datos-de-prueba/` |
| `generador-casos-api` | Casos de prueba de API (tabla resumen + detalle con JSON) a partir de contratos/endpoints | `output/casos-api/` |
| `ejecutor-e2e` | Ejecuta los casos/escenarios pedidos en el navegador con Playwright MCP (pregunta headed o headless), reporta con evidencia y genera el reporte HTML de la corrida | `output/ejecuciones/` |
| `ejecutor-api` | Ejecuta pruebas de API corriendo una colección de Postman con Newman y genera el reporte HTML de la corrida | `output/ejecuciones/` |
| `generador-reporte-html` | Arma el reporte HTML (dashboard en modo oscuro, con indicadores y gráficos) de una ejecución, a partir de sus resultados | `output/ejecuciones/` |
| `generador-reporte-cierre` | Informe de cierre de la ronda (resultados, bugs, recomendación go/no-go) como dashboard HTML en modo oscuro | `output/informes-cierre/` |

---

## Estándares de QA del proyecto

Estos principios aplican a **todos** los agentes:

- **No inventar.** Si falta información para hacer bien la tarea (un paso, un dato, una regla de negocio, un resultado esperado), el agente lo **marca y lo pregunta**; nunca rellena con suposiciones disfrazadas de hechos. Es preferible un artefacto con huecos señalados que uno completo pero inventado.
- **Respetar los formatos.** Los campos, su orden y sus valores permitidos los define la plantilla (o el script), no el agente.
- **Trazabilidad.** Todo artefacto referencia la historia (`HU-XXX`) o el contrato del que sale.
- **Cobertura pensada.** Los casos contemplan escenarios positivos, negativos, de borde y validaciones de campos, no solo el camino feliz.
- **Claridad.** Títulos descriptivos, pasos accionables y sin ambigüedad, lenguaje claro y profesional.

## Convenciones de IDs

- Historias de usuario: `HU-001`, `HU-002`, …
- Criterios de aceptación: `CA1`, `CA2`, … (dentro de cada historia)
- Casos de prueba manuales: `CP-001`, `CP-002`, …
- Casos de prueba de API: `CP-API-001`, `CP-API-002`, …
- Bugs: `BUG-001`, `BUG-002`, …

## Escalas

- **Severidad / Criticidad:** `Crítica` · `Alta` · `Media` · `Baja`
- **Prioridad:** `Crítica` · `Alta` · `Media` · `Baja`
- **Estado de un caso:** `N/A` · `Pendiente` · `En ejecución` · `Aprobado` · `Fallido` · `Bloqueado`

## Formato de tablas en los archivos `.md`

**Toda tabla de un `.md` debe verse alineada y con el mismo formato.** Para garantizarlo sin depender de armar cada tabla a mano:

1. Escribí las tablas como **Markdown normal** (`| col | col |`), en cualquier sección.
2. **Al terminar de escribir el `.md`, normalizá el archivo una vez:**

```bash
python scripts/formatear_tablas.py <archivo.md>
```

Convierte **todas** las tablas Markdown del archivo a tablas ASCII alineadas (dentro de bloques de código), sin importar la sección ni cuánto texto tengan. No toca lo que ya está en bloques de código, así que es seguro correrlo más de una vez.

Reglas (valen para **todos** los agentes y cualquier sección, incluidas las que armes sobre la marcha):

- Nunca dejes una tabla en Markdown crudo en el entregable: siempre pasá el `.md` por `formatear_tablas.py`.
- **Sin emojis dentro de las celdas** (descuadran el ASCII): usá texto (`Cubierto`, `Sí`, `No`, `Parcial`).
- Lo que es **código** (un body o response JSON) va en bloques ```` ```json ```` aparte; el normalizador no lo toca.
- Excepción: el `.md` de **casos de prueba** lo arma `scripts/generar_casos.py` (ya sale alineado, con el mismo estilo).

## Requisitos del entorno

**Python 3** lo usan los scripts que dan formato a las salidas. Instalan `openpyxl`/`tabulate` solo si faltan; o se instalan con `pip install -r requirements.txt`. Si falta una librería y no se puede instalar, el script avisa con un mensaje claro (no falla en silencio).

- `scripts/generar_casos.py` → arma la planilla `.xlsx` y el `.md` de casos de prueba. Acepta `--limpiar` para borrar su JSON de entrada al terminar (cross-platform, sin depender de `rm`).
- `scripts/formatear_tablas.py` → alinea las tablas de cualquier `.md` (lo usan todos los agentes que generan informes).

---

## Nombres de archivos de salida (sugerencia)

- Análisis de historia: `analisis-HU-001.md`
- Casos manuales: `casos-HU-001.xlsx` + `casos-HU-001.md` + `casos-HU-001-cobertura.md`
- Casos BDD: `HU-001-registro.feature` + `HU-001-cobertura.md`
- Reporte de bug: `BUG-001.md`
- Datos de prueba: `datos-HU-001.md` (o `.csv`)
- Casos de API: `casos-api-auth.md`
- Ejecución E2E (un reporte por corrida): `reporte-HU-001-<fecha-hora>.html` (dashboard, modo oscuro) + `_resultados-HU-001-<fecha-hora>.json` (datos), en `output/ejecuciones/`; evidencia en `output/ejecuciones/evidencia/`. Cada reporte cubre solo los casos de esa ejecución.

---

## Arquitectura (cómo crece el repo)

El repo se apoya en estas piezas: **agentes** (`.claude/agents/`, el quién), **skills** (`.claude/skills/`, el cómo, cargados on-demand), **MCP** (`.mcp.json`, conexiones a sistemas externos — un solo archivo que escala a muchas conexiones: Jira, Xray, Playwright…), **herramientas** (`herramientas/`, herramientas externas de testing como JMeter, una subcarpeta por herramienta) y **scripts** (`scripts/`, utilidades internas determinísticas). El detalle y cómo extender cada una está en `ARQUITECTURA.md`.

Secretos (tokens, credenciales): van en variables de entorno con `${VARIABLE}` o en un `.env` local (gitignored), **nunca** commiteados; hay una plantilla `.env.example`. El `.mcp.json` está versionado y trae la conexión a Playwright (sin secretos); `.mcp.json.example` es la plantilla para sumar conexiones con token (Jira, Xray…).





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
