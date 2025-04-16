// Calculate estimated delivery date range (3 to 5 days from now)
const today = new Date();
const deliveryStart = new Date(today);
const deliveryEnd = new Date(today);
deliveryStart.setDate(today.getDate() + 3);
deliveryEnd.setDate(today.getDate() + 5);

// Format date as readable string
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const startStr = deliveryStart.toLocaleDateString(undefined, options);
const endStr = deliveryEnd.toLocaleDateString(undefined, options);

// Insert into the page
document.getElementById("delivery-date").textContent = `Estimated Delivery: ${startStr} - ${endStr}`;
