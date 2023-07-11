export type TUser = {
    id: string
    name: string
    email: string
    password: string
    createdAt: string
}

export type TProducts = {
    id: string
    name: string
    price: number
    description: string
    imageUrl: string
}

export type TPurchaseProduct = {
    id: string;
    quantity: number;
};

export function isProductsPurchase(items: any): items is TPurchaseProduct[] {
    return Array.isArray(items) && items.every(item => item && typeof item.id === 'string' && typeof item.quantity === 'number');
}