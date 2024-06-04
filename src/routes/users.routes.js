import { Router } from "express";
import { getUsers, insertUser, getUserWithId} from "../controllers/users.controller.js";

const router = Router();

router.get("/users", getUsers);

router.post("/users", insertUser);

router.get("/users/:id", getUserWithId);

export default router;