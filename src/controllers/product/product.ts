export interface IProduct {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  currency: string;
  stock: number;
  rating: number;
  active: boolean;
  description: string;
  image: string;
}

export class Product implements IProduct {
  // Privát belső állapotok
  private _id: number;
  private _name: string;
  private _category: string;
  private _brand: string;
  private _price: number;
  private _currency: string;
  private _stock: number;
  private _rating: number;
  private _active: boolean;
  private _description: string;
  private _image: string;

  // A konstruktor egy IProduct-ot (vagy annak egy részét) vár paraméterül
  constructor(data: Partial<IProduct> = {}) {
    this._id = data.id ?? 0;
    this._name = data.name ?? '';
    this._category = data.category ?? '';
    this._brand = data.brand ?? '';
    this._currency = data.currency ?? 'HUF';
    this._active = data.active ?? true;
    this._description = data.description ?? '';
    this._image = data.image ?? '';

    // Validált számértékek inicializálása
    this._price = Math.max(0, data.price ?? 0);
    this._stock = Math.max(0, data.stock ?? 0);
    this._rating = Math.min(5, Math.max(0, data.rating ?? 0.0));
  }

  // --- IProduct interface-ből adódó Getterek és Setterek ---

  get id(): number { return this._id; }
  set id(value: number) { this._id = value; } // Bár az ID-t általában nem szabadna módosítani, de a setter itt van a teljes IProduct interface implementálásához

  get name(): string { return this._name; }
  set name(value: string) { this._name = value; }

  get category(): string { return this._category; }
  set category(value: string) { this._category = value; }

  get brand(): string { return this._brand; }
  set brand(value: string) { this._brand = value; }

  get price(): number { return this._price; }
  set price(value: number) {
    if (value < 0) throw new Error("Az ár nem lehet negatív!");
    this._price = value;
  }

  get currency(): string { return this._currency; }
  set currency(value: string) { this._currency = value; }

  get stock(): number { return this._stock; }
  set stock(value: number) {
    if (value < 0) throw new Error("A készlet nem lehet negatív!");
    this._stock = value;
  }

  get rating(): number { return this._rating; }
  set rating(value: number) {
    if (value < 0 || value > 5) throw new Error("Az értékelésnek 0 és 5 között kell lennie!");
    this._rating = value;
  }

  get active(): boolean { return this._active; }
  set active(value: boolean) { this._active = value; }

  get description(): string { return this._description; }
  set description(value: string) { this._description = value; }

  get image(): string { return this._image; }
  set image(value: string) { this._image = value; }

  // --- Extra számított tulajdonságok (Computed Properties) ---

  get formattedPrice(): string {
    return new Intl.NumberFormat('hu-HU', {
      style: 'currency',
      currency: this._currency,
      maximumFractionDigits: 0
    }).format(this._price);
  }

  // --- Üzleti logikai metódusok ---

  public reduceStock(amount: number): boolean {
    if (amount <= 0 || this._stock < amount) return false;
    this._stock -= amount;
    return true;
  }

  public increaseStock(amount: number): void {
    if (amount > 0) this._stock += amount;
  }

  public applyDiscount(percentage: number): void {
    if (percentage < 0 || percentage > 100) {
      throw new Error("A kedvezménynek 0 és 100% között kell lennie!");
    }
    const discountAmount = (this._price * percentage) / 100;
    this._price = Math.round(this._price - discountAmount);
  }

  // Segédfunkció az adatok tiszta JSON-ná alakításához (pl. API-nak való visszaküldéshez)
  public toJSON(): IProduct {
    return {
      id: this._id,
      name: this._name,
      category: this._category,
      brand: this._brand,
      price: this._price,
      currency: this._currency,
      stock: this._stock,
      rating: this._rating,
      active: this._active,
      description: this._description,
      image: this._image,
    };
  }
}



export class ProductManager {
  // Belsőleg Product osztálypéldányok tömbjeként tároljuk a gazdag funkciók miatt
  private _products: Product[] = [];

  constructor(initialProducts: Partial<IProduct>[] = []) {
    this._products = initialProducts.map(p => new Product(p));
  }

  // --- GETTEREK ---

  // Visszaadja az összes terméket tiszta IProduct tömbként (biztonságos exportáláshoz)
  get allProductsData(): IProduct[] {
    return this._products.map(p => p.toJSON());
  }

  // Visszaadja a belső Product példányok tömbjét (ha közvetlenül a metódusaikat akarjuk hívni)
  get products(): Product[] {
    return this._products;
  }

  // --- CRUD MŰVELETEK ---

  // Új termék hozzáadása
  public addProduct(productData: Partial<Product>): void {
  
    // Egyszerű ID generálás, ha nincs megadva
      const maxId = this._products.reduce((max, p) => p.id > max ? p.id : max, 0);
      productData.id = maxId + 1;
      this._products.push(productData as Product);
  }

  // Termék lekérése ID alapján
  public getProductById(id: number): Product | undefined {
    return this._products.find(p => p.id === id);
  }

  // Termék frissítése
  public updateProduct(id: number, updatedData: Partial<IProduct>): boolean {
    const product = this.getProductById(id);
    if (!product) return false;

    Object.keys(updatedData).forEach((key) => {
      const propKey = key as keyof IProduct;
      if (propKey !== 'id' && updatedData[propKey] !== undefined) {
        // TypeScript típusbiztonság megtartásával dinamikusan beállítjuk az értéket
        (product as any)[propKey] = updatedData[propKey];
      }
    });

    return true;
  }

  // Termék törlése ID alapján
  public deleteProduct(id: number): boolean {
    const index = this._products.findIndex(p => p.id === id);
    if (index === -1) return false;

    this._products.splice(index, 1);
    return true;
  }

  // --- SZŰRÉSEK ÉS KERESÉSEK ---

  // Keresés név vagy leírás alapján (kis/nagybetű független)
  public search(query: string): Product[] {
    const lowerQuery = query.toLowerCase();
    return this._products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.description.toLowerCase().includes(lowerQuery)
    );
  }

  // Szűrés kategória szerint
  public getByCategory(category: string): Product[] {
    return this._products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  // Csak az aktív és raktáron lévő termékek lekérése
  public getAvailableProducts(): Product[] {
    return this._products.filter(p => p.active && p.stock > 0);
  }

  // --- CSOPORTOS MŰVELETEK ÉS STATISZTIKÁK ---

  // Globális kedvezmény érvényesítése egy adott kategóriára (pl. minden Laptopra -10%)
  public applyCategoryDiscount(category: string, percentage: number): void {
    this._products
      .filter(p => p.category.toLowerCase() === category.toLowerCase())
      .forEach(p => p.applyDiscount(percentage));
  }

  // Teljes raktárkészlet értékének kiszámítása
  public getTotalInventoryValue(): number {
    return this._products.reduce((total, p) => total + (p.price * p.stock), 0);
  }
}

