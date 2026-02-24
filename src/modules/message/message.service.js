import { sendEmail } from "../../common/utils/email/sendEmail.js"
import { serverError } from "../../common/utils/response/index.js"
import { MessageModel } from "../../DB/models/index.js"

export const createMessage = async(inputs)=>{
  try {
    
    const message = new MessageModel(inputs)
    await message.save()

    await sendEmail({
      name:message.name,
      email:message.email,
      message:message.message
    })
    return message
  } catch (error) {
    console.log("🔴 المشكلة الحقيقية هي: ", error);
    throw serverError()
  }

}

export const getAllMessage = async()=>{
  try {
    
    const allMessage = await MessageModel.find().sort({createdAt:-1})

    return allMessage
  } catch (error) {
    throw serverError()
  }

}