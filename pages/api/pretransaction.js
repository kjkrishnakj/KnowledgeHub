import { useRouter } from "next/router";
import connectDb from "../../middleware/connectDb";
import Order from "../../models/Order";
import Product from "../../models/Product";
import pincodes from '../../pinodes.json'

const https = require('https');

// const PaytmChecksum = require('paytmchecksum');

const handler = async (req, res) => {
    const router =  useRouter();
    if (req.method == "POST") {

        if(!(Object.keys(pincodes)).includes(req.body.pincode)){
            
            res.status(200).json( {success:false, "error": "Entered pincode is not serviceable!" } )
            // router.push("/checkout")
            return
            
        }
        let product, sumTotal = 0;
        let cart = req.body.cart
        for (let item in cart) {
            // console.log(item);
            sumTotal += cart[item].price * cart[item].qty
            product = await Product.findOne({ slug: item })
            // console.log(sumTotal,req.body.SubTotal);
            if(product.availableQty< cart[item].qty){
                res.status(200).json( {success:false, "error": "Some items are out of Stock!" } )
                return

            }
            if (product.price != cart[item].price) {
                res.status(200).json( {success:false, "error": "something went wrong!" } )
                return
            }
        }
        if (sumTotal !== req.body.SubTotal) {
            res.status(200).json( { success:false, "error": "something went wrong!"} )
            return
        }
        let order = new Order({
            email: req.body.email,
            orderId: req.body.oid,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            name: req.body.name,
            phone: req.body.phone,
            address: req.body.address,
            amount: req.body.SubTotal,
            products: req.body.cart,
        })
        await order.save();





        var paytmParams = {};

        paytmParams.body = {
            "requestType": "Payment",
            "mid": process.env.NEXT_PUBLIC_PAYTM_MID,
            "websiteName": "YOUR_WEBSITE_NAME",
            "orderId": req.body.oid,
            "callbackUrl": `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
            "txnAmount": {
                "value": req.body.SubTotal,
                "currency": "INR",
            },
            "userInfo": {
                "custId": req.body.email,
            },
        };


        const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.PAYTM_MKEY)

        paytmParams.head = {
            "signature": checksum
        };

        var post_data = JSON.stringify(paytmParams);

        const requestAsync = () => {
            return new Promise((resolve, reject) => {

                var options = {
                    // hostname: 'securegw-stage.paytm.in',

                    hostname: 'securegw.paytm.in',
                    port: 443,
                    path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                };

                var response = "";
                var post_req = https.request(options, function (post_res) {
                    post_res.on('data', function (chunk) {
                        response += chunk;
                    });

                    post_res.on('end', function () {
                        console.log('Response: ', response);
                        let ress = JSON.parse(response).body
                        ress.success = true 
                        resolve(ress);
                    });
                });

                post_req.write(post_data);
                post_req.end();
            })
        }
        let myr = await requestAsync()
        res.status(200).json(myr)


    }
}

export default connectDb(handler)
