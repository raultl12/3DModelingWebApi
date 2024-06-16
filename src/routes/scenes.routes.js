import { Router } from "express";
import { getUserScenes, saveScene, deleteScene } from "../controllers/scenes.controller.js";

const router = Router();

router.get("/scenes", getUserScenes);

router.post("/scenes", saveScene);

router.delete("/scenes", deleteScene);

export default router;