# BookNest — Proje Tanıtım Dokümanı

## Projenin Amacı

Bu proje, Node.js Backend Programlama eğitimi kapsamında geliştirdiğim bitirme çalışmasıdır. Küçük bir kitaplığın raflarını ve ödünç kayıtlarını tek bir REST API üzerinden tutmayı denedim. Böylece Node.js, Express.js, routing, middleware ve CRUD konularını kendi senaryomda uyguladım.

## Senaryo

Bir mahalle kitaplığı koleksiyonunu defter yerine dijital tutmak istiyor. Görevli yeni gelen kitabı kaydeder, kitabın rafta mı yoksa ödünçte mi olduğunu görür, bilgisi değişen kaydı günceller ve raftan çıkan kitabı siler. İsterse listeyi duruma, kategoriye veya ada göre süzer; kütüphanenin o anki halini de sayılarla özetler.

BookNest’in bir web sayfası yok. İstemci JSON gönderir, API JSON döner. Postman ile denenebilir; ileride bir arayüz de aynı adreslere bağlanabilir.

Kütüphane açıldığında iki örnek kitap hazırdır: Suç ve Ceza rafta, 1984 ödünçte. Sonraki kayıtları görevli ekler. Kitaplar sunucunun belleğinde durur. Sunucu kapanınca yalnızca bu iki başlangıç kitabı kalır.

## Sistem Özellikleri

- Kitap ekleme, listeleme, detay görüntüleme, güncelleme ve silme
- Her istekte konsola zaman, HTTP metodu ve adres yazan bir logger
- Eklemede başlık, yazar, basım yılı ve raf durumu kontrolü; eksik veya geçersiz veride `400`
- Liste sorgusunda duruma ve kategoriye göre süzme, başlık veya yazarda arama, sayfalama ve tarihe göre sıralama
- Raftaki kitap sayısı, ödünçteki kitap sayısı ve kategori dağılımını veren raporlar

## Kullanılan Teknolojiler

- Node.js
- Express.js
- Geliştirme sırasında sunucuyu yeniden başlatmak için nodemon

## Veri Modeli

Her kitapta kayıt numarası, ad, yazar, kategori, raf durumu, basım yılı ve eklenme zamanı vardır. Numarayı ve eklenme zamanını sunucu verir. Kategori boş gelirse `Genel` yazılır. Yeni kitap rafta (`available`) başlar; ödünçteki kitap `borrowed` olur.

## Test Süreci

Kitap ekleme, listeleme, detay, güncelleme ve silme isteklerini Postman ile denedim. Olmayan bir kitap istendiğinde `404`, başlık veya yazar eksik geldiğinde `400` dönmesini de kontrol ettim. Ekran görüntüleri `docs/postman` klasöründe.

## Repo

Proje kaynak kodu şu adreste:

https://github.com/silakozik/booknest-api
