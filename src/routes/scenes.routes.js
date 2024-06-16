import { Router } from "express";
import { getUserScenes, saveScene, getScene } from "../controllers/scenes.controller.js";

const router = Router();

router.get("/scenes", getUserScenes);

router.post("/scenes", saveScene);

export default router;