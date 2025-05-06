import express,{Express} from "express";
import dotenv from "dotenv"
import cors from "cors"
import { connectDb } from "./db/config.js";
import campaignRouter from "./routes/campaign.route.js";
import messageRouter from "./routes/message.route.js";

dotenv.config();

connectDb();

const port = Number(process.env.PORT)|| 5000;
const app:Express = express();

app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.json());

app.use('/',campaignRouter);
app.use('/messages',messageRouter);

app.listen(port,() => {
    console.log(`App started on port ${port}`)
})