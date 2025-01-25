/* 
 * Created by John Christian Linaban for Intro to Computing
 * All rights reserved © 2025
*/

document.addEventListener('DOMContentLoaded', function() {
    // Back button functionality
    const backLink = document.querySelector('.back');
    backLink.addEventListener('click', function(event) {
        event.preventDefault();
        window.history.back();
    });

    // Cart functionality
    const cart = [];
    const cartList = document.querySelector('.cart ul');
    const cartTotal = document.querySelector('.cart-total');
    const cartSection = document.querySelector('.cart');
    const cartToggleBtn = document.createElement('button');
    cartToggleBtn.classList.add('cart-toggle-btn');
    cartToggleBtn.textContent = 'Show Cart Items';
    cartSection.appendChild(cartToggleBtn);

    // Toggle cart items visibility
    cartToggleBtn.addEventListener('click', function() {
        cartSection.classList.toggle('show-items');
        if (cartSection.classList.contains('show-items')) {
            cartToggleBtn.textContent = 'Hide Cart Items';
        } else {
            cartToggleBtn.textContent = 'Show Cart Items';
        }
    });

    // Update cart display
    function updateCart() {
        cartList.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${item.name} x${item.quantity}</span><span>$${item.price * item.quantity}</span><button class="remove-btn" data-name="${item.name}">-</button>`;
            cartList.appendChild(li);
            total += item.price * item.quantity;
        });
        cartTotal.textContent = `Total: $${total}`;

        // Remove item from cart
        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const name = this.getAttribute('data-name');
                const item = cart.find(item => item.name === name);
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    const index = cart.indexOf(item);
                    cart.splice(index, 1);
                }
                updateCart();
            });
        });
    }

    // Add item to cart
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));
            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name, price, quantity: 1 });
            }
            updateCart();
        });
    });

    // Modal functionality
    const modal = document.getElementById("order-modal");
    const btn = document.getElementById("checkout-button");
    const span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "flex";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});