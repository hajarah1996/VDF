// STICKY HEADER
window.addEventListener("scroll", () => {
  const header = document.querySelector(".site-header");

  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});


// SCROLL ANIMATION
const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }

    });

  },
  {
    threshold: 0.15,
  }
);


// ELEMENTS TO ANIMATE
const hiddenElements = document.querySelectorAll(
  ".card, .sector-row, .project-card, .member-wrapper, .stat, .founder-section"
);


// APPLY ANIMATION
hiddenElements.forEach((el) => {

  el.classList.add("hidden");
  observer.observe(el);

});


// PROJECT GALLERY FILTERS
const projectFilters = document.querySelectorAll(".project-filter");
const projectCards = document.querySelectorAll(".project-card");

projectFilters.forEach((filterButton) => {
  filterButton.addEventListener("click", () => {
    const selectedFilter = filterButton.dataset.filter;

    projectFilters.forEach((button) => button.classList.remove("active"));
    filterButton.classList.add("active");

    projectCards.forEach((projectCard) => {
      const shouldShow =
        selectedFilter === "all" || projectCard.dataset.category === selectedFilter;

      projectCard.classList.toggle("is-hidden", !shouldShow);
    });
  });
});


// AUTO CLOSE MOBILE NAVBAR
const navLinks = document.querySelectorAll(".nav-link");
const navbarCollapse = document.querySelector(".navbar-collapse");

navLinks.forEach((link) => {

  link.addEventListener("click", () => {

    if (navbarCollapse.classList.contains("show")) {
      new bootstrap.Collapse(navbarCollapse).toggle();
    }

  });

});


// ACTIVE NAVIGATION LINK ON SCROLL
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach((section) => {

    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }

  });

  navLinks.forEach((link) => {

    link.classList.remove("active");

    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }

  });

});


// SMOOTH SCROLL FOR NAV LINKS
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {

  anchor.addEventListener("click", function (e) {

    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {

      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });

    }

  });

});


// SIMPLE COUNTER ANIMATION
const counters = document.querySelectorAll(".stat h3");

const counterObserver = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        const counter = entry.target;
        const target = counter.innerText;

        let number = parseInt(target.replace(/\D/g, ""));
        let current = 0;

        const increment = number / 100;

        const updateCounter = () => {

          current += increment;

          if (current < number) {

            counter.innerText =
              Math.floor(current) + target.replace(/[0-9]/g, "");

            requestAnimationFrame(updateCounter);

          } else {

            counter.innerText = target;

          }

        };

        updateCounter();

        counterObserver.unobserve(counter);

      }

    });

  },
  {
    threshold: 0.5,
  }
);


// OBSERVE COUNTERS
counters.forEach((counter) => {
  counterObserver.observe(counter);
});


// CONTACT FORM SUBMIT FEEDBACK
const contactForm = document.getElementById("contactForm");
const formStatus = document.querySelector(".form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector("button[type='submit']");

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    formStatus.textContent = "Sending your message...";
    formStatus.style.color = "#0f766e";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Message submission failed");
      }

      contactForm.reset();
      formStatus.textContent = "Thank you. Your message has been sent successfully.";
    } catch (error) {
      formStatus.textContent = "We could not send your message. Please email us directly.";
      formStatus.style.color = "#b42318";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
      }
    }
  });
}
