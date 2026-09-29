/* =========================
   RESTAURANT MENU DATA
========================= */

const foods = [
    {
        id: 1,
        name: "Butter Chicken",
        category: "Indian",
        price: 349,
        description: "Creamy tomato gravy with tender chicken.",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 2,
        name: "Paneer Tikka",
        category: "Indian",
        price: 299,
        description: "Smoky grilled paneer with Indian spices.",
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 3,
        name: "Royal Biryani",
        category: "Indian",
        price: 399,
        description: "Aromatic basmati rice with royal spices.",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 4,
        name: "Cheese Burst Pizza",
        category: "Pizza",
        price: 399,
        description: "Loaded with cheese and fresh toppings.",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 5,
        name: "Pepperoni Pizza",
        category: "Pizza",
        price: 449,
        description: "Classic pizza with spicy pepperoni.",
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 6,
        name: "Classic Burger",
        category: "Burger",
        price: 249,
        description: "Juicy patty with cheese and fresh veggies.",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 7,
        name: "Double Cheese Burger",
        category: "Burger",
        price: 329,
        description: "Double patty with double cheese.",
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 8,
        name: "Chocolate Cake",
        category: "Dessert",
        price: 199,
        description: "Rich chocolate cake with creamy frosting.",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80"
    },

    {
        id: 9,
        name: "Gulab Jamun",
        category: "Dessert",
        price: 129,
        description: "Warm Indian dessert soaked in sugar syrup.",
        image: "https://images.unsplash.com/photo-1666190094764-6b5a9f8d5b3c?auto=format&fit=crop&w=700&q=80"
    }
];


/* =========================
   CART
========================= */

let cart = JSON.parse(localStorage.getItem("restaurantCart")) || [];


function saveCart() {

    localStorage.setItem(
        "restaurantCart",
        JSON.stringify(cart)
    );

}


function addToCart(id) {

    const food = foods.find(item => item.id === id);

    if (!food) return;

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {

        cart.push({
            ...food,
            quantity: 1
        });

    }

    saveCart();
    updateCart();

    openCart();

}


function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    saveCart();

    updateCart();

}


function updateCart() {

    const countElement =
        document.getElementById("cartCount");

    const itemsElement =
        document.getElementById("cartItems");

    const totalElement =
        document.getElementById("cartTotal");


    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    if (countElement) {
        countElement.textContent = count;
    }


    if (!itemsElement) return;


    if (cart.length === 0) {

        itemsElement.innerHTML = `
            <div style="
                text-align:center;
                padding:60px 10px;
                color:var(--muted);
            ">
                <div style="font-size:50px">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add something delicious!</p>
            </div>
        `;

        if (totalElement) {
            totalElement.textContent = "₹0";
        }

        return;
    }


    itemsElement.innerHTML = cart.map(item => `

        <div class="cart-item">

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="cart-item-info">

                <h4>${item.name}</h4>

                <p>
                    ₹${item.price}
                    × ${item.quantity}
                </p>

            </div>

            <button
                class="remove-btn"
                onclick="removeFromCart(${item.id})"
            >
                ✕
            </button>

        </div>

    `).join("");


    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );


    if (totalElement) {
        totalElement.textContent = `₹${total}`;
    }

}


function openCart() {

    const cartElement =
        document.getElementById("cart");

    const overlay =
        document.getElementById("cartOverlay");

    if (cartElement) {
        cartElement.classList.add("open");
    }

    if (overlay) {
        overlay.classList.add("show");
    }

}


function closeCart() {

    const cartElement =
        document.getElementById("cart");

    const overlay =
        document.getElementById("cartOverlay");

    if (cartElement) {
        cartElement.classList.remove("open");
    }

    if (overlay) {
        overlay.classList.remove("show");
    }

}


function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert(
        "Order placed successfully! 🍽️\n\nThank you for ordering from Spice & Soul."
    );

    cart = [];

    saveCart();
    updateCart();
    closeCart();

}


/* =========================
   MENU
========================= */

let currentCategory = "All";


function renderMenu() {

    const grid =
        document.getElementById("menuGrid");

    if (!grid) return;


    const searchInput =
        document.getElementById("searchInput");

    const search =
        searchInput ?
        searchInput.value.toLowerCase() :
        "";


    const filtered = foods.filter(food => {

        const categoryMatch =
            currentCategory === "All" ||
            food.category === currentCategory;

        const searchMatch =
            food.name.toLowerCase().includes(search) ||
            food.description.toLowerCase().includes(search);

        return categoryMatch && searchMatch;

    });


    if (filtered.length === 0) {

        grid.innerHTML = `
            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:60px;
            ">
                <h2>No food found 😔</h2>
                <p>Try another search.</p>
            </div>
        `;

        return;
    }


    grid.innerHTML = filtered.map(food => `

        <article class="menu-card">

            <img
                src="${food.image}"
                alt="${food.name}"
            >

            <div class="menu-card-content">

                <small style="color:var(--orange)">
                    ${food.category}
                </small>

                <h3>${food.name}</h3>

                <p>${food.description}</p>

                <div class="menu-price">

                    <strong>
                        ₹${food.price}
                    </strong>

                    <button
                        class="add-btn"
                        onclick="addToCart(${food.id})"
                    >
                        + Add
                    </button>

                </div>

            </div>

        </article>

    `).join("");

}


document.querySelectorAll(".filter")
.forEach(button => {

    button.addEventListener("click", () => {

        document
            .querySelectorAll(".filter")
            .forEach(btn =>
                btn.classList.remove("active")
            );

        button.classList.add("active");

        currentCategory =
            button.dataset.category;

        renderMenu();

    });

});


const searchInput =
    document.getElementById("searchInput");


if (searchInput) {

    searchInput.addEventListener(
        "input",
        renderMenu
    );

}


/* =========================
   CATEGORY FROM URL
========================= */

const params =
    new URLSearchParams(window.location.search);

const urlCategory =
    params.get("category");


if (urlCategory) {

    currentCategory = urlCategory;

    document
        .querySelectorAll(".filter")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.category === urlCategory
            );

        });

}


/* =========================
   DARK MODE
========================= */

const themeBtn =
    document.getElementById("themeBtn");


const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "dark") {
    document.body.classList.add("dark");
}


if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const dark =
            document.body.classList.contains("dark");

        localStorage.setItem(
            "theme",
            dark ? "dark" : "light"
        );

        themeBtn.textContent =
            dark ? "☀️" : "🌙";

    });

}


/* =========================
   MOBILE MENU
========================= */

function toggleMenu() {

    const nav =
        document.getElementById("navMenu");

    if (!nav) return;

    nav.classList.toggle("mobile-open");

}


/* =========================
   BOOKING
========================= */

function openBooking() {

    const modal =
        document.getElementById("bookingModal");

    if (modal) {
        modal.classList.add("show");
    }

}


function closeBooking() {

    const modal =
        document.getElementById("bookingModal");

    if (modal) {
        modal.classList.remove("show");
    }

}


const bookingForm =
    document.getElementById("bookingForm");


if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const name =
                document.getElementById("guestName").value;

            alert(
                `Thanks ${name}! 🎉\n\nYour table request has been received.`
            );

            bookingForm.reset();

            closeBooking();

        }
    );

}


/* =========================
   OFFER COUNTDOWN
========================= */

let offerEnd =
    localStorage.getItem("offerEnd");


if (!offerEnd) {

    offerEnd =
        Date.now() +
        8 * 60 * 60 * 1000;

    localStorage.setItem(
        "offerEnd",
        offerEnd
    );

}


function updateCountdown() {

    const difference =
        Number(offerEnd) - Date.now();


    if (difference <= 0) {

        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;
    }


    const hours =
        Math.floor(
            difference / (1000 * 60 * 60)
        );

    const minutes =
        Math.floor(
            (difference / (1000 * 60)) % 60
        );

    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );


    const h =
        document.getElementById("hours");

    const m =
        document.getElementById("minutes");

    const s =
        document.getElementById("seconds");


    if (h) {
        h.textContent =
            String(hours).padStart(2, "0");
    }

    if (m) {
        m.textContent =
            String(minutes).padStart(2, "0");
    }

    if (s) {
        s.textContent =
            String(seconds).padStart(2, "0");
    }

}


setInterval(updateCountdown, 1000);

updateCountdown();


/* =========================
   INITIALIZE
========================= */

updateCart();
renderMenu();
