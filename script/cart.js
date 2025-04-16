document.addEventListener("DOMContentLoaded", function () {
    const cartTableBody = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const clearCartBtn = document.getElementById("clear-cart");
    const checkoutBtn = document.getElementById("checkout-btn");
    const applyFavoritesBtn = document.getElementById("apply-favorites");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    function updateCartDisplay() {
        cartTableBody.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Your cart is empty.</td></tr>`;
            cartTotal.textContent = "Rs. 0";
            return;
        }

        cart.forEach((item, index) => {
            const price = typeof item.price === 'string' ? parseFloat(item.price.replace(/,/g, '')) : item.price;
            let totalPrice = price * item.quantity;
            total += totalPrice;
            const isFavorite = favorites.includes(item.name);

            let row = document.createElement("tr");

            // Create quantity label and input
            const inputId = `quantity-${index}`;
            const quantityLabel = document.createElement("label");
            quantityLabel.setAttribute("for", inputId);
            quantityLabel.className = "visually-hidden";
            quantityLabel.textContent = `Quantity for ${item.name}`;

            const quantityInput = document.createElement("input");
            quantityInput.type = "number";
            quantityInput.min = "1";
            quantityInput.max = "10";
            quantityInput.value = item.quantity;
            quantityInput.dataset.index = index;
            quantityInput.className = "quantity-input";
            quantityInput.id = inputId;

            // Assemble cells
            row.innerHTML = `
                <td>${item.name}</td>
                <td>Rs. ${price.toLocaleString()}</td>
                <td></td>
                <td>Rs. ${totalPrice.toLocaleString()}</td>
                <td><button class="remove-btn" data-index="${index}">🗑 Remove</button></td>
                <td><button class="favorite-btn" data-index="${index}">${isFavorite ? "Remove from Favorites" : "Add to Favorites"}</button></td>
            `;

            const quantityCell = row.children[2];
            quantityCell.appendChild(quantityLabel);
            quantityCell.appendChild(quantityInput);

            cartTableBody.appendChild(row);
        });

        cartTotal.textContent = `Rs. ${total.toLocaleString()}`;
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    cartTableBody.addEventListener("input", function (event) {
        if (event.target.classList.contains("quantity-input")) {
            let index = event.target.getAttribute("data-index");
            let newQty = parseInt(event.target.value);

            if (newQty >= 1 && newQty <= 10) {
                cart[index].quantity = newQty;
                updateCartDisplay();
            } else {
                alert("Quantity must be between 1 and 10.");
                event.target.value = cart[index].quantity;
            }
        }
    });

    cartTableBody.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-btn")) {
            let index = event.target.getAttribute("data-index");
            cart.splice(index, 1);
            updateCartDisplay();
        }
    });

    cartTableBody.addEventListener("click", function (event) {
        if (event.target.classList.contains("favorite-btn")) {
            let index = event.target.getAttribute("data-index");
            let item = cart[index];

            if (favorites.includes(item.name)) {
                favorites = favorites.filter(fav => fav !== item.name);
            } else {
                favorites.push(item.name);
            }

            updateCartDisplay();
        }
    });

    clearCartBtn.addEventListener("click", function () {
        localStorage.removeItem("cart");
        cart = [];
        updateCartDisplay();
    });

    checkoutBtn.addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        localStorage.setItem("checkoutCart", JSON.stringify(cart));
        window.location.href = "checkout.html";
    });

    applyFavoritesBtn.addEventListener("click", function () {
        if (favorites.length === 0) {
            alert("You have no favorite items to add.");
            return;
        }

        favorites.forEach(favoriteName => {
            let item = cart.find(product => product.name === favoriteName);
            if (item) {
                item.quantity++;
            } else {
                let product = getProductByName(favoriteName);
                if (product) {
                    addToCart(product);
                }
            }
        });

        updateCartDisplay();
    });

    function getProductByName(name) {
        const allProducts = [
            { name: "INTEL I5 12400F (Cores 6/Total Threads 12) Processor", price: 38000 },
            { name: "INTEL® CORE™ i5 14400F Processor (Cores 10/ Threads 16)", price: 50500 },
            { name: "AMD RYZEN Threadripper 3990X Processor (Cores 64/Threads 128)", price: 1100000 },
        ];

        return allProducts.find(product => product.name === name);
    }

    function addToCart(item) {
        let existingItem = cart.find(cartItem => cartItem.name === item.name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        updateCartDisplay();
    }

    updateCartDisplay();
});
