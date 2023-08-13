/* Analisar a Documentação da API:
https://fakestoreapi.com/

Cria e estilizar um catalogo de produtos com filtro de categoria.
Nao esquecer de botar um botão de COMPRA.
Qualquer conteúdo extra será analisado com muito esmero. */

const url = "https://fakestoreapi.com/";
const categoryRadios = document.querySelectorAll('input[name="btnradio"]');
const productsCatalog = document.getElementById("products-catalog");

categoryRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
        const category = radio.getAttribute("data-category")
        FetchProducts(category)
    })
})

function FetchProducts(category = "all") {
    productsCatalog.innerHTML = "";

    let fetchUrl = url + "products"
    if (category !== "all") {
        fetchUrl += "/category/" + category
    }

    fetch(fetchUrl)
    .then((response) => response.json())
    .then((products) => {
    products.forEach((product) => {
        const productCard = CreateProductCard(product);
        productsCatalog.appendChild(productCard);
    });
  });
}

function CreateProductCard(product) {
  const col = document.createElement("div")
  col.classList.add("col")
  const card = document.createElement("div")
  card.classList.add("card", "h-100");
  card.innerHTML = `
        <img class="card-img-top object-fit-contain p-3" style="height: 250px" src="${
          product.image
        }" alt="Card image cap">
        <div class="card-body mh-100">
            <h5 class="card-title fw-bold fs-4">${product.title}</h5>
            <p class="card-text text-capitalize"><b>Category:</b> ${product.category}</p>
            <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#${product.id}Backdrop">Read Description</button>
        </div>
        <div class="card-footer d-flex justify-content-center align-items-center">
            <p class="card-text m-0 me-4 fw-bold">$${product.price.toFixed(2)}</p>
            <a class="btn btn-primary" id="buy-btn">Buy Now</a>
        </div>
     
        <div>
            <div class="modal fade" id="${product.id}Backdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">${product.title}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">${product.description}</div>
                    </div>
                </div>
            </div>
        </div>
        `
  col.appendChild(card)
  return col
}

FetchProducts();
