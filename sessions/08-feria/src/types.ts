export type Category = 
    "Ropa" 
    | "Autos"
    | "Juguetes"
    | "Animales" 
    | "Celulares" 
    | "Muebles";

export type Schedule = {
    openTime: string;
    closedTime: string;
}
export type Vendor = {
    id: string;
    name: string;
    lat: number;
    lng: number;
    category: Category;
    schedule: Schedule;
    description: string;
    imageUrl?: string;
    liked?: boolean;
}

export type User = {
    uid: string;
    email: string;
    role: string;
}

export type LocationCoord = { latitude: number; longitude: number; };
