import connectDb from "../../middleware/connectDb";
import MyCourses from "../../models/MyCourses";
import Course from "../../models/Course"; 
import jsonwebtoken from "jsonwebtoken";
import mongoose from "mongoose";

const handler = async (req, res) => {
    // const { item } = req.body; // Assuming item is passed in the request body
    const { email, item } = req.query;


    try {
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }
        console.log("id= ",item);
        const itemId = new mongoose.Types.ObjectId(item);
        const course = await Course.findById(itemId);

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        const myCourse = new MyCourses({
            brand: course.brand,
            email: email,
            title: course.title,
            slug: Date.now().toString(36),
            descr: course.descr,
            img: course.img,
        });

        // Save MyCourses object to MongoDB
        await myCourse.save();

        // Respond with success message
        res.status(200).json({ message: "Course added successfully" });
    } catch (error) {
        console.error("Error adding course:", error);
        res.status(500).json({ error: "Server error" }); // Generic server error response
    }
};

export default connectDb(handler);
