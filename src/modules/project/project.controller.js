import { Router } from "express";
import  * as projectService from "./project.service.js";
import { successResponse } from "../../common/utils/response/success.response.js";
import authMiddleware from "./../../middleware/auth.middleware.js"

const router = Router()

router.get("/",async(req,res,next)=>{
const projects = await projectService.getAllProjects()
return  successResponse({res,data:projects})

})

router.post("/",authMiddleware,async(req,res,next)=>{
const createProject = await projectService.createProjectService(req.body)
return successResponse({res,message:"Done create project",status:201,data:{createProject}})
})
router.put("/:id",authMiddleware,async(req,res,next)=>{
  const updateProject = await projectService.updateProject(req.params.id,req.body)
  return successResponse({res, data:{updateProject}})
})

router.delete("/:id",authMiddleware,async(req,res,next)=>{
  const updateProject = await projectService.deleteProject(req.params.id)
  return successResponse({res,message:"Project deleted successfully", data:{updateProject}})
})

export default router