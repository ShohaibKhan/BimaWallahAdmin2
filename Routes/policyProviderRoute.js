const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });


const policyController = require('../controllers/policyProviderController');


// this router is exported later so that all the routes of this file can be handled easily using express

router.get("/policyProviders",policyController.AllPolicyProviders);
router.get("/editPolicyProvider",policyController.getSinglePolicyProvider);
router.post("/postPolicyProviderUpdate",upload.single('policyProviderImage'),policyController.postPolicyProviderUpdate);
router.post("/postPolicyProviderDelete",policyController.postPolicyProviderDelete);
router.get("/NewPolicyProvider",policyController.NewPolicyProvider);
router.post("/addpostPolicyProviderUpdate",upload.single('policyProviderImage'),policyController.addpostPolicyProviderUpdate);

module.exports = router
//exporting of the router so that it can be used in the main file