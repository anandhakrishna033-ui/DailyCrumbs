
// ==========================================
// 1. YOUR CUSTOMIZABLE BAKERY SETTINGS
// ==========================================
// Edit these values to update your entire website instantly!
const bakeryConfig = {
    name: "Daily Crumbs",
    location: "Trivandrum, Kerala",
    fullAddress: "123 Bakery Lane, MG Road, Trivandrum, Kerala 695001",
    contactInfo: "hello@dailycrumbs.in | +91 6238164839",
    imageUrl: "https://nokta.pk/uploads/shops/shop_5_1758949734_2eb879.jpg",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.923485458925!2d76.94862331478317!3d8.502097093887193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bb0000000001%3A0x0!2zOMKwMzAnMDcuNiJOIDc2wrA1NycwMi45IkU!5e0!3m2!1sen!2sin!4v1625650000000!5m2!1sen!2sin"
};

// PERSISTENCE: Load ratings from browser memory so they don't disappear on refresh
let allRatings = JSON.parse(localStorage.getItem('bakery_ratings')) || [];

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
    
    // Save to memory so it stays after refresh
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
        // Name must be at least 3 chars
        let isNameValid = userName.value.trim().length >= 3;
        // Uses built-in HTML5 email validation
        let isEmailValid = userEmail.checkValidity() && userEmail.value !== "";

        // Show/Hide error messages dynamically
        nameError.style.display = (userName.value.length > 0 && !isNameValid) ? "block" : "none";
        emailError.style.display = (userEmail.value.length > 0 && !isEmailValid) ? "block" : "none";

        // Enable/Disable button
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

// Initialize all data when any page loads
loadBakeryData();
updateRatingDisplay();

