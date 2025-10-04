# 1er Parcial (MVP: navegación, listas, detalle, estado)
Guía móvil de La Paz: lugares turísticos, miradores, teleféricos, museos y rutas a pie. Explora por categorías, cercanía, favoritos y rutas con mapa.
## Requerimientos
### Navegación (Expo Router) – Tabs + Stack
### Catálogo (FlatList)
mínimo 25 lugares paceños (mock JSON):
id, nombre, categoria (Mirador, Teleférico, Museo, Mercado, Ruta), zona, breve, coverUri
### Filtros básicos (en memoria):
por categoría y zona.
Búsqueda por texto (nombre).

### Detalle de lugar:
Imagen, descripción extendida, horario (mock), tips de visita.
Botón “⭐ Favorito” (estado en memoria).
### Zustand:
- uiStore: theme (light/dark), tabIndex.
- lugaresStore: lugares[], toggleFavorito(id) (en memoria), filtros.  
### Estilos:
- Tokens (colores, spacing, fuente), tema light/dark.