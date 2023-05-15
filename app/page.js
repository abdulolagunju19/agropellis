import Image from 'next/image'
import Stripe from 'stripe'
import ProductCard from './ProductCard'

async function getStripeProducts() {
  // backup for an empty string; initialize stripe inside of this function
  const stripe = new Stripe(process.env.STRIPE_SECRET ?? '', {
    apiVersion: '2020-08-27'
  })

  // pass object into list function
  const res = await stripe.prices.list({
    expand : ['data.product']
  })

  // access all of our products in variable called prices
  const prices = res.data
  return prices
} 

export default async function Home() {
  // pulled in asynchronously before page gets rendered, data loaded very quickly, no client side rendering, server side rendering
  // const products = getStripeProducts() returns a promise
  const products = await getStripeProducts()
  // console.log(products)
  
  return (
    <main className='p-4 flex flex-col'>
      <h1 className='p-4'>Welcome to the Agropellis! Buy any of the fruits and vegetables you
      desire! We understand that food and skin have an intimate relationship...learn how your diet can
      influence your skin!</h1>
      <div className='max-w-[1000px] w-full mx-auto grid grid-cols-1 
      sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {(products.map((product, productIndex) => {
            return(
              <ProductCard key={productIndex} product={product} />
            )
        }))}
     </div>
    </main>
  )
}

