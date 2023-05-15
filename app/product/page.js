"use client"

import useCart from "../(store)/store"
import { useEffect } from "react"

export default function ProductPage(props){
    const { searchParams } = props
    const { price_id } = searchParams
    
    const product = useCart(state => state.product)
    const addItemtoCart = useCart(state => state.addItemtoCart)

    const { cost, productInfo, description, name} = product

    if (!product?.name) {
        useEffect(() => {
            window.location.href = '/'
        }, [])
    }

    function handleAddToCart(){
        const newItem = {
            quantity: 1,
            price_id, 
            name,
            cost
        }
        addItemtoCart({ newItem })
    }

    return(
        <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[1000px] mx-auto">
                <div className="md:p-2 md:shadow">
                    <img src={productInfo.images[0]} alt={name} className="w-full h-full object-cover rounded-md" />
                </div>
                <div className="flex flex-col gap-2 p-4">
                    <div className="flex text-xl md:flex-col md:items-start items-center justify-between gap-2">
                        <h3>{name}</h3>
                        <p className="md:text-base">${cost/100}</p>
                    </div>
                    <p className="flex-1 text-sm">{description}</p>
                    <button onClick={handleAddToCart} className="bg-slate-700 text-white hover:bg-slate-500 cursor-pointer ml-auto order px-4 py-2">Add to Cart</button>
                </div>
            </div>
        </div>
    )
}