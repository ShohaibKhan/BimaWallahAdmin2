const express = require('express')
const router = express.Router()

const userController = require('../controllers/userControler')


// this router is exported later so that all the routes of this file can be handled easily using express

router.get("/allUsers",userController.getAllUsers);
router.get("/unverifiedAgents",userController.getAllUnverfied);
router.get("/unverifiedAgents",userController.singleApplication);
router.get("/application",userController.singleApplication);
router.get("/",userController.homePage);

router.post("/postReject",userController.handleReject);
router.post("/postAccept",userController.handleAccept);
router.post("/postDYN",userController.postDYN);



module.exports = router
//exporting of the router so that it can be used in the main file