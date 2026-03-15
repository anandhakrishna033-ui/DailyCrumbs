// ==========================================
// 1. YOUR CUSTOMIZABLE BAKERY SETTINGS
// ==========================================
const bakeryConfig = {
    name: "Daily Crumbs",
    location: "Trivandrum, Kerala",
    fullAddress: "123 Bakery Lane, MG Road, Trivandrum, Kerala 695001",
    contactInfo: "hello@dailycrumbs.in | +91 98765 43210",
    imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?auto=format&fit=crop&w=800&q=80",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.923456789!2d76.947!3d8.524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMzEnMjYuNCJOIDc2wrA1Nic0OS4yIkU!5e0!3m2!1sen!2sin!4v123456789"
};

// VERCEL TIP: Load existing ratings from browser memory so they stay forever
let allRatings = JSON.parse(localStorage.getItem('bakery_ratings')) || [];

// ==========================================
// 2. APPLY SETTINGS TO THE PAGE
// ==========================================
function loadBakeryData() {
    const updateElement = (id, value, attribute = "textContent") => {
        const el = document.getElementById(id);
        if (el) el[attribute] = value;
    };

    updateElement("page-title", bakeryConfig.name);
    updateElement("display-name", bakeryConfig.name);
    updateElement("display-location", bakeryConfig.location);
    updateElement("display-contact", bakeryConfig.contactInfo);
    updateElement("display-image", bakeryConfig.imageUrl, "src");
    updateElement("footer-name", bakeryConfig.name);
    updateElement("display-full-address", bakeryConfig.fullAddress);
    updateElement("bakery-map", bakeryConfig.mapUrl, "src");
}

// ==========================================
// 3. RATING SYSTEM (HOMEPAGE)
// ==========================================
function updateRatingDisplay() {
    if (!document.getElementById("average-score")) return;

    let totalScore = allRatings.reduce((a, b) => a + b, 0);
    let average = allRatings.length > 0 ? (totalScore / allRatings.length) : 0;

    document.getElementById("average-score").textContent = average.toFixed(1);
    document.getElementById("total-reviews").textContent = allRatings.length;
    
    // Save to browser memory
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
// 4. CONTACT FORM VALIDATION (CONTACT PAGE)
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
        // VERCEL TIP: For real email notifications, change the form action to Formspree
        document.getElementById("success-message").style.display = "block";
        contactForm.reset();
        checkFormValidity();
    });
}

// Initialize the page
loadBakeryData();
updateRatingDisplay();
