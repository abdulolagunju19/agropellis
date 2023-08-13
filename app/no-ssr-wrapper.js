import dynamic from 'next/dynamic';
import React from 'react';

//force child to be rendered on client side
const NoSSRWrapper = props => ( 
    <React.Fragment>{props.children}</React.Fragment> 
) 
export default dynamic(() => Promise.resolve(NoSSRWrapper), { 
    ssr: false 
})