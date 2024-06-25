import pincodes from '../pinodes.json'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Head from "next/head";
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const MyAccount = ( ) => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // const [user, setUser] = useState({value:null});
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
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
  
  const vcpassword = () => {
    if (password != cpassword) {
      toast.error("confirm password must match with password!🥲", { autoClose: 1000 });
      setCpassword('')
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

    else if (e.target.name == 'password') {
      setPassword(e.target.value);
    }

    else if (e.target.name == 'cpassword') {
      setCpassword(e.target.value);
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
    // console.log(password,cpassword);
    
    setTimeout(() => {
      //pending do verifu pass and cpass
      if (name.length > 3 && address.length > 3 && pincode.length > 3 && phone.length > 3 ) {
        setDisabled(false)
        // toast.error("Please fill the details", { autoClose: 1000 })

      }
      else {
        setDisabled(true)

      }
    }, 100)

  }
 
  // useEffect(()=>{
  //   const user = JSON.parse(localStorage.getItem('token'))
  //   if(!user){
  //     router.push('/')
  //     console.log("hjeheh");
  //   }
  //   if(user && user.token){
  //     console.log("hjeheh");
  //     setUser(user)
  //     // setEmail(user.email)
  //   }
  // },[])
  useEffect(() => {
    const token = localStorage.getItem('token');
    // if (!token) {
    //     router.push('/');
    //     console.log("Token not found in localStorage.");
    // } else {
    //     setUser(token);
    //     // setEmail(user.email); // Uncomment this line if needed
    // }
    setEmail(localStorage.getItem('email'))
    // fetchData(token)
}, []);
useEffect(()=>{
  // fetchData(localStorage.getItem('token'))
},[router.query])


const fetchData  =async(token)=>{
  let data = {token:token,name,address,phone,pincode}
  // console.log("user "+data);
  console.log("data + "+JSON.stringify(data));
  let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  let res = await a.json();
  console.log(res);
  // toast.success("Details Updated successfully 👍",{autoClose:1000})
  setName(res.name);
  setAddress(res.address);
  setPincode(res.pincode);
  setPhone(res.phone);

}

  // console.log(user);
  const handleUserSubmit = async()=>{
    let data = {email,name,address,phone,pincode}
  // console.log("user "+data);
  console.log("data + "+JSON.stringify(data));
  let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  let res = await a.json();
  console.log(res);
  toast.success("Details Updated successfully 👍",{autoClose:1000})
  setName(res.name);
  setAddress(res.address);
  setPincode(res.pincode);
  setPhone(res.phone);
  }


  return (
    <div>
      <ToastContainer />
<Head><title>Amikart | Account</title></Head>
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="container px-5 py-12 mx-auto">
          <div className="w-full mx-auto flex flex-wrap">
            <div className=" w-full  lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="font-semibold  text-gray-800 flex items-center justify-center" style={{fontSize:"1cm"}}>My Account</h2>
              <p className="text-gray-500 mb-6 flex items-center justify-center">Your details help us make your experience better</p>

              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Personal Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <form className="  " name='myform'>
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        
                      <div className="md:col-span-5">
                        <label htmlFor="name">Full Name</label>
                        <input onBlur={vname} onChange={handleChange} value={name} type="text" name="name" id="name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor="email">Email Address</label>
                        <input defaultValue={email} readOnly={true} type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="email@domain.com" />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="password">Password</label>
                        <input value={password} onChange={handleChange} type="password" name="password" id="password" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="cpassword">Confirm Password</label>
                        <input value={cpassword} onBlur={vcpassword} onChange={handleChange} type="password" name="cpassword" id="cpassword" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"  />
                      </div>

                      <div className="md:col-span-1">
                        <label htmlFor="phone">Phone</label>
                        <input onBlur={vphone} onChange={handleChange} value={phone} type="text" name="phone" id="phone" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                      </div>
                      <div className="md:col-span-5">
                        <label htmlFor="address">Address / Street</label>
                        <input onChange={handleChange} value={address} type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                      </div>




                      <div className="md:col-span-1">
                        <label htmlFor="pincode">Pincode</label>
                        <input onBlur={vpincode} onChange={handleChange} value={pincode} type="text" name="pincode" id="pincode" className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="state">State</label>
                        <input onChange={handleChange} value={state} type="text" name="state" id="state" className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="city">City</label>
                        <input onChange={handleChange} value={city} type="text" name="city" id="city" className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" />
                      </div>





                      <div className="md:col-span-5 text-right">
                        <Link href={'/'}><button disabled={disabled} onClick={handleUserSubmit}  className="mt-4 mb-8 w-full disabled:bg-indigo-400  bg-indigo-600 border-0 rounded-md hover:bg-indigo-700 px-6 py-3 font-medium text-white">Submit</button>
                        </Link>
                      </div>

                    </div>
                    </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  )
}

export default MyAccount
