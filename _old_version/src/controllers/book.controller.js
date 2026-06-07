import { readData, writeData } from "../helpers/file_data.js";

const FILE_NAME = "book.json";
const BORROW_FILE = "buy.json";

// GET all books
export const getBooks = (req, res) => {
  let data = readData(FILE_NAME);
  const { search, category } = req.query;

  if (search) {
    data = data.filter(b => 
      b.title.toLowerCase().includes(search.toLowerCase()) || 
      b.author.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category) {
    data = data.filter(b => b.category === category);
  }

  res.json(data);
};

// GET by id
export const getBookById = (req, res) => {
  const data = readData(FILE_NAME);
  const book = data.find(b => b.id == req.params.id);
  if (!book) return res.status(404).send("Book not found");
  res.json(book);
};

// POST create book
export const createBook = (req, res) => {
  const data = readData(FILE_NAME);
  const newBook = {
    id: Date.now(),
    ...req.body
  };
  data.push(newBook);
  writeData(FILE_NAME, data);
  res.status(201).json(newBook);
};

// PATCH update book
export const updateBook = (req, res) => {
  const data = readData(FILE_NAME);
  const index = data.findIndex(b => b.id == req.params.id);
  if (index === -1) return res.status(404).send("Book not found");

  data[index] = { ...data[index], ...req.body };
  writeData(FILE_NAME, data);
  res.json(data[index]);
};

// DELETE book
export const deleteBook = (req, res) => {
  let data = readData(FILE_NAME);
  const exists = data.some(b => b.id == req.params.id);
  if (!exists) return res.status(404).send("Book not found");

  data = data.filter(b => b.id != req.params.id);
  writeData(FILE_NAME, data);
  res.send("Deleted");
};

// GET popular books
export const getPopularBooks = (req, res) => {
  const borrows = readData(BORROW_FILE);
  const books = readData(FILE_NAME);

  const count = {};
  borrows.forEach(b => {
    count[b.bookId] = (count[b.bookId] || 0) + 1;
  });

  const sorted = Object.entries(count)
    .sort((a, b) => b[1] - a[1])
    .map(([bookId]) => books.find(b => b.id == bookId))
    .filter(Boolean);

  res.json(sorted);
};
