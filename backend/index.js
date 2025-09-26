import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import connectDB from "./config/db.js";

dotenv.config();

const app = express();

// Connect to database
connectDB();