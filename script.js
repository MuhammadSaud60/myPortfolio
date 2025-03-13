let iconsVisible = true;
let idleTimer;



 // Run scripts when the DOM is fully loaded
 document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);

    
    // Hero Section Animation: Fade and slide in
    gsap.fromTo(".hero-content", 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power4.out" }
    );

    // Section Title Animation
    gsap.from(".section-title", {
      scrollTrigger: {
        trigger: ".section",
        start: "top 80%"
      },
      duration: 0.8,
      x: -50,
      opacity: 0,
      stagger: 0.2
    });

    // Skills/Projects Animation
    gsap.from(".skill-card, .project-card", {
      scrollTrigger: {
        trigger: ".skills-grid, .projects-grid",
        start: "top 80%"
      },
      duration: 0.6,
      y: 50,
      opacity: 0,
      stagger: 0.1
    });

    // Form Animation
    gsap.from(".contact-form", {
      scrollTrigger: {
        trigger: "#contact",
        start: "top 80%"
      },
      duration: 1,
      opacity: 0,
      y: 30
    });

    // Mobile Menu Toggle
    $('.menu-toggle').click(() => {
      $('.nav-links').toggleClass('active');
    });

    // Smooth Scroll for internal links
    $('a[href*="#"]').on('click', function (e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top - 30
      }, 500);
    });


    
    // Timeline for About Section Scroll Animation
    gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
        end: "bottom 60%",
        scrub: true,
        
      }
    })
    .from(".about-content", { opacity: 0, y: 50, duration: 1 });
    
    // Timeline for Skills Section Scroll Animation
    gsap.timeline({
      scrollTrigger: {
        trigger: "#skills",
        start: "top 80%",
        scrub: true,
       
      }
    })
    .from(".skill-item", { opacity: 0, y: 50, stagger: 0.2, duration: 1 });
  });

  // GSAP Hover Animation for Service Cards 
  gsap.from(".service-card", {
    scrollTrigger: {
      trigger: "#services",
      start: "top 80%"
    },
    duration: 0.6,
    y: 50,
    opacity: 0,
    stagger: 0.1
  });
  document.querySelectorAll(".service-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, { scale: 1.05, duration: 0.3, ease: "power1.out" });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { scale: 1, duration: 0.3, ease: "power1.out" });
    });
  });

  function showPopup(message, type) {
    const popup = document.getElementById('popupMessage');
    popup.textContent = message;
    popup.className = type;
    popup.style.display = 'block';
    
    setTimeout(() => {
      popup.style.display = 'none';
    }, 3000);
  }

  $('#contactForm').submit(function(e) {
    e.preventDefault();
    const form = e.target;
    
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        showPopup("Message sent successfully!", "success");
        form.reset();
      } else {
        showPopup("Failed to send message. Please try again.", "error");
      }
    })
    .catch(error => {
      showPopup("Network error. Please check your connection.", "error");
    });
  });