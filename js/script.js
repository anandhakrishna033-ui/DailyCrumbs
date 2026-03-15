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
    chefArjun: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400",
    chefMeera: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?w=400",
    processMix: "https://tse2.mm.bing.net/th/id/OIP.OOhr8RjBwbVpyrSPfAzxcAHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    processFerment: "https://th.bing.com/th/id/OIP.a0Mb0R7Sjaz8ZJpaKsNfwQHaEO?w=314&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    processBake: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",

    // PRODUCTS (Home Page)
    imgHomeBread: "https://images.unsplash.com/photo-1585478259715-876a6a81b374?w=400",
    imgHomeCroissant: "https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?w=400",
    imgHomeTart: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400"
};

// PERSISTENCE
let allRatings = JSON.parse(localStorage.getItem('bakery_ratings')) || [];

// ==========================================
// 2. APPLY SETTINGS TO THE PAGE
// ==========================================
function loadBakeryData() {
    const updateElement = (id, value, attribute = "textContent") => {
        const el = document.getElementById(id);
        if (el) el[attribute] = value;
    };
    updateElement("img-home-bread", bakeryConfig.imgHomeBread, "src");
updateElement("img-home-croissant", bakeryConfig.imgHomeCroissant, "src");
updateElement("img-home-tart", bakeryConfig.imgHomeTart, "src");

    // Branding & Header/Footer
    updateElement("page-title", bakeryConfig.name + " | Artisanal Bakery");
    updateElement("display-name", bakeryConfig.name);
    updateElement("display-location", bakeryConfig.location);
    updateElement("display-contact", bakeryConfig.contactInfo);
    updateElement("display-image", bakeryConfig.imageUrl, "src");
    updateElement("footer-name", bakeryConfig.name);
    updateElement("display-full-address", bakeryConfig.fullAddress);
    updateElement("bakery-map", bakeryConfig.mapUrl, "src");

    // Dynamic Images for About Page
    updateElement("img-chef-arjun", bakeryConfig.chefArjun, "src");
    updateElement("img-chef-meera", bakeryConfig.chefMeera, "src");
    updateElement("img-process-mix", bakeryConfig.processMix, "src");
    updateElement("img-process-ferment", bakeryConfig.processFerment, "src");
    updateElement("img-process-bake", bakeryConfig.processBake, "src");

    // Dynamic Images for Home Page
    updateElement("img-home-bread", bakeryConfig.imgHomeBread, "src");
    updateElement("img-home-croissant", bakeryConfig.imgHomeCroissant, "src");
    updateElement("img-home-tart", bakeryConfig.imgHomeTart, "src");
}

// ==========================================
// 3. RATING SYSTEM
// ==========================================
function updateRatingDisplay() {
    if (!document.getElementById("average-score")) return;
    let totalScore = allRatings.reduce((a, b) => a + b, 0);
    let average = allRatings.length > 0 ? (totalScore / allRatings.length) : 0;
    document.getElementById("average-score").textContent = average.toFixed(1);
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

const ratingForm = document.getElementById("rating-form");
if (ratingForm) {
    ratingForm.addEventListener("submit", function(event) {
        event.preventDefault();
        let val = parseInt(document.getElementById("user-rating").value);
        allRatings.push(val);
        updateRatingDisplay();
        ratingForm.reset();
        showToast();
    });
}

// ==========================================
// 4. CONTACT FORM VALIDATION
// ==========================================
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    const userName = document.getElementById("userName");
    const userEmail = document.getElementById("userEmail");
    const submitBtn = document.getElementById("submitBtn");
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");

    function checkFormValidity() {
        let isNameValid = userName.value.trim().length >= 3;
        let isEmailValid = userEmail.checkValidity() && userEmail.value !== "";
        nameError.style.display = (userName.value.length > 0 && !isNameValid) ? "block" : "none";
        emailError.style.display = (userEmail.value.length > 0 && !isEmailValid) ? "block" : "none";
        submitBtn.disabled = !(isNameValid && isEmailValid);
        submitBtn.style.opacity = submitBtn.disabled ? "0.5" : "1";
        submitBtn.style.cursor = submitBtn.disabled ? "not-allowed" : "pointer";
    }

    userName.addEventListener("input", checkFormValidity);
    userEmail.addEventListener("input", checkFormValidity);

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();
        document.getElementById("success-message").style.display = "block";
        contactForm.reset();
        checkFormValidity();
    });
}

// Initialize
loadBakeryData();
updateRatingDisplay();
