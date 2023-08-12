import React from "react";
import Link from "next/link";

export default function CancelPage() {
    return(
        <div className="flex flex-col">
            <h1>The transaction was not successful.</h1>
            <div>
            <Link href={'/'}>Return Home</Link> 
            </div>
        </div>
    )
}