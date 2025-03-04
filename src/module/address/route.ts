import { Router } from "express";
import { addAddress, fetchAddress, modifyAddress } from "./controller";
import { validator } from "../../middleware/validator";
import { validateAddress, validateUpdateAddress } from "../../utils/validation";

const router = Router();

router.post("/", validator(validateAddress), addAddress);
router.get("/:userId", fetchAddress);
router.patch("/:userId", validator(validateUpdateAddress), modifyAddress);

export default router;
