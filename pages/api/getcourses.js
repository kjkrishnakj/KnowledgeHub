import Course from "../../models/Course";
import connectDb from "../../middleware/connectDb";

const handler = async (req, res) => {
    try {
        // Fetch all courses from the database
        let courses = await Course.find();
        
        // Log the fetched courses
        // console.log(courses);

        // Send the courses as a JSON response
        res.status(200).json(courses);
    } catch (error) {
        // Handle any errors that occur during the database query
        console.error("Error fetching courses:", error);
        res.status(500).json({ message: "Error fetching courses" });
    }
};

export default connectDb(handler);
