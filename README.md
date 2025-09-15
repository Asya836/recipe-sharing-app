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
<img width="700" height="500" src="https://github.com/user-attachments/assets/0ef5dd27-2008-4f01-90fc-b20c1eb1f961" />

Giriş ve kayıt sayfaları
<img width="700" height="500" src="https://github.com/user-attachments/assets/3d1cfc68-45a1-4165-87d3-dcffb58464df" />
<img width="700" height="500" src="https://github.com/user-attachments/assets/6de49144-cf1c-4aad-9889-10bc9c7fbcad" />

Giriş yapıldıktan sonra anasayfa görüntüsü
<img width="700" height="500" src="https://github.com/user-attachments/assets/dd773766-e829-43c1-91be-e81816173213" />

Tarif ekleme sayfası(Anasayfada sağ alttaki butona basınca açılır)
<img width="700" height="500" src="https://github.com/user-attachments/assets/312770e0-0fd2-4c7b-8eaa-49d1b1de97b4" />

Tarif detay görüntüsü
<img width="700" height="500" src="https://github.com/user-attachments/assets/f2fdf878-8f25-41d9-8992-6a71042e2191" />

Arama ve kategorileme
<img width="700" height="500" src="https://github.com/user-attachments/assets/dbf00545-c243-4edd-8f4a-dd623c8021fb" />
<img width="700" height="500" src="https://github.com/user-attachments/assets/822effa1-cb34-47aa-9a8d-cec3924f88a6" />

Profil sayfası

<img width="700" height="500" src="https://github.com/user-attachments/assets/471e34ad-131a-4aa8-86a6-d88ac09e2776" />


Kullanıcı bilgileri düzenleme
<img width="700" height="500" src="https://github.com/user-attachments/assets/e47779fa-5e9c-4d68-92b7-cdefbf11953d" />

Tarif bilgileri düzenleme
<img width="700" height="500" src="https://github.com/user-attachments/assets/22bfa55b-4677-456c-9fdb-dc40d8aedb64" />


## Geliştirme Fikirleri
- Tarif beğenme, kaydetme ve yorum yapma eklenebilir.
- Diğer kullanıcıların profilleri görüntülebilir ve kullanıcıların birbirlerini takip etmesi sağlanabilir.
