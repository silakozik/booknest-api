// POST /books gövdesini controller'dan önce kontrol eder
const validateBook = (req, res, next) => {
  const { title, author, publishedYear, status } = req.body;

  // Başlık ve yazar zorunlu
  if (!title || !author) {
    return res.status(400).json({ error: "Başlık ve yazar alanları zorunludur." });
  }

  // Yıl gönderildiyse tam sayı ve 0 veya daha büyük olmalı
  if (
    publishedYear !== undefined &&
    (!Number.isInteger(publishedYear) || publishedYear < 0)
  ) {
    return res.status(400).json({ error: "publishedYear geçerli bir yıl olmalı." });
  }

  // Durum gönderildiyse yalnızca bu iki değer kabul edilir
  if (status !== undefined && !["available", "borrowed"].includes(status)) {
    return res.status(400).json({ error: "status available veya borrowed olmalı." });
  }

  next();
};

module.exports = validateBook;
