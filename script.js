// JavaScript for toggle menu
var navLinks = document.getElementById("navLinks");

function showMenu() {
    navLinks.style.right = "0";
}

function hideMenu() {
    navLinks.style.right = "-200px";
}

// JavaScript for showing words one after the other
document.addEventListener("DOMContentLoaded", function() {
    const words = document.querySelectorAll('.word');
    let index = 0;

    function showWord() {
        if (index < words.length) {
            words[index].style.opacity = '1';
            index++;
            setTimeout(showWord, 1000); // Adjust the delay as needed (in milliseconds)
        }
    }

    showWord(); // Start the animation
});
//gallery
let currentIndex = 0;

function showSlide(index) {
    const slider = document.getElementById('image-slider');
    const slideWidth = document.querySelector('.slider-image').clientWidth;
    const newPosition = -index * slideWidth;
    slider.style.transform = `translateX(${newPosition}px)`;
    currentIndex = index;
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + 7) % 7;
    showSlide(currentIndex);
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % 7;
    showSlide(currentIndex);
}

// Optional: Auto-play functionality
let autoPlayInterval;

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        nextSlide();
    }, 3000); // Adjust the interval as needed (in milliseconds)
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Start auto-play when the page loads
window.addEventListener('load', startAutoPlay);

// Stop auto-play when the user interacts with the slider
document.getElementById('image-slider-section').addEventListener('mouseover', stopAutoPlay);
document.getElementById('image-slider-section').addEventListener('mouseout', startAutoPlay);
