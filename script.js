// Personalize these details before publishing.
const CONTACT_EMAIL = "your-email@example.com"; // Replace with your real email address.
const projectData = {
  apartment: {
    title: { en: "Modern Apartment", ar: "شقة عصرية" },
    category: { en: "RESIDENTIAL · CONCEPT", ar: "سكني · تصور تصميمي" },
    description: { en: "A warm, contemporary home built around natural textures, soft neutrals, and carefully layered lighting.", ar: "منزل معاصر ودافئ يعتمد على الخامات الطبيعية والألوان الهادئة والإضاءة المدروسة." },
    image: "photo-apartment"
  },
  villa: {
    title: { en: "Quiet Luxury Villa", ar: "فيلا فاخرة وهادئة" },
    category: { en: "RESIDENTIAL · CONCEPT", ar: "سكني · تصور تصميمي" },
    description: { en: "An understated villa concept where clean architectural lines meet natural stone, timber, and generous daylight.", ar: "تصور لفيلا أنيقة بخطوط معمارية بسيطة تجمع بين الحجر الطبيعي والخشب والضوء." },
    image: "photo-villa"
  },
  office: {
    title: { en: "Creative Office", ar: "مكتب إبداعي" },
    category: { en: "COMMERCIAL · CONCEPT", ar: "تجاري · تصور تصميمي" },
    description: { en: "A flexible workplace designed to support focus and collaboration through a balanced palette and clear zoning.", ar: "مساحة عمل مرنة تدعم التركيز والتعاون من خلال ألوان متوازنة وتقسيم واضح للمناطق." },
    image: "photo-office"
  },
  "calm-home": {
    title: { en: "The Calm Home", ar: "المنزل الهادئ" },
    category: { en: "RESIDENTIAL · CONCEPT", ar: "سكني · تصور تصميمي" },
    description: { en: "A restful interior using tactile fabrics, natural finishes, and simple forms to create a relaxed everyday setting.", ar: "تصميم داخلي مريح يستخدم الأقمشة الغنية والخامات الطبيعية والأشكال البسيطة." },
    image: "photo-calm"
  },
  boutique: {
    title: { en: "Boutique Studio", ar: "استوديو بوتيك" },
    category: { en: "COMMERCIAL · CONCEPT", ar: "تجاري · تصور تصميمي" },
    description: { en: "A refined boutique concept with considered display moments, warm lighting, and a memorable customer journey.", ar: "تصور لمتجر أنيق يضم مناطق عرض مدروسة وإضاءة دافئة وتجربة مميزة للزوار." },
    image: "photo-boutique"
  },
  penthouse: {
    title: { en: "City Penthouse", ar: "بنتهاوس المدينة" },
    category: { en: "RESIDENTIAL · CONCEPT", ar: "سكني · تصور تصميمي" },
    description: { en: "A city retreat with open views, calm materials, and carefully framed moments for gathering and unwinding.", ar: "ملاذ حضري بإطلالات مفتوحة وخامات هادئة ومساحات مناسبة للاجتماع والاسترخاء." },
    image: "photo-penthouse"
  }
};
let language = "en";
const langButton = document.querySelector(".lang-toggle");
function setLanguage(next) {
  language = next;
  const arabic = language === "ar";
  document.documentElement.lang = language;
  document.documentElement.dir = arabic ? "rtl" : "ltr";
  document.body.classList.toggle("rtl", arabic);
  document.querySelectorAll("[data-en][data-ar]").forEach(el => {
    el.textContent = el.dataset[language];
  });
  langButton.textContent = arabic ? "EN" : "عربي";
  document.querySelector(".menu-toggle").setAttribute("aria-label", arabic ? "فتح القائمة" : "Open menu");
  document.querySelectorAll(".project-open").forEach(btn => {
    const d = projectData[btn.dataset.project];
    btn.setAttribute("aria-label", (arabic ? "عرض مشروع " : "View project ") + d.title[language]);
  });
}
langButton.addEventListener("click", () => setLanguage(language === "en" ? "ar" : "en"));

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "×" : "☰";
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.toggle("active", b === button));
    document.querySelectorAll(".project-card").forEach(card => {
      card.hidden = button.dataset.filter !== "all" && card.dataset.category !== button.dataset.filter;
    });
  });
});

const modal = document.querySelector("#projectModal");
document.querySelectorAll(".project-open").forEach(button => {
  button.addEventListener("click", () => {
    const data = projectData[button.dataset.project];
    document.querySelector("#modalTitle").textContent = data.title[language];
    document.querySelector("#modalCategory").textContent = data.category[language];
    document.querySelector("#modalDescription").textContent = data.description[language];
    document.querySelector("#modalImage").className = "modal-image project-photo " + data.image;
    modal.showModal();
  });
});
document.querySelector(".modal-close").addEventListener("click", () => modal.close());
modal.addEventListener("click", event => {
  if (event.target === modal) modal.close();
});

document.querySelector("#contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = form.get("name").toString().trim();
  const email = form.get("email").toString().trim();
  const message = form.get("message").toString().trim();
  if (!CONTACT_EMAIL || CONTACT_EMAIL === "your-email@example.com") {
    alert(language === "ar"
      ? "قبل استقبال الرسائل، افتح script.js واستبدل your-email@example.com ببريدك الإلكتروني الحقيقي."
      : "Before receiving inquiries, open script.js and replace your-email@example.com with your real email address.");
    return;
  }
  const subject = encodeURIComponent("Interior design inquiry — " + name);
  const body = encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nProject details:\n" + message);
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
});
document.querySelector("#year").textContent = new Date().getFullYear();
