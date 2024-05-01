import {Router} from "express"
import { createJob,fetchJobs,updateJob,deleteJob,getJob} from "../Controller/JobController.js"

const router=Router()

router.post("/create",createJob)
router.put("/update/:id",updateJob)
router.get("/getAll",fetchJobs)
router.get("/getJob/:id",getJob)
router.delete("/delete/:id",deleteJob)

export default router
