import { readData } from "../helpers/file_data.js";

const FILE_NAME = "users.json";
const BORROW_FILE = "buy.json";
const BOOK_FILE = "book.json";

// GET all users
export const getUsers = (req, res) => {
  const data = readData(FILE_NAME);
  res.json(data);
};

// GET user books (books borrowed by user)
export const getUserBooks = (req, res) => {
  const borrows = readData(BORROW_FILE);
  const books = readData(BOOK_FILE);

  const userBooks = borrows
    .filter(b => b.userId == req.params.id)
    .map(b => books.find(book => book.id == b.bookId))
    .filter(Boolean);

  res.json(userBooks);
};
