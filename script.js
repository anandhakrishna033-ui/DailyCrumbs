// ==========================================
// 1. YOUR CUSTOMIZABLE BAKERY SETTINGS
// ==========================================
const bakeryConfig = {
    name: "Daily Crumbs",
    location: "Trivandrum, Kerala",
    fullAddress: "123 Bakery Lane, MG Road, Trivandrum, Kerala 695001",
    contactInfo: "hello@ovendoor.in | +91 98765 43210",
    imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?auto=format&fit=crop&w=800&q=80",
    // Embed URL from Google Maps
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252543.56581452608!2d76.78363765101416!3d8.500037894565345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bbb805bbcd47%3A0x15439fab5c5c81cb!2sThiruvananthapuram%2C%20Kerala!5e0!3m2!1sen!2sin!4v1710500000000!5m2!1sen!2sin"
};

let allRatings = [];

// ==========================================
// 2. APPLY SETTINGS TO THE PAGE
// ==========================================
function loadBakeryData() {
    // These elements exist on all pages
    if (document.getElementById("page-title")) document.getElementById("page-title").textContent = bakeryConfig.name;
    if (document.getElementById("display-name")) document.getElementById("display-name").textContent = bakeryConfig.name;
    if (document.getElementById("display-location")) document.getElementById("display-location").textContent = bakeryConfig.location;
    if (document.getElementById("display-contact")) document.getElementById("display-contact").textContent = bakeryConfig.contactInfo;
    if (document.getElementById("display-image")) document.getElementById("display-image").src = bakeryConfig.imageUrl;
    if (document.getElementById("footer-name")) document.getElementById("footer-name").textContent = bakeryConfig.name;

    // Safety check because these IDs only exist on the contact page
    if (document.getElementById("display-full-address")) {
        document.getElementById("display-full-address").textContent = bakeryConfig.fullAddress;
        document.getElementById("bakery-map").src = bakeryConfig.mapUrl;
    }
}

// ==========================================
// 3. RATING SYSTEM & ANIMATIONS
// ==========================================
function updateRatingDisplay() {
    // Only run if the rating section exists on the page (Homepage)
    if (!document.getElementById("average-score")) return;

    let totalScore = 0;
    for (let i = 0; i < allRatings.length; i++) {
        totalScore += allRatings[i];
    }

    let average = allRatings.length > 0 ? (totalScore / allRatings.length) : 0;

    document.getElementById("average-score").textContent = average.toFixed(1);
    document.getElementById("total-reviews").textContent = allRatings.length;
}

// Interactive Toast Notification Function
function showToast() {
    let toast = document.getElementById("toast-notification");
    if (toast) {
        toast.className = "show"; // Adds the CSS class to fade it in
        // After 3 seconds, remove the class to fade it out
        setTimeout(function() {
            toast.className = toast.className.replace("show", "");
        }, 3000);
    }
}

// Handle the rating form submission event
const ratingForm = document.getElementById("rating-form");
if (ratingForm) {
    ratingForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let ratingInput = document.getElementById("user-rating").value;
        let numericRating = parseInt(ratingInput);

        allRatings.push(numericRating);
        updateRatingDisplay();
        document.getElementById("user-rating").value = "";

        // Trigger the interactive notification instead of alert()
        showToast();
    });
}

// ==========================================
// 4. RUN FUNCTIONS WHEN PAGE LOADS
// ==========================================
loadBakeryData();
updateRatingDisplay();

// ==========================================
// 5. CONTACT FORM REAL-TIME VALIDATION
// ==========================================
const contactForm = document.getElementById("contact-form");

// Only run this if we are actually on the contact page
if (contactForm) {
    const userName = document.getElementById("userName");
    const userEmail = document.getElementById("userEmail");
    const submitBtn = document.getElementById("submitBtn");
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");

    // Function to check if the form inputs are valid
    function checkFormValidity() {
        let isNameValid = userName.value.length >= 3;
        // checkValidity() is a built-in HTML5 feature!
        let isEmailValid = userEmail.checkValidity() && userEmail.value !== "";

        // Show or hide error messages dynamically
        nameError.style.display = (userName.value.length > 0 && !isNameValid) ? "block" : "none";
        emailError.style.display = (userEmail.value.length > 0 && !isEmailValid) ? "block" : "none";

        // Enable button if everything is correct
        if (isNameValid && isEmailValid) {
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = "#e67e22"; // Active orange color
            submitBtn.style.cursor = "pointer";
        } else {
            submitBtn.disabled = true;
            submitBtn.style.backgroundColor = "gray"; // Disabled gray color
            submitBtn.style.cursor = "not-allowed";
        }
    }

    // Listen for keystrokes in real-time
    userName.addEventListener("input", checkFormValidity);
    userEmail.addEventListener("input", checkFormValidity);

    // Handle the final submission
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent page reload
        document.getElementById("success-message").style.display = "block"; // Show success text
        contactForm.reset(); // Clear the form
        checkFormValidity(); // Reset the button back to gray
    });
}