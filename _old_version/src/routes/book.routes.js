import express from "express";
import * as controller from "../controllers/book.controller.js";

const router = express.Router();

router.get("/", controller.getBooks);
router.get("/popular", controller.getPopularBooks);
router.get("/:id", controller.getBookById);
router.post("/", controller.createBook);
router.patch("/:id", controller.updateBook);
router.delete("/:id", controller.deleteBook);

export default router;
