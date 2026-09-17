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
# 14. Függvények

## Paraméterek típusozása

```typescript
function add(a: number, b: number): number {
    return a + b;
}
```

```typescript
console.log(add(10, 20));
```

## void

Ha a függvény nem ad vissza értéket:

```typescript
function printMessage(message: string): void {
    console.log(message);
}
```

## Több paraméter

```typescript
function createUser(
    name: string,
    age: number,
    active: boolean
): void {
    console.log(name, age, active);
}
```

---

# 15. Opcionális paraméter

```typescript
function greet(name: string, title?: string): string {
    if (title) {
        return `Hello ${title} ${name}`;
    }

    return `Hello ${name}`;
}
```

---

# 16. Alapértelmezett paraméter

```typescript
function greet(name: string = "Guest"): string {
    return `Hello ${name}`;
}
```

---

# 17. Arrow function

```typescript
const add = (a: number, b: number): number => {
    return a + b;
};
```

Rövid változat:

```typescript
const multiply = (a: number, b: number): number => a * b;
```

---

# 18. Objektumok típusozása

```typescript
const user: {
    id: number;
    name: string;
    active: boolean;
} = {
    id: 1,
    name: "Anna",
    active: true
};
```

Nagyobb projektnél célszerű inkább `interface` vagy `type` használata.

---

# 19. Type assertion

A type assertion segítségével jelezhetjük a TypeScriptnek, hogy egy értéket milyen típusként szeretnénk kezelni.

```typescript
const value: unknown = "Hello";

const text = value as string;

console.log(text.toUpperCase());
```

Másik szintaxis:

```typescript
const text = <string>value;
```

TSX/JSX környezetben az `as` szintaxis ajánlott.

---

# 20. Type narrowing

A TypeScript képes egy union típus szűkítésére.

```typescript
function printValue(value: string | number): void {
    if (typeof value === "string") {
        console.log(value.toUpperCase());
    } else {
        console.log(value.toFixed(2));
    }
}
```

---

# 21. Interface öröklés

```typescript
interface Person {
    name: string;
}

interface Employee extends Person {
    employeeId: number;
}
```

```typescript
const employee: Employee = {
    name: "Anna",
    employeeId: 1001
};
```

---

# 22. Osztályok

```typescript
class User {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    introduce(): string {
        return `My name is ${this.name}`;
    }
}
```

Használat:

```typescript
const user = new User("Anna", 25);

console.log(user.introduce());
```

---

# 23. public, private, protected

```typescript
class User {
    public name: string;
    private password: string;
    protected role: string;

    constructor(
        name: string,
        password: string,
        role: string
    ) {
        this.name = name;
        this.password = password;
        this.role = role;
    }
}
```

A `private` csak az osztályon belül érhető el.

A `protected` az osztályban és annak leszármazottaiban használható.

---

# 24. Getter és setter

```typescript
class User {
    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
}
```

---

# 25. Abstract class

```typescript
abstract class Animal {
    abstract makeSound(): void;

    move(): void {
        console.log("Moving...");
    }
}
```

```typescript
class Dog extends Animal {
    makeSound(): void {
        console.log("Woof!");
    }
}
```

---

# 26. Generikusok

A generikusok segítségével újrafelhasználható, típusbiztos kódot készíthetünk.

```typescript
function identity<T>(value: T): T {
    return value;
}
```

```typescript
const numberValue = identity<number>(10);
const textValue = identity<string>("Hello");
```

A TypeScript gyakran automatikusan kikövetkezteti a típust:

```typescript
const result = identity(100);
```

---

# 27. Generikus tömb

```typescript
function getFirst<T>(items: T[]): T {
    return items[0];
}
```

```typescript
const firstNumber = getFirst([10, 20, 30]);
const firstName = getFirst(["Anna", "Béla"]);
```

---

# 28. Generic interface

```typescript
interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}
```

```typescript
interface User {
    id: number;
    name: string;
}

const response: ApiResponse<User> = {
    success: true,
    data: {
        id: 1,
        name: "Anna"
    }
};
```

---

# 29. Utility Types

## Partial

Minden tulajdonság opcionális lesz.

```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

const updateUser: Partial<User> = {
    name: "Béla"
};
```

## Required

Minden tulajdonság kötelező.

```typescript
const user: Required<User> = {
    id: 1,
    name: "Anna",
    email: "anna@example.com"
};
```

## Pick

Csak meghatározott tulajdonságokat választ ki.

```typescript
type UserPreview = Pick<User, "id" | "name">;
```

## Omit

Meghatározott tulajdonságokat kihagy.

```typescript
type UserWithoutId = Omit<User, "id">;
```

## Readonly

```typescript
type ReadonlyUser = Readonly<User>;
```

---

# 30. keyof

A `keyof` egy típus kulcsait adja vissza union formában.

```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

type UserKey = keyof User;
```

A `UserKey` értékei:

```text
"id" | "name" | "email"
```

---

# 31. typeof

A `typeof` segítségével egy meglévő változó típusából készíthetünk típust.

```typescript
const user = {
    id: 1,
    name: "Anna"
};

type User = typeof user;
```

---

# 32. Null ellenőrzés

```typescript
function printName(name: string | null): void {
    if (name !== null) {
        console.log(name.toUpperCase());
    }
}
```

Optional chaining:

```typescript
user?.name
```

Nullish coalescing:

```typescript
const name = user?.name ?? "Unknown";
```

---

# 33. Promise és async/await

```typescript
async function getUser(): Promise<string> {
    return "Anna";
}
```

```typescript
async function main(): Promise<void> {
    const name = await getUser();

    console.log(name);
}

main();
```
### Promise órai kiegészítés

```typescript
interface IUser {
  id:number,
  name:string,
  email:string,
  age:number
}


const getUser = (): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    const success = true
    if (success) {
      setTimeout(() => {
        resolve({id:10,name:"sdfgd",email:"maci@vmi.hu",age:40})
      }, 5000)
    } else {
      reject("Az User adatatok nem kerhetok le")
    }
  })
}

const getAdmin = (ws:number): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    const success = true
    if (success) {
      setTimeout(() => {
        resolve({id:10,name:"sdfgd",email:"maci@vmi.hu",age:40})
      }, ws)
    } else {
      reject("Az admin adatatok nem kerhetok le")
    }
  })
}

// getUser().then((name:IUser) => {
//   console.log("Name:",name)
// }).catch((error) => {
//   console.error("Error: ",error)
// })

const user = Promise.resolve({id:10,name:"sdfgd",email:"maci@vmi.hu",age:40})

Promise.all([getUser(),getAdmin(3000)]).then(([user,admin]) => {
    console.log("UserAdat: ",user)
    console.log("adminAdat:", admin)
})

Promise.race([getUser(),getAdmin(2000)]).then((leggyorsabb) => {
    console.log("UserAdat: ",leggyorsabb)
  
})
```

---