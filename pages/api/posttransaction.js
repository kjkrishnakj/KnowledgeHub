import connectDb from "../../middleware/connectDb";
import Order from "../../models/Order";
import Course from "../../models/Course";

const handler = async (req, res) => {
   let order;
   if (req.body.STATUS == 'TXN_SUCCESS') {
      order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: "Paid", paymentInfo: JSON.stringify(req.body),transactionid:req.body.TXNID})
     let products =order.products
     for(let slug in products){

        await Course.findOneandUpdate({slug:slug},{$inc:{"availableQty":-products[slug].qty}})
     } 
   } else if (req.body.STATUS == 'PENDING') {
      order = await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: "Pending", paymentInfo: JSON.stringify(req.body),transactionid:req.body.TXNID })
   }
   res.redirect("/order?id=&ClearCart=1"+order._id, 200)
}


export default connectDb(handler)
