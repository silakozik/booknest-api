# BookNest API

## Amaç

BookNest, küçük bir kitaplığın raflarını ve ödünç kayıtlarını takip eden bir REST API'dir. Amaç, kitap ekleme, listeleme, görüntüleme, güncelleme ve silme işlemlerini tek bir sunucu üzerinden sunmak; isteğe bağlı olarak listeyi süzmek ve kütüphanenin o anki durumunu sayılarla özetlemektir.

Sistem bir web arayüzü değildir. İstemci (Postman veya başka bir HTTP istemcisi) JSON gönderir, API JSON döner.

## Senaryo

Bir mahalle kitaplığı koleksiyonunu dijital tutmak istiyor. Görevli yeni gelen kitabı kaydeder, rafta mı yoksa ödünçte mi olduğunu görür, bilgisi değişen kitabı günceller ve kayıttan düşen kitabı siler.

Kütüphane açıldığında iki örnek kitap hazırdır: Suç ve Ceza (rafta) ve 1984 (ödünçte). Görevli bundan sonra kitapları kendisi ekler. Kayıtlar sunucunun belleğinde durur. Sunucu kapanınca yalnızca bu iki başlangıç kitabı kalır; oturum sırasında eklenenler silinir.

Her istek konsola yazılır: zaman, HTTP metodu ve adres.

## Kitap veri modeli

Her kitap aşağıdaki alanlardan oluşur.

| Alan | Anlamı | Kural |
|---|---|---|
| `id` | Kayıt numarası | Sunucu verir, 1'den başlar |
| `title` | Kitap adı | Eklemede zorunlu |
| `author` | Yazar | Eklemede zorunlu |
| `category` | Kategori | Boşsa `Genel` |
| `status` | Raf durumu | `available` (rafta) veya `borrowed` (ödünçte). Yeni kitap `available` olur |
| `publishedYear` | Basım yılı | İsteğe bağlı. Gönderilirse 0 veya daha büyük bir tam sayı |
| `createdAt` | Eklenme zamanı | Sunucu, ISO tarih olarak yazar |

Eklemede `title` veya `author` eksikse, yıl geçersizse ya da `status` bu iki değerden biri değilse API `400` ve açıklayıcı bir hata mesajı döner.

## Endpoint listesi

Temel adres: `http://localhost:3000`

### Kitaplar

| Metot | Adres | İş |
|---|---|---|
| `POST` | `/books` | Kitap ekler. Gövde JSON. Başarılı cevap `201` |
| `GET` | `/books` | Kitapları listeler |
| `GET` | `/books/:id` | Tek kitabın detayını getirir. Yoksa `404` |
| `PUT` | `/books/:id` | Gönderilen alanları günceller. Yoksa `404` |
| `DELETE` | `/books/:id` | Kitabı siler. Yoksa `404` |

Liste sorgusu isteğe bağlı parametre alır:

- `status` — `available` veya `borrowed`
- `category` — kategori adı
- `search` — başlık veya yazar içinde arama
- `page` ve `limit` — sayfalama. Varsayılan `page=1`, `limit=10`
- `sort` — `createdAt` (eskiden yeniye) veya `-createdAt` (yeniden eskiye)

Liste cevabı `data`, `page`, `limit`, `total` ve `totalPages` alanlarını içerir.

### Raporlar

| Metot | Adres | İş |
|---|---|---|
| `GET` | `/reports/available` | Raftaki kitap sayısı |
| `GET` | `/reports/borrowed` | Ödünçteki kitap sayısı |
| `GET` | `/reports/summary` | Toplam, rafta, ödünçte ve kategori dağılımı |

Raporlar yeni kayıt tutmaz. İstek anındaki listeyi sayar.
