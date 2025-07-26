import express from "express"
import { registerController} from "../controllers/authController.js"
import {loginController} from "../controllers/authController.js"
import {testController,isAdmins} from "../controllers/authController.js"
import {requireSignIn} from "../middleware/authMidleware.js"
import {isAddmin} from "../middleware/authMidleware.js"
import dotenv from "dotenv";
dotenv.config();


// router object

const router=express.Router()

// routing
// registration||method post
router.post('/register',registerController)
// login||post
router.post('/login',loginController)
// test router||get
router.get('/test',requireSignIn,isAddmin,testController)
// protected user route
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})
// protected admin route
router.get('/admin-auth', requireSignIn, isAddmin, (req, res) => {
    res.status(200).send({ ok: true });
});



export default router