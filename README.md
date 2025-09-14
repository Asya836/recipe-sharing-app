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
  - `uploads/`: Tarif görselleri

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
- Kullanıcı profil sayfasında kendi bilgileri düzenleme, kullanıcı silme
- Responsive ve modern arayüz (Material UI)
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

## Geliştirme Fikirleri
- Tarif beğenme, kaydetme ve yorum yapma eklenebilir.
- Diğer kullanıcıların profilleri görüntülebilir ve kullanıcıların birbirlerini takip etmesi sağlanabilir.

## Bilinen Hatalar
- Kategorileme veya arama yaparken Category componenti kayıyor.
- Eklenen resimler kaydedilmiyor dolayısıyla görüntülenemiyor.
