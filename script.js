// =======================
// PRELOADER
// =======================
const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

tl.from(".preloader-bar", {
    x: "-50%",      
    rotation: -15,
    scale: 0.5,
    duration: 0.5
})
.to(".preloader-bar", {
    x: "0%",
    rotation: 0,
    scale: 30,
    duration: 0.5,
    ease: "power4.in"
})
.to("#preloader", {
    autoAlpha: 0,
    duration: 0.3,
    onComplete: () => {
        document.getElementById("preloader").style.display = "none";
    }
});

// =======================
// NAVBAR ACTIVE + MOBILE COLLAPSE
// =======================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");
const navLinksCollapse = document.querySelectorAll(".navbar-collapse .nav-link");
const navbarCollapse = document.querySelector(".navbar-collapse");

// SECCION ACTIVA SEGUN SCROLL
window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 80;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// CERRAR MENÚ MOBILE CUANDO SE HACE CLICK
navLinksCollapse.forEach(link => {
    link.addEventListener("click", () => {
        if (navbarCollapse.classList.contains("show")) {
            new bootstrap.Collapse(navbarCollapse, { toggle: true });
        }
    });
});

// =======================
// CURSOR PERSONALIZADO
// =======================
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', e => {
    if (window.innerWidth >= 768) {
        cursor.style.left = e.pageX - cursor.offsetWidth / 2 + 'px';
        cursor.style.top = e.pageY - cursor.offsetHeight / 2 + 'px';
    }
});

document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
            scale: 1.8,
            boxShadow: '0 0 30px 10px rgba(255,255,255,0.8)',
            duration: 0.3
        });
    });
    btn.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
            scale: 1,
            boxShadow: '0 0 20px 4px rgba(255,255,255,0.5)',
            duration: 0.3
        });
    });
});

// =======================
// GSAP ANIMACIONES INICIALES
// =======================
gsap.from(".glow-text", { opacity: 0, y: 50, duration: 1.5, ease: "power3.out" });
gsap.from("#hero p, #hero a", { opacity: 0, y: 30, duration: 1, stagger: 0.3, delay: 0.5 });

gsap.registerPlugin(ScrollTrigger);

// =======================
// SCROLLTRIGGER / PARALLAX
// =======================

// TECNOLOGÍAS
document.querySelectorAll(".tech-card").forEach(card => {
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
            onEnter: () => card.classList.add("colored"),
            onLeaveBack: () => card.classList.remove("colored")
        }
    });
});

// SERVICIOS 
document.querySelectorAll(".service-rect").forEach(rect => {
    const desc = rect.querySelector(".service-desc");
    desc.textContent = rect.dataset.info;

    rect.addEventListener("mouseenter", () => {
        gsap.to(rect, { height: 150, duration: 0.4, ease: "power2.out" });
        gsap.to(desc, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", delay: 0.1 });
    });

    rect.addEventListener("mouseleave", () => {
        gsap.to(rect, { height: 80, duration: 0.4, ease: "power2.in" });
        gsap.to(desc, { opacity: 0, x: 50, duration: 0.3, ease: "power2.in" });
    });
});

// CONTACTO
gsap.from('.contact-info', { opacity: 0, x: -200, duration: 1.5, ease: 'power3.out' });
gsap.from('.contact-form-container', { opacity: 0, x: 200, duration: 1.5, ease: 'power3.out' });

// FONDO PARALLAX
gsap.utils.toArray('.parallax-bg').forEach((el, index) => {
    gsap.to(el, {
        y: () => (index + 1) * 100,
        ease: 'none',
        scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
});

// PARTÍCULAS
document.querySelectorAll('.particle').forEach(particle => {
    const speed = particle.dataset.speed;
    gsap.to(particle, {
        y: window.innerHeight + 100,
        duration: speed * 5,
        repeat: -1,
        ease: "none",
        delay: Math.random() * 5,
        onRepeat: () => {
            particle.style.left = Math.random() * window.innerWidth + "px";
            particle.style.top = "-100px";
        }
    });
    particle.style.left = Math.random() * window.innerWidth + "px";
});

// CÍRCULOS PARALLAX SOBRE MI
gsap.utils.toArray(".about-parallax .circle").forEach(circle => {
    let speed = circle.dataset.speed;
    gsap.to(circle, {
        y: () => window.innerHeight * speed,
        ease: "none",
        scrollTrigger: {
            trigger: "#about",
            scrub: true,
            start: "top bottom",
            end: "bottom top"
        }
    });
});