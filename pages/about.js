import React from 'react';
import Head from "next/head";

const About = () => {
  return (
    <div className='min-h-screen text-gray-700' style={{ fontSize: "0.45cm" }}>
      <div className="container py-24">
        <div className="lg:w-4/5 mx-auto">
          <Head><title>KnowledgeHub | About</title></Head>
          <h1 className="flex justify-center text-center text-yellow-500" style={{ fontSize: "1cm", alignItems: "center" }}>About KnowledgeHub</h1>
          <p>Welcome to KnowledgeHub, your ultimate destination for online learning. At KnowledgeHub, we offer a wide range of courses across various disciplines, taught by experienced faculty members.</p>
          <p>Our mission is to empower learners by providing high-quality education, flexible learning plans, and exceptional support to help you achieve your academic and professional goals.</p>
          <p>Whether you are looking to enhance your skills, switch careers, or pursue a new hobby, we have got you covered. Explore our extensive course catalog and find the perfect program to suit your needs.</p>
          <br />
          <p className="text-yellow-600" style={{ fontSize: "0.5cm", fontWeight: "bold" }}>Why Choose KnowledgeHub?</p>
          <ul>
            <li>Comprehensive Course Catalog: We offer a diverse range of courses from various fields, ensuring that you will find the right program for your interests and career goals.</li>
            <li>Expert Faculty: Our courses are taught by experienced instructors and industry professionals who are passionate about teaching and sharing their knowledge.</li>
            <li>Flexible Learning Plans: We offer multiple subscription plans to suit different budgets and learning preferences, making education accessible to everyone.</li>
            <li>Quality Assurance: All our courses undergo rigorous quality checks to ensure that you receive the best learning experience possible.</li>
            <li>Interactive Learning: Engage with our interactive course materials, participate in discussions, and collaborate with fellow learners to enhance your learning experience.</li>
            <li>Secure Platform: Study with confidence knowing that your personal information is safe and secure with our encrypted platform.</li>
            <li>Responsive Support: Our dedicated support team is available to assist you with any questions or concerns, ensuring a smooth and enjoyable learning experience.</li>
          </ul>
          <br />
          <p>Thank you for choosing KnowledgeHub for your online learning journey!</p>
        </div>
      </div>
    </div>
  );
};

export default About;
