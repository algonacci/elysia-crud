import { html } from "@elysiajs/html";
import staticPlugin from "@elysiajs/static";
import { Elysia } from "elysia";
import { Product, ProductsDatabase } from "./db";

const VIEWS_PATH = import.meta.dir + "/../public/views"

const app = new Elysia()
  .use(html())
  .use(staticPlugin({
    prefix: "/"
  }))
  .decorate("db", new ProductsDatabase())
  .get("/fetch-products", ({ db }) => db.fetchAllProducts())
  .get("/fetch-products/:id", ({db, params}) => db.fetchProductByID(parseInt(params.id)))
  .get("/script.js", () => Bun.file(import.meta.dir + "/script.js").text())
  .get("/", () => Bun.file(VIEWS_PATH + "/home.html"))
  .get("/add-product", Bun.file(VIEWS_PATH + "/add-product.html"))
  .get("/edit/:id", Bun.file(VIEWS_PATH + "/edit-product.html"))
  .get("/delete/:id", ({db, params, set}) => {
    console.log(`Delete params with ID: ${params.id}`);
    db.deleteProduct(parseInt(params.id))
    set.redirect = "/"
  })

  .post("/add-product", ({ db, body, set }) => {
    db.addProduct(<Product>body)
    set.redirect = "/"
  })
  .post("/edit/:id", ({db, body, set, params}) => {
    db.updateProduct(parseInt(params.id), <Product>body);
    set.redirect = "/"
  })

  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
