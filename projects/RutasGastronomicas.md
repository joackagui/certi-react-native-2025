## 1er Parcial (Fundamentos de UI, rutas y estado)
### Requerimientos (obligatorios)

#### Navegación con React Navigation:

**Tabs**: Inicio, Platos, Favoritos (placeholder), Perfil (placeholder).

**Stack en Platos**: PlatosList → PlatoDetail.

**Listado principal (FlatList)** de platos paceños (mín. 20 ítems):

Campos: id, nombre, precioReferencial, zona (Miraflores/Sopocachi/El Alto/…),
picUri, descripcionCorta, picosidad (0–5).

**Detalle de Plato**: imagen, descripción, precio referencial, picosidad.

#### Zustand:

**store ui**: theme (light/dark), tabIndex.

**store catalog**: platos, setPlatos, toggleFavorito(id) (en memoria).

#### Estilos:

Design tokens (espaciados, tipografías, colores).

Tema light/dark (al menos colores de fondo/textos).

Búsqueda básica (por nombre) y filtro por zona (en memoria).

## Entregables

Pantallas: Home, PlatosList, PlatoDetail, Favoritos (placeholder), Perfil (placeholder).

Mock data local (/src/data/platos.json).

README con setup y mapa de rutas.

## Objetivo del 2do Parcial
### Autenticación (Firebase Auth)
- Registro e inicio de sesión con email + password.
- Login con Google
- Flujo de sesión completo: splash/loading → (si token válido) Home, si no → Auth screens.
- Recuperar contraseña por email

### Datos reales (Firestore + Storage)

- Colección platos (ya no mock-only):
- 20+ platos paceños con zona, picosidad, precioReferencial y geo aproximada de su zona.
- Favoritos por usuario: users/{uid}/favoritos/{platoId}.
- Fotos: subir a Firebase Storage; picUri ahora es un downloadURL o picPath.
- Paginación en PlatosList (infinite scroll por createdAt desc).

### Mapa y zonas

-   Vista Mapa (tab dentro de Platos o en Home): markers por zona (centroides).
-   En detalle: botón “Ver en mapa” que abre Google Maps con query del lugar típico.

### Favoritos persistentes + contador

⭐ en tarjeta/detalle actualiza subcolección de favoritos por usuario.

Contador de favoritos (en doc platos con FieldValue.increment) — opcional.

### Moderación (rol admin)

-   status: draft | approved | rejected en platos.
-   Admin puede aprobar/rechazar; usuarios sólo crear sugerencias de platos nuevos.

### Búsqueda + filtros (server + memoria)
    
-   Búsqueda por nombre (prefijo simple con startAt/endAt o filtrar en cliente tras una página).
-   Filtro por zona y por picosidad (rango 0–5).