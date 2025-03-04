import { Router } from "express";
import { addPost, removePost, fetchPost } from "./controller";
import { validator } from "../../middleware/validator";
import { validatePost } from "../../utils/validation";

const router = Router();

router.post("/", validator(validatePost), addPost);
router.get("/", fetchPost);
router.delete("/:id", removePost);

export default router;
