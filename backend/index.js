import express from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { dbConnect } from "./utils/dbConnect.js";
import userRouter from "./routes/userRoutes.js";
import compilerRoutes from "./routes/compilerRoutes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://easycompile.onrender.com", // Replace with your frontend's origin
    credentials: true, // If you need to send cookies or authentication headers
  })
);

app.use("/user", userRouter);
app.use("/compiler", compilerRoutes);
config();
dbConnect();

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
