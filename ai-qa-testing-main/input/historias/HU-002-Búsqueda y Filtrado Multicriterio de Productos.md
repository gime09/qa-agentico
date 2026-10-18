# Historia de Usuario: HU-002 - Búsqueda y Filtrado Multicriterio de Productos

**Como** cliente de ToolShop,  
**Quiero** filtrar el catálogo por texto, categorías, marcas, rango de precios y sostenibilidad,  
**Para** localizar rápidamente las herramientas específicas que deseo comprar.

---

## Contexto y Precondiciones
* El usuario se encuentra en la página principal (`/`) o catálogo general.
* Existen productos con diferentes atributos (Categorías: Hand Tools, Power Tools; Marcas: ForgeFlex, MightyCraft; Estado: En stock / Agotado; Sostenibilidad: ecológicos).
* Endpoint backend: `GET /products` y `GET /products/search`.

---

## Criterios de Aceptación

### CA-1: Búsqueda por Texto y Botón Limpiar (Clear)
* **Dado que** el usuario ingresa un término en el campo de búsqueda (ej: "Hammer" o "Pliers"),
* **Cuando** presiona el botón "Buscar",
* **Entonces** el catálogo debe actualizarse mostrando únicamente los productos cuyo título contenga la palabra buscada (coincidencia insensible a mayúsculas/minúsculas).
* **Y** al hacer clic en el botón amarillo "X", el campo de búsqueda debe vaciarse y el catálogo debe restablecerse al listado completo.

### CA-2: Filtro por Categorías y Marcas (Selección Múltiple)
* **Dado que** el usuario visualiza el panel lateral izquierdo de filtros,
* **Cuando** selecciona un checkbox de categoría (ej: `Hand Tools > Hammer`) o marca (ej: `ForgeFlex Tools`),
* **Entonces** la grilla debe recargarse automáticamente mostrando únicamente los productos que pertenezcan a las opciones seleccionadas.

### CA-3: Filtro por Rango de Precios
* **Dado que** el slider de precios tiene un rango de $1 a $200,
* **Cuando** el usuario ajusta el valor máximo a $15,
* **Entonces** el catálogo no debe mostrar ningún producto cuyo precio unitario sea superior a $15.00.

### CA-4: Indicador de Producto Agotado
* **Dado que** un producto no tiene stock disponible (stock = 0),
* **Cuando** se lista en los resultados,
* **Entonces** la tarjeta debe mostrar la etiqueta visual en rojo "Agotado" y no debe permitir agregarlo al carrito.

### CA-5: Sin Resultados de Búsqueda
* **Dado que** el usuario aplica filtros o busca un término inexistente (ej: "xyz_herramienta_no_existe"),
* **Cuando** se procesa la consulta,
* **Entonces** la grilla debe mostrar el mensaje informativo "There are no products found." y la API debe responder `200 OK` con un array `data: []` vacío.