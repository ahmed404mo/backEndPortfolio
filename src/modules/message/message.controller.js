import { Router } from "express";
import  * as messageService  from './message.service.js';
import { successResponse } from "../../common/utils/response/success.response.js";
import authMiddleware from './../../middleware/auth.middleware.js';

const router = Router()

router.post("/",async(req,res,next)=>{
    const message = await messageService.createMessage(req.body)
    return successResponse({res,status:201,message:"message sent successfully",data:{message}})

})

router.get("/",authMiddleware,async(req,res,next)=>{
    const messages = await messageService.getAllMessage(req.body)
    return successResponse({res,data:{messages}})

})
router.delete("/:id", authMiddleware, async (req, res, next) => {
    const { id } = req.params;
    await messageService.deleteMessage(id);
    return successResponse({ res, message: "Message deleted successfully" });
});

export default router