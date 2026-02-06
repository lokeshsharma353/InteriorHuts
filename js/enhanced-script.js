// Mobile menu functionality
window.toggleMobileMenu = function() {
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
};

// Close mobile menu when clicking on a link
document.addEventListener('click', function(e) {
    if (e.target.matches('.nav-menu a')) {
        const navMenu = document.getElementById('navMenu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }
});

// Enhanced JavaScript with multi-page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Animated counters
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }

    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item, .project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Service Modal Functions
    window.openServiceModal = function(serviceType) {
        const modal = document.getElementById('serviceModal');
        const modalTitle = document.getElementById('modalTitle');
        const serviceTypeInput = document.getElementById('serviceType');
        
        if (modal && modalTitle && serviceTypeInput) {
            const titles = {
                'residential': 'Residential Interior Inquiry',
                'commercial': 'Commercial Design Inquiry',
                'kitchen': 'Kitchen Design Inquiry',
                '3d': '3D Visualization Inquiry'
            };
            
            modalTitle.textContent = titles[serviceType] || 'Service Inquiry';
            serviceTypeInput.value = serviceType;
            modal.style.display = 'block';
        }
    };

    // Project Modal Functions
    window.openProjectModal = function(projectId) {
        const modal = document.getElementById('projectModal');
        const modalContent = document.getElementById('modalContent');
        
        if (modal && modalContent) {
            const projectData = {
                'mumbai-residence': {
                    title: 'Mumbai Luxury Residence',
                    location: 'Bandra, Mumbai',
                    type: 'Residential • 3500 sq ft',
                    year: '2023',
                    budget: '₹25 Lakhs',
                    description: 'A stunning transformation of a luxury apartment featuring minimalist design with premium finishes. The project showcases our signature black and white aesthetic with carefully curated furniture and lighting.',
                    features: ['Open-plan living spaces', 'Premium marble flooring', 'Custom lighting design', 'Smart home integration']
                },
                'tech-office': {
                    title: 'Tech Startup Office',
                    location: 'Gurgaon, Delhi',
                    type: 'Commercial • 5000 sq ft',
                    year: '2023',
                    budget: '₹35 Lakhs',
                    description: 'Modern office design that promotes creativity and collaboration. Features flexible workspaces, meeting rooms, and recreational areas designed to inspire innovation.',
                    features: ['Flexible workstations', 'Collaborative spaces', 'Recreational zones', 'Sustainable materials']
                }
            };
            
            const project = projectData[projectId];
            if (project) {
                modalContent.innerHTML = `
                    <h2>${project.title}</h2>
                    <div class="project-details-modal">
                        <p><strong>Location:</strong> ${project.location}</p>
                        <p><strong>Type:</strong> ${project.type}</p>
                        <p><strong>Year:</strong> ${project.year}</p>
                        <p><strong>Budget:</strong> ${project.budget}</p>
                    </div>
                    <p>${project.description}</p>
                    <h3>Key Features:</h3>
                    <ul>
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                `;
            }
            modal.style.display = 'block';
        }
    };

    // Booking Modal Functions
    window.openBookingModal = function() {
        const modal = document.getElementById('bookingModal');
        if (modal) {
            modal.style.display = 'block';
            generateCalendar();
        }
    };

    // Calendar Generation
    function generateCalendar() {
        const calendarGrid = document.getElementById('calendarGrid');
        const currentMonthSpan = document.getElementById('currentMonth');
        
        if (!calendarGrid || !currentMonthSpan) return;
        
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        
        currentMonthSpan.textContent = new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        calendarGrid.innerHTML = '';
        
        // Add day headers
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.textContent = day;
            dayHeader.style.fontWeight = 'bold';
            dayHeader.style.textAlign = 'center';
            dayHeader.style.padding = '0.5rem';
            calendarGrid.appendChild(dayHeader);
        });
        
        // Add empty cells for days before month starts
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            calendarGrid.appendChild(emptyDay);
        }
        
        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = day;
            dayElement.className = 'calendar-day';
            dayElement.addEventListener('click', () => selectDate(day, month, year));
            calendarGrid.appendChild(dayElement);
        }
    }

    // Date Selection
    function selectDate(day, month, year) {
        document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
        event.target.classList.add('selected');
        
        const selectedDate = new Date(year, month, day).toLocaleDateString();
        updateSelectedDateTime(selectedDate);
    }

    // Time Slot Selection
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('time-slot')) {
            document.querySelectorAll('.time-slot').forEach(slot => slot.classList.remove('selected'));
            e.target.classList.add('selected');
            
            const selectedTime = e.target.getAttribute('data-time');
            updateSelectedDateTime(null, selectedTime);
        }
    });

    let selectedDateTime = { date: null, time: null };

    function updateSelectedDateTime(date, time) {
        if (date) selectedDateTime.date = date;
        if (time) selectedDateTime.time = time;
        
        const selectedSlot = document.getElementById('selectedDateTime');
        if (selectedSlot) {
            if (selectedDateTime.date && selectedDateTime.time) {
                selectedSlot.textContent = `${selectedDateTime.date} at ${selectedDateTime.time}`;
            } else if (selectedDateTime.date) {
                selectedSlot.textContent = `${selectedDateTime.date} - Please select time`;
            } else if (selectedDateTime.time) {
                selectedSlot.textContent = `${selectedDateTime.time} - Please select date`;
            }
        }
    }

    // Modal Close Functions
    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    };

    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Form Submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success modal
            const successModal = document.getElementById('successModal');
            if (successModal) {
                successModal.style.display = 'block';
                successModal.querySelector('.modal-content').style.animation = 'slideInDown 0.5s ease';
                
                // Auto-hide after 3 seconds
                setTimeout(() => {
                    successModal.querySelector('.modal-content').style.animation = 'slideOutUp 0.5s ease';
                    setTimeout(() => {
                        successModal.style.display = 'none';
                    }, 500);
                }, 3000);
            } else {
                alert('Thank you for your inquiry! We will contact you soon.');
            }
            
            // Close current modal
            const currentModal = this.closest('.modal');
            if (currentModal) {
                currentModal.style.display = 'none';
            }
            
            // Reset form
            this.reset();
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                if (entry.target.classList.contains('about')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            } else {
                navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            }
        }
    });

    // Parallax effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Mobile menu functionality
    const createMobileMenu = () => {
        const navbar = document.querySelector('.navbar');
        const navMenu = document.querySelector('.nav-menu');
        
        if (window.innerWidth <= 768 && navbar && navMenu) {
            if (!document.querySelector('.mobile-menu-btn')) {
                const mobileBtn = document.createElement('button');
                mobileBtn.className = 'mobile-menu-btn';
                mobileBtn.innerHTML = '☰';
                mobileBtn.style.cssText = `
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    display: block;
                `;
                
                navbar.querySelector('.nav-container').appendChild(mobileBtn);
                
                mobileBtn.addEventListener('click', () => {
                    const isVisible = navMenu.style.display === 'flex';
                    navMenu.style.display = isVisible ? 'none' : 'flex';
                    if (!isVisible) {
                        navMenu.style.flexDirection = 'column';
                        navMenu.style.position = 'absolute';
                        navMenu.style.top = '100%';
                        navMenu.style.left = '0';
                        navMenu.style.width = '100%';
                        navMenu.style.background = 'rgba(0, 0, 0, 0.98)';
                        navMenu.style.padding = '1rem';
                    }
                });
            }
        }
    };

    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);

    // Page loading animation
    document.body.style.opacity = '0';
    window.addEventListener('load', () => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    });
});


// Background Image Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-background-slider .slide');

if (slides.length > 0) {
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000);
}

// Scroll Progress Bar
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.service-card, .portfolio-item, .process-step, .testimonial-card');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();


// Image Modal Functions
function openImageModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    
    if (modal && modalImg) {
        modal.style.display = 'block';
        modalImg.src = imageSrc;
    }
}

// Close modal when clicking X or outside image
document.addEventListener('click', function(e) {
    const modal = document.getElementById('imageModal');
    if (e.target.classList.contains('close-modal') || e.target.classList.contains('image-modal')) {
        if (modal) {
            modal.style.display = 'none';
        }
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('imageModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }
});


// Welcome Modal - Show on page load
window.addEventListener('load', function() {
    setTimeout(() => {
        const welcomeModal = document.getElementById('welcomeModal');
        if (welcomeModal && !sessionStorage.getItem('welcomeShown')) {
            welcomeModal.style.display = 'block';
        }
    }, 2000);
});

// Close Welcome Modal
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('close-welcome')) {
        document.getElementById('welcomeModal').style.display = 'none';
        sessionStorage.setItem('welcomeShown', 'true');
    }
});

// Welcome Form Submit
const welcomeForm = document.getElementById('welcomeForm');
if (welcomeForm) {
    welcomeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Hide welcome modal
        document.getElementById('welcomeModal').style.display = 'none';
        sessionStorage.setItem('welcomeShown', 'true');
        
        // Show thank you modal
        document.getElementById('thankYouModal').style.display = 'block';
        
        // Reset form
        this.reset();
    });
}

// Close Thank You Modal
function closeThankYou() {
    document.getElementById('thankYouModal').style.display = 'none';
}

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('close-thankyou')) {
        closeThankYou();
    }
});
