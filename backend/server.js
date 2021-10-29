import express from "express";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import {
  customErrorHandler,
  notFoundHandler,
} from "./middleware/errorMiddleware.js";
import UserRoute from "./routes/userroutes.js";
import UploadRoutes from "./routes/uploadRoutes.js";
import ClientRoutes from "./routes/auditRoutes.js";
dotenv.config();
connectDB();

const app = express();

app.use(express.json());

const __dirname = path.resolve();

app.use(`/uploads`, express.static(path.join(__dirname, "/backend/uploads")));

app.use(
  "/clientdata",
  express.static(path.join(__dirname, "/backend/uploads"))
);

app.use("/api/clients", ClientRoutes);
app.use("/api/upload", UploadRoutes);

app.use("/api/users", UserRoute);

console.log(__dirname);

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/admindash/build")));
  app.get("*",(req,res)=>{
	  res.sendFile(path.resolve(__dirname,"admindash","build","index.html"))
  })
} else {
  app.get("/", (req, res) => {
    res.send("This is not the right path.");
  });
}

app.use(notFoundHandler);

app.use(customErrorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Listening on 5000");
});
