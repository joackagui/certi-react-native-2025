import { Vendor } from '../types'

export const VENDORS: Vendor[] = [
    {
        id: '1',
        name: 'baratito',
        lat: 123123123,
        log: 23423423423,
        category: 'Ropa',
        imageUrl: 'https://example.com/image1.jpg',
        description: 'Tienda de ropa barata y de buena calidad.',
        schedule: {
            openTime: '09:00 am',
            closedTime: '06:00 pm'
        }
    },
    {
        id: '2',
        name: 'autitos',
        lat: 123123123,
        log: 23423423423,
        category: 'Autos',
        imageUrl: 'https://inkscape.app/wp-content/uploads/imagen-vectorial.webp',
        description: 'Venta de autos nuevos y usados.',
        schedule: {
            openTime: '09:00 am',
            closedTime: '06:00 pm'
        }
    },
    {
        id: '3',
        name: 'jugueteria',
        lat: 123123123,
        log: 23423423423,
        category: 'Juguetes',
        imageUrl: 'https://inkscape.app/wp-content/uploads/imagen-vectorial.webp',
        description: 'Los mejores juguetes para niños de todas las edades.',
        schedule: {
            openTime: '09:00 am',
            closedTime: '06:00 pm'
        }
    }
];