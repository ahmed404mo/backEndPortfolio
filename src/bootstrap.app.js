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
import { certificateRouter } from './modules/certificate/index.js'; 
import { upload, uploadToCloudinary } from './common/utils/cloudinary.config.js';

const app = express();

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.use(async (req, res, next) => {
  try {
    await authenticateDB();
    next();
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: "Database connection failed", 
      error: error.message 
    });
  }
});

// 3. Upload Route
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No image uploaded" });
    const imageUrl = await uploadToCloudinary(req.file.buffer);
    res.status(200).json({ success: true, url: imageUrl });
  } catch (error) {
    res.status(500).json({ message: error.message || "Upload failed from Cloudinary" });
  }
});

// 4. Basic Routes
app.get('/', (req, res) => {
  res.send('welcome my server 🚀');
});

app.get('/ping', (req, res) => {
    res.status(200).json({ 
        message: "Server is ALIVE! 🚀", 
        db_status: DB_URI ? "DB_URI is detected ✅" : "DB_URI is MISSING ❌"
    });
});

// 5. App Routing
app.use("/auth", authRouter);
app.use("/project", projectRouter);
app.use("/message", messageRouter);
app.use("/profile", profileRouter);
app.use("/skills", skillRouter); 
app.use("/about", aboutRouter);
app.use("/certificates", certificateRouter);

// 6. Error Handling
app.use(globalErrorHandling);

app.use((req, res) => {
  return res.status(404).json({ message: "invalid application routing ❌" });
});

// 7. Local Runner
if (process.env.NODE_ENV !== 'production') {
  const port = PORT || 5000;
  app.listen(port, () => {
    console.log(`Server running on port ${port} 🚀`);
  });
}

export default app;