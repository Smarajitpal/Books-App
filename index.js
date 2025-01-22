const { initializeDatabase } = require("./db/db.connect");
const express = require("express");

const app = express();
app.use(express.json());

initializeDatabase();
const cors = require("cors");
app.use(cors());

const Book = require("./models/books.models");

async function createBook(newData) {
  try {
    const book = new Book(newData);
    await book.save();
    return book;
  } catch (error) {
    console.log(error);
  }
}
app.post("/books", async (req, res) => {
  try {
    const savedBook = await createBook(req.body);
    if (savedBook) {
      res
        .status(200)
        .json({ message: "Hotel added successfully", book: savedBook });
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to add book." });
  }
});

async function readAllBooks() {
  try {
    const allBooks = await Book.find();
    return allBooks;
  } catch (error) {
    console.log(error);
  }
}

app.get("/books", async (req, res) => {
  try {
    const viewBooks = await readAllBooks();
    if (viewBooks.length >= 0) {
      res.status(200).json({ message: "All books details", books: viewBooks });
    } else {
      res.status(404).json({ error: "Books not found." });
    }
  } catch (error) {
    res.status(505).json({ error: "Failed to fetch books." });
  }
});

async function readBookByName(bookName) {
  try {
    const bookByName = await Book.findOne({ title: bookName });
    return bookByName;
  } catch (error) {
    console.log(error);
  }
}

app.get("/books/:title", async (req, res) => {
  try {
    const bookDetails = await readBookByName(req.params.title);
    if (bookDetails) {
      res
        .status(200)
        .json({ message: "Found book successfully.", book: bookDetails });
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book." });
  }
});

async function readBookByAuthor(authorName) {
  try {
    const bookByAuthor = await Book.find({ author: authorName });
    return bookByAuthor;
  } catch (error) {
    console.log(error);
  }
}

app.get("/books/authors/:authorName", async (req, res) => {
  try {
    const bookDetails = await readBookByAuthor(req.params.authorName);
    if (bookDetails) {
      res
        .status(200)
        .json({ message: "Found book successfully.", book: bookDetails });
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book." });
  }
});

async function readBookByGenre() {
  try {
    const bookByGenre = await Book.find({ genre: "Business" });
    return bookByGenre;
  } catch (error) {
    console.log(error);
  }
}

app.get("/books/genres/genrename", async (req, res) => {
  try {
    const bookDetails = await readBookByGenre();
    if (bookDetails.length >= 0) {
      res.status(200).json(bookDetails);
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book." });
  }
});

async function readBooksByYear() {
  try {
    const bookByYear = await Book.find({ publishedYear: 2012 });
    return bookByYear;
  } catch (error) {
    console.log(error);
  }
}

app.get("/books/years/year", async (req, res) => {
  try {
    const bookList = await readBooksByYear();
    if (bookList.length >= 0) {
      res.status(200).json(bookList);
    } else {
      res.status(404).json({ error: "Books not found." });
    }
  } catch (error) {
    res.status(505).json({ error: "Failed to fetch books." });
  }
});

async function updateBookRating(bookId, dataToUpdate) {
  try {
    const updatedData = Book.findByIdAndUpdate(bookId, dataToUpdate, {
      new: true,
    });
    return updatedData;
  } catch (error) {
    console.log(error);
  }
}

app.post("/books/rating/:bookId", async (req, res) => {
  try {
    const updatedRatingData = await updateBookRating(
      req.params.bookId,
      req.body
    );
    if (updatedRatingData) {
      res.status(200).json({
        message: "Book rating updated successfully.",
        book: updatedRatingData,
      });
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book." });
  }
});

async function updateBookByName(bookName, dataToUpdate) {
  try {
    const updatedData = Book.findOneAndUpdate(
      { title: bookName },
      dataToUpdate,
      {
        new: true,
      }
    );
    return updatedData;
  } catch (error) {
    console.log(error);
  }
}

app.post("/books/name/:bookName", async (req, res) => {
  try {
    const updatedRatingData = await updateBookByName(
      req.params.bookName,
      req.body
    );
    if (updatedRatingData) {
      res.status(200).json({
        message: "Book updated successfully.",
        book: updatedRatingData,
      });
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book." });
  }
});

async function deleteBookById(bookId) {
  try {
    const updatedData = Book.findByIdAndDelete(bookId);
    return updatedData;
  } catch (error) {
    console.log(error);
  }
}

app.delete("/books/:bookId", async (req, res) => {
  try {
    const updatedData = await deleteBookById(req.params.bookId);
    if (updatedData) {
      res.status(200).json({
        message: "Book deleted successfully.",
        book: updatedData,
      });
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book." });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
