import React from "react";
import Link from "next/link";

export default function SuccessPage() {
    return(
        <div>
            <div className="flex flex-col">
                <div>
                    <h1>The transaction was successful.</h1>
                </div>
                <Link href={'/'}>Return Home</Link> 
            </div>
        </div>
    )
}