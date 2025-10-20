import { Category } from '../types';

export type CategoryFilter = {
    name: Category;
    active: boolean;
};

export const CATEGORIES: CategoryFilter[] = [
    { name: 'Ropa', active: false },
    { name: 'Autos', active: false },
    { name: 'Juguetes', active: false },
    { name: 'Animales', active: false },
    { name: 'Celulares', active: false },
    { name: 'Muebles', active: false }
];
