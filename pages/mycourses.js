import Mycourse from '../models/Mycourses';
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import mongoose from "mongoose";
import { useRouter } from 'next/router';
import Link from 'next/link';

function Mycourses({ mycourses }) {
  const router = useRouter()
  const [email, setEmail] = useState("");

  useEffect(() => {
    let useremail = localStorage.getItem('email');
    if (useremail) {
      setEmail(useremail);
      router.replace({
        pathname: router.pathname,
        query: { email: useremail }
      });
    }
  }, []);

  return (
    <>
      <div>
        <Head>
          <link href='https://fonts.googleapis.com/css?family=Nunito' />
          <title>KnowledgeHub | MyCourses</title>
          <link rel="icon" href="/icon.ico" type="image/x-icon" />
        </Head>
      </div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-12 mx-auto">
          <h1 className="text-2xl font-bold mt-10 mb-2">My Courses</h1>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center">
            {mycourses.map((k) => (
              <Link passHref={true} key={k._id} href={`/lectures/${k._id}`}>
                <div className="group border-spacing-2 rounded-lg border shadow-2xl overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105">
                  <img loading="lazy"  src={k.img}  alt=""   className="w-full h-full object-fill"  style={{ height: "12rem" }}/>
                  <div className="mt-4">
                    <h2 className="text-gray-900 px-1 title-font text-lg font-medium">{k.title}</h2>
                    <h4 className="text-gray-500 px-1 text-xs tracking-widest title-font mb-1">{k.brand}</h4>

                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
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

  const email = context.query.email || null;

  let mycourses = await Mycourse.find({ email });

  return {
    props: { mycourses: JSON.parse(JSON.stringify(mycourses)) }
  };
}

export default Mycourses;
