
import express from "express";
import cors from "cors";
import bookRoutes from "./routes/book.routes.js";
import borrowRoutes from "./routes/buy.routes.js";
import userRoutes from "./routes/users.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/book", bookRoutes);
app.use("/borrow", borrowRoutes);
app.use("/users", userRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));