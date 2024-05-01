import { Router } from "express";
import JobRoute from "./jobRoute.js"
const router= Router()

router.use("/api/job",JobRoute)

export default router