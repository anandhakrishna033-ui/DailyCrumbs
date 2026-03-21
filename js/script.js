// ==========================================
// 1. YOUR CUSTOMIZABLE BAKERY SETTINGS
// ==========================================
const bakeryConfig = {
    name: "Daily Crumbs",
    location: "Trivandrum, Kerala",
    fullAddress: "123 Bakery Lane, MG Road, Trivandrum, Kerala 695001",
    contactInfo: "hello@dailycrumbs.in | +91 6238164839",
    imageUrl: "https://nokta.pk/uploads/shops/shop_5_1758949734_2eb879.jpg",
    mapUrl: "https://www.google.com/maps/embed?pb=your_real_map_link_here",

    // CHEFS & PROCESS (About Page)
    chefArjun: "https://images.unsplash.com/photo-1583394293235-4815c1516001?w=400",
    chefMeera: "https://images.unsplash.com/photo-1595273670150-db0c3c392416?w=400",
    processMix: "https://69be41ae10e539a90709d947.imgix.net/download%20(1).webp",
    processFerment: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
    processBake: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400",

    // PRODUCTS (Home Page)
    imgHomeBread: "https://images.unsplash.com/photo-1585478259715-876a6a81b374?w=400",
    imgHomeCroissant: "https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?w=400",
    imgHomeTart: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400"
};

// PERSISTENCE DATA (Using consistent 'bakery_cart' key)
let allRatings = JSON.parse(localStorage.getItem('bakery_ratings')) || [];
let cart = JSON.parse(localStorage.getItem('bakery_cart')) || [];

// ==========================================
// 2. APPLY SETTINGS TO THE PAGE
// ==========================================
function loadBakeryData() {
    const updateElement = (id, value, attribute = "textContent") => {
        const el = document.getElementById(id);
        if (el) el[attribute] = value;
    };

    updateElement("page-title", bakeryConfig.name + " | Artisanal Bakery");
    updateElement("display-name", bakeryConfig.name);
    updateElement("display-location", bakeryConfig.location);
    updateElement("display-contact", bakeryConfig.contactInfo);
    updateElement("display-image", bakeryConfig.imageUrl, "src");
    updateElement("footer-name", bakeryConfig.name);
    updateElement("display-full-address", bakeryConfig.fullAddress);
    updateElement("bakery-map", bakeryConfig.mapUrl, "src");

    // Dynamic Images (Home & About)
    updateElement("img-home-bread", bakeryConfig.imgHomeBread, "src");
    updateElement("img-home-croissant", bakeryConfig.imgHomeCroissant, "src");
    updateElement("img-home-tart", bakeryConfig.imgHomeTart, "src");
    updateElement("img-chef-arjun", bakeryConfig.chefArjun, "src");
    updateElement("img-chef-meera", bakeryConfig.chefMeera, "src");
    updateElement("img-process-mix", bakeryConfig.processMix, "src");
    updateElement("img-process-ferment", bakeryConfig.processFerment, "src");
    updateElement("img-process-bake", bakeryConfig.processBake, "src");
    updateElement("img-process-ferment", bakeryConfig.processFerment, "src");
updateElement("img-process-bake", bakeryConfig.processBake, "src");
}

// ==========================================
// 3. RATING & FEEDBACK SYSTEM
// ==========================================
function updateRatingDisplay() {
    const avgScoreEl = document.getElementById("average-score");
    if (!avgScoreEl) return;
    
    let totalScore = allRatings.reduce((a, b) => a + b, 0);
    let average = allRatings.length > 0 ? (totalScore / allRatings.length) : 0;
    avgScoreEl.textContent = average.toFixed(1);
    document.getElementById("total-reviews").textContent = allRatings.length;
    localStorage.setItem('bakery_ratings', JSON.stringify(allRatings));
}

function showToast() {
    const toast = document.getElementById("toast-notification");
    if (toast) {
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 3000);
    }
}

function displayCommunityFeedback() {
    const feedbackList = document.getElementById('dynamic-feedback-list');
    if (!feedbackList) return;

    const savedFeedback = JSON.parse(localStorage.getItem('community_feedback')) || [];
    savedFeedback.forEach(item => {
        const div = document.createElement('div');
        div.className = 'product-card fade-in';
        div.innerHTML = `
            <div class="card-content">
                <div class="rating-stars">★★★★★</div>
                <p>"${item.message}"</p>
                <p><strong>— ${item.name}</strong></p>
            </div>`;
        feedbackList.appendChild(div);
    });
}

// ==========================================
// 4. CART & SHOPPING LOGIC
// ==========================================
function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('bakery_cart', JSON.stringify(cart));
    updateCartCount();
    alert(name + " added to bag!");
}

function updateCartCount() {
    const count = document.getElementById('cart-count');
    if (count) count.innerText = cart.length;
}

function renderCart() {
    const tableBody = document.getElementById('cart-items');
    if (!tableBody) return;
    
    let total = 0;
    if (cart.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4" style="padding:20px; text-align:center;">Your bag is empty!</td></tr>';
    } else {
        tableBody.innerHTML = cart.map((item, index) => {
            total += item.price;
            return `
                <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 15px;">${item.name}</td>
                    <td style="text-align:center;">₹${item.price}</td>
                    <td style="text-align:center;">1</td>
                    <td style="text-align:center;">
                        <button onclick="removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer; font-weight:bold;">X</button>
                    </td>
                </tr>`;
        }).join('');
    }
    
    const totalPriceEl = document.getElementById('total-price');
    const grandTotalEl = document.getElementById('grand-total');
    if (totalPriceEl) totalPriceEl.innerText = total;
    if (grandTotalEl) grandTotalEl.innerText = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('bakery_cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

function applyCoupon() {
    const code = document.getElementById('coupon-code')?.value;
    const totalPriceEl = document.getElementById('total-price');
    const grandTotalEl = document.getElementById('grand-total');
    
    if (!totalPriceEl || !grandTotalEl) return;

    let total = parseFloat(totalPriceEl.innerText);
    if (code === "CRUMBS20") {
        grandTotalEl.innerText = (total * 0.8).toFixed(2);
        alert("Coupon Applied! 20% off.");
    } else {
        alert("Invalid Coupon");
    }
}

// ==========================================
// 5. RECEIPT & CHECKOUT
// ==========================================
function showReceipt() {
    const modal = document.getElementById('receipt-modal');
    const content = document.getElementById('receipt-content');
    const totalDisplay = document.getElementById('receipt-total');
    const grandTotal = document.getElementById('grand-total')?.innerText || "0";

    if (!modal || cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    content.innerHTML = cart.map(item => 
        `<div style="display:flex; justify-content:space-between; margin-bottom:5px;">
            <span>${item.name}</span>
            <span>₹${item.price}</span>
        </div>`).join('');

    totalDisplay.innerText = "Total Paid: ₹" + grandTotal;
    modal.style.display = "flex";
}

function closeReceipt() {
    document.getElementById('receipt-modal').style.display = "none";
    cart = [];
    localStorage.removeItem('bakery_cart');
    window.location.href = "index.html"; 
}

// ==========================================
// 6. INITIALIZATION & LISTENERS
// ==========================================
window.onload = () => {
    loadBakeryData();
    updateRatingDisplay();
    updateCartCount();
    renderCart();
    displayCommunityFeedback();
};

// Form Listeners
document.getElementById("rating-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    allRatings.push(parseInt(document.getElementById("user-rating").value));
    updateRatingDisplay();
    e.target.reset();
    showToast();
});

document.getElementById('community-feedback-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cust-name').value;
    const message = document.getElementById('cust-message').value;
    const allFeedback = JSON.parse(localStorage.getItem('community_feedback')) || [];
    allFeedback.push({ name, message });
    localStorage.setItem('community_feedback', JSON.stringify(allFeedback));
    window.location.reload();
});

// Contact Form Validation
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const submitBtn = document.getElementById("submitBtn");

if (userName && userEmail && submitBtn) {
    const checkForm = () => {
        let isNameValid = userName.value.trim().length >= 3;
        let isEmailValid = userEmail.checkValidity() && userEmail.value !== "";
        submitBtn.disabled = !(isNameValid && isEmailValid);
        submitBtn.style.opacity = submitBtn.disabled ? "0.5" : "1";
    };
    userName.addEventListener("input", checkForm);
    userEmail.addEventListener("input", checkForm);
}
