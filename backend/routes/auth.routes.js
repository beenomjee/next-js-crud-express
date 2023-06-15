import { Router } from "express";
import {
  logoutController,
  signInController,
  signUpController,
} from "../controllers/index.js";

const router = Router();

router.post("/signup", signUpController);
router.post("/signin", signInController);
router.get("/logout", logoutController);

export default router;
