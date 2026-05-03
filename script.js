// Sticky navbar on scroll
window.addEventListener("scroll", function () {
  const header = document.querySelector(".site-header");
  header.classList.toggle("scrolled", window.scrollY > 50);
});

// // Form validation
// const form = document.getElementById("contactForm");
// const status = document.getElementById("form-status");

// form.addEventListener("submit", function (e) {
//   e.preventDefault();

//   const name = document.getElementById("name").value.trim();
//   const email = document.getElementById("email").value.trim();
//   const message = document.getElementById("message").value.trim();

//   if (!name || !email || !message) {
//     status.innerText = "Please fill all fields.";
//     status.style.color = "red";
//     return;
//   }

//   status.innerText = "Message sent successfully!";
//   status.style.color = "green";
//   form.reset();
// });

// const form = document.getElementById("contactForm");
// const status = document.getElementById("form-status");

// form.addEventListener("submit", async function (e) {
//   e.preventDefault();

//   const name = document.getElementById("name").value.trim();
//   const email = document.getElementById("email").value.trim();
//   const message = document.getElementById("message").value.trim();

//   if (!name || !email || !message) {
//     status.innerText = "Please fill all fields.";
//     status.style.color = "red";
//     return;
//   }

//   try {
//     const response = await fetch("YOUR_WEB_APP_URL_HERE", {
//       method: "POST",
//       body: JSON.stringify({ name, email, message }),
//     });

//     const result = await response.json();

//     if (result.status === "success") {
//       status.innerText = "Message sent successfully!";
//       status.style.color = "green";
//       form.reset();
//     } else {
//       throw new Error();
//     }
//   } catch (error) {
//     status.innerText = "Something went wrong. Try again.";
//     status.style.color = "red";
//   }
// });

// Simple fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
});

document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = 0;
  section.style.transform = "translateY(40px)";
  section.style.transition = "0.6s";
  observer.observe(section);
});
