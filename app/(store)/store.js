import { create } from 'zustand';
import { persist } from 'zustand/middleware'

// Define a custom hook named 'useCart' using Zustand
const useCart = create(
    // Applying 'persist' middleware to persist state across sessions
    persist(
        (set, get) => ({
        // Initial state properties
        cart: [],
        product: {},
        openModal: false,
        // Function to toggle the 'openModal' state
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
        // Function to remove an item from the 'cart' state
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