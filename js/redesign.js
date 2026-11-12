(() => {
  const menuButton = document.querySelector(".menu");
  const nav = document.querySelector("#main-nav");
  if (menuButton && nav) {
    const closeMenu = () => {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      menuButton.textContent = "☰";
    };
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      menuButton.textContent = open ? "×" : "☰";
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 800) closeMenu();
    });
  }

  const year = document.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();

  const detailPanel = document.querySelector(".rig-detail");
  document.querySelectorAll(".rig-hotspot").forEach(button => {
    button.addEventListener("click", () => {
      const wasOpen = button.getAttribute("aria-pressed") === "true";
      document.querySelectorAll(".rig-hotspot").forEach(item => item.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", String(!wasOpen));
      if (detailPanel) {
        detailPanel.textContent = wasOpen ? "SELECT A MARKER TO EXPLORE THE SETUP" : button.dataset.detail;
      }
    });
  });

  const photoInput = document.querySelector("#quote-photos");
  const photoList = document.querySelector("#photo-list");
  if (photoInput && photoList) {
    photoInput.addEventListener("change", () => {
      const files = Array.from(photoInput.files || []);
      const oversized = files.filter(file => file.size > 12 * 1024 * 1024);
      if (oversized.length) {
        photoList.textContent = "Please choose images under 12 MB each. Photos must be attached to the email after it opens.";
        photoInput.value = "";
        return;
      }
      photoList.textContent = files.length
        ? `${files.length} selected: ${files.map(file => file.name).join(", ")}. Attach these in your email app after it opens.`
        : "Optional. Your email app will open with your details; attach selected photos before sending.";
    });
  }

  const quoteForm = document.querySelector("#quote-form");
  if (quoteForm) {
    quoteForm.addEventListener("submit", event => {
      event.preventDefault();
      if (!quoteForm.reportValidity()) return;
      const values = new FormData(quoteForm);
      const photoNames = Array.from(photoInput?.files || []).map(file => file.name);
      const body = [
        "Hello Enhance My Ride,",
        "",
        "I would like to request a detailing quote.",
        `Name: ${values.get("name")}`,
        `Email: ${values.get("email")}`,
        `Phone: ${values.get("phone") || "Not provided"}`,
        `Service location / city: ${values.get("location")}`,
        `Vehicle: ${values.get("vehicle")}`,
        `Package: ${values.get("package")}`,
        `Condition / notes: ${values.get("condition") || "Not provided"}`,
        `Selected photo filenames: ${photoNames.length ? photoNames.join(", ") : "None"}`,
        "",
        "I understand that selected photos are not attached automatically and will add them to this email before sending.",
      ].join("\n");
      const subject = `Detailing quote request — ${values.get("vehicle")}`;
      const status = document.querySelector("#form-status");
      if (status) status.textContent = "Your email app should open with your quote details. Attach the selected photos before sending. If it does not open, email info@enhancemyride.com directly.";
      window.location.href = `mailto:info@enhancemyride.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }
})();
