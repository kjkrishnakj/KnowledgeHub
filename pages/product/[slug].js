import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import mongoose from "mongoose";
import Error from 'next/error'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Course from '../../models/Course'; 
const Post = ({ addToCart,error, course,buyNow }) => {
    
    const router = useRouter();
    const { slug } = router.query
     
    const [pin, setPin] = useState()
    const [service, setService] = useState()
   
    const checkService = async () => {
        let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
        let pinJson = await pins.json()
        if (Object.keys(pinJson).includes((pin))) {
            toast.success("Pincode is Serviceable!",{autoClose:1000,position:'bottom-center'})
            setService(true)
        } else {
            toast.error("sorry! Pincode is not Serviceable",{autoClose:1000,position:'bottom-center'})
            setService(false)

        }
    }
    const onChangepin = (e) => {
        setPin(e.target.value)
    }

    if(error==404){ 
        return<Error statusCode={404}/>
    }
    return <>
        <section className="text-gray-600 body-font overflow-hidden">
           <ToastContainer/>

            <div className="container px-5 py-14 mx-auto">
                <div className="lg:w-4/5 mx-auto flex  flex-wrap">
              
                    <img src={course.img} alt="" className="shadow-2xl border border-yellow-500 border-4 rounded-lg" style={{ height: "16rem", width: "25rem", margin: "5rem 0rem" }}></img>
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest"> </h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1"> {course.title}</h1>
                        <div className="flex mb-4">
                            <span className="flex items-center">
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <span className="text-gray-600 ml-3">4 Reviews</span>
                            </span>
                            <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                <a className="text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                    </svg>
                                </a>
                                <a className="text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                    </svg>
                                </a>
                                <a className="text-gray-500">
                                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                    </svg>
                                </a>
                            </span>
                        </div>
                        <p className="leading-relaxed">{course.descr}</p>
                        
                        <div className="flex">
                            {course.availableQty<=0?<span className="title-font font-medium text-2xl text-gray-900">Out Of Stock!</span>:
                            <span className="title-font font-medium text-2xl text-gray-900">₹{course.price}</span>}
                            <button onClick={() => { buyNow(slug, 1, course.price, course.title, course.color,course.img) }} disabled={course.availableQty <=0 ? true:false} className="flex ml-10 disabled:bg-yellow-500 text-white  bg-yellow-400 border-0 py-2 px-2 focus:outline-none hover:bg-yellow-700 rounded">Buy now</button>
                            <button onClick={() => { addToCart(slug, 1, course.price, course.title, course.color,course.img) }} disabled={course.availableQty <=0 ? true:false} className="flex ml-4 disabled:bg-yellow-500 text-white bg-yellow-400 border-0 py-2 px-2 focus:outline-none hover:bg-yellow-700 rounded">Add to Cart</button>
                            <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="pin my-5 flex">
                            <input type="text" onChange={onChangepin} placeholder='Enter Pincode' className=" flex px-2 border-2 border-blue-500  rounded-lg" />
                            <button onClick={checkService} className="flex ml-2 text-white bg-yellow-400 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-700 rounded">Check</button>

                        </div>
                        {!service && service != null && <div className='text-red-900 text-sm mt-3'>
                            Sorry! We do not deliver to this pincode
                        </div>}

                        {service && service != null && <div className='text-green-900 text-sm mt-3'>
                            Yay! This pincode is serviceable
                        </div>}
                    </div>
                </div>
            </div>
        </section >
    </>
}

export default Post


export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect("mongodb://localhost:27017/he");
    }


    let course = await Course.findOne({ slug: context.query.slug })
    let error=null;
    if(course==null){
        return {
            props: {error:404}
        }
    }
    
    return {
        props: {error:error, course: JSON.parse(JSON.stringify(course)) }
    }
}
