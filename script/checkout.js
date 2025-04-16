document.addEventListener("DOMContentLoaded", function () {
    const checkoutItems = document.getElementById("checkout-items");
    const totalAmount = document.getElementById("total-amount");
    const checkoutTotal = document.getElementById("checkout-total");
    const checkoutForm = document.getElementById("checkout-form");
    const cardFields = document.getElementById("card-fields");
    const payment = document.getElementById("payment");

    let cart = JSON.parse(localStorage.getItem("checkoutCart"))
        || JSON.parse(localStorage.getItem("buyNowItem"))
        || JSON.parse(localStorage.getItem("cart"))
        || [];

    function updateCartDisplay() {
        checkoutItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const card = document.createElement("div");
            card.className = "product-card";

            card.innerHTML = `
                <div class="product-info">
                    <h4>${item.name}</h4>
                    <p>Rs. ${item.price.toLocaleString()}</p>
                    <p>Quantity: 
                        <button class="quantity-btn" data-index="${index}" data-action="decrease">−</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" data-index="${index}" data-action="increase">＋</button>
                    </p>
                    <hr>
                </div>
            `;

            checkoutItems.appendChild(card);
        });

        totalAmount.textContent = `Rs. ${total.toLocaleString()}`;
        checkoutTotal.textContent = `Rs. ${total.toLocaleString()}`;

        if (localStorage.getItem("checkoutCart")) {
            localStorage.setItem("checkoutCart", JSON.stringify(cart));
        } else if (localStorage.getItem("buyNowItem")) {
            localStorage.setItem("buyNowItem", JSON.stringify(cart));
        } else {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }

    checkoutItems.addEventListener("click", function (e) {
        if (e.target.classList.contains("quantity-btn")) {
            const index = e.target.getAttribute("data-index");
            const action = e.target.getAttribute("data-action");

            if (action === "increase") {
                if (cart[index].quantity < 10) cart[index].quantity += 1;
            } else if (action === "decrease") {
                cart[index].quantity -= 1;
                if (cart[index].quantity <= 0) cart.splice(index, 1);
            }

            updateCartDisplay();
        }
    });

    payment.addEventListener("change", () => {
        cardFields.style.display = payment.value === "card" ? "block" : "none";
    });

    checkoutForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const address = document.getElementById("address").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();

        if (!name || !address || !email || !phone || !payment.value) {
            alert("Please fill in all required fields.");
            return;
        }

        if (payment.value === "card") {
            const cardNumber = document.getElementById("card-number").value.trim();
            const expiry = document.getElementById("expiry").value.trim();
            const cvv = document.getElementById("cvv").value.trim();

            if (!cardNumber || !expiry || !cvv) {
                alert("Please fill in card details.");
                return;
            }
        }

        alert("Order placed successfully!");
        localStorage.removeItem("checkoutCart");
        localStorage.removeItem("buyNowItem");
        localStorage.removeItem("cart");
        window.location.href = "thanku.html";
    });

    updateCartDisplay();
});
