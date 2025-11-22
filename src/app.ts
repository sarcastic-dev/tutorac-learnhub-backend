import express from "express";
import cors from "cors";
import helmet from "helmet";
import healthRouter from "./routes/health.routes";
import { errorHandler } from "./middleware/error.middleware";
import authRouter from "./routes/auth.routes";
import protectedRouter from "./routes/protected.routes";
import adminRouter from "./routes/admin.routes";
import courseRouter from "./routes/course.routes";
import path from "path";

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(errorHandler);

app.use(express.static(path.join(__dirname, "../public")));

// Readme route
app.get("/readme", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/readme.html"));
});

// Routes
app.use("/health", healthRouter);
app.use("/auth", authRouter);
app.use("/protected", protectedRouter);
app.use("/admin", adminRouter);
app.use("/courses", courseRouter);

export default app;
