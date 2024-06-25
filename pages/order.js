import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import mongoose from 'mongoose'
import Order from "../models/Order"

import Head from "next/head";
const MyOrder = ({ cart, addToCart, order, removeFromCart, ClearCart, SubTotal }) => {
  const router = useRouter()
  const products = order.products;
  console.log(order);
  useEffect(() => {

    if (router.query.clearCart == 1) {
      ClearCart()
    }
  })
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <Head><title>KnowledgeHub | Order</title></Head>
        <div className="container px-5 py-24 mx-auto">
          <div className="w-full mx-auto flex flex-wrap">
            <div className=" w-full  lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">{ }</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order Id - #{order.orderId}</h1>
              <p className="leading-relaxed text-green-600 mb-4">Yay! Your order has been succesfully placed.</p>
              <p className="leading-relaxed text-green-600 mb-4">  Your Payment status : Payment {order.status} </p>
              <div className="flex mb-4">
                <a className="flex-grow border-b-2 text-center border-gray-300 py-2 text-lg px-1">Description</a>
                <a className="flex-grow border-b-2 text-center border-gray-300 py-2 text-lg px-1">Quantity</a>
                <a className="flex-grow border-b-2 text-center border-gray-300 py-2 text-lg px-1">Total</a>
                <a className="flex-grow border-b-2 text-center border-gray-300 py-2 text-lg px-1">Image</a>
              </div>


              {Object.keys(products).map((key) => (
                <div key={key} className="flex justify-center border-b-2 border-gray-200 py-2">
                  <p className=" text-gray-500" style={{ width: "7cm" }}>{products[key].name} ({products[key].variant})</p>
                  <p className="ml-auto px-7 text-gray-500">{products[key].qty}</p>
                  <p className="ml-auto px-7 text-gray-500">{products[key].qty} X {products[key].price} = ₹{products[key].price * products[key].qty}</p>
                  <p className="ml-auto  mb-4 h-24 w-28 rounded-md  object-cover object-center "><img src={products[key].img} alt="" /></p>
                </div>
              ))}

              <div className="flex flex-col mt-4">
                <span className="title-font font-medium  text-2xl text-gray-900">Total : ₹{order.amount}</span>
                <div className="my-5">
                  <button className="flex  text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Track order</button>

                </div>
              </div>
            </div>
            {/* <Image src={samsunggalaxys24plus} alt="" style={{ height: "26rem", width: "25rem" }}></Image> */}

          </div>
        </div>
      </section>
    </div>
  )
}



export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }


  let order = await Order.findById(context.query.id)
  // console.log(context.query.id);

  return {
    props: { order: JSON.parse(JSON.stringify(order)) }
  }
}
export default MyOrder
