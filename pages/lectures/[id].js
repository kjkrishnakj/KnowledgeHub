import { useRouter } from 'next/router'
import React, { useState } from 'react'
import mongoose from "mongoose";
import Error from 'next/error'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lecture from '../../models/Lecture';
import Head from 'next/head';
import Link from 'next/link';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Course from '../../models/Course';

const Post = ({ error, lecture, thumb, course }) => {
    const router = useRouter();
    const { slug } = router.query


    return (
        <>
            <Head>
                <link href='https://fonts.googleapis.com/css?family=Nunito' />
                <title>{`KnowledgeHub | ${thumb.title}`}</title>
                <link rel="icon" href="/icon.ico" type="image/x-icon" />
            </Head>
            <section className="text-gray-600 body-font overflow-hidden">
                <ToastContainer />
                <div className="container px-5 py-14 mx-auto">
                   
                    <div className="lg:w-4/5 mx-auto flex flex-wrap justify-end">
                        <img src={thumb.img} alt="" className="shadow-2xl border-spacing-2 border border-yellow-400  rounded-lg " style={{ height: "16rem", width: "20rem", margin: "auto" }} />
                       
                        <div className="lg:w-2/3 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h1 className="text-2xl font-bold mt-1 mb-2">Lectures</h1>

                            <div className="flex flex-wrap justify-end">
                                {lecture.map((k) => (
                                    <div key={k._id} className="group mt-2 border-spacing-2 rounded-lg border shadow-2xl overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105 w-full md:w-1/2 lg:w-full">
                                        <a href={k.video} target="_blank" rel="noopener noreferrer">
                                            {/* <video controls className="w-full object-contain "  style={{height:"4rem",width:"8rem"}} poster={k.img}>
                                                <source src={k.video} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video> */}

                                            <div className="group border-spacing-2 rounded-lg border shadow-2xl overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105 flex items-center">
                                                <img src={k.img} alt="" className="shadow-2xl rounded-lg object-fill" style={{ height: "4rem", width: "8rem" }} />
                                                <span className="ml-4">{k.title}: {k.slug}</span>
                                            </div>

                                        </a>

                                        <hr />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                </div>
            </section>

        </>
    );
};

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }

    let lecture = await Lecture.find({ title: context.query.id });
    if (!lecture) {
        return {
            props: { error: 404 }
        }
    }
    let thumb = await Lecture.findOne({  title: context.query.id });

    return {
        props: { lecture: JSON.parse(JSON.stringify(lecture)), thumb: JSON.parse(JSON.stringify(thumb)) }

    }

}

export default Post;
