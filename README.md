# BookNest API

Küçük bir kitaplığın raflarını ve ödünç kayıtlarını takip eden REST API. Amaç, senaryo ve endpoint listesi `docs/proje-tanitim.md` dosyasındadır.

## Gereksinim

Bilgisayarda [Node.js](https://nodejs.org/) 18 veya üzeri kurulu olmalıdır.

## Kurulum

Repoyu indir:

```bash
git clone https://github.com/silakozik/booknest-api.git
cd booknest-api
```

Bağımlılıkları yükle:

```bash
npm install
```

## Çalıştırma

Geliştirme modunda başlat. Dosya değişince sunucu kendiliğinden yenilenir:

```bash
npm run dev
```

API şu adreste çalışır: [http://localhost:3000](http://localhost:3000)

Yeniden başlatma gerekmeyen tek seferlik çalıştırma için:

```bash
npm start
```

Konsolda `BookNest API http://localhost:3000 üzerinde çalışıyor.` yazısını gördükten sonra istek atabilirsin. Örnek:

```bash
curl http://localhost:3000/books
```
