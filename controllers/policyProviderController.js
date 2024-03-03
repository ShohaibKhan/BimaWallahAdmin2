const policyProviderModel = require("../models/policyProviderModel");

exports.AllPolicyProviders = (req,res)=>{
    policyProviderModel.getAllPolicyProviders()
    .then(allPolicyProviders=>{
        res.render("policies/policyProvider",{"policyProviderJson":allPolicyProviders})
    })
}

exports.getSinglePolicyProvider = (req,res)=>{
    res.render("policies/editPolicyProvider",{"policyProvider":req.query.policyProvider,"policyProviderImage":req.query.policyProviderImage,"policyProviderRef":req.query.policyProviderRef})
}

exports.postPolicyProviderUpdate=async (req,res)=>{
    let result = await policyProviderModel.updatePolicyProvider(req.file,req.body);
    if (result){
        res.redirect("/policyProviders");
    }

}
exports.NewPolicyProvider = (req,res)=>{
    res.render("policies/addNewPolicyProvider");
}
exports.postPolicyProviderDelete=async(req,res)=>{
    let result=await policyProviderModel.deletePolicyProvider(req.body);
    if (result){
        res.redirect("/policyProviders")
    }
}

exports.addpostPolicyProviderUpdate=async(req,res)=>{
    let result =await policyProviderModel.NewPolicyProviders(req.file,req.body);
    if (result){
        res.redirect("/policyProviders");
    }
}