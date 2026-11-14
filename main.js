/* js/main.js */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Navegación Móvil ---
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');
    const body = document.body;

    function toggleMenu() {
        hamburger.classList.toggle('active');
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Bloquear scroll del body cuando el menú está abierto
        if (sidebar.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
    }

    if(hamburger) {
        hamburger.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
    }

    // --- 2. Animaciones al hacer Scroll (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Dejar de observar una vez animado
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });

    // --- 3. Carrusel de Testimonios (Solo si existe en la página) ---
    const track = document.querySelector('.carousel-track');
    if (track) {
        const slides = Array.from(track.children);
        const nextBtn = document.querySelector('.next');
        const prevBtn = document.querySelector('.prev');
        let currentIndex = 0;

        const updateCarousel = () => {
            const width = slides[0].getBoundingClientRect().width;
            track.style.transform = 'translateX(-' + (width * currentIndex) + 'px)';
        };

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        });

        // Ajustar al redimensionar ventana
        window.addEventListener('resize', updateCarousel);
    }

    // --- 4. Validación de Formulario (Solo si existe en la página) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Campos requeridos
            const inputs = contactForm.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                const errorMsg = input.nextElementSibling; // El span de error
                
                if (!input.value.trim()) {
                    input.classList.add('invalid');
                    isValid = false;
                } else if (input.type === 'email' && !validateEmail(input.value)) {
                    input.classList.add('invalid');
                    isValid = false;
                } else {
                    input.classList.remove('invalid');
                }
            });

            if (isValid) {
                alert('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
                contactForm.reset();
            }
        });

        // Limpiar error al escribir
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('invalid');
            });
        });
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});