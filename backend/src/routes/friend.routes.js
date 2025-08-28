import { Router } from "express";
import { addFriend, sortedFriendList } from "../controllers/friend.controller.js";
import { auth } from "../middleware/auth.middleare.js";

const router = Router();
router.use(auth);

router.post("/addfriend", addFriend);
router.get("/", sortedFriendList);

export default router;