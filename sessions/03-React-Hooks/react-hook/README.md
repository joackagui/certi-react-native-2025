# Demo de Hooks en React (Web)

Este proyecto Vite reemplaza el template inicial por un laboratorio de hooks centrado en `useState` y `useEffect` aplicado al navegador. Ideal para mostrar en clase cómo traducir los ejemplos de React Native a la Web sin perder los conceptos clave.

## Qué encontrarás

- `src/App.tsx`: dashboard que coordina timers, listeners y registros de eventos.
- `src/components/MoodTracker.tsx`: simula lecturas asincrónicas y mantiene historial con `useState`/`useEffect`.
- `src/components/CountdownTimer.tsx`: controla intervalos y sincroniza efectos (limpieza al desmontar).
- `src/components/SessionNotes.tsx`: persiste texto en `localStorage` usando un hook personalizado.
- `src/components/NetworkStatusBadge.tsx` y `src/components/VisibilityIndicator.tsx`: escuchan eventos del navegador (online/offline, visibilitychange).
- `src/hooks/*`: colección de hooks reutilizables (`useCounter`, `useLocalStorageState`, `useDocumentVisibility`, `useNetworkStatus`).

## Cómo usarlo en clase

1. Instala dependencias: `npm install`.
2. Arranca el proyecto: `npm run dev`.
3. Abre el dashboard y demuestra cada bloque resaltando:
   - Limpieza de efectos (`setInterval`, `setTimeout`).
   - Sincronización con APIs del navegador (visibilidad, red, `localStorage`).
   - Separación de estado derivado con `useMemo` y `useCallback`.
4. Propón adaptar los mismos patrones al ejemplo de React Native para reforzar la transferencia de conocimiento.

> Tip: abre las DevTools en la pestaña "Application" para mostrar cómo cambian los datos en `localStorage` en tiempo real.
