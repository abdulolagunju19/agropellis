"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import useCart from './(store)/store'

export default function ProductCard(props){
    const { product } = props
    const { id: price_id, unit_amount: cost, product: productInfo} = product
    const { name, description } = productInfo

    // on-click handler routes us to a new page
    const router = useRouter()

    const setProduct = useCart(state => state.setProduct)

    function onProductClick (){
        const newProduct = {
            name, 
            description,
            price_id,
            cost, 
            productInfo
        }
        setProduct({ newProduct })
        router.push('/product?price_id=' + price_id)
    }

    return(
        <div onClick={onProductClick} className='flex flex-col shadow bg-black hover:shadow-lg cursor-pointer'>
            <img src={productInfo.images[0]} alt={name} className='w-full h-full object-cover rounded-md'/>
            <div className='flex flex-col gap-2 p-4'>
                <h3 className='flex items-center justify-between'>{name}</h3>
                <p>${cost/100}</p>
                <p className='text-sm'>{description}</p>
            </div>
        </div>
    )
}