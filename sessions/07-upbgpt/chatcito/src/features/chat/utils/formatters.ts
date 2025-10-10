const timeFormatter = new Intl.DateTimeFormat('es-ES', {
  hour: '2-digit',
  minute: '2-digit',
});

const dateFormatter = new Intl.DateTimeFormat('es-ES', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
});

export const formatTime = (timestamp: number) => timeFormatter.format(new Date(timestamp));

export const formatDateLabel = (timestamp: number) => dateFormatter.format(new Date(timestamp));
