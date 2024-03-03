const express = require('express');
const router = express.Router();

const policyController = require('../controllers/policyController');


// this router is exported later so that all the routes of this file can be handled easily using express

router.get("/verifyPolicies",policyController.unverifiedpolicies);
router.get("/singlePolicy",policyController.getSinglePolicy);

router.post("/postPolicy",policyController.postPolicy);



module.exports = router
//exporting of the router so that it can be used in the main file