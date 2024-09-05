import { Router } from "express";
import { list } from "../services/list.js";
import { get } from "../services/get.js";
import { create } from "../services/create.js";
import { update } from "../services/update.js";
import { remove } from "../services/remove.js";
import { userValidations } from 'commons-layer';

const router = Router();

/**
 *  GET /users
 */
router.get("/", list);
router.get("/:id", get);

/**
 *  POST /users
 */
router.post("/", [userValidations.createUserCommons], create);

/**
 *  PATCH /users
 */
router.put('/:id', [userValidations.updateUserCommons], update);

/**
 *  DELETE /users
 */
router.delete('/:id', remove);


export default router;
