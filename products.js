const products=[
{ id: 1, category: "Electronics", name: "Wireless Earbuds", price: 1499, stock: 12, image: "Images/products/earbuds.png" },
    { id: 2, category: "Electronics", name: "Smart Watch", price: 2999, stock: 3, image: "Images/products/smartwatch.png" },
    { id: 3, category: "Electronics", name: "Bluetooth Speaker", price: 1799, stock: 9, image: "Images/products/speaker.png" },
    { id: 4, category: "Electronics", name: "Power Bank", price: 999, stock: 20, image: "Images/products/powerbank.png" },
    { id: 5, category: "Electronics", name: "Gaming Mouse", price: 899, stock: 0, image: "Images/products/mouse.png" },
    { id: 6, category: "Electronics", name: "Headphones", price: 3499, stock: 6, image: "Images/products/headphones.png" },
    { id: 7, category: "Fashion", name: "Sneakers", price: 2199, stock: 0, image: "Images/products/sneakers.png" },
    { id: 8, category: "Fashion", name: "Backpack", price: 1299, stock: 8, image: "Images/products/backpack.png" },
    { id: 9, category: "Fashion", name: "Sunglasses", price: 799, stock: 5, image: "Images/products/sunglasses.png" },
    { id: 10, category: "Fashion", name: "Denim Jacket", price: 2499, stock: 4, image: "Images/products/jacket.png" },
    { id: 11, category: "Fashion", name: "Cap", price: 399, stock: 25, image: "Images/products/cap.png" },
    { id: 12, category: "Fashion", name: "Wrist Watch", price: 1999, stock: 7, image: "Images/products/wristwatch.png" },
    { id: 13, category: "Home", name: "Table Lamp", price: 1199, stock: 7, image: "Images/products/lamp.png" },
    { id: 14, category: "Home", name: "Coffee Maker", price: 3499, stock: 2, image: "Images/products/coffeemaker.png" },
    { id: 15, category: "Home", name: "Wall Clock", price: 899, stock: 6, image: "Images/products/clock.png" },
    { id: 16, category: "Home", name: "Cushion Set", price: 699, stock: 14, image: "Images/products/cushion.png" },
    { id: 17, category: "Home", name: "Plant Pot", price: 349, stock: 18, image: "Images/products/plantpot.png" },
    { id: 18, category: "Home", name: "Water Bottle", price: 499, stock: 30, image: "Images/products/bottle.png" },
    { id: 19, category: "Sports", name: "Yoga Mat", price: 699, stock: 15, image: "Images/products/yogamat.png" },
    { id: 20, category: "Sports", name: "Dumbbells", price: 1599, stock: 6, image: "Images/products/dumbbells.png" },
    { id: 21, category: "Sports", name: "Football", price: 799, stock: 11, image: "Images/products/football.png" },
    { id: 22, category: "Sports", name: "Cricket Bat", price: 2299, stock: 3, image: "Images/products/bat.png" },
    { id: 23, category: "Sports", name: "Badminton Racket", price: 1299, stock: 8, image: "Images/products/racket.png" },
    { id: 24, category: "Sports", name: "Skipping Rope", price: 249, stock: 40, image: "Images/products/rope.png" }
];

const categories=["All","Electronics","Fashion","Home","Sports"];

const params=new URLSearchParams(window.location.search);
const selected=params.get("category") || "All";

const bar=document.getElementById("category-bar");
categories.forEach(function(c){
    bar.innerHTML += `<a href="products.html?category=${c}" class="chip ${c===selected ? "active" : ""}">${c}</a>`;
});

const visible=selected==="All" ? products : products.filter(function(p) { return p.category===selected;});

const grid=document.getElementById("product-grid");

visible.forEach(function(p){
    let stockText,stockClass;

    if(p.stock===0){
        stockText="Out of Stock";
        stockClass="out";
    }
    
    else if(p.stock<=5){
        stockText="Only "+p.stock+" left!!!";
        stockClass="low";
    }
    
    else{
        stockText="In Stock: "+p.stock;
        stockClass="in";
    }

    grid.innerHTML +=`
        <div class="card">
            <div class="card-img"><img src="${p.image}" alt="${p.name}"></div>
            <h3>${p.name}</h3>
            <p class="price">₹${p.price}</p>
            <p class="stock ${stockClass}">${stockText}</p>
            <div class="cart-ctrl" id="ctrl-${p.id}"><button class="add-btn" data-id="${p.id}" ${p.stock===0 ? "disabled":""}>Add to Cart</button></div>
        </div>
    `;
});


let cart=JSON.parse(localStorage.getItem("cart")) || {};

const cartBtn=document.getElementById("cart-btn");

function updateCartButton(){
    let total=0;
    for(const id in cart){
        total+=cart[id];
    }
    cartBtn.textContent="Cart ("+total+")";
    localStorage.setItem("cart",JSON.stringify(cart));
    renderCart();
}

function renderCart(){
    const list = document.getElementById("cart-items");
    let multiplication = "";
    let total = 0;

    for(const id in cart){
        const p = products.find(function(item){ return item.id === Number(id); });
        const lineTotal = p.price * cart[id];
        total += lineTotal;
        multiplication += `<div class="cart-row"><span>${p.name} x ${cart[id]}</span><span>₹${lineTotal}</span></div>`;
    }

    if(multiplication=== ""){
        multiplication = `<p class="cart-empty">Your cart is empty</p>`;
    }

    list.innerHTML = multiplication;
    document.getElementById("cart-total").textContent = "₹" + total;
}

function drawControl(id){
    const p=products.find(function(item){return item.id===id;});
    const box=document.getElementById("ctrl-"+id);
    if(!box){ return; }
    const qty=cart[id] || 0;

    if(qty===0){
        box.innerHTML='<button class="add-btn" data-id="'+id+'" '+ (p.stock===0 ? 'disabled' : '') +'>Add to Cart</button>';
    }else{
        box.innerHTML=`
            <div class="qty">
                <button class="minus" data-id="${id}">-</button>
                <span>${qty}</span>
                <button class="plus" data-id="${id}" ${qty>=p.stock ? "disabled" : ""}>+</button>
            </div>`;
    }
}

grid.addEventListener("click",function(e){
    const id=Number(e.target.dataset.id);
    const p=products.find(function(item){return item.id===id;});
    const cls=e.target.classList;

    if(cls.contains("add-btn")){
        cart[id]=1;
    }else if(cls.contains("plus")&&(cart[id] || 0)<p.stock){
        cart[id]++;
    }else if(cls.contains("minus")){
        cart[id]--;
        if(cart[id]===0){
            delete cart[id];
        }
    }else{
        return;
    }

    drawControl(id);
    updateCartButton();
});

const cartPanel=document.getElementById("cart-panel");

cartBtn.addEventListener("click",function(){
    cartPanel.classList.toggle("open");
});

document.getElementById("cart-close").addEventListener("click",function(){
    cartPanel.classList.remove("open");
});

for(const id in cart){
    drawControl(Number(id));
}
updateCartButton();