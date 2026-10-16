const searchInput = document.getElementById("productSearch");
const searchForm = document.querySelector(".search-bar");
const productCards = document.querySelectorAll(".product-card");
const noResults = document.getElementById("noResults");

function filterProducts() {
    const searchText = searchInput.value.trim().toLowerCase();
    let foundProducts = 0;

    productCards.forEach(function(productCard) {
        const productName = productCard.querySelector("h3").textContent.trim().toLowerCase();
        const matchesSearch = productName.includes(searchText);
        productCard.hidden = !matchesSearch;

        if (matchesSearch) {
            foundProducts++;
        }
    });

    noResults.hidden = foundProducts > 0;
}

searchInput.addEventListener("input", filterProducts);
searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    filterProducts();
});