export const globalErrorHandling = (error, req, res,next)=>{
  return res.status(error.cause?.status??500).json({
    error,
    error_message:error.message??"something went wrong",
    stack:error.stack
  })
}

// general customized error method
export const ErrorResponse = ({message="Error", status=400,extra=undefined}={})=>{
  throw new Error(message,{cause:{status,extra}})
}

// error-template

// Bad Request 
export const badrequestExpeption = (message="badRequestExpeption",extra={})=>{
  return ErrorResponse({message,cause:{status:400,extra}})
}

// not found 
export const notFoundExpeption = (message="notFoundExpeption",extra={})=>{
  return ErrorResponse({message,cause:{status:404,extra}})
}

//  unauthorized expeption 
export const unauthorizedExpeption = (message="unauthorizedExpeption",extra={})=>{
  return ErrorResponse({message,cause:{status:401,extra}})
}

// conflict Request 
export const conflictExpeption = (message="conflictExpeption",extra={})=>{
  return ErrorResponse({message,cause:{status:409,extra}})
}

// forbidden Request 
export const forbiddenExpeption = (message="forbiddenExpeption",extra={})=>{
  return ErrorResponse({message,cause:{status:403,extra}})
}

// 

export const serverError = (message="fserverError",extra={})=>{
  return ErrorResponse({message,cause:{status:500,extra}})
}