
window.addEventListener("load", function () {
  setTimeout(function () {
    var loader = document.getElementById("loader");
    loader.classList.add("fade-out");             
    document.getElementById("main-page").classList.remove("hidden"); 
    setTimeout(function () {
      loader.style.display = "none";
    }, 500);
  }, 2000); 
});



var products = {
  "Fashion": [
    { name: "Men's Cotton T-Shirt",  desc: "Soft, breathable everyday wear", price: 499,  img: "images/tshirts.jpg" },   // <-- ADD IMAGE PATH HERE
    { name: "Slim Fit Jeans",        desc: "Stretchable denim, blue",        price: 1299, img: "images/slimfitjeans.jfif" },   // <-- ADD IMAGE PATH HERE
    { name: "Women's Kurti",         desc: "Printed cotton, all sizes",      price: 799,  img: "images/kurti.jpg" },   // <-- ADD IMAGE PATH HERE
    { name: "Casual Hoodie",         desc: "Fleece lined, unisex",           price: 1099, img: "images/hoodie.avif" },   // <-- ADD IMAGE PATH HERE
    { name: "Canvas Sneakers",       desc: "Lightweight and comfortable",    price: 1499, img: "images/speaker.jpg" },   // <-- ADD IMAGE PATH HERE
    { name: "Leather Wallet",        desc: "Genuine leather, bi-fold",       price: 599,  img: "images/wallet.jfif" }    // <-- ADD IMAGE PATH HERE
  ],

  "Groceries": [
    { name: "Basmati Rice 5kg",      desc: "Premium long grain rice",        price: 549,  img: "images/basmatirice.jpg" },   // <-- ADD IMAGE PATH HERE
    { name: "Sunflower Oil 1L",      desc: "Refined cooking oil",            price: 165,  img: "images/sunfloweroil.jpg" },   // <-- ADD IMAGE PATH HERE
    { name: "Fresh Milk 1L",         desc: "Full cream, farm fresh",         price: 62,   img: "images/freshmilk.jpg" },   // <-- ADD IMAGE PATH HERE
    { name: "Tea Powder 500g",       desc: "Strong Assam tea",               price: 240,  img: "images/teapowder.jfif" },   // <-- ADD IMAGE PATH HERE
    { name: "Whole Wheat Atta 5kg",  desc: "Stone ground, high fibre",       price: 260,  img: "images/wheatatta.jpg" },   // <-- ADD IMAGE PATH HERE
    { name: "Mixed Fruit Jam",       desc: "Sweet and tangy, 500g",          price: 130,  img: "images/mixedfruitjam.jfif" }    // <-- ADD IMAGE PATH HERE
  ],

  "Stationaries": [
    { name: "A4 Notebook (200 pages)", desc: "Ruled, hard cover",            price: 90,   img: "images/notebook.jpg" },   // <-- ADD IMAGE PATH HERE
    { name: "Ball Pen Pack (10)",      desc: "Smooth blue ink",              price: 80,   img: "images/ballpenset.jfif" },   // <-- ADD IMAGE PATH HERE
    { name: "Geometry Box",            desc: "Complete maths set",           price: 150,  img: "images/geometrybox.jfif" },   // <-- ADD IMAGE PATH HERE
    { name: "Highlighter Set (5)",     desc: "Assorted neon colours",        price: 120,  img: "images/highlighter.jpg" },   // <-- ADD IMAGE PATH HERE
    { name: "Sticky Notes Pack",       desc: "Colourful, 400 sheets",        price: 99,   img: "images/stickynotes.jpg" },   // <-- ADD IMAGE PATH HERE
    { name: "Office File Folder",      desc: "Durable, A4 size",             price: 70,   img: "images/filefolder.jpg" }    // <-- ADD IMAGE PATH HERE
  ],

  "Electronics": [
    { name: "Wireless Earbuds",      desc: "Bluetooth 5.3, 20h battery",     price: 1999, img: "images/earbuds.jfif" },   // <-- ADD IMAGE PATH HERE
    { name: "Smart Watch",           desc: "Heart rate and step tracker",    price: 2999, img: "images/smartwatch.jpg" },   // <-- ADD IMAGE PATH HERE
    { name: "Power Bank 10000mAh",   desc: "Fast charging, dual USB",        price: 999,  img: "images/powerbank.jpeg" },   // <-- ADD IMAGE PATH HERE
    { name: "Bluetooth Speaker",     desc: "Portable, waterproof",           price: 1599, img: "images/btspeaker.jpg" },   // <-- ADD IMAGE PATH HERE
    { name: "Wireless Mouse",        desc: "Silent click, 2.4GHz",           price: 499,  img: "images/mouse.jpg" },   // <-- ADD IMAGE PATH HERE
    { name: "USB-C Fast Charger",    desc: "33W adapter with cable",         price: 799,  img: "images/Charger.jpg" }    // <-- ADD IMAGE PATH HERE
  ],

  "Sports": [
    { name: "Cricket Bat",           desc: "English willow, full size",      price: 2499, img: "images/bat.jpg" },   // <-- ADD IMAGE PATH HERE
    { name: "Football (Size 5)",     desc: "Durable stitched ball",          price: 699,  img: "images/football.jpg" },   // <-- ADD IMAGE PATH HERE
    { name: "Badminton Racket",      desc: "Lightweight with cover",         price: 899,  img: "images/racket.jfif" },   // <-- ADD IMAGE PATH HERE
    { name: "Yoga Mat",              desc: "6mm anti-slip mat",              price: 599,  img: "images/yogamat.jpg" },   // <-- ADD IMAGE PATH HERE
    { name: "Skipping Rope",         desc: "Adjustable speed rope",          price: 199,  img: "images/rope.jpg" },   // <-- ADD IMAGE PATH HERE
    { name: "Sports Water Bottle",   desc: "1 litre, leak proof",            price: 349,  img: "images/bottle.jfif" }    // <-- ADD IMAGE PATH HERE
  ],

  "Video Games": [
    { name: "Wireless Game Controller", desc: "Works with PC and console",   price: 3499, img: "images/joystick.jpg" },   // <-- ADD IMAGE PATH HERE
    { name: "Gaming Headset",           desc: "Surround sound with mic",     price: 2299, img: "images/headset.jpg" },   // <-- ADD IMAGE PATH HERE
    { name: "Gaming Mouse",             desc: "RGB, 7200 DPI",               price: 1299, img: "images/gamingmouse.jpg" },   // <-- ADD IMAGE PATH HERE
    { name: "Mechanical Keyboard",      desc: "Blue switches, backlit",      price: 2799, img: "images/keyboard.jpg" },   // <-- ADD IMAGE PATH HERE
    { name: "Racing Game",              desc: "Open world driving game",     price: 1999, img: "images/racinggame.jpg" },   // <-- ADD IMAGE PATH HERE
    { name: "Mouse Pad XL",             desc: "Large stitched edge pad",     price: 499,  img: "images/mousepad.jpg" }    // <-- ADD IMAGE PATH HERE
  ]
};


function showOrderPopup(productName) {
  document.getElementById("order-product").textContent = productName;
  document.getElementById("order-popup").classList.add("show");
}

function closeOrderPopup() {
  document.getElementById("order-popup").classList.remove("show");
}


document.getElementById("popup-ok").addEventListener("click", closeOrderPopup);
document.getElementById("order-popup").addEventListener("click", function (e) {
  if (e.target === this) closeOrderPopup();
});


function showProducts(category) {
  var grid = document.getElementById("products");
  document.getElementById("section-title").textContent = category;
  grid.innerHTML = "";

  products[category].forEach(function (p) {
    var card = document.createElement("div");
    card.className = "product-card";

   
    var imgTag = p.img
      ? '<img class="product-img" src="' + p.img + '" alt="' + p.name + '" />'
      : '<div class="product-img"></div>';

    card.innerHTML =
      imgTag +
      '<div class="product-info">' +
        "<h3>" + p.name + "</h3>" +
        "<p>" + p.desc + "</p>" +
        '<div class="price-row">' +
          '<span class="price">₹' + p.price + "</span>" +
          '<button class="add-btn"><i class="fa-solid fa-cart-plus"></i> Add</button>' +
        "</div>" +
      "</div>";

    
    card.querySelector(".add-btn").addEventListener("click", function () {
      showOrderPopup(p.name);
    });

    grid.appendChild(card);
  });
}


var pills = document.querySelectorAll(".pill");

pills.forEach(function (pill) {
  pill.addEventListener("click", function () {
    pills.forEach(function (p) { p.classList.remove("active"); });
    pill.classList.add("active");
    showProducts(pill.getAttribute("data-category"));
  });
});


showProducts("Fashion");
