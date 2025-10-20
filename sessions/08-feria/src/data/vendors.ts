import { Vendor } from '../types';

export const VENDORS: Vendor[] = [
    {
        id: '1',
        name: 'Baratito Moda',
        lat: -16.523286,
        lng: -68.111872,
        category: 'Ropa',
        imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=60',
        description: 'Prendas urbanas y clásicas a precios feriantes con tallas para todos.',
        schedule: {
            openTime: '08:30 am',
            closedTime: '06:30 pm'
        }
    },
    {
        id: '2',
        name: 'Motores Altiplano',
        lat: -16.525786,
        lng: -68.109172,
        category: 'Autos',
        imageUrl: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=600&q=60',
        description: 'Autos importados y repuestos con financiamiento feriante.',
        schedule: {
            openTime: '09:00 am',
            closedTime: '05:30 pm'
        }
    },
    {
        id: '3',
        name: 'Juguetelandia Andina',
        lat: -16.524186,
        lng: -68.112372,
        category: 'Juguetes',
        imageUrl: 'https://images.unsplash.com/photo-1506045412240-22980140a405?auto=format&fit=crop&w=600&q=60',
        description: 'Juguetes educativos y recreativos con ofertas por temporada.',
        schedule: {
            openTime: '10:00 am',
            closedTime: '06:00 pm'
        }
    },
    {
        id: '4',
        name: 'Fauna Altura',
        lat: -16.524986,
        lng: -68.111072,
        category: 'Animales',
        imageUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=60',
        description: 'Mascotas pequeñas, accesorios y alimento balanceado.',
        schedule: {
            openTime: '08:00 am',
            closedTime: '04:30 pm'
        }
    },
    {
        id: '5',
        name: 'Celular Express',
        lat: -16.523886,
        lng: -68.108372,
        category: 'Celulares',
        imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=60',
        description: 'Smartphones liberados, accesorios y servicio técnico inmediato.',
        schedule: {
            openTime: '09:30 am',
            closedTime: '07:00 pm'
        }
    },
    {
        id: '6',
        name: 'Muebles Sajama',
        lat: -16.525886,
        lng: -68.109972,
        category: 'Muebles',
        imageUrl: 'https://images.unsplash.com/photo-1505692794403-34d4982c62f7?auto=format&fit=crop&w=600&q=60',
        description: 'Comedores y dormitorios en madera boliviana con entrega el mismo día.',
        schedule: {
            openTime: '08:45 am',
            closedTime: '06:15 pm'
        }
    }
];
