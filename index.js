document.addEventListener("DOMContentLoaded", function () {
    const orderForm = document.getElementById("order-form");
    const orderSummary = document.getElementById("order-summary");

    orderForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const selectedInputs = document.querySelectorAll(".food-items input[type=number]");
        const selectedItems = Array.from(selectedInputs).map(input => {
            const name = input.id;
            const quantity = parseInt(input.value, 10);
            const price = parseFloat(input.getAttribute("data-price")) || 0;
            return { name, quantity, price };
        });

        const totalPrice = calculateTotalPrice(selectedItems);

        const selectedItemsText = selectedItems
            .filter(item => item.quantity > 0)
            .map(item => {
                return `${item.name} (Quantity: ${item.quantity}) - &#8358 ${(item.price * item.quantity).toFixed(2)}`;
            })
            .join(", ");

        orderSummary.innerHTML = `
            <h2>Order Summary</h2>
            <p>Selected Items: ${selectedItemsText}</p>
            <p>Total Price: &#8358 ${totalPrice.toFixed(2)}</p>
        `;
    });

    function calculateTotalPrice(selectedItems) {
        let total = 0;
        for (const item of selectedItems) {
            total += item.price * item.quantity;
        }
        return total;
    }
});

