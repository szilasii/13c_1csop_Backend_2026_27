-- Active: 1741853165177@@127.0.0.1@3306@webshop
created database webshop COLLATE utf8mb4_unicode_ci;
use webshop;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    price INT NOT NULL,
    currency VARCHAR(3) DEFAULT 'HUF',
    stock INT NOT NULL DEFAULT 0,
    rating DECIMAL(2,1) DEFAULT NULL,
    active BOOLEAN DEFAULT TRUE,
    description TEXT,
    image VARCHAR(255) DEFAULT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO products (id, name, category, brand, price, currency, stock, rating, active, description, image) VALUES
(1, 'Laptop Pro 15', 'Laptop', 'TechMaster', 349990, 'HUF', 12, 4.8, TRUE, 'Nagy teljesítményű 15 colos laptop munkára és játékra.', 'laptop-pro-15.jpg'),
(2, 'Laptop Air 14', 'Laptop', 'TechMaster', 289990, 'HUF', 18, 4.6, TRUE, 'Könnyű és vékony laptop mindennapi használatra.', 'laptop-air-14.jpg'),
(3, 'OfficeBook 15', 'Laptop', 'OfficeTech', 219990, 'HUF', 25, 4.4, TRUE, 'Megbízható notebook irodai munkához.', 'officebook-15.jpg'),
(4, 'Gaming Beast X', 'Laptop', 'GameTech', 599990, 'HUF', 7, 4.9, TRUE, 'Erős gamer laptop modern játékokhoz.', 'gaming-beast-x.jpg'),
(5, 'StudentBook 13', 'Laptop', 'EduTech', 159990, 'HUF', 32, 4.2, TRUE, 'Kompakt laptop tanuláshoz és otthoni használatra.', 'studentbook-13.jpg'),
(6, 'UltraBook 16', 'Laptop', 'TechMaster', 429990, 'HUF', 9, 4.7, TRUE, 'Prémium kialakítású ultrabook nagy kijelzővel.', 'ultrabook-16.jpg'),
(7, 'Mini Laptop 11', 'Laptop', 'MobileTech', 129990, 'HUF', 41, 4.1, TRUE, 'Kis méretű laptop utazáshoz.', 'mini-laptop-11.jpg'),
(8, 'CreatorBook 17', 'Laptop', 'DesignTech', 529990, 'HUF', 5, 4.8, TRUE, 'Nagy teljesítményű notebook kreatív munkához.', 'creatorbook-17.jpg'),
(9, 'BusinessBook 14', 'Laptop', 'OfficeTech', 319990, 'HUF', 14, 4.5, TRUE, 'Üzleti felhasználásra optimalizált notebook.', 'businessbook-14.jpg'),
(10, 'TravelBook 14', 'Laptop', 'MobileTech', 249990, 'HUF', 21, 4.3, TRUE, 'Hosszú üzemidejű hordozható laptop.', 'travelbook-14.jpg'),
(11, 'Smartphone X1', 'Telefon', 'SmartTech', 189990, 'HUF', 30, 4.5, TRUE, 'Modern okostelefon nagy kijelzővel.', 'smartphone-x1.jpg'),
(12, 'Smartphone X2', 'Telefon', 'SmartTech', 239990, 'HUF', 22, 4.7, TRUE, 'Középkategóriás telefon nagy teljesítménnyel.', 'smartphone-x2.jpg'),
(13, 'Smartphone Pro', 'Telefon', 'SmartTech', 399990, 'HUF', 10, 4.9, TRUE, 'Prémium okostelefon fejlett kamerával.', 'smartphone-pro.jpg'),
(14, 'Phone Lite', 'Telefon', 'MobileTech', 99990, 'HUF', 45, 4.0, TRUE, 'Megfizethető okostelefon alapfelhasználásra.', 'phone-lite.jpg'),
(15, 'Phone Max', 'Telefon', 'SmartTech', 329990, 'HUF', 16, 4.6, TRUE, 'Nagy kijelzős prémium telefon.', 'phone-max.jpg'),
(16, 'PowerPhone 5000', 'Telefon', 'PowerTech', 169990, 'HUF', 27, 4.4, TRUE, 'Nagy akkumulátorral rendelkező okostelefon.', 'powerphone-5000.jpg'),
(17, 'Compact Phone', 'Telefon', 'MobileTech', 139990, 'HUF', 19, 4.2, TRUE, 'Kompakt méretű modern okostelefon.', 'compact-phone.jpg'),
(18, 'PhotoPhone Pro', 'Telefon', 'PhotoTech', 449990, 'HUF', 8, 4.9, TRUE, 'Kiemelkedő kamerarendszerrel rendelkező telefon.', 'photophone-pro.jpg'),
(19, 'EcoPhone', 'Telefon', 'GreenTech', 119990, 'HUF', 35, 4.1, TRUE, 'Kedvező árú, környezetbarát telefon.', 'ecophone.jpg'),
(20, 'Business Phone', 'Telefon', 'OfficeTech', 199990, 'HUF', 24, 4.3, TRUE, 'Üzleti kommunikációhoz fejlesztett okostelefon.', 'business-phone.jpg'),
(21, 'Tablet 10', 'Tablet', 'TechMaster', 129990, 'HUF', 26, 4.4, TRUE, '10 colos tablet szórakozáshoz és tanuláshoz.', 'tablet-10.jpg'),
(22, 'Tablet Pro 12', 'Tablet', 'TechMaster', 259990, 'HUF', 15, 4.8, TRUE, 'Nagy teljesítményű professzionális tablet.', 'tablet-pro-12.jpg'),
(23, 'Kids Tablet', 'Tablet', 'EduTech', 79990, 'HUF', 38, 4.2, TRUE, 'Gyerekek számára készült strapabíró tablet.', 'kids-tablet.jpg'),
(24, 'Drawing Tablet', 'Tablet', 'DesignTech', 149990, 'HUF', 11, 4.6, TRUE, 'Digitális rajzoláshoz használható grafikus tablet.', 'drawing-tablet.jpg'),
(25, 'Mini Tablet 8', 'Tablet', 'MobileTech', 89990, 'HUF', 29, 4.1, TRUE, 'Kompakt méretű tablet utazáshoz.', 'mini-tablet-8.jpg'),
(26, 'Tablet Air', 'Tablet', 'MobileTech', 179990, 'HUF', 17, 4.5, TRUE, 'Vékony és könnyű tablet.', 'tablet-air.jpg'),
(27, 'Reader Tablet', 'Tablet', 'BookTech', 109990, 'HUF', 20, 4.3, TRUE, 'Olvasáshoz optimalizált tablet.', 'reader-tablet.jpg'),
(28, 'Gaming Tablet', 'Tablet', 'GameTech', 199990, 'HUF', 12, 4.7, TRUE, 'Nagy teljesítményű tablet játékokhoz.', 'gaming-tablet.jpg');


select * from products;