// --- DROPDOWN ---
const dropdown = document.querySelector(".dropdown");
if (dropdown) {
  const dropdownBtn = dropdown.querySelector(":scope > a"); // the 'Characters' toggle
  const dropdownContent = dropdown.querySelector(".dropdown-content");

  dropdownBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation(); // <-- don't let other click handlers run
    dropdownContent.classList.toggle("show");
    const expanded = dropdownBtn.getAttribute("aria-expanded") === "true";
    dropdownBtn.setAttribute("aria-expanded", String(!expanded));
  });

  window.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) {
      dropdownContent.classList.remove("show");
      dropdownBtn.setAttribute("aria-expanded", "false");
    }
  });
}

// --- HAMBURGER / MOBILE NAV ---
const nav = document.getElementById('primary-nav');
const navToggle = document.querySelector('.nav-toggle');

if (nav && navToggle) {
  const setExpanded = (val) => navToggle.setAttribute('aria-expanded', String(val));

  navToggle.addEventListener('click', () => {
    const willOpen = !nav.classList.contains('open');
    nav.classList.toggle('open', willOpen);
    setExpanded(willOpen);
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
      nav.classList.remove('open');
      setExpanded(false);
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      nav.classList.remove('open');
      setExpanded(false);
    }
  });

  // ✅ Close only for leaf links (not the dropdown toggle)
  const dropdownToggle = dropdown ? dropdown.querySelector(":scope > a") : null;

  nav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', (e) => {
      const isDropdownToggle = dropdownToggle && a === dropdownToggle;
      if (isDropdownToggle) {
        // let the dropdown handler manage this
        e.preventDefault();
        return;
      }
      // Leaf link → close the mobile menu
      nav.classList.remove('open');
      setExpanded(false);
    });
  });
}
