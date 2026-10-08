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
  
    if (!title || !author) {
      return res.status(400).json({ error: "Başlık ve yazar alanları zorunludur." });
    }
  
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
  const getAllBooks = (req, res) => {
    res.status(200).json(books);
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