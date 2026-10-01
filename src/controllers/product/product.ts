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


