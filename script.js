

var products = [
    {
        name: "Headphones",
        category: "Electronics",
        price: 1499,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
    },
    {
        name: "Smart Watch",
        category: "Electronics",
        price: 1999,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
    },
    {
        name: "Running Shoes",
        category: "Fashion",
        price: 1799,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
    },
    {
        name: "T-Shirt",
        category: "Fashion",
        price: 499,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"
    },
    {
        name: "Table Lamp",
        category: "Home",
        price: 899,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400"
    },
    {
        name: "Coffee Maker",
        category: "Home",
        price: 2499,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400"
    },
    {
        name: "Beauty Products",
        category: "Beauty",
        price: 699,
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400"
    },
    {
        name: "Skincare Set",
        category: "Beauty",
        price: 999,
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400"
    }
];

var cart = [];

// LOGIN: Any valid email and password of 6+ characters works.
document.getElementById("loginForm").onsubmit = function(event) {
    event.preventDefault();

    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("mainPage").classList.remove("hidden");

    showHome();
};

// Display products
function displayProducts(list) {
    var output = "";

    for (var i = 0; i < list.length; i++) {
        output += `
            <div class="product-card">
                <img src="${list[i].image}" alt="${list[i].name}">
                <h3>${list[i].name}</h3>
                <p>${list[i].category}</p>
                <p class="price">₹${list[i].price}</p>
                <button onclick="addToCart('${list[i].name}')">
                    Add to Cart
                </button>
            </div>
        `;
    }

    if (list.length == 0) {
        output = "<p>No products found.</p>";
    }

    document.getElementById("productList").innerHTML = output;
}

// Show all products when the website opens
displayProducts(products);

// Filter by category
function filterProducts(category) {
    var filtered = [];

    for (var i = 0; i < products.length; i++) {
        if (category == "All" || products[i].category == category) {
            filtered.push(products[i]);
        }
    }

    document.getElementById("productTitle").innerText =
        category == "All" ? "Our Products" : category + " Products";

    document.getElementById("searchBox").value = "";
    displayProducts(filtered);
}

// Search products
function searchProducts() {
    var search = document.getElementById("searchBox").value.toLowerCase();
    var filtered = [];

    for (var i = 0; i < products.length; i++) {
        if (
            products[i].name.toLowerCase().includes(search) ||
            products[i].category.toLowerCase().includes(search)
        ) {
            filtered.push(products[i]);
        }
    }

    displayProducts(filtered);
}

// Add products to cart
function addToCart(name) {
    var found = false;

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name == name) {
            cart[i].quantity++;
            found = true;
        }
    }

    if (found == false) {
        cart.push({ name: name, quantity: 1 });
    }

    updateCart();
    alert(name + " added to cart!");
}

// Update the cart and total
function updateCart() {
    var output = "";
    var total = 0;
    var count = 0;

    for (var i = 0; i < cart.length; i++) {
        var product = products.find(function(item) {
            return item.name == cart[i].name;
        });

        if (product) {
            var quantity = cart[i].quantity;
            var amount = product.price * quantity;

            total += amount;
            count += quantity;

            output += `
                <div class="cart-item">
                    <img src="${product.image}" alt="${product.name}">

                    <div>
                        <h3>${product.name}</h3>
                        <p>Price: ₹${product.price}</p>
                        <p>Quantity: ${quantity}</p>

                        <button onclick="changeQuantity('${product.name}', -1)">
                            -
                        </button>

                        <button onclick="changeQuantity('${product.name}', 1)">
                            +
                        </button>

                        <button onclick="removeItem('${product.name}')">
                            Remove
                        </button>
                    </div>

                    <strong>₹${amount}</strong>
                </div>
            `;
        }
    }

    if (cart.length == 0) {
        output = '<div class="empty-message">Your cart is empty.</div>';
    }

    document.getElementById("cartItems").innerHTML = output;
    document.getElementById("totalPrice").innerText = total;
    document.getElementById("cartCount").innerText = count;
}

// Change quantity
function changeQuantity(name, amount) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name == name) {
            cart[i].quantity += amount;

            if (cart[i].quantity <= 0) {
                cart.splice(i, 1);
            }

            break;
        }
    }

    updateCart();
}

// Remove item
function removeItem(name) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name == name) {
            cart.splice(i, 1);
            break;
        }
    }

    updateCart();
}

// Navigate between pages
function showHome() {
    document.getElementById("homePage").classList.remove("hidden");
    document.getElementById("cartPage").classList.add("hidden");
}

function showCart() {
    document.getElementById("homePage").classList.add("hidden");
    document.getElementById("cartPage").classList.remove("hidden");
    updateCart();
}

function goToProducts() {
    document.getElementById("productsSection").scrollIntoView({
        behavior: "smooth"
    });
}

// Demo checkout
function checkout() {
    if (cart.length == 0) {
        alert("Your cart is empty!");
    } else {
        alert("Order placed successfully! (Demo only)");
        cart = [];
        updateCart();
        showHome();
    }
}

// Logout
function logout() {
    document.getElementById("mainPage").classList.add("hidden");
    document.getElementById("loginPage").classList.remove("hidden");

    document.getElementById("loginForm").reset();

    cart = [];
    updateCart();
}
