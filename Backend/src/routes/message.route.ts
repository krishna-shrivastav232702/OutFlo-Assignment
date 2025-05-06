import express,{Router} from "express";
import { createPersonalizedMessage } from "../controllers/message.controller.js";

const router:Router = express.Router();

router.post('/personalized-message', createPersonalizedMessage);

export default router;
