document.addEventListener("DOMContentLoaded", function () {
    let priceRange = document.getElementById("priceRange");
    let priceValue = document.getElementById("priceValue");
    let checkboxes = document.querySelectorAll("input[type='checkbox']");
    let searchInput = document.getElementById("searchInput");

    function filterProducts() {
        let selectedPrice = parseInt(priceRange.value);
        let selectedAvailability = [];
        let selectedBrands = [];

        checkboxes.forEach(box => {
            if (box.checked) {
                if (box.id === "inStock" || box.id === "preOrder") {
                    selectedAvailability.push(box.id);
                } else {
                    selectedBrands.push(box.id);
                    
                }
            }
        });

        let searchQuery = searchInput.value.toLowerCase();

        document.querySelectorAll(".product").forEach(product => {
            let price = parseInt(product.getAttribute("data-price"));
            let brand = product.getAttribute("data-brand");
            let available = product.getAttribute("data-available");
            let name = product.querySelector("h4").textContent.toLowerCase();

            let matchesPrice = price <= selectedPrice;
            let matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(brand);
            let matchesAvailability = selectedAvailability.length === 0 || selectedAvailability.includes(available);
            let matchesSearch = name.includes(searchQuery);

            product.style.display = matchesPrice && matchesBrand && matchesAvailability && matchesSearch ? "block" : "none";
        });

        priceValue.textContent = selectedPrice.toLocaleString();
    }

    priceRange.addEventListener("input", filterProducts);
    checkboxes.forEach(box => box.addEventListener("change", filterProducts));
    searchInput.addEventListener("input", filterProducts);
});

        
// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
    const cartCount = document.getElementById("cart-count"); // Cart count display
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    // Load existing cart from Local Storage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Function to update cart count
    function updateCartCount() {
        let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    // Function to add product to cart
    function addToCart(productName, productPrice, quantity) {
        let existingItem = cart.find(item => item.name === productName);

        if (existingItem) {
            existingItem.quantity += quantity;
            if (existingItem.quantity > 10) {
                existingItem.quantity = 10; // Limit quantity to 10
                alert("Maximum quantity per product is 10.");
            }
        } else {
            cart.push({ name: productName, price: productPrice, quantity });
        }

        localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to Local Storage
        updateCartCount();
    }

    // Event listener for "Add to Cart" buttons
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            let productName = this.dataset.product;
            let productPrice = parseFloat(this.dataset.price);
            let quantityInput = this.previousElementSibling;
            let quantity = parseInt(quantityInput.value);

            if (quantity < 1 || quantity > 10) {
                alert("Quantity must be between 1 and 10.");
                return;
            }

            addToCart(productName, productPrice, quantity);
        });
    });

    // Initial cart count update
    updateCartCount();
});


document.addEventListener("DOMContentLoaded", function () {
    const favoriteButtons = document.querySelectorAll(".fav-button");
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    function updateButtonState() {
        favoriteButtons.forEach(button => {
            let productName = button.getAttribute("data-product");
            if (favorites.includes(productName)) {
                button.textContent = "Favorited";
                button.classList.add("active");
            } else {
                button.textContent = " Add to Favorites";
                button.classList.remove("active");
            }
        });
    }
    // Buy Now functionality
document.addEventListener("DOMContentLoaded", function () {
    const buyNowButtons = document.querySelectorAll(".buy-now");
    
    buyNowButtons.forEach(button => {
        button.addEventListener("click", function() {
            const name = this.getAttribute("data-name");
            const price = parseFloat(this.getAttribute("data-price").replace(/,/g, ''));
            
            // Create a cart with just this one item
            const cart = [{ name, price, quantity: 1 }];
            
            // Save to localStorage
            localStorage.setItem("cart", JSON.stringify(cart));
            
            // Update cart count
            document.getElementById("cart-count").textContent = "1";
            
            // Redirect to cart page
            window.location.href="cart.html";
        });
    });
});

    favoriteButtons.forEach(button => {
        button.addEventListener("click", function () {
            let productName = this.getAttribute("data-product");

            if (favorites.includes(productName)) {
                favorites = favorites.filter(item => item !== productName);
            } else {
                favorites.push(productName);
            }

            localStorage.setItem("favorites", JSON.stringify(favorites));
            updateButtonState();
        });
    });

    updateButtonState(); // Ensure buttons are updated on page load
});


document.addEventListener("DOMContentLoaded", function () {
    const cartCount = document.getElementById("cart-count"); // Cart count display
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    // Load existing cart from Local Storage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Function to update cart count
    function updateCartCount() {
        let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    // Function to add product to cart
    function addToCart(productName, productPrice) {
        let existingItem = cart.find(item => item.name === productName);

        if (existingItem) {
            existingItem.quantity += 1;
            if (existingItem.quantity > 10) {
                existingItem.quantity = 10; // Limit quantity to 10
                alert("Maximum quantity per product is 10.");
            }
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }

        // Save to Local Storage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Update cart count
        updateCartCount();
    }

    // Attach event listeners to all Add to Cart buttons
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productName = this.getAttribute("data-name");
            const productPrice = parseInt(this.getAttribute("data-price"));
            addToCart(productName, productPrice);
        });
    });

    // Initialize cart count on page load
    updateCartCount();
});
document.querySelectorAll('.buy-now').forEach(button => {
    button.addEventListener('click', function () {
        const name = this.getAttribute('data-name');
        const price = parseFloat(this.getAttribute('data-price').replace(/,/g, ''));
        const image = this.getAttribute('data-image');

        const buyNowItem = [{
            name: name,
            price: price,
            quantity: 1,
            image: image
        }];

        localStorage.setItem("buyNowItem", JSON.stringify(buyNowItem));
        localStorage.removeItem("checkoutCart");
        window.location.href = "checkout.html";
    });
});
