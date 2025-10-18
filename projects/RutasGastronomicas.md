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