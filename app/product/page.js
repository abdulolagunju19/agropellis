"use client";

import { useState, useEffect } from "react";

import useCart from "../(store)/store";
import NoSSRWrapper from "../no-ssr-wrapper";

export default function ProductPage(props){

    //store the product on the cache to avoid refresh page error
    const [localStorageImage, setLocalStorageImage] = useState('');
    const { searchParams } = props;
    const { price_id } = searchParams;

    const product = useCart(state => state.product);

    const addItemtoCart = useCart(state => state.addItemtoCart);
    const removeItemFromCart = useCart(state => state.removeItemFromCart);

    const { cost, description, name } = product;

    //make sure that we can access local storage key value database called farm-storage (created in app/(store)/store.js)
    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
          setLocalStorageImage(JSON.parse(localStorage.getItem('farm-storage')).state.product.productInfo.images[0]);
        }
      }, []);

    function handleAddToCart(){
        const newItem = {
            quantity: 1,
            price_id, 
            name,
            cost
        }
        addItemtoCart({ newItem })
    };

    function handleRemoveFromCart(){
        removeItemFromCart({ price_id })
    };

    return(
    <NoSSRWrapper>
        <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[1000px] mx-auto">
                <div className="md:p-2 md:shadow">
                    <img src={localStorageImage} alt={name} className="w-full h-full object-cover rounded-md" />
                </div>
                <div className="flex flex-col gap-2 p-4">
                    <div className="flex text-xl md:flex-col md:items-start items-center justify-between gap-2">
                        <h3>{name}</h3>
                        <p className="md:text-base">${cost/100}</p>
                    </div>
                    <p className="flex-1 text-sm">{description}</p>
                    <button onClick={handleAddToCart} className="bg-slate-700 text-white hover:bg-slate-500 cursor-pointer ml-auto order px-4 py-2">Add to Cart</button>
                    <button onClick={handleRemoveFromCart} className="bg-slate-700 text-white hover:bg-slate-500 cursor-pointer ml-auto order px-4 py-2">Remove from Cart</button>
                </div>
            </div>
        </div>
    </NoSSRWrapper>
    )
}