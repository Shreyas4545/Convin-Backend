import express, { response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import TelegramBot from "node-telegram-bot-api";
import cookieParser from "cookie-parser";
import axios from "axios";
import router from "./routes/admin.routes.js";
import connectDB from "./config/db.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res, next) => {
  return res.status(200).send({
    uptime: process.uptime(),
    message: "Catalyst's API health check :: GOOD",
    timestamp: Date.now(),
  });
});

app.use("/api/admin", router);
export default app;
