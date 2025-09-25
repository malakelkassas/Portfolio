const form = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    formMessage.style.textAlign = "center"; // خلي الرسالة في النص

    if (response.ok) {
      formMessage.style.color = "green";
      formMessage.textContent = "✅ Message sent successfully! Thank you for reaching out.";
      form.reset();
    } else {
      formMessage.style.color = "red";
      formMessage.textContent = "❌ Something went wrong, please try again.";
    }
  } catch (error) {
    formMessage.style.color = "red";
    formMessage.textContent = "⚠ Connection issue, please try later.";
  }
});


const toggleBtn = document.getElementById("modeToggle");
const toggleCircle = document.getElementById("toggleCircle");
const html = document.documentElement;
const textElements = document.querySelectorAll(".text-toggle");

// ✅ عند تحميل الصفحة: افحص localStorage
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  html.classList.add("dark");
  toggleCircle.classList.add("translate-x-6");
  textElements.forEach(el => {
    el.classList.add("text-white");
    el.classList.remove("text-gray-900");
  });
} else {
  html.classList.remove("dark");
  toggleCircle.classList.remove("translate-x-6");
  textElements.forEach(el => {
    el.classList.remove("text-white");
    el.classList.add("text-gray-900");
  });
}

// ✅ عند الضغط على الزر
toggleBtn.addEventListener("click", () => {
  html.classList.toggle("dark");
  toggleCircle.classList.toggle("translate-x-6");

  const isDark = html.classList.contains("dark");

  // ✅ تغيير ألوان النصوص حسب الوضع
  textElements.forEach(el => {
    if (isDark) {
      el.classList.add("text-white");
      el.classList.remove("text-gray-900");
    } else {
      el.classList.remove("text-white");
      el.classList.add("text-gray-900");
    }
  });

  // ✅ حفظ الوضع في localStorage
  localStorage.setItem("theme", isDark ? "dark" : "light");
});



const scrollElements = document.querySelectorAll(".animate-on-scroll");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible");
    }
  });
}, {
  threshold: 0.3
})

scrollElements.forEach(el => observer.observe(el));



  let lastScrollY = window.scrollY;
  const navbar = document.querySelector("nav");

  window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY) {
      // لو نازل لتحت → خفي الناف
      navbar.classList.add("nav-hidden");
    } else {
      // لو طالع لفوق → يظهر
      navbar.classList.remove("nav-hidden");
    }
    lastScrollY = window.scrollY;
  });
