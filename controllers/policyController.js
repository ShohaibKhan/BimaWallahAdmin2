const policyModel = require("../models/policyModel");

exports.unverifiedpolicies = (req,res)=>{

    policyModel.getAllUnverifiedPolicies()
    .then(policies=>{
        
        res.render("policies/verifyPolicies",{"policies":policies});
    });
}

exports.getSinglePolicy = (req,res)=>{
    let jsonData = JSON.parse(req.query.policy)
    const timestampSeconds = jsonData.expiry_date.seconds;
    const expiryDateUTC = new Date(timestampSeconds * 1000); // Multiply by 1000 to convert seconds to milliseconds
    const formattedExpiryDate = expiryDateUTC.toISOString(); // Convert to ISO string for UTC representation
    jsonData.expiry_date = formattedExpiryDate.split("T")[0];
    res.render("policies/singlePolicy",{"policy":jsonData,"userRef":req.query.userRef});
}

exports.postPolicy=async (req,res)=>{
    let result = await policyModel. updatePolicy(req.body);
    console.log(result);
    if (result){
        console.log("success");
        res.redirect("/verifyPolicies");
    }
}
