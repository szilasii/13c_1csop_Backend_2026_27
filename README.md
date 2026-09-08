## Tananyag célja

A tananyag célja, hogy a hallgató megismerje a backend programozás alapfogalmait, a HTTP protokoll működését, a REST API-k használatát, valamint egy egyszerű webalkalmazás felépítését és hosztolását.

A példák elsődlegesen **Node.js + Express + JavaScript** környezetet használnak, mert ezek segítségével a backend működése jól szemléltethető.

---

# 1. HTTP alapok

## 1.1. Mi az a HTTP?

A **HTTP (HyperText Transfer Protocol)** egy alkalmazási rétegbeli protokoll, amelyet elsősorban webes kliensek és szerverek közötti kommunikációra használunk.

Egy tipikus kommunikáció:

```text
Kliens                         Szerver
  |                              |
  | -------- HTTP Request ------>|
  |                              |
  | <------- HTTP Response ------|
  |                              |
```

A kliens lehet például:

- webböngésző,
- mobilalkalmazás,
- Postman,
- másik backend alkalmazás,
- JavaScript frontend alkalmazás.

A szerver:

- fogadja a kérést,
- feldolgozza azt,
- opcionálisan adatbázist használ,
- választ küld vissza.

---

# 2. HTTP kérés felépítése

Egy HTTP kérés fő részei:

1. Request line
2. HTTP headerek
3. Üres sor
4. Request body – ha szükséges

Példa:

```http
POST /api/users HTTP/1.1
Host: example.com
Content-Type: application/json
Authorization: Bearer abc123

{
  "name": "Kiss Péter",
  "email": "peter@example.com"
}
```

## 2.1. Request line

A request line három részből áll:

```text
METHOD PATH HTTP-VERSION
```

Példa:

```http
GET /api/users HTTP/1.1
```

Ebben:

- `GET` – HTTP metódus,
- `/api/users` – kért erőforrás,
- `HTTP/1.1` – HTTP verzió.

---

# 3. HTTP Methods

A legfontosabb HTTP metódusok:

| Metódus | Tipikus használat |
|---|---|
| GET | Adatok lekérése |
| POST | Új erőforrás létrehozása |
| PUT | Erőforrás teljes cseréje |
| PATCH | Erőforrás részleges módosítása |
| DELETE | Erőforrás törlése |
| OPTIONS | A támogatott kommunikációs lehetőségek lekérdezése |

---

# 4. GET

A `GET` metódust adatok lekérésére használjuk.

Példa:

```http
GET /api/users
```

Egy adott felhasználó:

```http
GET /api/users/15
```

Express példa:

```js
app.get('/api/users', (req, res) => {
    res.json([
        { id: 1, name: 'Anna' },
        { id: 2, name: 'Béla' }
    ]);
});
```

## Fontos tulajdonság

A GET kérés paraméterei gyakran az URL-ben találhatók.

```text
/api/users?page=2&limit=10
```

Ezeket query paramétereknek nevezzük.

Express:

```js
app.get('/api/users', (req, res) => {
    const page = req.query.page;
    const limit = req.query.limit;

    res.json({ page, limit });
});
```

---

# 5. POST

A `POST` metódust tipikusan új erőforrás létrehozására használjuk.

Példa:

```http
POST /api/users
Content-Type: application/json

{
  "name": "Nagy Anna",
  "email": "anna@example.com"
}
```

Express:

```js
app.use(express.json());

app.post('/api/users', (req, res) => {
    const user = req.body;

    console.log(user);

    res.status(201).json({
        message: 'Felhasználó létrehozva',
        user
    });
});
```

A kérés törzse a:

```js
req.body
```

segítségével érhető el.

---

# 6. PUT

A `PUT` általában egy meglévő erőforrás teljes módosítására vagy cseréjére szolgál.

```http
PUT /api/users/15
Content-Type: application/json

{
  "name": "Kovács Péter",
  "email": "peter@example.com"
}
```

Express:

```js
app.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const user = req.body;

    res.json({
        id,
        user
    });
});
```

A PUT esetén az egész erőforrás reprezentációját célszerű elküldeni.

---

# 7. PATCH

A `PATCH` részleges módosításra szolgál.

Ha például csak a nevet szeretnénk módosítani:

```http
PATCH /api/users/15
Content-Type: application/json

{
  "name": "Új Péter"
}
```

Express:

```js
app.patch('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    res.json({
        id,
        changes
    });
});
```

## PUT és PATCH összehasonlítása

### PUT

```json
{
  "name": "Péter",
  "email": "peter@example.com",
  "age": 30
}
```

### PATCH

```json
{
  "age": 31
}
```

A PATCH segítségével csak a módosítandó mezőket küldjük el.

---

# 8. DELETE

A `DELETE` metódussal erőforrást törölhetünk.

```http
DELETE /api/users/15
```

Express:

```js
app.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    res.status(204).send();
});
```

A `204 No Content` azt jelenti, hogy a kérés sikeres volt, de nincs válasz törzs.

---

# 9. OPTIONS

Az `OPTIONS` metódussal egy erőforrás által támogatott kommunikációs lehetőségeket lehet lekérdezni.

Példa:

```http
OPTIONS /api/users
```

A válasz tartalmazhat például:

```http
Allow: GET, POST, PUT, PATCH, DELETE, OPTIONS
```

Az OPTIONS különösen fontos a böngészős **CORS** kommunikációban.

Bizonyos cross-origin kérések előtt a böngésző úgynevezett **preflight** kérést küld.

---

# 10. HTTP headerek

A headerek metaadatokat továbbítanak a HTTP kérésben vagy válaszban.

Példa:

```http
GET /api/users HTTP/1.1
Host: example.com
Accept: application/json
Authorization: Bearer token123
User-Agent: Mozilla/5.0
```

## Gyakori request headerek

### Content-Type

Megadja, milyen formátumú a request body.

```http
Content-Type: application/json
```

### Accept

Megadja, hogy a kliens milyen választ vár.

```http
Accept: application/json
```

### Authorization

Hitelesítési információ továbbítására használható.

```http
Authorization: Bearer eyJhbGciOi...
```

### User-Agent

Információt ad a kliensről.

```http
User-Agent: Mozilla/5.0
```

---

# 11. Gyakori response headerek

Példa:

```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 125
Cache-Control: no-cache
```

Gyakori response headerek:

- `Content-Type`
- `Content-Length`
- `Cache-Control`
- `Location`
- `Set-Cookie`
- CORS headerek

---

# 12. HTTP kérés- és választípusok

## 12.1. JSON

A modern REST API-k egyik leggyakoribb adatformátuma.

```json
{
  "id": 10,
  "name": "Anna"
}
```

Request:

```http
Content-Type: application/json
```

---

## 12.2. Form URL encoded

HTML formoknál gyakori:

```http
Content-Type: application/x-www-form-urlencoded
```

Példa:

```text
name=Anna&email=anna%40example.com
```

---

## 12.3. Multipart/form-data

Fájlok feltöltésénél használjuk.

```http
Content-Type: multipart/form-data
```

Például:

- profilkép feltöltése,
- dokumentum feltöltése,
- több fájl feltöltése.

---

# 13. HTTP státuszkódok

A szerver státuszkóddal jelzi a kérés eredményét.

## 2xx – sikeres kérés

| Kód | Jelentés |
|---|---|
| 200 | OK |
| 201 | Created |
| 202 | Accepted |
| 204 | No Content |

## 3xx – átirányítás

| Kód | Jelentés |
|---|---|
| 301 | Moved Permanently |
| 302 | Found |
| 304 | Not Modified |

## 4xx – kliensoldali hiba

| Kód | Jelentés |
|---|---|
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 405 | Method Not Allowed |
| 409 | Conflict |
| 422 | Unprocessable Content |

## 5xx – szerveroldali hiba

| Kód | Jelentés |
|---|---|
| 500 | Internal Server Error |
| 501 | Not Implemented |
| 502 | Bad Gateway |
| 503 | Service Unavailable |

---

# 14. Postman használata

A **Postman** egy API-k fejlesztésére és tesztelésére használható alkalmazás.

A segítségével HTTP kéréseket küldhetünk szervereknek.

## 14.1. GET kérés

Állítsuk be:

```text
Method: GET
URL: https://jsonplaceholder.typicode.com/users
```

Majd küldjük el a kérést.

A válasz JSON formátumban jelenik meg.

---

## 14.2. POST kérés

```text
Method: POST
URL: https://jsonplaceholder.typicode.com/posts
```

Body:

```json
{
  "title": "Teszt",
  "body": "Ez egy teszt üzenet.",
  "userId": 1
}
```

A Body típusát állítsuk:

```text
raw
JSON
```

---

## 14.3. PATCH kérés

```text
PATCH /posts/1
```

Body:

```json
{
  "title": "Módosított cím"
}
```

---

## 14.4. DELETE kérés

```text
DELETE /posts/1
```

---

## Gyakorlati feladat – Postman

A hallgató feladata:

1. Küldjön GET kérést egy nyilvános teszt API-nak.
2. Keressen meg egy konkrét erőforrást.
3. Küldjön POST kérést.
4. Küldjön PUT vagy PATCH kérést.
5. Küldjön DELETE kérést.
6. Figyelje meg a HTTP státuszkódokat.
7. Vizsgálja meg a request headereket.
8. Vizsgálja meg a response headereket.

---

# 15. Package Manager

A backend projektekben külső csomagokat és függőségeket használunk.

A package manager feladata többek között:

- csomagok telepítése,
- verziók kezelése,
- függőségek nyilvántartása,
- csomagok frissítése,
- build vagy script feladatok indítása.

## Gyakori package managerek

| Platform | Package manager |
|---|---|
| Node.js | NPM |
| PHP | Composer |
| Java | Gradle |
| .NET | NuGet |

---

# 16. NPM

Node.js környezetben az egyik legfontosabb package manager az NPM.

Projekt létrehozása:

```bash
npm init
```

Automatikusan:

```bash
npm init -y
```

Csomag telepítése:

```bash
npm install express
```

Fejlesztési függőség:

```bash
npm install --save-dev nodemon
```

Csomag eltávolítása:

```bash
npm uninstall express
```

---

# 17. package.json

Az NPM projekt legfontosabb konfigurációs fájlja:

```text
package.json
```

Példa:

```json
{
  "name": "backend-demo",
  "version": "1.0.0",
  "description": "Backend gyakorló projekt",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^5.1.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
```

---

# 18. Környezet felépítése

Egy egyszerű Express projekt:

```text
backend-demo/
│
├── node_modules/
├── public/
├── views/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── app.js
│
├── package.json
├── package-lock.json
└── .gitignore
```

Egyszerűbb oktatási projektnél használható:

```text
backend-demo/
├── node_modules/
├── server.js
├── package.json
├── package-lock.json
└── .gitignore
```

---
