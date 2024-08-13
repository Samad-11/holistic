import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Variant {
    id: string;
    name: string;
    price: number;
    inStock: boolean;
    images: string[];
}

interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    brand: string;
    salesCount: number;
    variant: Variant[];
}

export interface CartItem {
    product: Product;
    variant: Variant;
    quantity: number;
}

interface CartState {
    cart: CartItem[];
    totalItems: number;
    totalPrice: number;
    addToCart: (product: Product, variant: Variant, quantity: number) => void;
    removeFromCart: (productId: string, variantId: string) => void;
    increaseQuantity: (productId: string, variantId: string, number: number) => void;
    decreaseQuantity: (productId: string, variantId: string, number: number) => void;
    clearCart: () => void;
}

const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],
            totalItems: 0,
            totalPrice: 0,
            addToCart: (product, variant, quantity) =>
                set((state) => {
                    const existingItem = state.cart.find(
                        (item) =>
                            item.product.id === product.id && item.variant.id === variant.id
                    );

                    let updatedCart;
                    if (existingItem) {
                        updatedCart = state.cart.map((item) =>
                            item.product.id === product.id && item.variant.id === variant.id
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        );
                    } else {
                        updatedCart = [...state.cart, { product, variant, quantity }];
                    }

                    const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
                    const totalPrice = updatedCart.reduce(
                        (sum, item) => sum + item.variant.price * item.quantity,
                        0
                    );

                    return { cart: updatedCart, totalItems, totalPrice };
                }),
            removeFromCart: (productId, variantId) =>
                set((state) => {
                    const updatedCart = state.cart.filter(
                        (item) =>
                            item.product.id !== productId || item.variant.id !== variantId
                    );

                    const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
                    const totalPrice = updatedCart.reduce(
                        (sum, item) => sum + item.variant.price * item.quantity,
                        0
                    );

                    return { cart: updatedCart, totalItems, totalPrice };
                }),
            increaseQuantity: (productId, variantId, number) =>
                set((state) => {
                    const updatedCart = state.cart.map((item) =>
                        item.product.id === productId && item.variant.id === variantId
                            ? { ...item, quantity: item.quantity + number }
                            : item
                    )
                    const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
                    const totalPrice = updatedCart.reduce(
                        (sum, item) => sum + item.variant.price * item.quantity,
                        0
                    );
                    return { cart: updatedCart, totalItems, totalPrice };
                }),
            decreaseQuantity: (productId, variantId, number) =>
                set((state) => {
                    const updatedCart = state.cart.map((item) =>
                        item.product.id === productId && item.variant.id === variantId && item.quantity > 1
                            ? { ...item, quantity: item.quantity - number }
                            : item
                    );
                    const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
                    const totalPrice = updatedCart.reduce(
                        (sum, item) => sum + item.variant.price * item.quantity,
                        0
                    );
                    return { cart: updatedCart, totalItems, totalPrice };
                }),
            clearCart: () =>
                set({ cart: [], totalItems: 0, totalPrice: 0 }),
        }),
        {
            name: 'cart-storage', // Name of the storage item
            storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
        }
    )
);

export default useCartStore;
