import { Router } from "express";
import { getUsers, insertUser, getUserWithId, userLogin, userLogout} from "../controllers/users.controller.js";

const router = Router();

router.get("/users", getUsers);

router.post("/users", insertUser);

router.get("/users/:id", getUserWithId);

router.post("/login", userLogin);

router.post("/logout", userLogout);

export default router;