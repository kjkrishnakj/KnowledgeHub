import Course from "../models/Course";
import Head from "next/head";
import Image from "next/image";
import Carousel from '../components/Carousel';
import { useEffect } from "react";
import Link from "next/link";
import mongoose from "mongoose";
import Plan from "../components/Plan";

export default function Home({ courses }) {
  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/getcourses');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // console.log(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);
// console.log(`$(process.env.JWT_SECRET)`);

  return (
    <>
      <Head>
        <link href='https://fonts.googleapis.com/css?family=Nunito' />
        <title>KnowledgeHub | Home</title>
        <link rel="icon" href="/icon.ico" type="image/x-icon" />
      </Head>

      <div>
        <Carousel/>
      </div>

      <hr className=" mx-60  mt-14 border-yellow-500" />

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-12 mx-auto">
          <h1 className="text-2xl font-bold mt-1 mb-2">Featured Courses</h1>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center">
            {courses.map((course) => (
              <Link passHref={true} key={course._id} href={`/product/${course.slug}`}>
                <div className="group border-spacing-2 rounded-lg border shadow-2xl overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105">
                  <img
                    src={course.img}
                    alt=""
                    className="w-full h-full object-fill"
                    style={{ height: "12rem" }}
                  />
                  <div className="mt-4">
                    <h2 className="text-gray-900 px-1 title-font text-lg font-medium">{course.title}</h2>
                    <h4 className="text-gray-500 px-1 text-xs tracking-widest title-font mb-1">{course.brand}</h4>
                    <p className="mt-1 mb-1 px-1">₹{course.price}</p>
                    <h4 className={`text-white ${course.tag ? 'bg-orange-600' : ''} inline-block pt-1 px-1 m-2 text-xs tracking-widest title-font`}>{course.tag}</h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <hr className=" mx-60 mt-14 border-yellow-500" />

      <Plan/>

    </>
  );
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect("mongodb://localhost:27017/he", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  let courses = await Course.find();

  return {
    props: { courses: JSON.parse(JSON.stringify(courses)) }
  };
}
