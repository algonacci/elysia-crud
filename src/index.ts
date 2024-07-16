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
  .get("/", () => Bun.file(VIEWS_PATH + "/home.html"))
  .get("/add-product", Bun.file(VIEWS_PATH + "/add-product.html"))
  .get("/edit", Bun.file(VIEWS_PATH + "/edit-product.html"))

  .post("/add-product", ({ db, body, set }) => {
    db.addProduct(<Product>body)
    set.redirect = "/"
  })

  .listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
