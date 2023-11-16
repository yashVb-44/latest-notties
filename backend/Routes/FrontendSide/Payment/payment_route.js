const express = require('express')
const route = express.Router()
const nodeCCAvenue = require('node-ccavenue');

const ccavenueParams = {
    merchant_id: '2918767',
    working_key: '80D8B79F222EB923A0BBC6570EFCBC60',
    access_code: 'AVTJ19KJ59AU48JTUA',
};


const ccav = new nodeCCAvenue.Configure({
    merchant_id: '2918767',
    working_key: '80D8B79F222EB923A0BBC6570EFCBC60'
});

// const a = new ccavenue(ccavenueParams)


// route.post('/api/makePayment', (req, res) => {
//     const { amount } = req.body;

//     const redirectUrl = "https://google.com"

//     const ccavenueParams = {
//         merchant_id: '2918767',
//         working_key: '80D8B79F222EB923A0BBC6570EFCBC60',
//         access_code: 'AVTJ19KJ59AU48JTUA',
//         order_id: 'ORDER1234',
//         amount,
//         redirect_url: redirectUrl,
//         currency: 'INR',
//         language: 'EN',
//         billing_name: 'John Doe',
//     };

//     const form = ccav.getForm(ccavenueParams);

//     res.send(form);
// });



module.exports = route  