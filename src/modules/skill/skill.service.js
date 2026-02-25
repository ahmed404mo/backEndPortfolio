import { notFoundExpeption, serverError } from "../../common/utils/response/index.js"
import { skillModel } from "../../DB/models/index.js"

export const getAllSkillS = async()=>{
  try {
  const Skills = await skillModel.find().sort({createdAt:-1})
  return Skills
  
} catch (err) {
throw serverError(err)
}
}

export const createSkill = async(inputs)=>{
  try {
  const newSkill = await skillModel.create(inputs)
  return newSkill
  
} catch (err) {
throw serverError(err)
}
}


export const deleteSkill = async(id)=>{
  try {
  const deleteSkill = await skillModel.findByIdAndDelete(id)
  if (!deleteSkill) {
  throw notFoundExpeption("skill not found ❌")
}
  return deleteSkill
  
} catch (err) {
throw serverError(err)
}
}
