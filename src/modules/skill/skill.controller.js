import { Router } from "express";
import  * as skillService from "./skill.service.js";
import { successResponse } from "../../common/utils/response/success.response.js";
import authMiddleware from "../../middleware/auth.middleware.js"

const router = Router()

router.get("/",async(req,res,next)=>{
const skills = await skillService.getAllSkillS()
return  successResponse({res,data:skills})

})

router.post("/",authMiddleware,async(req,res,next)=>{
const createSkill = await skillService.createSkill(req.body)
return successResponse({res,message:"Done create skill",status:201,data:{createSkill}})
})

router.delete("/:id",authMiddleware,async(req,res,next)=>{
  const deleteSkill = await skillService.deleteSkill(req.params.id)
  return successResponse({res,message:"skill deleted successfully", data:{deleteSkill}})
})

export default router