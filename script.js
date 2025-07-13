document.addEventListener("DOMContentLoaded", function() {
    // Smooth scrolling for navigation links and handling external links
    document.querySelectorAll("nav a").forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            const href = this.getAttribute("href");

            // Check if the link is an internal anchor link (e.g., #about)
            if (href.startsWith("#")) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - document.querySelector("header").offsetHeight,
                        behavior: "smooth"
                    });
                }
            } else {
                // For external HTML pages, allow default navigation
                // No need to preventDefault() for these
            }
        });
    });

    // Add active class to current page in navigation
    const currentPath = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href").split("/").pop();
        if (linkPath === currentPath) {
            link.classList.add("active");
        } else {
            link.classList.remove("active"); // Ensure only one active link
        }
    });

    // Scroll-based animations
    const animatedElements = document.querySelectorAll(".content-section, .service-item, .realisation-item, .value-item, .team-member, .info-item, .testimonial-card, .gallery-grid img, .hero-section h1, .hero-section p, .hero-section .btn");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a class to trigger CSS animation
                entry.target.classList.add("animate-in");
                observer.unobserve(entry.target);
            } else {
                // Optionally remove class if element goes out of view and you want to re-animate on scroll back
                // entry.target.classList.remove("animate-in");
            }
        });
    }, observerOptions);

    animatedElements.forEach((element, index) => {
        // Add a delay based on index for staggered effect, if desired
        // element.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(element);
    });

    // Form submission (example - no backend)
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            contactForm.reset();
        });
    }

    // Chart.js for project pages with enhanced animations and dynamic colors
    function renderProjectChart(chartId, data, labels, title, chartType = 'bar') {
        const ctx = document.getElementById(chartId);
        if (ctx) {
            // Couleurs dynamiques et attractives
            const dynamicColors = [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)',
                'rgba(199, 199, 199, 0.8)',
                'rgba(83, 102, 255, 0.8)'
            ];
            
            const borderColors = [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(199, 199, 199, 1)',
                'rgba(83, 102, 255, 1)'
            ];

            new Chart(ctx, {
                type: chartType,
                data: {
                    labels: labels,
                    datasets: [{
                        label: title,
                        data: data,
                        backgroundColor: dynamicColors.slice(0, data.length),
                        borderColor: borderColors.slice(0, data.length),
                        borderWidth: 2,
                        borderRadius: chartType === 'bar' ? 8 : 0,
                        borderSkipped: false,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 2000,
                        easing: 'easeInOutQuart',
                        delay: (context) => {
                            return context.dataIndex * 300;
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: title,
                            font: {
                                size: 18,
                                weight: 'bold'
                            },
                            color: '#333',
                            padding: 20
                        },
                        legend: {
                            display: chartType !== 'bar',
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true,
                                font: {
                                    size: 12
                                }
                            }
                        }
                    },
                    scales: chartType === 'bar' ? {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)',
                                lineWidth: 1
                            },
                            ticks: {
                                font: {
                                    size: 12
                                },
                                color: '#666'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                font: {
                                    size: 12
                                },
                                color: '#666'
                            }
                        }
                    } : {},
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    },
                    hover: {
                        animationDuration: 300
                    }
                }
            });
        }
    }

    // Example data for charts with more variety and different chart types
    if (currentPath === 'projet-contenu.html') {
        renderProjectChart('contentChart', [65, 45, 30, 80], ['Trafic Organique', 'Taux Engagement', 'Conversions', 'Partages Sociaux'], 'Performance Stratégie de Contenu', 'doughnut');
    } else if (currentPath === 'projet-seo.html') {
        renderProjectChart('seoChart', [78, 55, 35, 90, 60], ['Classement Mots-clés', 'Trafic SEO', 'Backlinks', 'Vitesse Site', 'Score Mobile'], 'Performance SEO', 'radar');
    } else if (currentPath === 'projet-webdesign.html') {
        renderProjectChart('webdesignChart', [92, 85, 75, 88], ['Satisfaction Client', 'Taux de Conversion', 'Temps sur Page', 'Accessibilité'], 'Impact Webdesign', 'bar');
    } else if (currentPath === 'projet-4.html') {
        renderProjectChart('appFitnessChart', [87, 72, 65, 95], ['Utilisateurs Actifs', 'Sessions Moyennes', 'Rétention', 'Notes App Store'], 'Performance App Mobile Fitness', 'line');
    } else if (currentPath === 'projet-5.html') {
        renderProjectChart('immobilierChart', [96, 82, 74, 68], ['Annonces Publiées', 'Leads Générés', 'Ventes', 'Satisfaction Agents'], 'Performance Portail Immobilier', 'bar');
    } else if (currentPath === 'projet-6.html') {
        renderProjectChart('mairieChart', [83, 68, 52, 75], ['Visites Site', 'Téléchargements Docs', 'Participation Citoyenne', 'Satisfaction Usagers'], 'Impact Site Mairie', 'polarArea');
    }
});


