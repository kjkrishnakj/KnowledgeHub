import Course from '../models/Course';
import Link from 'next/link'
import React from 'react'

function Relevant({courses}) {
  return (
    <div>
        <section className="text-gray-600 body-font">
        <div className="container px-5 py-12 mx-auto">
          <h1 className="text-2xl font-bold mt-1 mb-2">Featured Courses</h1>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center">
            {courses.map((k) => (
              <Link passHref={true} key={k._id} href={`/product/${k.slug}`}>
                <div className="group border-spacing-2 rounded-lg border shadow-2xl overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105">
                  <img
                    src={k.img}
                    alt=""
                    className="w-full h-full object-fill"
                    style={{ height: "12rem" }}
                  />
                  <div className="mt-4">
                    <h2 className="text-gray-900 px-1 title-font text-lg font-medium">{k.title}</h2>
                    <h4 className="text-gray-500 px-1 text-xs tracking-widest title-font mb-1">{k.brand}</h4>
                    <p className="mt-1 mb-1 px-1">₹{k.price}</p>
                    <h4 className={`text-white ${k.tag ? 'bg-orange-600' : ''} inline-block pt-1 px-1 m-2 text-xs tracking-widest title-font`}>{course.tag}</h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI);
    }
  
    let courses = await Course.find();
  
    return {
      props: { courses: JSON.parse(JSON.stringify(courses)) }
    };
  }
  

export default Relevant
