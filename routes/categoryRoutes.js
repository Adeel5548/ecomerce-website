import express from "express"
import {requireSignIn} from "../middleware/authMidleware.js"
import {isAddmin} from "../middleware/authMidleware.js"
import { createCategory,updateCategory,allCategory,singleCategory,delteCategory } from "../controllers/categoryController.js";
const router =express.Router()


// routes

router.post("/createCategory",createCategory)
router.put("/updateCategory/:id",updateCategory)
router.get("/allCategory",allCategory)
router.get("/singleCategory/:id",singleCategory)
router.get("/delteCategory/:id",delteCategory)


export default router