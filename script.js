
const products = [
  {id:1,name:"Wireless Headphones",category:"Electronics",price:1499,old:2499,rating:4.5,image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80"},
  {id:2,name:"Luxury Smart Watch",category:"Electronics",price:1999,old:2999,rating:4.4,image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80"},
  {id:3,name:"Classic Sneakers",category:"Fashion",price:1799,old:2799,rating:4.6,image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80"},
  {id:4,name:"Premium T-Shirt",category:"Fashion",price:499,old:799,rating:4.2,image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80"},
  {id:5,name:"Designer Table Lamp",category:"Home",price:899,old:1299,rating:4.3,image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=500&q=80"},
  {id:6,name:"Coffee Maker",category:"Home",price:2499,old:3499,rating:4.6,image:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=500&q=80"},
  {id:7,name:"Beauty Essentials",category:"Beauty",price:699,old:999,rating:4.3,image:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=500&q=80"},
  {id:8,name:"Skincare Collection",category:"Beauty",price:999,old:1499,rating:4.5,image:"https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=500&q=80"},
  {id:9,name:"Notebook Collection",category:"Books",price:299,old:449,rating:4.1,image:"https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=500&q=80"},
  {id:10,name:"Travel Backpack",category:"Fashion",price:1299,old:1899,rating:4.4,image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80"},
  {id:11,name:"Bluetooth Speaker",category:"Electronics",price:1199,old:1799,rating:4.3,image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=500&q=80"},
  {id:12,name:"Modern Desk Setup",category:"Home",price:399,old:599,rating:4.2,image:"https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=500&q=80"}
];

let cart = JSON.parse(localStorage.getItem("fcCart") || "[]");
let category = "All";
let search = "";
let registerMode = false;
let toastTimer;

function money(n) {
  return n.toLocaleString("en-IN", {
    style:"currency", currency:"INR", maximumFractionDigits:0
  });
}

function getSession() {
  try {
    return JSON.parse(localStorage.getItem("fcSession") || "null");
  } catch {
    return null;
  }
}

function renderProducts() {
  const grid = document.getElementById("productGrid");

  const filtered = products.filter(p =>
    (category === "All" || p.category === category) &&
    (p.name.toLowerCase().includes(search) ||
     p.category.toLowerCase().includes(search))
  );

  document.getElementById("productHeading").textContent =
    category === "All" ? "Featured Products" : category + " Collection";

  grid.innerHTML = filtered.length ? filtered.map(p => `
    <article class="product-card">
      <img class="product-image" src="${p.image}" alt="${p.name}"
        loading="lazy" onerror="this.style.display='none'">
      <p class="product-category">${p.category}</p>
      <h3>${p.name}</h3>
      <p class="rating">★ ${p.rating} / 5</p>
      <div>
        <span class="price">${money(p.price)}</span>
        <span class="old-price">${money(p.old)}</span>
      </div>
      <button class="add-btn" onclick="addToCart(${p.id})">
        + ADD TO CART
      </button>
    </article>
  `).join("") : `<div class="empty"><h3>No products found</h3><p>Try another search.</p></div>`;
}

function filterCategory(value, button) {
  category = value;
  search = "";
  document.getElementById("searchInput").value = "";

  document.querySelectorAll(".category").forEach(b =>
    b.classList.remove("active")
  );

  if (button) button.classList.add("active");
  else {
    const buttons = [...document.querySelectorAll(".category")];
    const match = buttons.find(b => b.textContent.trim().includes(value));
    if (match) match.classList.add("active");
    else buttons[0].classList.add("active");
  }

  renderProducts();
  showHome();
}

document.getElementById("searchForm").addEventListener("submit", e => {
  e.preventDefault();
  search = document.getElementById("searchInput").value.trim().toLowerCase();
  category = "All";
  document.querySelectorAll(".category").forEach(b => b.classList.remove("active"));
  document.querySelector(".category").classList.add("active");
  renderProducts();
  showHome();
  scrollToProducts();
});

function scrollToProducts() {
  document.getElementById("products").scrollIntoView({behavior:"smooth"});
}

function addToCart(id) {
  const item = cart.find(p => p.id === id);
  if (item) item.quantity++;
  else cart.push({id,quantity:1});
  saveCart();
  showToast("Added to your shopping cart.");
}

function saveCart() {
  localStorage.setItem("fcCart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

function updateCartCount() {
  document.getElementById("cartCount").textContent =
    cart.reduce((sum,item) => sum + item.quantity, 0);
}

function changeQuantity(id, amount) {
  const item = cart.find(p => p.id === id);
  if (!item) return;
  item.quantity += amount;
  if (item.quantity <= 0) cart = cart.filter(p => p.id !== id);
  saveCart();
}

function removeFromCart(id) {
  cart = cart.filter(p => p.id !== id);
  saveCart();
  showToast("Item removed.");
}

function renderCart() {
  const container = document.getElementById("cartItems");

  cart = cart.filter(item => products.some(p => p.id === item.id));

  if (!cart.length) {
    container.innerHTML = `
      <div class="empty">
        <h3>Your cart is empty</h3>
        <p>Discover something exceptional.</p>
        <button class="gold-btn" style="margin-top:18px" onclick="showHome()">
          EXPLORE PRODUCTS
        </button>
      </div>`;
  } else {
    container.innerHTML = cart.map(item => {
      const p = products.find(product => product.id === item.id);
      return `
        <article class="cart-item">
          <img src="${p.image}" alt="${p.name}">
          <div class="cart-info">
            <h3>${p.name}</h3>
            <strong>${money(p.price)}</strong>
            <div class="quantity">
              <button onclick="changeQuantity(${p.id},-1)">−</button>
              <span>${item.quantity}</span>
              <button onclick="changeQuantity(${p.id},1)">+</button>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${p.id})">Remove</button>
          </div>
          <strong>${money(p.price * item.quantity)}</strong>
        </article>`;
    }).join("");
  }

  const subtotal = cart.reduce((sum,item) => {
    const p = products.find(product => product.id === item.id);
    return sum + (p ? p.price * item.quantity : 0);
  }, 0);

  const delivery = subtotal === 0 || subtotal >= 999 ? 0 : 49;
  document.getElementById("subtotal").textContent = money(subtotal);
  document.getElementById("delivery").textContent =
    subtotal > 0 && delivery === 0 ? "FREE" : money(delivery);
  document.getElementById("total").textContent = money(subtotal + delivery);
}

function showHome() {
  if (!getSession()) {
    showLogin();
    return;
  }
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("shopPage").classList.remove("hidden");
  document.getElementById("homePage").classList.remove("hidden");
  document.getElementById("cartPage").classList.add("hidden");
  window.scrollTo({top:0,behavior:"smooth"});
}

function showCart() {
  if (!getSession()) {
    showLogin();
    showToast("Please login first.");
    return;
  }
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("shopPage").classList.remove("hidden");
  document.getElementById("homePage").classList.add("hidden");
  document.getElementById("cartPage").classList.remove("hidden");
  renderCart();
  window.scrollTo({top:0,behavior:"smooth"});
}

function showLogin() {
  document.getElementById("shopPage").classList.add("hidden");
  document.getElementById("loginPage").classList.remove("hidden");
  window.scrollTo({top:0,behavior:"smooth"});
}

document.getElementById("switchBtn").addEventListener("click", () => {
  registerMode = !registerMode;
  document.getElementById("authTitle").textContent =
    registerMode ? "Create Account" : "Welcome Back";
  document.getElementById("authSubtitle").textContent =
    registerMode ? "Join the Flash Cart experience." : "Sign in to discover something exceptional.";
  document.getElementById("nameField").classList.toggle("hidden", !registerMode);
  document.getElementById("userName").required = registerMode;
  document.getElementById("authSubmit").textContent =
    registerMode ? "CREATE ACCOUNT" : "SIGN IN";
  document.getElementById("switchText").textContent =
    registerMode ? "Already a member?" : "New to Flash Cart?";
  document.getElementById("switchBtn").textContent =
    registerMode ? "Sign in" : "Create account";
  document.getElementById("authMessage").textContent = "";
});

document.getElementById("authForm").addEventListener("submit", e => {
  e.preventDefault();

  const email = document.getElementById("userEmail").value.trim().toLowerCase();
  const password = document.getElementById("userPassword").value;
  const name = document.getElementById("userName").value.trim();
  const message = document.getElementById("authMessage");

  let users;
  try {
    users = JSON.parse(localStorage.getItem("fcUsers") || "[]");
    if (!Array.isArray(users)) users = [];
  } catch {
    users = [];
  }

  if (registerMode) {
    if (!name) {
      message.textContent = "Please enter your name.";
      return;
    }
    if (users.some(u => u.email === email)) {
      message.textContent = "This email is already registered.";
      return;
    }

    // DEMO ONLY: Never store real passwords in localStorage.
    users.push({name,email,password});
    localStorage.setItem("fcUsers", JSON.stringify(users));

    registerMode = false;
    document.getElementById("switchBtn").click();
    document.getElementById("userEmail").value = email;
    message.textContent = "Account created. Please sign in.";
    return;
  }

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    message.textContent = "Incorrect login details. Register first if needed.";
    return;
  }

  localStorage.setItem("fcSession", JSON.stringify({
    name:user.name,email:user.email
  }));
  showToast("Welcome, " + user.name + "!");
  showHome();
});

function logout() {
  localStorage.removeItem("fcSession");
  showLogin();
  showToast("You have logged out.");
}

function checkout() {
  if (!cart.length) {
    showToast("Your cart is empty.");
    return;
  }
  if (!getSession()) {
    showLogin();
    return;
  }
  showToast("Demo checkout only. No payment was processed.");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
}

// Initial setup: LOGIN PAGE FIRST.
renderProducts();
updateCartCount();
renderCart();
showLogin();
