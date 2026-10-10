# BookNest API

Mahalle kitaplığının raflarını ve ödünç kayıtlarını tutan bir REST API. Node.js Backend Programlama bitirme projesi olarak yazdım. Arayüz yok; istek ve cevap JSON'dur. Amaç ve senaryo `docs/proje-tanitim.md` dosyasında.

## Teknolojiler

- Node.js 18 veya üzeri
- Express.js
- nodemon (geliştirmede dosya değişince sunucu yenilenir)

Kayıtlar bellekte durur. Sunucu kapanınca Suç ve Ceza ile 1984 dışındaki kitaplar silinir.

## Dizin

```
booknest-api/
├── docs/
│   ├── proje-tanitim.md
│   └── postman/
├── src/
│   ├── controllers/
│   ├── middlewares/
│   ├── routes/
│   └── app.js
├── index.js
└── package.json
```

## Ayağa kaldırma

```bash
git clone https://github.com/silakozik/booknest-api.git
cd booknest-api
npm install
npm run dev
```

Tek seferlik çalıştırma için `npm start`. Konsolda `BookNest API http://localhost:3000 üzerinde çalışıyor.` yazınca hazırdır.

## Adresler

| Metot | Adres | İş |
|---|---|---|
| POST | /books | Kitap ekler (`201`) |
| GET | /books | Kitapları listeler |
| GET | /books/:id | Tek kitabı getirir. Yoksa `404` |
| PUT | /books/:id | Gönderilen alanları günceller. Yoksa `404` |
| DELETE | /books/:id | Kitabı siler. Yoksa `404` |
| GET | /reports/available | Raftaki kitap sayısı |
| GET | /reports/borrowed | Ödünçteki kitap sayısı |
| GET | /reports/summary | Toplam, rafta, ödünçte ve kategori dağılımı |

## Listeyi daraltmak

`GET /books` şu parametreleri birlikte de alabilir:

- `status` — `available` veya `borrowed`
- `category` — kategori adı
- `search` — başlık veya yazar
- `page` ve `limit` — varsayılan `1` ve `10`
- `sort` — `createdAt` veya `-createdAt`

Örnek: `/books?status=available&search=dostoyevski`. Cevapta `data`, `page`, `limit`, `total` ve `totalPages` vardır.

## Kitap eklerken gövde

```json
{
  "title": "Simyacı",
  "author": "Paulo Coelho",
  "category": "Roman",
  "publishedYear": 1988
}
```

`title` ve `author` zorunlu. `category` boşsa `Genel` olur. Geçersiz gövdede API `400` döner. Yeni kitap rafta açılır.

## Postman

Ekran görüntüleri `docs/postman` klasöründe.

## İletişim

[GitHub](https://github.com/silakozik)
