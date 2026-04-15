document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Force Scroll Reset on Reload
    if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
    window.scrollTo(0, 0);

    // 2. Hero Slider Logic
    const slide1Elements = document.querySelectorAll('.slide1-el');
    const slide2Elements = document.querySelectorAll('.slide2-el');
    let isShowingSlide1 = true;

    setInterval(() => {
        if (isShowingSlide1) {
            slide1Elements.forEach(el => el.classList.remove('active'));
            slide2Elements.forEach(el => el.classList.add('active'));
        } else {
            slide2Elements.forEach(el => el.classList.remove('active'));
            slide1Elements.forEach(el => el.classList.add('active'));
        }
        isShowingSlide1 = !isShowingSlide1;
    }, 4500);

    // 3. High-Performance Intersection Observer for Scroll Animations
    const observerOptions = { root: null, rootMargin: '0px 0px -50px 0px', threshold: 0.1 };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show'); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(item => {
        scrollObserver.observe(item);
    });

    // 4. Dark Mode Toggle
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    if (toggleSwitch) {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            toggleSwitch.checked = true;
        }
        toggleSwitch.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // 5. Progress Bar Skills Animation
    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.getAttribute('data-width');
                entry.target.style.width = targetWidth;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 }); 

    document.querySelectorAll('.skill-fill').forEach(fill => skillsObserver.observe(fill));

    // 6. Mobile Navigation
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
            hamburger.querySelector('i').classList.toggle('fa-bars');
            hamburger.querySelector('i').classList.toggle('fa-times');
        });

        document.querySelectorAll('#nav-links li a').forEach(item => {
            item.addEventListener('click', () => {
                hamburger.setAttribute('aria-expanded', 'false');
                navLinks.classList.remove('active');
                hamburger.querySelector('i').classList.add('fa-bars');
                hamburger.querySelector('i').classList.remove('fa-times');
            });
        });
    }

    // 7. Scroll Events (To-Top Button & Progress Bar)
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    const myBar = document.getElementById("myBar");

    window.addEventListener("scroll", () => {
        // A. Scroll To Top Button
        if (scrollToTopBtn) {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add("show-btn");
            } else {
                scrollToTopBtn.classList.remove("show-btn");
            }
        }
        
        // B. Scroll Progress Bar
        if (myBar) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            myBar.style.width = scrolled + "%";
        }
    });

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 8. Copy Citation Logic
    document.querySelectorAll('.cite-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault(); 
            const citationText = this.getAttribute('data-citation');
            
            navigator.clipboard.writeText(citationText).then(() => {
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                this.style.backgroundColor = 'var(--primary)';
                this.style.color = '#fff';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.backgroundColor = 'transparent';
                    this.style.color = 'var(--primary)';
                }, 2000);
            });
        });
    });

    // 9. Certificate Lightbox Logic
    const modal = document.getElementById("cert-modal");
    const modalImg = document.getElementById("modal-img");
    const captionText = document.getElementById("modal-caption");
    const closeModal = document.querySelector(".close-modal");
    const certCards = document.querySelectorAll(".cert-card, .award-card"); 

    if(modal && modalImg) {
        certCards.forEach(card => {
            card.addEventListener("click", function() {
                const img = this.querySelector("img");
                if(img && !card.classList.contains('corner-right')) { // Ignore pending award card
                    modal.classList.add("show-modal");
                    modalImg.src = img.src;
                    
                    const title = this.querySelector("h3, h4");
                    if(title) { captionText.innerHTML = title.innerText; }
                }
            });
        });

        if (closeModal) {
            closeModal.onclick = function() { modal.classList.remove("show-modal"); }
        }
        
        window.onclick = function(event) {
            if (event.target == modal) { modal.classList.remove("show-modal"); }
        }
    }
});