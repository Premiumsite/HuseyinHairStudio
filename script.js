document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. LIGHTWEIGHT & PRODUCTION-READY RAIN ENGINE ---
    const canvas = document.getElementById("rainCanvas");
    const ctx = canvas.getContext("2d");

    let animationId;
    let drops = [];
    
    const isMobile = window.innerWidth < 768;
    // Damla sayısı kasmayacak şekilde mükemmel optimize edildi
    const maxDrops = isMobile ? 25 : 65; 

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Drop {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * -canvas.height;
            this.length = Math.random() * 15 + 10;
            this.speed = Math.random() * 2 + (isMobile ? 2 : 3.5); 
            this.opacity = Math.random() * 0.08 + 0.02; // Zarif altın ışıltısı tonu
        }
        update() {
            this.y += this.speed;
            if (this.y > canvas.height) {
                this.reset();
            }
        }
        draw() {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(197, 168, 128, ${this.opacity})`; 
            ctx.lineWidth = 1;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y + this.length);
            ctx.stroke();
        }
    }

    for (let i = 0; i < maxDrops; i++) {
        drops.push(new Drop());
    }

    function animateRain() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Arka planı kirletmeden temizler
        drops.forEach(drop => {
            drop.update();
            drop.draw();
        });
        animationId = requestAnimationFrame(animateRain);
    }
    animateRain();


    // --- 2. INFINITE MARQUEE CLONING ---
    const track = document.querySelector(".marquee-track");
    if(track) {
        const cards = Array.from(track.children);
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
        });
    }


    // --- 3. FAQ ACCORDION INTERACTION ---
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        question.addEventListener("click", () => {
            const isActive = item.classList.contains("active");
            faqItems.forEach(i => i.classList.remove("active"));
            if (!isActive) {
                item.classList.add("active");
            }
        });
    });


    // --- 4. FLOATING LUXURY ACTION DOCK TOGGLE ---
    const dock = document.querySelector(".luxury-action-dock");
    const toggleBtn = document.querySelector(".dock-toggle");

    if(toggleBtn && dock) {
        toggleBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            dock.classList.toggle("open");
        });

        document.addEventListener("click", () => {
            dock.classList.remove("open");
        });
    }


    // --- 5. HIGH-PERFORMANCE INTERSECTION OBSERVER ---
    const observerOptions = {
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px"
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("appear");
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".animate-trigger");
    animatedElements.forEach(el => sectionObserver.observe(el));
});