# 1er Parcial (MVP: navegación, listas, detalle, estado)
App central para estudiantes UPB: horario, eventos del campus, anuncios/noticias, clubes, servicios (biblioteca, trámites) y perfil.

## Requisitos 
### Home (resumen): 
tarjetas con próximos eventos, últimos anuncios, y “hoy en tu horario”.

### Eventos (FlatList): 
mín. 20 items (mock local /src/data), filtros básicos por campus/categoría (en memoria).
### Campos evento: 
id, titulo, fecha, hora, campus, lugar, categoria, breve, coverUri.

#### Anuncios (FlatList): 
mín. 15 items (mock), búsqueda por texto (en memoria).

### Detalle: 
imagen, descripción completa, fecha/hora, campus, “Me interesa” (like en memoria).

### Horario (mock): 
tabla simple de materias del semestre (L–V), solo visual. (Para siguiente se usara por carrera ir pensando como manejarlo)

### Zustand:

uiStore: theme (light/dark), campusSeleccionado, tabIndex.

contentStore: eventos[], anuncios[], toggleInterested(id).

### Estilos:

Tokens (colores/espaciado/tipografía), tema light/dark funcional.

