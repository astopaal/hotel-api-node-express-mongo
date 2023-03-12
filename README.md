# hotel-api-node-express-mongo

Bu nodejs web api uygulaması, bir oda kiralama servisi için kullanılmayı amaçlar.


## Temel olarak,
##### Nodejs, expressjs, mongodb teknolojileri ve
##### cors, bodyparser, jwt gibi birtakım yardımcı kütüphaneler de kullanılmıştır.

### Çalıştırmak için,

Öncelikle ``` git clone https://github.com/astopaal/hotel-api-node-express-mongo.git ``` ile projeyi klonlayın.
Ardından ```cd hotel-hotel-api-node-express-mongo ``` komutuyla klasör içine giderek ``` npm install ``` komutunu çalıtırın ve gereken paketleri yükleyin.

.env dosyası oluşturup port değerini ve mongo uri değerlerini kendi ayarlarınıza göre ayarlamanız gerekebilir.

### Son olarak

``` npm start ``` komutu ile nodemon yardımıyla projeyi çalıştırın.


## Hiyerarşi
```
└───config
│   │   db.js //mongodb bağlantılarını tutar
│   
└───controllers
    │   auth.js
    │   hotel.js
    │   room.js
    │   user.js
│   
└───middlewares
    │   verify.js //jwt ile admin - user ve token doğrulamalarını kontrol eder
│   
└───models
    │   hotel.js
    │   room.js
    │   user.js
│   
└───routes
    │   auth.js
    │   hotel.js
    │   room.js
    │   user.js
│   
└───index.js
```
