const regions=[
["Rajasthan","Blue Pottery • Terracotta • Art","raj"],["Gujarat","Ajrakh • Crafts • Textiles","guj"],["Madhya Pradesh","Dhokra • Gond • Handcrafts","mp"],["Karnataka","Wooden Toys • Crafts","kar"],
["West Bengal","Terracotta • Folk Art","wb"],["Bihar","Madhubani • Handcrafts","bih"],["Assam","Bamboo • Cane • Weaves","asm"],["Odisha","Art • Stone • Handloom","odi"]];
const categories=[["🏺","Home Décor"],["🎨","Art & Paintings"],["🧵","Textiles"],["💍","Jewellery"],["🎁","Gifts"],["🪔","Spiritual"]];
const products=[
{id:1,name:"Jaipur Blue Pottery Vase",region:"Rajasthan",price:1299,cat:"Home Décor",desc:"A decorative blue pottery piece inspired by Jaipur's distinctive craft tradition."},
{id:2,name:"Lippan Mirror Wall Art",region:"Gujarat",price:899,cat:"Art & Paintings",desc:"A contemporary take on traditional mud-and-mirror wall decoration."},
{id:3,name:"Dhokra Artisan Figurine",region:"Madhya Pradesh",price:1499,cat:"Home Décor",desc:"A handcrafted metal figurine inspired by India's lost-wax casting traditions."},
{id:4,name:"Hand-Painted Wooden Elephant",region:"Rajasthan",price:699,cat:"Gifts",desc:"A colourful decorative keepsake celebrating Rajasthan's folk-art aesthetic."},
{id:5,name:"Channapatna Wooden Toy",region:"Karnataka",price:499,cat:"Gifts",desc:"A playful lacquered wooden collectible inspired by Channapatna craft."},
{id:6,name:"Madhubani Art Panel",region:"Bihar",price:1199,cat:"Art & Paintings",desc:"A folk-art inspired panel with bold lines and traditional motifs."},
{id:7,name:"Assam Bamboo Basket",region:"Assam",price:749,cat:"Home Décor",desc:"A practical handmade basket showcasing natural bamboo craft."},
{id:8,name:"Rajasthani Craft Gift Box",region:"Rajasthan",price:999,cat:"Gifts",desc:"A curated selection of small Indian craft-inspired gifts."}
];
let cart=JSON.parse(localStorage.getItem("freemartCart")||"[]");
const money=n=>"₹"+n.toLocaleString("en-IN");
function renderRegions(){document.getElementById("regionGrid").innerHTML=regions.map(r=>`<a class="region-card" href="#products" onclick="filterRegion('${r[0]}')"><span class="state">Explore</span><h3>${r[0]}</h3><p>${r[1]}</p></a>`).join("")}
function renderCats(){document.getElementById("categoryGrid").innerHTML=categories.map(c=>`<div class="cat" onclick="filterCategory('${c[1]}')"><div class="icon">${c[0]}</div><h3>${c[1]}</h3></div>`).join("")}
function renderProducts(list=products){document.getElementById("productGrid").innerHTML=list.map(p=>`<article class="product" onclick="openProduct(${p.id})"><div class="product-img"><div class="shape"></div></div><div class="product-info"><span class="region">${p.region}</span><h3>${p.name}</h3><div class="price">${money(p.price)}</div><button class="add" onclick="event.stopPropagation();addCart(${p.id})">Add to cart</button></div></article>`).join("")}
function addCart(id){const p=products.find(x=>x.id===id);cart.push(p);saveCart();renderCart();openCart();updateCount()}
function saveCart(){localStorage.setItem("freemartCart",JSON.stringify(cart))}
function updateCount(){document.getElementById("cartCount").textContent=cart.length}
function renderCart(){const box=document.getElementById("cartItems"); if(!cart.length){box.innerHTML="<p>Your cart is empty. Discover a regional product to get started.</p>";document.getElementById("cartTotal").textContent="₹0";return} box.innerHTML=cart.map((p,i)=>`<div class="cart-row"><div><b>${p.name}</b><small>${p.region}</small></div><div>${money(p.price)} <button class="remove" onclick="removeCart(${i})">Remove</button></div></div>`).join("");document.getElementById("cartTotal").textContent=money(cart.reduce((s,p)=>s+p.price,0))}
function removeCart(i){cart.splice(i,1);saveCart();renderCart();updateCount()}
function filterRegion(r){renderProducts(products.filter(p=>p.region===r));document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));document.getElementById("products").scrollIntoView({behavior:"smooth"})}
function filterCategory(c){renderProducts(products.filter(p=>p.cat===c));document.getElementById("products").scrollIntoView({behavior:"smooth"})}
function openProduct(id){const p=products.find(x=>x.id===id);document.getElementById("productDetails").innerHTML=`<div class="detail-grid"><div class="detail-art"><div class="shape"></div></div><div class="detail-info"><span class="eyebrow">${p.region} • ${p.cat}</span><h2>${p.name}</h2><div class="detail-price">${money(p.price)}</div><p>${p.desc}</p><p><b>The story:</b> FreeMart connects this product to the region that inspired it, helping shoppers discover the craft, material and tradition behind every purchase.</p><button class="btn primary" onclick="addCart(${p.id});closeOverlays()">Add to Cart</button></div></div>`;document.getElementById("productModal").classList.add("show")}
function openCart(){document.getElementById("cartPanel").classList.add("show")}
function closeOverlays(){document.querySelectorAll(".overlay").forEach(x=>x.classList.remove("show"))}
document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderProducts(b.dataset.filter==="All"?products:products.filter(p=>p.region===b.dataset.filter))});
document.getElementById("cartBtn").onclick=openCart;document.getElementById("searchBtn").onclick=()=>{document.getElementById("searchPanel").classList.add("show");document.getElementById("searchInput").focus()};
document.querySelectorAll(".close").forEach(x=>x.onclick=closeOverlays);document.querySelectorAll(".overlay").forEach(x=>x.onclick=e=>{if(e.target===x)x.classList.remove("show")});
document.getElementById("searchInput").oninput=e=>{const q=e.target.value.toLowerCase();const results=products.filter(p=>(p.name+" "+p.region+" "+p.cat).toLowerCase().includes(q));document.getElementById("searchResults").innerHTML=results.map(p=>`<div class="result" onclick="closeOverlays();openProduct(${p.id})"><b>${p.name}</b><small> • ${p.region} • ${money(p.price)}</small></div>`).join("")||"<p>No products found.</p>"};
document.getElementById("newsletterForm").onsubmit=e=>{e.preventDefault();document.getElementById("newsletterMsg").textContent="Thank you! You're on the FreeMart list.";e.target.reset()};
document.getElementById("checkoutBtn").onclick=()=>alert("Checkout is ready to connect to your payment gateway (Razorpay/Stripe/etc.).");
renderRegions();renderCats();renderProducts();renderCart();updateCount();
