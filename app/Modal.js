"use client"
import React from 'react'
import ReactDom from 'react-dom'
import { useState, useEffect } from 'react'

import useCart from './(store)/store'

export default function Modal(){
    // wait until the DOM is ready using useEffect, and then you call createPortal, fixes issue of TARGET CONTAINER IS NOT A DOM ELEMENT ERROR
    const [domReady, setDomReady] = useState(false)

    const closeModal = useCart(state => state.setOpenModal)
    const cartItems = useCart(state => state.cart)
    
    useEffect(() => {
        setDomReady(true)
    }, [])

    console.log(cartItems)
    return (
        domReady ?
        ReactDom.createPortal(
                <div className='fixed top-0 left-0 w-screen h-screen z-50'>
                    <div onClick={closeModal} className='bg-transparent absolute inset-0'></div>
                        <div className='flex flex-col bg-black absolute right-0 tip-0 h-screen shadow-lg w-screen
                        sm:w-96 max-w-screen gap-4'>
                            <div className='flex items-center p-6 justify-between text-xl relative'>
                                <h1>Cart</h1>
                                <i onClick={closeModal} className="fa-solid cursor-pointer hover:opacity-60 fa-xmark"></i>
                                <div className='absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px]
                                bg-slate-300 w-2/3'></div>
                            </div>
                            <div>
                                {cartItems.length === 0 ? (
                                    <p>There is nothing in your cart.</p>
                                ) : (
                                    <>
                                        {cartItems.map((cartItem, itemIndex) => {
                                            return(
                                                <div key={itemIndex}>
                                                    <p>{cartItem.name}</p>
                                                </div>
                                            )
                                        })
                                        }
                                    </>
                                )}
                            </div>
                        </div>
                </div>,
                document.getElementById('portal')
        ) : null
    )
}