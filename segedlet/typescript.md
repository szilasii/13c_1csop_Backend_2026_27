# TypeScript tananyag

## 1. Bevezetés

### Mi a TypeScript?

A TypeScript a JavaScript kibővített változata, amely statikus típusosságot és további fejlesztői eszközöket biztosít.

A TypeScript kódot a fordító JavaScriptre alakítja, ezért a böngésző vagy a Node.js végül JavaScriptet futtat.

### TypeScript előnyei

- statikus típusellenőrzés
- jobb IDE-támogatás
- automatikus kiegészítés
- könnyebb refaktorálás
- osztályok és objektumorientált programozási lehetőségek
- interfészek és típusok
- modern JavaScript funkciók támogatása
- nagyobb projektekben biztonságosabb kódolás

---

# 2. Környezet kialakítása

## Node.js ellenőrzése

```bash
node -v
npm -v
```

## TypeScript telepítése

Globálisan:

```bash
npm install -g typescript
```

Projektfüggőségként:

```bash
npm install -D typescript
```

Verzió ellenőrzése:

```bash
npx tsc -v
```

## Projekt létrehozása

```bash
mkdir typescript-demo
cd typescript-demo
npm init -y
npm install -D typescript
```

## tsconfig.json létrehozása

```bash
npx tsc --init
```

---

# 3. A TypeScript fordítása

Hozzunk létre egy `index.ts` fájlt:

```typescript
const message: string = "Hello TypeScript!";

console.log(message);
```

Fordítás:

```bash
npx tsc
```

A fordító JavaScript fájlt készít.

Futtatás:

```bash
node index.js
```

---

# 4. Alaptípusok

## string

```typescript
let name: string = "István";
```

## number

```typescript
let age: number = 48;
let price: number = 1999.99;
```

## boolean

```typescript
let active: boolean = true;
```

## bigint

```typescript
let bigNumber: bigint = 12345678901234567890n;
```

## symbol

```typescript
const id: symbol = Symbol("id");

let obj = {
  [id]: "Some value",
}


let fuggv : symbol = Symbol("fuggv");
class Osztaly{
  [fuggv]() {  
    return "Osztály függvény";
}
}

let osztaly:any =  new Osztaly();

let osztalynev = osztaly[id](); 

console.log(osztalynev);
console.log(obj[id]);
```

## any

```typescript
let value: any = 10;

value = "hello";
value = true;
```

Az `any` használata csökkenti a TypeScript típusbiztonságát, ezért lehetőleg kerüljük.

## unknown

```typescript
let value: unknown = "hello";
```

Az `unknown` biztonságosabb, mint az `any`, mert használat előtt ellenőrizni kell a típust.

```typescript
if (typeof value === "string") {
    console.log(value.toUpperCase());
}
```

## null és undefined

```typescript
let result: null = null;
let data: undefined = undefined;
```

---

# 5. Tömbök

```typescript
const numbers: number[] = [1, 2, 3, 4, 5];

const names: string[] = ["Anna", "Béla", "Csaba"];
```

Alternatív szintaxis:

```typescript
const numbers: Array<number> = [1, 2, 3];
```

## Tömb bejárása

```typescript
const names: string[] = ["Anna", "Béla", "Csaba"];

names.forEach((name: string) => {
    console.log(name);
});

for (const name of names) {
  console.log(name);
}
```

---

# 6. Tuple

A tuple előre meghatározott sorrendű és típusú értékeket tartalmaz.

```typescript
const user: [number, string] = [1, "Anna"];
```

Ez hibás:

```typescript
const user: [number, string] = ["Anna", 1];
```

---

# 7. Enum (node -t használod a futtatáshoz nem működik, csak tsx használatával)

```typescript
enum Role {
    ADMIN,
    USER,
    GUEST
}

const role: Role = Role.ADMIN;
```

String értékekkel:

```typescript
enum Status {
    ACTIVE = "active",
    INACTIVE = "inactive",
    DELETED = "deleted"
}
```


---

# 8. Type alias

A `type` segítségével saját típust hozhatunk létre.

```typescript
type User = {
    id: number;
    name: string;
    email: string;
};
```

Használat:

```typescript
const user: User = {
    id: 1,
    name: "Anna",
    email: "anna@example.com"
};
```

---

# 9. Interface

Az interface elsősorban objektumok szerkezetének meghatározására használható.

```typescript
interface User {
    id: number;
    name: string;
    email: string;
}
```

```typescript
const user: User = {
    id: 1,
    name: "Anna",
    email: "anna@example.com"
};
```

## Opcionális tulajdonság

```typescript
interface User {
    id: number;
    name: string;
    avatar?: string;
}
```

Az `avatar` nem kötelező.

```typescript
interface User {
  id: number;
  name: string;
  email?: string;
  isActive: boolean;
}

class userService implements User {
  id: number; 
  name: string;
  email?: string;
  isActive: boolean;
  
  constructor(id: number, name: string, email: string, isActive: boolean) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.isActive = isActive;
  } 
}
```


---

# 10. readonly

```typescript
interface User {
    readonly id: number;
    name: string;
}
```

Az `id` inicializálás után nem módosítható.

```typescript
const user: User = {
    id: 1,
    name: "Anna"
};

// user.id = 2; // hiba


```

---

# 11. Union type

Egy változó többféle típust is elfogadhat.

```typescript
let id: number | string;

id = 10;
id = "ABC123";
```

## Union objektumokkal

```typescript
type Admin = {
    name: string;
    permissions: string[];
};

type Customer = {
    name: string;
    address: string;
};

type User = Admin | Customer;
```

---

# 12. Literal type

```typescript
let direction: "left" | "right";

direction = "left";
direction = "right";

// direction = "up"; // hiba
```

---

# 13. Intersection type

Több típust egyesíthetünk.

```typescript
type Person = {
    name: string;
};

type Employee = {
    employeeId: number;
};

type Worker = Person & Employee;
```

```typescript
const worker: Worker = {
    name: "Anna",
    employeeId: 1001
};
```

---