import connectDb from "../../middleware/mongoose";
import User from "../../models/User";


const handler = async (req,res)=>{
 
    if(req.method =='POST'){
        let token = req.body.token
        
        
        
        let dbuser = await User.findOne({ "email": req.body.email })
 
        const {name,email,address,pincode,phone} = dbuser
        res.status(200).json({name,email,address,pincode,phone})
    }
    else{

        res.status(400).json({ error:'error' });
    }
}
export default connectDb(handler)
