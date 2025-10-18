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

## Objetivo del 2do Parcial
### Autenticación (Firebase Auth)
- Registro e inicio de sesión con email + password.
- Login con Google
- Flujo de sesión completo: splash/loading → (si token válido) Home, si no → Auth screens.
- Recuperar contraseña por email
### Datos reales (Firestore + Storage)

- eventos (ya no mock), estado status: "draft|approved|canceled".
- anuncios (aprobados + programables con publishAt).
- users/{uid}: perfil (alias, campus, carrera, notificación push).
- users/{uid}/intereses/{eventoId}: marca “Me interesa” (persistente).
- (Opcional) clubs y servicios (estático editable por admin).
- Covers en Firebase Storage (events/yyyy/mm/… y announcements/yyyy/mm/…).
### Home “dinámico”

-    Tarjetas: Próximos eventos (por campus del usuario), Últimos anuncios, Hoy en tu horario.
-   Botones rápidos: “Ver todos”, “Mi campus”, “Mi horario”.

### Eventos

-   FlatList con filtros server + cliente:

-   Campus (obligatorio), categoría (charlas, deportes, cultural, académico…), intervalo de fechas (hoy/semana/mes).

-   Detalle: cover, descripción, fecha/hora, campus, lugar (link a Maps), Me interesa (persistente), RSVP opcional (going|maybe|no).

-   Recordatorio: notificación local 1h antes si “Me interesa”

### Anuncios

- FlatList con búsqueda por texto (server titleLower prefijo + cliente).
- Soporte de programación: mostrar si publishAt <= now y status="approved".
- Detalle: cover opcional, contenido extendido, tags/campus.