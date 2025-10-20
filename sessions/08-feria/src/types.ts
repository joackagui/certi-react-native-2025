export type Category =
  | "Ropa"
  | "Autos"
  | "Juguetes"
  | "Animales"
  | "Celulares"
  | "Muebles"
  | "Comida"
  | "Tecnología"
  | "Deportes";

export type Schedule = {
  openTime: string;
  closedTime: string;
};
export type Vendor = {
  id: string;
  name: string;
  lat: number;
  log: number;
  favorite: boolean;
  category: Category;
  schedule: Schedule;
};

export type LocationCoord = { latitude: number; longitude: number };
