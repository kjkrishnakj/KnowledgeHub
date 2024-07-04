import connectDb from "../../middleware/connectDb";
import MyCourses from "../../models/MyCourses";
import jsonwebtoken from "jsonwebtoken";
import Course from "../../models/Course"; 
const handler = async (req, res) => {
    const { courseId } = req.body;
    const { email } = req.query;

    // console.log("email + "   ,courseId);
    // const courseId  = "667845cdb9cb890eef867133";
 
        // console.log(courseId);
        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }
        
        const course = await Course.findById(courseId);

        if (course) {
            return res.status(200).json({ error: "Course already exist" });
            
        }
    
        const myCourse = new MyCourses({
            brand: course.brand,
            email: email,
            title: course.title,
            slug:Date.now().toString(36),
            descr: course.descr,
            img: course.img,
        });
        console.log(myCourse.email);
        await myCourse.save();

        res.status(200).json({ message: "Course added successfully" });
     
};

export default connectDb(handler);
