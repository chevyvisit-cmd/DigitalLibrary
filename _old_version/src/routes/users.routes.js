import express from "express";
import * as controller from "../controllers/users.controller.js";

const router = express.Router();

router.get("/", controller.getUsers);
router.get("/:id/books", controller.getUserBooks);

export default router;
