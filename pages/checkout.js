import React, { useCallback, useState } from 'react'
import Link from 'next/link'
import pincodes from '../pinodes.json'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Head from 'next/head';
import Script from 'next/script';


const Checkout = ({ user, cart, addToCart, removeFromCart, ClearCart, SubTotal, products }) => {


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [disabled, setDisabled] = useState(true);


  const vname = () => {

    if (myform.name.value.match(/[0-9]/g)) {
      toast.error("Enter valid name🥲", { autoClose: 1000 });
      setName('')
    }
  }

  const vemail = () => {
    if (!myform.email.value.endsWith("@gmail.com") || myform.email.value.startsWith("@gmail.com")) {
      toast.error("Enter valid email🥲", { autoClose: 1000 });
      setEmail('')
    }
  }
  const vpin = () => {
    if (!myform.pincode.value.match(/[0-9]/g)) {
      toast.error("Enter valid pincode🥲", { autoClose: 1000 });
      setPincode('')
    }
  }

  const vphone = () => {
    if (!myform.phone.value.match(/[0-9]/g)) {
      toast.error("Enter valid phone🥲", { autoClose: 1000 });
      setPhone('')
    }
  }

  const vpincode = () => {
    if (!myform.pincode.value.match(/[0-9]/g) || !Object.keys(pincodes).includes(pincode)) {
      toast.error("Either pincode is invalid or not serviceable!🥲", { autoClose: 1000 });
      setPincode('')
    }
  }


  const handleChange = async (e) => {



    if (e.target.name == 'name') {
      setName(e.target.value);
    }

    else if (e.target.name == 'email') {
      setEmail(e.target.value);
    }

    else if (e.target.name == 'address') {
      setAddress(e.target.value);
    }

    else if (e.target.name == 'city') {
      setCity(e.target.value);
    }

    else if (e.target.name == 'state') {
      setState(e.target.value);
    }

    else if (e.target.name == 'phone') {
      setPhone(e.target.value);
    }

    else if (e.target.name == 'pincode') {
      setPincode(e.target.value);
      if (e.target.value.length == 6) {

        let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
        let pinJson = await pins.json()
        if (Object.keys(pinJson).includes(e.target.value)) {
          setState(pinJson[e.target.value][0])
          setCity(pinJson[e.target.value][1])
        }
      }
      else {
        setState('')
        setCity('')
      }
    }

    setTimeout(() => {

      if (name.length > 3 && address.length > 3 && pincode.length > 3 && phone.length > 3) {
        setDisabled(false)
        // toast.error("Please fill the details", { autoClose: 1000 })

      }
      else {
        setDisabled(true)

      }
    }, 100)

  }


  const intiatePayment = async () => {




    let oid = Math.floor(Math.random() * Date.now());

    const data = { cart, SubTotal, oid, email: email, name, address, pincode, phone }


    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    let txnRes = await a.json();
    // console.log(txnRes);
    if (txnRes.success) {
      let txnToken = txnRes.txnToken
      var config = {
        "root": "",
        "flow": "DEFAULT",
        "data": {
          "orderId": oid, 
          "token": txnToken,  
          "tokenType": "TXN_TOKEN",
          "amount": SubTotal    
        },
        "handler": {
          "notifyMerchant": function (eventName, data) {
            console.log("notifyMerchant handler function called");
            console.log("eventName => ", eventName);
            console.log("data => ", data);
          }
        }
      };

      window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
        // after successfully updating configuration, invoke JS Checkout
        window.Paytm.CheckoutJS.invoke();
      }).catch(function onError(error) {
        console.log("error => ", error);
      });

    }
    else {
      toast.error(txnRes.error, { autoClose: 1000 })
      // localStorage.removeItem('cart')
      ClearCart()
    }

  }
  return (
    <div>
      <ToastContainer />
      <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
      <title>Amikart | Checkout</title></Head>

      <Script type="application/javascript" src={`${process.env.NEXT_PUBLIC_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} crossorigin="anonymous">

      </Script>



      <div className="mb-6">
        <div className="flex flex-col mb-10 items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        </div>
        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
          <div className="px-4 pt-8">
            <p className="text-xl font-medium">Order Summary</p>
            <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>

            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">

              <ol className="list-decimal">
                {Object.keys(cart).length == 0 && <div className="my-4 text-xl">Cart is Empty!</div>
                }
                {Object.keys(cart).map((k) => {
                  return <li key={k}>
                    <div className="flex flex-col rounded-lg bg-white sm:flex-row">

                      <img src={cart[k].img} alt="" className="m-2 h-24 w-28 rounded-md  object-cover object-center" style={{}}></img>

                      <div className="flex w-full flex-col px-4 py-4">
                        <div className="font-semibold">{cart[k].name}</div>
                        <div className="text-gray-500">{cart[k].variant}</div>
                        <p className="mt-auto text-lg font-bold">₹{cart[k].price}</p>
                      </div>

                      <div className="w-1/3 flex items-center justify-center">
                        <i onClick={() => {
                          removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].variant)
                        }} className="fa-solid fa-square-minus cursor-pointer mx-3"></i>  {cart[k].qty} <i onClick={() => {
                          addToCart(k, 1, cart[k].price, cart[k].name, cart[k].variant)
                        }} className="fa-solid fa-square-plus mx-3 cursor-pointer"></i>
                      </div>
                    </div>

                  </li>
                })}

              </ol>
            </div>


          </div>

          <div className=" bg-gray-100 px-4 pt-8 lg:mt-10 ">
            <p className="text-xl font-medium">Delivery Details</p>
            <p className="text-gray-400">Complete your order by providing your delivery details.</p>



            <form className="max-w-md my-4 mx-auto " name='myform'>
              <div className="relative z-0 w-full mb-5 group" >
                <input onBlur={vname} onChange={handleChange} value={name} style={{ color: 'black' }} type="text" name="name" id="name" className="block py-2.5 px-0  w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">Full Name</label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                {user.value ?
                  <input readOnly={true} value={localStorage.getItem('email')} style={{ color: 'black' }} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  : <input onBlur={vemail} onChange={handleChange} value={email} style={{ color: 'black' }} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                }<label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">Email address</label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input onChange={handleChange} value={address} style={{ color: 'black' }} type="text" name="address" id="address" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="address" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">Address</label>
              </div>

              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <input onBlur={vphone} onChange={handleChange} value={phone} style={{ color: 'black' }} type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">Phone number</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input onBlur={vpincode} onChange={handleChange} value={pincode} style={{ color: 'black' }} type="text" name="pincode" id="pincode" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="pincode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">Pincode</label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <input value={state} style={{ color: 'black' }} readOnly={true} type="text" name="state" id="state" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="state" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">State</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input value={city} style={{ color: 'black' }} readOnly={true} type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7">City</label>
                </div>
              </div>
            </form>


            {<div className="">
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Subtotal</p>
                  <p className="font-semibold text-gray-900">₹{SubTotal}</p>
                </div>
              </div>
              <div className="mt-2  border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Shipping Charges</p>
                  <p className="font-semibold text-gray-900">₹50</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900">₹{SubTotal + 50}</p>
              </div>
            </div>}
            {/* <Link href={'/checkout'}><button disabled={disabled} onClick={intiatePayment} className="mt-4 mb-8 w-full disabled:bg-gray-600 rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button> */}
            {/* {(Object.keys(pincodes)).includes(pincode) ?
              <Link href={'/orders'}><button disabled={disabled} onClick={intiatePayment} className="mt-4 mb-8 w-full disabled:bg-indigo-400  bg-indigo-600 border-0 rounded-md hover:bg-indigo-700 px-6 py-3 font-medium text-white">Place Order</button>
              </Link> : <Link href={'/checkout'}><button disabled={disabled} onClick={intiatePayment} className="mt-4 mb-8 w-full disabled:bg-indigo-400  bg-indigo-600 border-0 rounded-md hover:bg-indigo-700 px-6 py-3 font-medium text-white">Place Order</button>
              </Link>  } */}
              <Link href={'/orders'}><button disabled={disabled} onClick={intiatePayment} className="mt-4 mb-8 w-full disabled:bg-indigo-400  bg-indigo-600 border-0 rounded-md hover:bg-indigo-700 px-6 py-3 font-medium text-white">Place Order</button>
              </Link>
          </div>
        </div>



      </div >
    </div >
  )
}
export default Checkout

 