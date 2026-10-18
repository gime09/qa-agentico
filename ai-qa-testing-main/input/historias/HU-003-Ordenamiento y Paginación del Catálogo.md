# Historia de Usuario: HU-003 - Ordenamiento y Paginación del Catálogo

**Como** cliente de ToolShop,  
**Quiero** ordenar el listado de productos y navegar entre diferentes páginas,  
**Para** explorar cómodamente el catálogo según mis preferencias de precio y orden alfabético.

---

## Contexto y Precondiciones
* El catálogo contiene más de 9 productos registrados en la base de datos.
* Endpoint backend: `GET /products?page={n}&sort={criterio}`.

---

## Criterios de Aceptación

### CA-1: Paginación de Productos
* **Dado que** el catálogo muestra un máximo de 9 productos por página,
* **Cuando** el usuario hace clic en el botón de página "2" o en la flecha siguiente (`»`),
* **Entonces** la grilla debe mostrar los siguientes 9 productos, el botón "2" debe marcarse como activo (fondo azul) y la URL debe actualizarse con el parámetro `page=2`.

### CA-2: Criterios de Ordenamiento (Sorting)
* **Dado que** el usuario abre el selector desplegable "Ordenar",
* **Cuando** elige una de las siguientes opciones:
  * `Nombre (A - Z)`: Los productos se ordenan alfabéticamente ascendente.
  * `Nombre (Z - A)`: Los productos se ordenan alfabéticamente descendente.
  * `Precio (Menor a Mayor)`: El primer producto debe ser el de menor valor monetario.
  * `Precio (Mayor a Menor)`: El primer producto debe ser el de mayor valor monetario.
* **Entonces** la grilla debe reorganizarse de inmediato respetando el criterio seleccionado sin perder los filtros activos.

### CA-3: Persistencia de Filtros al Paginar
* **Dado que** el usuario tiene aplicado un filtro (ej: Categoría `Pliers`),
* **Cuando** navega a la página 2 de resultados,
* **Entonces** los productos mostrados en la página 2 deben seguir perteneciendo exclusivamente a la categoría `Pliers`.