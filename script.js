document.addEventListener('DOMContentLoaded', () => {
    // Current Year for Footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Sticky Navbar
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Simple Intersection Observer for scroll animations (if AOS not used)
    const observerOptions = {
        threshold: 0.1
    };

    const revealElements = document.querySelectorAll('[data-aos]');

    // Fallback if AOS is not available
    if (typeof AOS === 'undefined') {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });
    } else {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // Dynamic Image Loading (Placeholder to Actual Image)
    // This function will be called once images are successfully generated
    window.updateImages = (imageMap) => {
        for (const [id, url] of Object.entries(imageMap)) {
            const placeholder = document.getElementById(id);
            if (placeholder) {
                placeholder.innerHTML = `<img src="${url}" alt="Kim-gisa Call-van Service" style="width:100%; height:100%; object-fit:cover;">`;
                placeholder.classList.remove('placeholder-img');
            }
        }
    };

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Check local storage for preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
});

// Custom Language Selection for Google Translate
function changeLanguage(lang) {
    const selectField = document.querySelector("#google_translate_element select");
    if (!selectField) return;

    for (let i = 0; i < selectField.children.length; i++) {
        const option = selectField.children[i];
        if (option.value === lang) {
            selectField.selectedIndex = i;
            selectField.dispatchEvent(new Event('change'));
            break;
        }
    }

    // Update button text to reflect chosen language
    const langBtnText = document.querySelector('.lang-btn');
    if (lang === 'ko') langBtnText.innerHTML = '<i class="fas fa-globe"></i> KOR <i class="fas fa-chevron-down"></i>';
    else if (lang === 'en') langBtnText.innerHTML = '<i class="fas fa-globe"></i> ENG <i class="fas fa-chevron-down"></i>';
    else if (lang === 'zh-CN') langBtnText.innerHTML = '<i class="fas fa-globe"></i> CHN <i class="fas fa-chevron-down"></i>';
    else if (lang === 'ja') langBtnText.innerHTML = '<i class="fas fa-globe"></i> JPN <i class="fas fa-chevron-down"></i>';
}
