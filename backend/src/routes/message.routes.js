import { Router } from "express";
import { auth } from "../middleware/auth.middleare.js";
import { getMessages, sendMessage } from "../controllers/message.controller.js";

const router = Router();
router.use(auth);

router.post("/send/:id", sendMessage);
router.get("/get/:id", getMessages);

export default router;