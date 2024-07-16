import Database from "bun:sqlite";

export interface Product {
    id?: number;
    name: string;
    price: number;
    image: string;
}

export class ProductsDatabase {
    private db: Database;

    constructor() {
        this.db = new Database("products.db");
        this.createTable();
    }

    fetchAllProducts() {
        return this.db.query(
            `SELECT * FROM products`
        ).all()
    }

    createTable() {
        this.db.run("CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price NUM, image TEXT)");
    }

    addProduct(product: Product) {
        return this.db
            .query(
                `INSERT INTO products (name, price, image)
            VALUES (?, ?, ?)
            RETURNING id
            `
            )
            .get(product.name, product.price, product.image) as Product;
    }
}
