export function generarToken() {
  const random = Math.random().toString(36).substring(2)
  const fecha = Date.now().toString(36);
  return random + fecha;
}

export function generarRandomNames():string {
  const names = ['Victor Torres', 'Roxana Martinez', 'Hector Valdez', 'Cecil Perez'];
  const randomIndex = Math.floor(Math.random() * names.length);
  return names[randomIndex];
}

export function formatearCantidad(cantidad: string) {
  return new Intl.NumberFormat('es-HN', {
    style: 'currency',
    currency: 'HNL',
  }).format(Number(cantidad));
}