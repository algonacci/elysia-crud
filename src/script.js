window.addEventListener("DOMContentLoaded", () => [
  fetch("/fetch-products")
    .then((data) => data.json())
    .then((products) => {
      console.log(products);
      document.getElementById("productsContainer").innerHTML = products.map(
        (product) => {
          return `
        <div class="card m-3 custom-card">
                    <img src="../images/${product.image}" class="card-img-top card-image" alt="apples">
                    <div class="card-body">
                        <div class="name-price-contianer">
                            <h3 class="card-title"> ${product.name} </h3>
                            <h4 class="card-title  fw-light"> ${product.price} </h4>
                        </div>
                        <div>
                            <a href="/edit/${product.id}" class="btn btn-outline-dark mx-1 mt-4 edit-buttons">
                                <i class="bi bi-pencil-fill"></i>
                            </a>
                            <a href="/delete/${product.id}" class="btn btn-outline-dark mx-1 mt-4 edit-buttons">
                                <i class="bi bi-trash-fill"></i>
                            </a>
                        </div>
                    </div>
                </div>
        `;
        }
      );
    }),
]);
