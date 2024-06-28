import Mycourse from '../models/Mycourses';
import Head from 'next/head'
import React from 'react'
import mongoose from "mongoose";


function mycourses() {
  // console.log(localStorage.getItem('email'));
  return (
    <>
    <div>
        <Head>
        <link href='https://fonts.googleapis.com/css?family=Nunito' />
        <title>KnowledgeHub | MyCourses</title>
        <link rel="icon" href="/icon.ico" type="image/x-icon" />
      </Head>
    </div>
    <div></div>

    </>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect("mongodb://localhost:27017/he", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  const { email } = context.query;
  console.log("email ",email);  

  let mycourses = await Mycourse.find();
  console.log(mycourses);

  return {
    props: { mycourses: JSON.parse(JSON.stringify(mycourses)) }
  };  
}

export default mycourses
