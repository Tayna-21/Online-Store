import { Product } from '../interfaces';

export const countTotalQuantity = (array: Product[]) => {
    const quantity = array.reduce((acc, item) => acc + item.quantity, 0)

    return quantity;
};

export const countTotalPrice = (array: Product[]) => {
    const price = array.reduce((acc, item) => acc + (item.quantity * item.price), 0);

    return price.toFixed(2);
}

export const countGrandTotalPrice = (x: number, y: number, z: number): string => {
    const sum = x + y + z

    return sum.toFixed(2);
}