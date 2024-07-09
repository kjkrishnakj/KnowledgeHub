import connectDb from "../../middleware/connectDb";
import MyCourses from "../../models/Mycourses";
import Course from "../../models/Course"; 
import mongoose from "mongoose";
import Mycourses from "../../models/Mycourses";

const handler = async (req, res) => {
    const { email } = req.body;
    const {item} = req.body;

    try {
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }
        
        // console.log("email = ",email);
        // console.log("title = ",item);
        // console.log(course);
        const course = await Course.findOne({title:item});
        const checkcourse = await Mycourses.findOne({title:item});
        
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        if(checkcourse){
            return res.status(201).json({ error: "Course already exist" });
        }

        else{

        const myCourse = new MyCourses({
            brand: course.brand,
            email: email,
            title: course.title,
            slug: Date.now().toString(36),
            descr: course.descr,
            img: course.img,
        });

        await myCourse.save();

        res.status(200).json({ message: "Course added successfully" });}
    } catch (error) {
        console.error("Error adding course:", error);
        res.status(500).json({ error: "Server error" });  
    }
};

export default connectDb(handler);
