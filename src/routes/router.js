import { Router } from "express";
import { list } from "../services/list.js";
import { get } from "../services/get.js";
import { create } from "../services/create.js";
import { update } from "../services/update.js";
import { remove } from "../services/remove.js";
import { userValidations } from 'JsTaskManager-commons-layer';
import { hashPassword } from "../middleware/hashPassword.js";
import { login } from "../services/login.js";
import { logout } from "../services/logout..js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = Router();

/**
 *  GET /users
 */
router.get("/", list);
router.get("/:id", get);

/**
 *  POST /users
 */
router.post("/", [userValidations.createUserCommons], hashPassword, create);
router.post('/login', login);

/**
 *  PATCH /users
 */
router.put('/:id', [userValidations.updateUserCommons], update);

/**
 *  DELETE /users
 */
router.delete('/logout', authenticateToken, logout);
router.delete('/:id', remove);


export default router;
