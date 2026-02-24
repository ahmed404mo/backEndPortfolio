import express from 'express';
import { globalErrorHandling } from './common/utils/response/error.response.js';
import { authenticateDB } from './DB/connection.db.js';
import { PORT } from '../config/config.service.js';
import { authRouter } from './modules/auth/index.js';
import { projectRouter } from './modules/project/index.js';
import { messageRouter } from './modules/message/index.js';
import { profileRouter } from './modules/profile/index.js';
import { skillRouter } from './modules/skill/index.js';

async function bootstrap() {
  const app = express();
  const port = PORT;
  
  // Middleware
  app.use(express.json());
  
  // DB-connection
  await authenticateDB()
  // Routes
  app.get('/', (req, res) => {
    res.send('welcome my server 🚀');
  });
  
  // app.routing
  
  app.use("/auth",authRouter)
  app.use("/project",projectRouter)
  app.use("/message",messageRouter)
  app.use("/profile",profileRouter)
  app.use("/skill",skillRouter)

  app.use(globalErrorHandling)
  
  app.use("{/dummy}",(req,res,next)=>{
    return res.status(404).json({message:"invalid application routing ❌"})
  })
  // Start server
  app.listen(port, () => {
    console.log(`Server running on port port ${port} 🚀`);
  });
}

export default bootstrap