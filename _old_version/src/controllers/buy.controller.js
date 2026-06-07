import { readData, writeData } from "../helpers/file_data.js";

const BORROW_FILE = "buy.json";
const USER_FILE = "users.json";
const BOOK_FILE = "book.json";

// GET all
export const getBorrows = (req, res) => {
  const data = readData(BORROW_FILE);
  res.json(data);
};

// GET by id
export const getBorrowById = (req, res) => {
  const data = readData(BORROW_FILE);
  const item = data.find(b => b.id == req.params.id);
  if (!item) return res.status(404).send("Not found");
  res.json(item);
};

// POST borrow
export const createBorrow = (req, res) => {
  const borrows = readData(BORROW_FILE);
  const users = readData(USER_FILE);
  const books = readData(BOOK_FILE);

  const { userId, bookId } = req.body;

  const user = users.find(u => u.id == userId);
  const book = books.find(b => b.id == bookId);

  if (!user) return res.status(404).send("User not found");
  if (!book) return res.status(404).send("Book not found");
  if (book.stock <= 0) return res.status(400).send("No stock available");

  // stock kamayadi
  book.stock -= 1;

  const newBorrow = {
    id: Date.now(),
    userId,
    bookId,
    borrowDate: new Date().toISOString().split("T")[0]
  };

  borrows.push(newBorrow);

  writeData(BORROW_FILE, borrows);
  writeData(BOOK_FILE, books);

  res.status(201).json(newBorrow);
};

// DELETE (return book)
export const deleteBorrow = (req, res) => {
  let borrows = readData(BORROW_FILE);
  let books = readData(BOOK_FILE);

  const borrow = borrows.find(b => b.id == req.params.id);
  if (!borrow) return res.status(404).send("Borrow record not found");

  const book = books.find(b => b.id == borrow.bookId);
  if (book) book.stock += 1;

  borrows = borrows.filter(b => b.id != req.params.id);

  writeData(BORROW_FILE, borrows);
  writeData(BOOK_FILE, books);

  res.send("Book returned successfully");
};
