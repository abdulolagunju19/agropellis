import { create } from 'zustand';
import { persist } from 'zustand/middleware'


const useCart = create(
    persist(
        (set, get) => ({
        cart: [],
        product: {},
        openModal: false,
        setOpenModal: (params) => {
            set((state) => {
                return {
                    ...state,
                    openModal: !state.openModal
                }
            })
        },
        setProduct: (params) => {
            const { newProduct } = params
            set((state) => {
                return{
                    ...state,
                    product: newProduct
                }
            })
        },
        addItemtoCart: (params) => {
            const { newItem } = params
            set((state) => {
                const newCart = [...state.cart, newItem]
                return{
                    ...state, 
                    cart: newCart
                }
            })
        },
        removeItemFromCart: (params) => {
            const { price_id } = params
            set ((state) => {
                const newCart = state.cart.filter((product) => {
                    return product.price_id != price_id
                })
                return{
                    ...state,
                    cart: newCart
                }
            })
        },
        emptyCart: () => {
            set ((state) => {
                const newCart = []
                return{
                    ...state,
                    cart: newCart
                }
            })
        }
    }),
    {
        name: 'farm-storage'
    }
    )
)

export default useCart;