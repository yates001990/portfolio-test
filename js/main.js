/**
 * Main JavaScript
 * Minimalist interactions for portfolio site
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
        initScrollReveal();
        initSmoothScroll();
        initHeaderScroll();
        initMobileNav();
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

    /**
     * Smooth Scroll for Navigation Links
     */
    function initSmoothScroll() {
        var links = document.querySelectorAll('a[href^="#"]');

        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                var href = this.getAttribute('href');
                
                if (href === '#') return;

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
     * Header Background on Scroll
     */
    function initHeaderScroll() {
        var header = document.querySelector('.header');
        
        if (!header) return;

        var ticking = false;

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    var currentScroll = window.pageYOffset || document.documentElement.scrollTop;

                    if (currentScroll > 50) {
                        header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.08)';
                    } else {
                        header.style.boxShadow = 'none';
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    /**
     * Mobile Navigation - Close on link click
     */
    function initMobileNav() {
        var navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                // Allow browser to handle navigation
                // This is mainly for future mobile menu toggle functionality
            });
        });
    }

})();