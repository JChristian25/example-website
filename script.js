/* 
 * Created by John Christian Linaban for Intro to Computing
 * All rights reserved © 2025
*/

// Navbar shrink on scroll
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.innerWidth > 1024) { // Exclude phone and tablet
    if (window.scrollY > 65) {
      navbar.classList.add("shrink");
      navbar.classList.remove("full");
    } else { 
      navbar.classList.remove("shrink");
      navbar.classList.add("full");
    }
  }

  let back2top = document.getElementById("back-to-top");
  if (window.scrollY > 150) {
    back2top.classList.add("active");
  } else {
    back2top.classList.remove("active");
  }
});

// Carousel control
function toggleCarousel(n) {
  let slides = document.getElementsByClassName("carousel-slides");
  let controls = document.getElementsByClassName("carousel-control");

  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
    controls[i].classList.remove("active");
  }
  if (n >= 0 && n < slides.length) {
    slides[n].classList.add("active");
    controls[n].classList.add("active");
  }
}

// Back to top
function backtop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.navbar-menu');
    const menuItems = document.querySelectorAll('.navbar-menu-item a');

    // Toggle menu
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    // Hamburger click
    hamburger.addEventListener('click', toggleMenu);

    // Close menu on item click
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            toggleMenu();
        }
    });

    // Carousel swipe
    const carousel = document.querySelector('.carousel');
    let startX, endX;

    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', () => {
        if (startX > endX + 50) {
            nextSlide();
        } else if (startX < endX - 50) {
            prevSlide();
        }
    });

    function nextSlide() {
        const activeSlide = document.querySelector('.carousel-slides.active');
        let nextIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide) + 1;
        if (nextIndex >= 3) {
            nextIndex = 2;
        }
        toggleCarousel(nextIndex);
    }

    function prevSlide() {
        const activeSlide = document.querySelector('.carousel-slides.active');
        let prevIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide) - 1;
        if (prevIndex < 0) {
            prevIndex = 0;
        }
        toggleCarousel(prevIndex);
    }

    // Fade-in elements
    const fadeInElements = document.querySelectorAll('.fade-in, .section-element');

    function checkVisibility() {
        const triggerBottom = window.innerHeight / 5 * 4;

        fadeInElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkVisibility, { passive: true });
    checkVisibility(); // Initial check on page load

});
