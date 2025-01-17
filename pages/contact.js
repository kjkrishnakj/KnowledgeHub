import { useRouter } from 'next/router';
import React from 'react'

import Head from "next/head";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const router = useRouter();
  const submit = () => {
      
    toast.success("Thanks for your Feedback", { autoClose: 1000 })
    router.push(process.env.NEXT_PUBLIC_HOST)
  }
  return (

    <>
      <div className='min-h-screen text-gray-700 ' style={{ fontSize: "0.45cm" }}>
        <Head><title>KnowldegeHub | Contact</title></Head>
        <ToastContainer />
        <div className="container py-24 ">
          <section className="bg-white ">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900  ">Contact Us</h2>
              <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
              <form action="#" className="space-y-8">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                  <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:border-yellow-700 dark:placeholder-gray-400   dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@gmail.com" required />
                </div>
                <div>
                  <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 ">Subject</label>
                  <input type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500  dark:border-yellow-700 dark:placeholder-gray-400   dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 ">Your message</label>
                  <textarea id="message" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500  dark:border-yellow-700 dark:placeholder-gray-400   dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                </div>
                <button type="submit" onClick={submit} className="mt-4 mb-8 w-full disabled:bg-yellow-400  bg-yellow-600 border-0 rounded-md hover:bg-yellow-700 px-6 py-3 font-medium text-white">Send message</button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </>
  )


}

export default Contact
