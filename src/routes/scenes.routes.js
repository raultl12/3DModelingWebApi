import { Router } from "express";
import { getUserScenes, saveScene, deleteScene, updateSceneName } from "../controllers/scenes.controller.js";

const router = Router();

router.get("/scenes", getUserScenes);

router.post("/scenes", saveScene);

router.delete("/scenes", deleteScene);

router.put("/scenes", updateSceneName);

export default router;