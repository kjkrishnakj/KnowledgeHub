import connectDb from "../../middleware/connectDb";
import Order from "../../models/Order";
import jsonwebtoken from "jsonwebtoken";

const handler = async (req, res) => {
    const { token,email } = req.body;

    // if (!token) {
    //     return res.status(400).json({ error: "Token is required" });
    // }

    try {
        // const data = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        const orders = await Order.find({ email:req.body.email }) || [];

        res.status(200).json({ orders });
        // console.log(orders);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
        // console.error(error);
    }
};

export default connectDb(handler);
