import React, { useEffect, useState } from 'react'
// import connectDb from "../../middleware/mongoose";
import mongoose from 'mongoose'
// import Order from "../../models/Order";
import { useRouter } from 'next/router';

import Head from "next/head";
import Link from 'next/link';
const Orders = () => {
    const [orders, setOrders] = useState([])
    const router = useRouter();
    useEffect(() => {

        const fetchOrders = async () => {


            let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
            method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: localStorage.getItem('token') })
            })
            let res = await a.json()
            setOrders(res.orders);
        }

        if (!localStorage.getItem('token')) {
            router.push('/')
        }
        else {
            fetchOrders()
        }


    }, [])
    return (

        <div className='min-h-screen '>
            <Head><title>KnowledgeHub | Orders</title></Head>
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0"></div>
                    <table className="text-sm w-full   text-left rtl:text-right " >
                        <thead className="text-xs  text-gray-700 uppercase bg-gray-50  " >
                            <tr className="bg-gray-200 border-b      " >
                                <th scope="col" className="px-6 py-3">
                                    #Order Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    Details
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((item) => (
                                <tr key={item._id} className="bg-white border-b  hover:bg-gray-400 dark:hover:bg-gray-300">
                                    <td className="px-6 py-4">{item.orderId}</td>
                                    <td className="px-6 py-4">{item.email}</td>
                                    <td className="px-6 py-4">{item.status}</td>
                                    <td className="px-6 py-4">{item.amount}</td>
                                    <td className="px-6 py-4 text-blue-600 "><Link href={"/order?id=" + item._id}>View</Link></td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default Orders

