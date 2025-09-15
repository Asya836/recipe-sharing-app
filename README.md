# Tarif Paylaşım Uygulaması

Bu proje, kullanıcıların tariflerini paylaşabildiği ve diğer kullanıcıların tariflerini görüntüleyebildiği bir web uygulamasıdır.

## Proje Yapısı

- **client/**: React tabanlı frontend uygulaması
  - `src/`: Tüm kaynak kodları
    - `components/`: React bileşenleri
    - `pages/`: Sayfa bileşenleri (Ana sayfa, Giriş, Kayıt, Profil, Tarif Ekle)
    - `config/`: Router ayarları
    - `css/`: Sayfa stilleri
    - `schema/`: Form doğrulama şemaları
    - `public/assets/`: Görseller
- **server/**: Node.js ve Express tabanlı backend uygulaması
  - `models/`: Mongoose modelleri (User, Recipe)
  - `routes/`: API rotaları (auth, recipe) 

## Kurulum

### Gereksinimler
- Node.js
- npm

### Adımlar

1. Depoyu klonlayın:
   ```sh
   git clone <repo-url>
   ```
2. Sunucu ve istemci bağımlılıklarını yükleyin:
   ```sh
   cd server
   npm install
   cd ../client
   npm install
   ```
3. Sunucuyu başlatın:
   ```sh
   cd ../server
   npm start
   ```
4. İstemciyi başlatın:
   ```sh
   cd ../client
   npm run dev
   ```

## Özellikler

- Kullanıcı kaydı ve girişi (JWT tabanlı kimlik doğrulama)
- Şifreleme ile güvenli kullanıcı verisi saklama
- Tarif ekleme, düzenleme, silme ve görüntüleme
- Tarifler için görsel yükleme ve gösterme
- Kategorilere göre tarif filtreleme
- İsme göre tarif arama
- Ana sayfada tüm tariflerin listelenmesi
- Kullanıcı profil sayfasında kendi tariflerini yönetme
- Kullanıcı profil sayfasında kendi bilgilerini yönetme
- Modern arayüz (Material UI)
- Formlarda anlık doğrulama ve hata mesajları (Formik & Yup)
- Bildirimler ve hata uyarıları (React Toastify)
- Sayfa yönlendirme ve korumalı rotalar (React Router)
- Global state yönetimi (Redux Toolkit)

## Kullanılan Teknolojiler
- React
- Vite
- Node.js
- Express
- MongoDB
- Mongoose

## Kullanılan Kütüphaneler

- **React**: Arayüz geliştirme.
- **React DOM**: React bileşenlerini DOM'a bağlama.
- **React Router DOM**: Sayfa yönlendirme.
- **Formik**: Form yönetimi.
- **Yup**: Form doğrulama.
- **@mui/material**: Material UI bileşenleri.
- **@emotion/react, @emotion/styled**: Stil yönetimi.
- **@reduxjs/toolkit, react-redux**: Global state yönetimi.
- **react-icons**: İkonlar.
- **react-toastify**: Bildirimler.

## Önemli Not
- Proje mobil cihazlar için optimize edilmemiştir. Tarayıcıda görüntülenmesi tavsiye edilir.

## Bilinen Hatalar
- Kategorileme veya arama yaparken Category componenti kayıyor.
- Eklenen resimler kaydedilemiyor dolayısıyla görüntülenemiyor.

## Ekran Görüntüleri

Giriş yapılmadan anasayfa görüntüsü
<img width="700" height="500" alt="başlangıç" src="https://github.com/user-attachments/assets/f5b545be-c8be-4016-9567-5637f3bfa34e" />


Giriş ve kayıt sayfaları
<img width="700" height="500" alt="giriş" src="https://github.com/user-attachments/assets/81baef06-8abe-4acc-9a99-2f78cc9e1d4e" />
<img width="700" height="500" alt="kayıt" src="https://github.com/user-attachments/assets/2b2ff7ee-dad9-41e4-bd8e-2a0864176ef3" />


Giriş yapıldıktan sonra anasayfa görüntüsü
<img width="700" height="500" alt="anasayfa" src="https://github.com/user-attachments/assets/a06e9cc6-9d78-4cf6-9408-391fa74fd0b5" />


Tarif ekleme sayfası(Anasayfada sağ alttaki butona basınca açılır)
<img width="700" height="500" alt="tarif ekle" src="https://github.com/user-attachments/assets/84243462-939a-4011-89ff-03f6c1dec447" />


Tarif detay görüntüsü
<img width="1877" height="850" alt="tarif detay" src="https://github.com/user-attachments/assets/2662008b-7aa4-4eaa-80e0-ff3cca1adc40" />


Arama ve kategorileme
<img width="700" height="500" alt="arama" src="https://github.com/user-attachments/assets/4add4d86-3ff4-4a15-971a-7d404a351cb7" />
<img width="700" height="500" alt="kategori" src="https://github.com/user-attachments/assets/ffd6ddb9-5a5f-4f91-aabd-dd8dc819be37" />


Profil sayfası
<img width="700" height="500" alt="profil" src="https://github.com/user-attachments/assets/477344b2-7f30-460a-a484-c1d72b8206ca" />



Kullanıcı bilgileri düzenleme
<img width="700" height="500" alt="bilgi düzenle" src="https://github.com/user-attachments/assets/51922b45-8e1c-4c41-8d56-069efe24ea8d" />


Tarif bilgileri düzenleme
<img width="700" height="500" alt="tarif düzenle" src="https://github.com/user-attachments/assets/8ec6f15d-fcda-4f13-9ffb-4a1ea287ebc4" />



## Geliştirme Fikirleri
- Tarif beğenme, kaydetme ve yorum yapma eklenebilir.
- Diğer kullanıcıların profilleri görüntülebilir ve kullanıcıların birbirlerini takip etmesi sağlanabilir.
