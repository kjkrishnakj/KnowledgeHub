import pic1 from "../public/photos/study-4k-g0vgp5a29nsp25hu.jpg";
import webdev from "../public/photos/webdev.jpg";
import data_analysis from "../public/photos/data_analysis.jpg";
import cloud from "../public/photos/cloud.webp";
import powerbi from "../public/photos/powerbi.png";
import python from "../public/photos/python.jpg";
import excel from "../public/photos/excel.jpg";
import frontend from "../public/photos/frontend.jpg";

import Course from "../models/Course";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";
import mongoose from "mongoose";

export default function Home({ courses }) {
  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/getcourses');
      console.log("hehe");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      <Head>
        <link href='https://fonts.googleapis.com/css?family=Nunito' />
        <title>KnowledgeHub | Home</title>
      </Head>

      <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center">
      {courses.map((course) => (
        <Link passHref={true} key={course._id} href={`/courses/${course.slug}`}>
          <div className="border-spacing-2 border shadow-2xl">
            <img src={course.img} alt="" className="w-full h-full object-fill shadow-2xl" style={{ height: "12rem" }} />
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
