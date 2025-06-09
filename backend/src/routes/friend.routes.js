import { Router } from "express";
import { addFriend } from "../controllers/friend.controller.js";
import { auth } from "../middleware/auth.middleare.js";

const router = Router();
router.use(auth);

router.post("/addfriend", addFriend);

export default router;