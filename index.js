const app = require("./src/app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`BookNest API http://localhost:${PORT} üzerinde çalışıyor.`);
});