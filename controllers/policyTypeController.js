const policyTypeModel = require("../models/policyTypeModel");

exports.AllPolicyTypes = (req,res)=>{
    policyTypeModel.getAllPolicyTypes()
    .then(allPolicyTypes=>{
        res.render("policies/policyTypes",{"policytypeJson":allPolicyTypes})
    })
}

exports.getSinglePolicyType = (req,res)=>{
    res.render("policies/editPolicyType",{"policyType":req.query.policyType,"policyImage":req.query.policyImage,"policyTypeRef":req.query.policyTypeRef})
}

exports.postPolicyTypeUpdate=async (req,res)=>{
    let result = await policyTypeModel. updatePolicyType(req.file,req.body);
    if (result){
        res.redirect("/policyTypes");
    }

}
exports.NewPolicyType = (req,res)=>{
    res.render("policies/addNewPolicyType");
}
exports.postPolicyTypeDelete=async(req,res)=>{
    let result=await policyTypeModel.deletePolicyType(req.body);
    if (result){
        res.redirect("/policyTypes")
    }
}

exports.addpostPolicyTypeUpdate=async(req,res)=>{
    let result =await policyTypeModel.NewPolicyType(req.file,req.body);
    if (result){
        res.redirect("/policyTypes");
    }
}