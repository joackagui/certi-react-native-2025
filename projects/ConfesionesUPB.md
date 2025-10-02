## 1er Parcial (MVP: feed, envío, moderación local)

### Requerimientos (obligatorios)

#### Navegación (React Navigation / Expo Router):

**Tabs:** Feed, Nueva, Perfil (placeholder).

**Stack en Feed:** FeedList → ConfesionDetail.

**Modal Admin:** pantalla “Moderación” accesible desde Perfil (toggle “Modo admin”).

#### Enviar Confesión (anonimato)

**Formulario:** texto (min 10, max 500), categoría (Amor/Académico/Random), imagen opcional (Image).

Al enviar, la confesión entra a “Pendientes” (no aparece en el feed hasta aprobar).

#### Moderación (admin)

**Pantalla “Pendientes”** (FlatList) con acciones Aprobar / Rechazar.

Al Aprobar, pasa al Feed; al Rechazar, se elimina.

**Feed** (aprobadas)

**FlatList con tarjetas**: texto truncado (3 líneas), categoría, fecha relativa (“hace 2 h”), contador de likes (en memoria).

**Tap** → ConfesionDetail muestra el contenido completo.

#### Zustand

**confesionesStore**: pendientes[], aprobadas[], addPendiente, approve(id), reject(id), toggleLike(id).

**uiStore**: isAdmin, theme.

#### Estilos

Tokens básicos: colores, tipografías, spacing; tema light/dark simple.

Validaciones & UX

Deshabilitar “Enviar” si no cumple mínimo de texto.

Placeholder para imagen si no hay.

### Entregables

Pantallas: FeedList, ConfesionDetail, NuevaConfesion, Perfil, Moderacion.

Datos mock (semillas) en /src/data/seed.ts para pruebas.