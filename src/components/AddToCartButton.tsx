
'use client'
import { Product2, Variant2 } from '@/lib/types'
import useCartStore from '@/store/cartStore'
import { FaBasketShopping } from 'react-icons/fa6'

const AddToCartButton = ({ inStock, variant, product, quantity }: { inStock: boolean, product: Product2, variant: Variant2, quantity: number }) => {
    const { addToCart } = useCartStore()

    const handleAddToCart = () => {
        addToCart(product, variant, quantity)
    }
    return (
        <button
            onClick={e => { e.stopPropagation(); handleAddToCart() }}
            disabled={
                inStock === false
            }
            className='btn btn-block btn-primary text-white'>
            <FaBasketShopping />
            <span>
                {
                    inStock === false ? "Out Of Stock" : "Add to cart"
                }
            </span>
        </button>
    )
}

export default AddToCartButton