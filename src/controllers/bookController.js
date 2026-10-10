// Bellek içi (in-memory) başlangıç verileri
let books = [
    {
      id: 1,
      title: "Suç ve Ceza",
      author: "Fyodor Dostoyevski",
      category: "Klasik Roman",
      status: "available",
      publishedYear: 1866,
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      category: "Distopya",
      status: "borrowed",
      publishedYear: 1949,
      createdAt: new Date().toISOString()
    }
  ];
  
  let nextId = 3;
  
  // 1. Kitap Ekleme (POST)
  const createBook = (req, res) => {
    const { title, author, category, publishedYear } = req.body;

    const newBook = {
      id: nextId++,
      title,
      author,
      category: category || "Genel",
      status: "available",
      publishedYear: publishedYear || null,
      createdAt: new Date().toISOString()
    };
  
    books.push(newBook);
    res.status(201).json(newBook);
  };
  
  // 2. Tüm Kitapları Listeleme (GET)
  // Örnek: /books?status=available&category=Distopya&search=orwell&page=1&limit=10&sort=createdAt
  const getAllBooks = (req, res) => {
    const { status, category, search, sort } = req.query;
    // Asıl listeyi bozmamak için kopya üzerinde çalışılır
    let result = [...books];

    // Duruma göre filtre (available veya borrowed)
    if (status) {
      result = result.filter((book) => book.status === status);
    }

    // Kategoriye göre filtre; büyük/küçük harf fark etmez
    if (category) {
      const categoryQuery = category.toLowerCase();
      result = result.filter(
        (book) => book.category.toLowerCase() === categoryQuery
      );
    }

    // Başlık veya yazar içinde arama
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(q) ||
          book.author.toLowerCase().includes(q)
      );
    }

    // createdAt: eskiden yeniye, -createdAt: yeniden eskiye
    if (sort === "createdAt") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sort === "-createdAt") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort) {
      return res.status(400).json({
        error: "sort yalnızca createdAt veya -createdAt olabilir."
      });
    }

    // page ve limit yoksa 1. sayfa, sayfa başı 10 kayıt
    const page = req.query.page !== undefined ? parseInt(req.query.page, 10) : 1;
    const limit = req.query.limit !== undefined ? parseInt(req.query.limit, 10) : 10;

    if (!Number.isInteger(page) || page < 1) {
      return res.status(400).json({ error: "page 1 veya daha büyük bir sayı olmalı." });
    }

    if (!Number.isInteger(limit) || limit < 1) {
      return res.status(400).json({ error: "limit 1 veya daha büyük bir sayı olmalı." });
    }

    // Filtrelenmiş listenin istenen dilimini döndür
    const total = result.length;
    const start = (page - 1) * limit;

    res.status(200).json({
      data: result.slice(start, start + limit),
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    });
  };
  
  // 3. Tekil Kitap Getirme (GET :id)
  const getBookById = (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find((b) => b.id === id);
  
    if (!book) {
      return res.status(404).json({ error: "Kitap bulunamadı." });
    }
  
    res.status(200).json(book);
  };
  
  // 4. Kitap Güncelleme (PUT :id)
  const updateBook = (req, res) => {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex((b) => b.id === id);
  
    if (bookIndex === -1) {
      return res.status(404).json({ error: "Güncellenecek kitap bulunamadı." });
    }
  
    const { title, author, category, status, publishedYear } = req.body;
  
    books[bookIndex] = {
      ...books[bookIndex],
      title: title || books[bookIndex].title,
      author: author || books[bookIndex].author,
      category: category || books[bookIndex].category,
      status: status || books[bookIndex].status,
      publishedYear: publishedYear !== undefined ? publishedYear : books[bookIndex].publishedYear
    };
  
    res.status(200).json(books[bookIndex]);
  };
  
  // 5. Kitap Silme (DELETE :id)
  const deleteBook = (req, res) => {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex((b) => b.id === id);
  
    if (bookIndex === -1) {
      return res.status(404).json({ error: "Silinecek kitap bulunamadı." });
    }
  
    const deletedBook = books.splice(bookIndex, 1);
    res.status(200).json({ message: "Kitap başarıyla silindi.", book: deletedBook[0] });
  };
  
  module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
  };