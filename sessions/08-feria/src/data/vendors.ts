import { Vendor } from "../types";

export const VENDORS: Vendor[] = [
  {
    id: "1",
    name: "baratito",
    lat: 40.4168, // Madrid, España
    log: -3.7038,
    category: "Ropa",
    favorite: false,
    schedule: {
      openTime: "09:00 am",
      closedTime: "06:00 pm",
    },
  },
  {
    id: "2",
    name: "autitos",
    lat: 48.8566, // París, Francia
    log: 2.3522,
    category: "Autos",
    favorite: true,
    schedule: {
      openTime: "09:00 am",
      closedTime: "06:00 pm",
    },
  },
  {
    id: "3",
    name: "jugueteria",
    lat: 52.5200, // Berlín, Alemania
    log: 13.4050,
    category: "Juguetes",
    favorite: false,
    schedule: {
      openTime: "09:00 am",
      closedTime: "06:00 pm",
    },
  },
  {
    id: "4",
    name: "pasteleria dulce vida",
    lat: 45.4642, // Milán, Italia
    log: 9.19,
    category: "Comida",
    favorite: true,
    schedule: {
      openTime: "08:00 am",
      closedTime: "07:00 pm",
    },
  },
  {
    id: "5",
    name: "tecno store",
    lat: 51.5072, // Londres, Reino Unido
    log: -0.1276,
    category: "Tecnología",
    favorite: false,
    schedule: {
      openTime: "10:00 am",
      closedTime: "08:00 pm",
    },
  },
  {
    id: "6",
    name: "vintage vibes",
    lat: 52.3676, // Ámsterdam, Países Bajos
    log: 4.9041,
    category: "Ropa",
    favorite: true,
    schedule: {
      openTime: "10:00 am",
      closedTime: "06:00 pm",
    },
  },
];
