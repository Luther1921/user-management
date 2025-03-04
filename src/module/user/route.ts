import { Router } from "express";
import {
  registerUser,
  fetchUsers,
  fetchUsersCount,
  fetchSingleUser,
} from "./controller";
import { validator } from "../../middleware/validator";
import { validateUser } from "../../utils/validation";

const router = Router();

router.post("/", validator(validateUser), registerUser);
router.get("/", fetchUsers);
router.get("/count", fetchUsersCount);
router.get("/:id", fetchSingleUser);

export default router;
