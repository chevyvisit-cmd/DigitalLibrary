import express from "express";
import * as controller from "../controllers/buy.controller.js";

const router = express.Router();

router.get("/", controller.getBorrows);
router.get("/:id", controller.getBorrowById);
router.post("/", controller.createBorrow);
router.delete("/:id", controller.deleteBorrow);

export default router;