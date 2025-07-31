const express = require("express");
const router = express.Router();
const { createBook, getBooks } = require("../controllers/bookController");

router.post("/", createBook);   // POST /api/books
router.get("/", getBooks);      // GET /api/books

module.exports = router;
