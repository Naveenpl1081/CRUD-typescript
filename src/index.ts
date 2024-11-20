import express from "express";
import router from "./routes";
import dotenv from "dotenv";
import dbConnect from "./config/dbconnect";

dotenv.config();

const app = express();
const PORT = process.env.PORT 
app.use(express.json());

dbConnect();

app.use('/', router)

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
})
