// import express from 'express';
// import { globalErrorHandling } from './common/utils/response/error.response.js';
// import { authenticateDB } from './DB/connection.db.js';
// import { PORT } from '../config/config.service.js';
// import { authRouter } from './modules/auth/index.js';
// import { projectRouter } from './modules/project/index.js';
// import { messageRouter } from './modules/message/index.js';
// import { profileRouter } from './modules/profile/index.js';
// import { skillRouter } from './modules/skill/index.js';

// async function bootstrap() {
//   const app = express();
//   const port = PORT;
  
//   // Middleware
//   app.use(express.json());
  
//   // DB-connection
//   await authenticateDB()
//   // Routes
//   app.get('/', (req, res) => {
//     res.send('welcome my server 🚀');
//   });
  
//   // app.routing
  
//   app.use("/auth",authRouter)
//   app.use("/project",projectRouter)
//   app.use("/message",messageRouter)
//   app.use("/profile",profileRouter)
//   app.use("/skill",skillRouter)

//   app.use(globalErrorHandling)
  
//   app.use("{/dummy}",(req,res,next)=>{
//     return res.status(404).json({message:"invalid application routing ❌"})
//   })
//   // Start server
//   app.listen(port, () => {
//     console.log(`Server running on port port ${port} 🚀`);
//   });
// }

// export default bootstrap

import express from 'express';
import cors from 'cors';
import { globalErrorHandling } from './common/utils/response/error.response.js';
import { authenticateDB } from './DB/connection.db.js';
import { DB_URI, PORT } from '../config/config.service.js';
import { authRouter } from './modules/auth/index.js';
import { projectRouter } from './modules/project/index.js';
import { messageRouter } from './modules/message/index.js';
import { profileRouter } from './modules/profile/index.js';
import { skillRouter } from './modules/skill/index.js';
import { aboutRouter } from './modules/about/index.js';

const app = express();

// 1. Middleware (CORS)
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// 🚨 التعديل السحري الأول: تكبير حجم الداتا عشان يقبل صور الـ Base64
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// 2. Database Connection 
// 🚨 التعديل السحري التاني: شيلنا الـ await عشان Vercel ميضربش إيرور 500
authenticateDB()
  .then(() => console.log("✅ Database authentication triggered"))
  .catch((error) => console.error("❌ FATAL DB ERROR:", error.message));

// 3. Basic Routes
app.get('/', (req, res) => {
  res.send('welcome my server 🚀');
});

app.get('/ping', (req, res) => {
    res.status(200).json({ 
        message: "Server is ALIVE! 🚀", 
        db_status: DB_URI ? "DB_URI is detected ✅" : "DB_URI is MISSING ❌"
    });
});

// 4. App Routing
app.use("/auth", authRouter);
app.use("/project", projectRouter);
app.use("/message", messageRouter);
app.use("/profile", profileRouter);
app.use("/skills", skillRouter); // تأكد إن الفرونت إند بيكلم /skills مش /skill
app.use("/about", aboutRouter);

// 5. Global Error Handling
app.use(globalErrorHandling);

// 6. 404 Handling
app.use((req, res) => {
  return res.status(404).json({ message: "invalid application routing ❌" });
});

// 7. Local Server Runner
if (process.env.NODE_ENV !== 'production') {
  const port = PORT || 5000;
  app.listen(port, () => {
    console.log(`Server running on port ${port} 🚀`);
  });
}

export default app;