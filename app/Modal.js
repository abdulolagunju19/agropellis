"use client"
import React from 'react'
import ReactDom from 'react-dom'
import { useState, useEffect } from 'react'

export default function Modal(){
    // wait until the DOM is ready using useEffect, and then you call createPortal, fixes issue of TARGET CONTAINER IS NOT A DOM ELEMENT ERROR
    const [domReady, setDomReady] = useState(false)

    useEffect(() => {
        setDomReady(true)
    })
    return domReady ?
    ReactDom.createPortal(
            <div>Modal</div>,
            document.getElementById('portal')
    ) : null
}