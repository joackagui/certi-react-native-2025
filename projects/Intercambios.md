# 1er Parcial (Fundamentos de UI, rutas y estado)
Navegación con Expo Router (basado en React Navigation)
Tabs: Inicio, Mercado, Publicar (placeholder), Perfil (placeholder).
Stack en Mercado: MercadoList → ItemDetail.
## Listado principal (FlatList) de items de intercambio/venta(mín. 20 ítems):

## Detalle de Item:
 imagen/cover, título, categoría, tipo, estado, carrera, precio, descripción completa, alias del publicador y acciones:
## zustand 
store ui
store market 
store user 

![alt text](image.png)

## Objetivo del 2do Parcial
### Autenticación (Firebase Auth)
- Registro e inicio de sesión con email + password.
- Login con Google
- Flujo de sesión completo: splash/loading → (si token válido) Home, si no → Auth screens.
- Recuperar contraseña por email

### Publicación de ítems (venta/intercambio)

- Formulario con validaciones:
- imagen/cover (obligatoria), título, categoría (Libros, Electrónica, Ropa, Muebles, Otros), tipo (Venta | Intercambio), estado (Nuevo | Como nuevo | Usado), carrera (Sistemas, Industrial, etc.), precio (si tipo = Venta), descripción.
- Al publicar, crea doc status="pending" (requiere aprobación admin).
- Carga de imagen a Storage (miniatura + original recomendado).
- Editar/Borrar propios ítems si status!="sold".
### Moderación (rol admin)

- Modal/Pantalla Moderación accesible solo para admin (toggle en Perfil).
- Pendientes (FlatList): Aprobar → pasa a feed; Rechazar → elimina/archiva (guardar reason opcional).
- Log de moderación : subcolección moderationLogs.
### Mercado (feed aprobado) con calidad producción

- FlatList paginada (infinite scroll) por createdAt desc.
- Tarjetas: cover, título, precio o “Intercambio”, fecha relativa (“hace 2 h”), badges de categoría/estado/carrera.
- Búsqueda + filtros avanzados:
    -   Texto (título/descr), categoría, tipo, estado, carrera, rango de precio, solo disponibles (no vendidos).
    - Favoritos por usuario (persistentes).
- ItemDetail: muestra todo + acciones (Contactar, Favorito, Reportar).
### Chat y ofertas (comprador ↔ vendedor)

#### Mensajería por ítem:
- Iniciar chat desde ItemDetail → crea chats/{chatId} (vendedor + comprador).
- Ofertas: mensajes con tipo offer y monto en Bs; vendedor puede aceptar/rechazar.
- Al aceptar oferta, item pasa a status="reserved" (y opcional sold cuando confirmen).
