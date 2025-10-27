document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Toggle Functionality ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const html = document.documentElement;

    // Function to set theme
    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    }

    // Function to update theme icon
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.textContent = '☀️';
        } else {
            themeIcon.textContent = '🌙';
        }
    }

    // Function to toggle theme
    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    }

    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Add event listener to toggle button
    themeToggle.addEventListener('click', toggleTheme);

    // --- Multi-Layer Parallax Effect on Hero Section ---
    const layerBg = document.getElementById('layer-bg');
    const layerMid = document.getElementById('layer-mid');
    const layerFront = document.getElementById('layer-front');
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', () => {
        let offset = window.pageYOffset;
        
        // Move each layer at a different speed for a 3D effect
        layerBg.style.transform = `translateY(${offset * 0.2}px)`;
        layerMid.style.transform = `translateY(${offset * 0.5}px)`;
        layerFront.style.transform = `translateY(${offset * 0.8}px)`;
        heroContent.style.transform = `translateY(${offset * 0.4}px)`;
    });


    // --- Intersection Observer for On-Scroll Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the element is intersecting the viewport, add the 'is-visible' class
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Unobserve after animation to save resources
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger animation when 10% of the element is visible
    });

    // Attach the observer to each element that needs to be animated
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Get the audio element
const audio = document.getElementById('bg-music');

// Function to play the music and stop listening for interaction
const startMusic = () => {
    if (audio && audio.paused) {
        audio.play().catch(e => console.error("Audio play failed on user interaction attempt.", e));
    }
    
    // Once the event fires, remove the listeners so this code doesn't run again
    document.removeEventListener('mousedown', startMusic);
    document.removeEventListener('touchstart', startMusic);
};

// Start listening for any user interaction on the whole document
document.addEventListener('mousedown', startMusic);
document.addEventListener('touchstart', startMusic);

const toggleMusic = () => {
    // Check if the audio is currently paused
    if (audio.paused) {
        // If paused, try to play it
        audio.play().catch(e => console.error("Could not resume audio.", e));
    } else {
        // If playing, pause it
        audio.pause();
    }
};

// Attach the toggle function to the document's double-click event
// This allows the user to double-click anywhere on the page to turn the music on/off.
document.addEventListener('dblclick', toggleMusic);

});
