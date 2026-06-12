const header = document.querySelector(".site-header");

function updateHeaderShadow() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

window.addEventListener("scroll", updateHeaderShadow, { passive: true });
updateHeaderShadow();
