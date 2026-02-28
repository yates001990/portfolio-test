/**
 * RedTeam Nexus - Main JavaScript
 * Professional navigation menu and interactive features
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        initMobileNav();
        initDropdownNav();
        initScrollReveal();
        initHeaderScroll();
        initSmoothScroll();
    }

    /**
     * Mobile Navigation Handler
     * Toggle hamburger menu and nav wrapper
     */
    function initMobileNav() {
        var hamburger = document.getElementById('hamburger');
        var navWrapper = document.getElementById('navWrapper');
        
        if (!hamburger || !navWrapper) return;

        // Toggle menu on hamburger click
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navWrapper.classList.toggle('hidden');
        });

        // Close menu when clicking on a regular link
        var navLinks = navWrapper.querySelectorAll('.nav-link:not(.nav-link-dropdown)');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navWrapper.classList.add('hidden');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            var isClickInNav = e.target.closest('.navbar');
            if (!isClickInNav) {
                hamburger.classList.remove('active');
                navWrapper.classList.add('hidden');
            }
        });

        // Close menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navWrapper.classList.remove('hidden');
                // Reset all dropdowns
                var items = document.querySelectorAll('.nav-item-dropdown');
                items.forEach(function(item) {
                    item.classList.remove('active');
                    var link = item.querySelector('.nav-link-dropdown');
                    if (link) {
                        link.setAttribute('aria-expanded', 'false');
                    }
                });
            }
        });
    }

    /**
     * Dropdown Navigation Handler
     * Handle dropdown menus on both desktop and mobile
     */
    function initDropdownNav() {
        var dropdownItems = document.querySelectorAll('.nav-item-dropdown');
        
        dropdownItems.forEach(function(item) {
            var toggleLink = item.querySelector('.nav-link-dropdown');
            
            if (!toggleLink) return;

            // Desktop: Show/hide on hover
            item.addEventListener('mouseenter', function() {
                if (window.innerWidth > 768) {
                    item.classList.add('active');
                    toggleLink.setAttribute('aria-expanded', 'true');
                }
            });

            item.addEventListener('mouseleave', function() {
                if (window.innerWidth > 768) {
                    item.classList.remove('active');
                    toggleLink.setAttribute('aria-expanded', 'false');
                }
            });

            // Mobile: Toggle on click
            toggleLink.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    item.classList.toggle('active');
                    toggleLink.setAttribute('aria-expanded', 
                        item.classList.contains('active') ? 'true' : 'false');
                }
            });

            // Close dropdown when clicking a submenu link
            var sublinks = item.querySelectorAll('.dropdown-link');
            sublinks.forEach(function(link) {
                link.addEventListener('click', function() {
                    if (window.innerWidth <= 768) {
                        item.classList.remove('active');
                        toggleLink.setAttribute('aria-expanded', 'false');
                    }
                });
            });
        });
    }

    /**
     * Header Scroll Effect
     * Add shadow to header when scrolled
     */
    function initHeaderScroll() {
        var header = document.querySelector('.header');
        
        if (!header) return;

        var ticking = false;

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
                    
                    if (scrollY > 10) {
                        header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.4)';
                    } else {
                        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    /**
     * Smooth Scroll for Navigation Links
     */
    function initSmoothScroll() {
        var links = document.querySelectorAll('a[href^="#"]');

        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                var href = this.getAttribute('href');
                
                if (href === '#' || href === '') return;

                var target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    var header = document.querySelector('.header');
                    var headerHeight = header ? header.offsetHeight : 0;
                    var targetPosition = target.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update URL without jumping
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    }
                }
            });
        });
    }

    /**
     * Scroll Reveal Animation
     * Reveals elements as they enter the viewport
     */
    function initScrollReveal() {
        var revealElements = document.querySelectorAll('.section');
        
        if (!revealElements.length) return;

        // Check for reduced motion preference
        var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            revealElements.forEach(function(element) {
                element.classList.add('visible');
            });
            return;
        }

        var revealOnScroll = function() {
            var windowHeight = window.innerHeight;
            var revealPoint = 80;

            revealElements.forEach(function(element) {
                var elementTop = element.getBoundingClientRect().top;
                
                if (elementTop < windowHeight - revealPoint) {
                    element.classList.add('visible');
                }
            });
        };

        // Add reveal class to sections
        revealElements.forEach(function(element) {
            element.classList.add('reveal');
        });

        // Initial check
        revealOnScroll();

        // Throttled scroll handler
        var ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    revealOnScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

})();