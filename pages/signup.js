import React, { useEffect } from 'react'
import logo from "../public/logo.png"
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import Head from "next/head";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
const Signup = () => {
    const router = useRouter()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push('/')
        }
    }, [])
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        if (e.target.name == 'name') {
            setName(e.target.value);
        }
        else if (e.target.name == 'email') {
            setEmail(e.target.value);
        }
        else if (e.target.name == 'password') {
            setPassword(e.target.value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = { name: name, email, password }
        let res = await fetch(`http://localhost:3000/api/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        let response = await res.json()
        // console.log(response);
        setEmail('')
        setName('')
        setPassword('')
        toast.success("welcome " + name + " 🙃", { autoClose: 1000 })
        setTimeout(() => {
            router.push('/login')
        }, 1000)
    }

    return (
        <div>
            <ToastContainer />
            <Head><title>KnowledgeHub | Signup</title></Head>
            <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
                <div className="mt-16  sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image className='mx-auto' src={logo} alt="" style={{ height: "4rem", width: "6rem" }}></Image>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up for your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                            <div className="mt-2">
                                <input value={name} onChange={handleChange} id="name" name="name" type="text" autoComplete="name" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input value={email} onChange={handleChange} id="email" name="email" type="email" autoCmplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            </div>
                            <div className="mt-2">
                                <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6" />
                            </div>


                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600">Sign up</button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already a member?
                        <Link href="/login" className="font-semibold leading-6 text-yellow-600 hover:text-yellow-500"> Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup
