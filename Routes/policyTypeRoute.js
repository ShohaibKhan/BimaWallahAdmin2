const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });


const policyController = require('../controllers/policyTypeController');


// this router is exported later so that all the routes of this file can be handled easily using express

router.get("/policyTypes",policyController.AllPolicyTypes);
router.get("/editPolicyType",policyController.getSinglePolicyType);

router.post("/postPolicyTypeUpdate",upload.single('policyImage'),policyController.postPolicyTypeUpdate);
router.post("/postPolicyTypeDelete",policyController.postPolicyTypeDelete);
router.get("/NewPolicyType",policyController.NewPolicyType);
router.post("/addpostPolicyTypeUpdate",upload.single('policyImage'),policyController.addpostPolicyTypeUpdate);

module.exports = router
//exporting of the router so that it can be used in the main file