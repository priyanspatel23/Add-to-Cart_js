let cartProductsRender = () => {
    let cartProductContainer = document.querySelector(".cart-product-container");
    let cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
    let cartProductCards = ``;

    if (cartProducts.length == 0) {
        cartProductContainer.innerHTML = `<h4 class="text-center" style="color: #B388FF;">Your cart is empty 🛒</h4>`;
        document.getElementById("cart-total").innerText = "Total: $0";
        return;
    }

    cartProducts.forEach((item) => {
        total += item.price * item.Quontity;

        cartProductCards += `
            <div class="col-12 col-md-4 py-3">
                <div class="card p-3 rounded-4">
                    <div class="cardthumbnail text-center">
                        <img class="img-fluid" src="${item.thumbnail}" alt="${item.name}">
                    </div>
                    <div class="card-body text-center">
                        <h5>${item.name}</h5>
                        <p>Price: $${item.price}</p>
                        
                        <div class="d-flex justify-content-center align-items-center mb-2">
                            <button class="btn btn-sm btn-outline-light me-2" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span class="mx-2 fw-bold">${item.Quontity}</span>
                            <button class="btn btn-sm btn-outline-light ms-2" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>

                        <p><b>Subtotal: ${(item.price * item.Quontity).toFixed(2)}</b></p>
                        <button class="btn btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `;
    });

    cartProductContainer.innerHTML = cartProductCards;
    document.getElementById("cart-total").innerText = `Total: ${total.toFixed(2)}`;
};

const updateQuantity = (id, change) => {
    let cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
    let product = cartProducts.find(item => item.id == id);

    if (product) {
        product.Quontity += change;
        if (product.Quontity < 1) {
            product.Quontity = 1;
        }
    }
    localStorage.setItem("cart", JSON.stringify(cartProducts));
    cartProductsRender();      
};
const removeFromCart = (id) => {
    let cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
    let updatedCart = cartProducts.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    cartProductsRender();
};

cartProductsRender();