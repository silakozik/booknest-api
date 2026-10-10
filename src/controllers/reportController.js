const { getBooks } = require("./bookController");

const countByStatus = (status) =>
  getBooks().filter((book) => book.status === status).length;

// Raftaki kitap sayısı
const getAvailableCount = (req, res) => {
  res.status(200).json({ count: countByStatus("available") });
};

// Ödünçteki kitap sayısı
const getBorrowedCount = (req, res) => {
  res.status(200).json({ count: countByStatus("borrowed") });
};

// Toplam, rafta, ödünçte ve kategori dağılımı
const getSummary = (req, res) => {
  const books = getBooks();
  const byCategory = {};

  for (const book of books) {
    byCategory[book.category] = (byCategory[book.category] || 0) + 1;
  }

  res.status(200).json({
    total: books.length,
    available: countByStatus("available"),
    borrowed: countByStatus("borrowed"),
    byCategory
  });
};

module.exports = {
  getAvailableCount,
  getBorrowedCount,
  getSummary
};
