        // Mobile Menu Toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Portfolio Filter
        const filterButtons = document.querySelectorAll('.portfolio-filter');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => {
                    btn.classList.remove('active', 'bg-gradient-primary', 'text-white');
                    btn.classList.add('bg-white', 'text-text-secondary', 'border', 'border-border');
                });
                button.classList.remove('bg-white', 'text-text-secondary', 'border', 'border-border');
                button.classList.add('active', 'bg-gradient-primary', 'text-white');

                // Filter portfolio items
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        item.classList.add('animate-fade-in');
                    } else {
                        item.style.display = 'none';
                        item.classList.remove('animate-fade-in');
                    }
                });
            });
        });

        // Smooth Scrolling for Navigation Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    mobileMenu.classList.add('hidden');
                }
            });
        });

        // Form Submission
        const contactForm = document.querySelector('form');
        contactForm.addEventListener('submit', function(e) {
            // e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            
            // Show success message (in a real application, you would send this to a server)
            alert('Thank you for your inquiry! I will get back to you within 24 hours.');
            
            // Reset form
            this.reset();
        });

        // Newsletter Subscription
        const newsletterForm = document.querySelector('.card.bg-gradient-primary');
        const newsletterButton = newsletterForm.querySelector('button');
        const newsletterInput = newsletterForm.querySelector('input[type="email"]');

        newsletterButton.addEventListener('click', function(e) {
            e.preventDefault();
            const email = newsletterInput.value.trim();
            
            if (email && email.includes('@')) {
                alert('Thank you for subscribing! You will receive industry insights and updates.');
                newsletterInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });

        // Scroll-based animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-slide-up');
                }
            });
        }, observerOptions);

        // Observe all cards and sections
        document.querySelectorAll('.card, section').forEach(el => {
            observer.observe(el);
        });

        // Header background on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.classList.add('bg-white/95');
                header.classList.remove('bg-white/90');
            } else {
                header.classList.add('bg-white/90');
                header.classList.remove('bg-white/95');
            }
        })

        document.getElementById('download-btn').addEventListener('click', function(e) {
        // Default link behavior ko rokta hai (jo page ko refresh karta hai)
        e.preventDefault();

        // <body> element ko select karte hain jiska screenshot lena hai
        const elementToCapture = document.body; 

        // html2canvas function call karte hain
        html2canvas(elementToCapture, {
            // Is option se poora page capture hoga, agar scrollable hai toh
            scrollY: -window.scrollY ,
            backgroundColor: '#ffffff',
            scale: 2
        }).then(function(canvas) {
            // 1. Image Data URL nikalna
            const imageURL = canvas.toDataURL("image/png");

            // 2. Download link banana
            const link = document.createElement('a');
            link.href = imageURL;
            link.download = 'Abhishek_Choudhary_Portfolio_Screenshot.png'; // Download hone wali file ka naam

            // 3. Link ko click karna (invisible tareeke se)
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    });