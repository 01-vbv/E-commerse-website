const productsEle = document.querySelector(".products");
const cartBtn = document.querySelector("#cartBtn");
const cart = document.querySelector(".cart");
const checkoutBtn = document.getElementById("checkoutBtn");

let productCard;
let product;
let totalPrice = 0;
let cartItems = [];

async function displayProducts() {
  product = await fetch(`https://dummyjson.com/products`);
  product = await product.json();
  product = product.products;
  product.forEach((prod) => {
    productCard = document.createElement("div");
    productCard.innerHTML = `
    <div class="product" style = "height:400px; " id=${prod.id}>
      <div class="img_con">
        <button class="previous" onClick= "prevImage(${prod.id})"> << </button>
        <img src=${prod.images[0]} style = "height:200px; width:200px;" id="0"></img>
        <button id="next" onClick = "nextImage(${prod.id})"> >> </button>
      </div>
    <div class="card_footer">
      <h3>${prod.title}</h3>
      <p>Price: $${prod.price}</p>
      <button class="addToCartBtn" onClick="addToCart(${prod.id})">Add to Cart</button>
    </div>
    `;

    productsEle.append(productCard);
  });
}

async function prevImage(id) {
  const item = document.getElementById(`${id}`);
  let img = item.querySelector("img");
  let img_index = img.getAttribute("id");

  let images = product[id - 1].images;

  if (img_index == 0) {
    img_index = images.length - 1;
  } else {
    img_index--;
  }
  img.setAttribute("src", images[img_index]);
  img.setAttribute("id", img_index);
}

async function nextImage(id) {
  const item = document.getElementById(`${id}`);
  let img = item.querySelector("img");
  let img_index = img.getAttribute("id");

  let images = product[id - 1].images;

  if (img_index == images.length - 1) {
    img_index = 0;
  } else {
    img_index++;
  }
  img.setAttribute("src", images[img_index]);
  img.setAttribute("id", img_index);
}

cartBtn.addEventListener("click", () => {
  cart.classList.toggle("show");
  checkoutBtn.classList.toggle("show");
  cart.classList.contains("show")
    ? (cartBtn.textContent = "Home")
    : (cartBtn.textContent = "Cart");
  productsEle.style.display = cart.classList.contains("show") ? "none" : "flex";
  displayCart();
});

function addToCart(id) {
  total += 1;
  console.log(cartItems);
  let index = cartItems.findIndex((obj) => {
    return obj.id === id;
  });
  if (index !== -1) {
    cartItems[index].quantity++;
  } else {
    cartItems.push({
      id: id,
      name: product[id - 1].title,
      price: product[id - 1].price,
      quantity: 1,
    });
  }
  alert(`Item added in Cart, ${total} item in cart`);
  console.log(cartItems);
}

let total = 0;
function displayCart() {
  cart.textContent = "";
  cartItems.forEach((obj) => {
    let cartItemDiv = document.createElement("div");
    cartItemDiv.classList.add("cart_item");
    cartItemDiv.innerHTML = `
        <span style="font-size:18px">${obj.name}</span>
        <span>Price: ${obj.price}</span>
        <span>Qantity: ${obj.quantity}</span>
        <button class="remove" onClick = "removeItem(${obj.id})">-</button>
    `;
    cart.append(cartItemDiv);
  });
}

function removeItem(id) {
  total--;
  let index = cartItems.findIndex((obj) => {
    return obj.id === id;
  });

  if (index !== -1) {
    cartItems[index].quantity--;
    if (cartItems[index].quantity === 0) {
      cartItems.splice(index, 1);
    }
  }
  displayCart();
}

checkoutBtn.addEventListener("click", () => {
  cartItems.forEach((obj) => {
    totalPrice = (totalPrice + obj.quantity * obj.price).toFixed(2);
  });

  if (totalPrice === 0) {
    alert(`Please select an Iten for checkout :)`);
  } else {
    alert(`Thankyou for shopping. Your total price is ${totalPrice}`);
  }
  cartItems = [];
  totalPrice = 0;
  cart.classList.toggle("show");
  checkoutBtn.classList.toggle("show");
  cartBtn.textContent = "Cart";
  productsEle.style.display = "flex";
});

displayProducts();
