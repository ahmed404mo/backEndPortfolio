import { notFoundExpeption, serverError } from "../../common/utils/response/index.js"
import { ProjectModel } from "../../DB/models/index.js"

export const getAllProjects = async()=>{
  try {
  const projects = await ProjectModel.find().sort({createdAt:-1})
  return projects
  
} catch (err) {
throw serverError(err)
}
}

export const createProjectService = async(inputs)=>{
  try {
  const projects = await ProjectModel(inputs)
  projects.save()
  return projects
  
} catch (err) {
throw serverError(err)
}
}

export const updateProject = async(id ,inputs)=>{
  try {
  const projects = await ProjectModel.findByIdAndUpdate(id,inputs , {new:true})
if (!projects) {
  throw notFoundExpeption("Project not found ❌")
}
  return projects
} catch (err) {
throw serverError(err)
}
}
export const deleteProject = async(id)=>{
  try {
  const projects = await ProjectModel.findByIdAndDelete(id,inputs , {new:true})
  if (!projects) {
  throw notFoundExpeption("Project not found ❌")
}
  return projects
  
} catch (err) {
throw serverError(err)
}
}
