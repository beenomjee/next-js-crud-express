import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controllers/index.js";
import { authMiddleware } from "../middleware/index.js";

const router = Router();

router.post("", authMiddleware, createTodo);
router.get("", authMiddleware, getTodos);
router.put("", authMiddleware, updateTodo);
router.delete("/:_id", authMiddleware, deleteTodo);

export default router;
