import Image from 'next/image'
import Stripe from 'stripe'

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
  const products = await getStripeProducts()
  console.log(products)
  
  return (
    <main className='p-4'>
     Welcome to the Agriculture Store!
    </main>
  )
}

