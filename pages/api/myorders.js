import connectDb from "../../middleware/connectDb";
import Order from "../../models/Order";
import jsonwebtoken from "jsonwebtoken" 
const handler =async (req, res)=> {
    const token = req.body.token
    const data = jsonwebtoken.verify(token,process.env.JWT_SECRET)
    let orders = await Order.find({email:data.email})
    // console.log(data.email);
    res.status(200).json({orders})
    // console.log(orders);
    
}


export default connectDb(handler)


