(function () {
  "use strict";

  const config = window.SITE_CONFIG || {};

  const whatsappLink = (message) => {
    const number = String(config.whatsappNumber || "").replace(/\D/g, "");
    const text = String(message || "").trim();
    if (!number) return "#contact";
    return `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
  };

  const openWhatsApp = (message) => {
    const url = whatsappLink(message);
    if (url.startsWith("https://")) {
      window.location.assign(url);
    }
  };

  const setText = (selector, value) => {
    if (!value) return;
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = value;
    });
  };

  setText("[data-brand-name]", config.brandName);
  setText("[data-parent-brand]", config.parentBrand);
  setText("[data-established-year]", config.establishedYear);
  setText("[data-location]", config.location);
  setText("[data-phone-display]", config.phoneDisplay);
  setText("[data-showroom-address]", config.showroomAddress);
  setText("[data-business-hours]", config.businessHours);
  setText("[data-email-display]", config.email);

  /* Keep the showroom address visible in the shared top ribbon on every page. */
  document.querySelectorAll(".client-ribbon-inner").forEach((ribbon) => {
    if (ribbon.querySelector(".client-ribbon-address")) return;
    const address = document.createElement("a");
    address.className = "client-ribbon-address";
    address.setAttribute("data-map-link", "");
    address.setAttribute(
      "aria-label",
      `Open showroom location: ${config.showroomAddress || config.location || ""}`
    );
    address.title = config.showroomAddress || config.location || "Showroom location";
    address.innerHTML = `
      <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z"></path><circle cx="12" cy="10" r="2.2"></circle></svg>
      <span>${config.location || config.showroomAddress || "Showroom location"}</span>
    `;
    const phone = ribbon.querySelector(".client-ribbon-phone");
    if (phone) phone.insertAdjacentElement("afterend", address);
    else ribbon.prepend(address);
  });


  /* Mobile top ribbon: contact details scroll continuously while social icons stay fixed. */
  document.querySelectorAll(".client-ribbon-inner").forEach((ribbon) => {
    if (ribbon.querySelector(".client-ribbon-marquee")) return;
    const phone = ribbon.querySelector(".client-ribbon-phone");
    const address = ribbon.querySelector(".client-ribbon-address");
    const socials = ribbon.querySelector(".client-ribbon-socials");
    if (!phone && !address) return;

    const viewport = document.createElement("div");
    viewport.className = "client-ribbon-marquee";
    const track = document.createElement("div");
    track.className = "client-ribbon-marquee-track";
    const group = document.createElement("div");
    group.className = "client-ribbon-marquee-group";
    if (phone) group.appendChild(phone);
    if (address) group.appendChild(address);
    const clone = group.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    clone.querySelectorAll("a").forEach((link) => link.setAttribute("tabindex", "-1"));
    track.append(group, clone);
    viewport.appendChild(track);
    if (socials) ribbon.insertBefore(viewport, socials);
    else ribbon.appendChild(viewport);
  });

  /* Convert narrow specification/category strips into smooth mobile tickers. */
  [".rail-inner", ".about-intro-strip-inner", ".infra-step-rail-inner", ".infra-hero-badges"].forEach((selector) => {
    document.querySelectorAll(selector).forEach((strip) => {
      if (strip.querySelector(":scope > .mobile-ribbon-track")) return;
      const children = Array.from(strip.children);
      if (!children.length) return;
      const track = document.createElement("div");
      track.className = "mobile-ribbon-track";
      const group = document.createElement("div");
      group.className = "mobile-ribbon-group";
      children.forEach((child) => group.appendChild(child));
      const clone = group.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.querySelectorAll("a,button").forEach((item) => item.setAttribute("tabindex", "-1"));
      track.append(group, clone);
      strip.appendChild(track);
    });
  });

  /* Exact uploaded brand artwork is used unchanged. CSS controls only its display viewport. */
  document.querySelectorAll(".wordmark").forEach((wordmark) => {
    wordmark.classList.add("brand-image-lockup");
    if (!wordmark.querySelector(".brand-logo-mark")) {
      wordmark.innerHTML = `
        <img class="brand-logo-mark" src="assets/images/jsw-logo-exact.png" alt="JSW logo">
        <img class="brand-sankalp-wordmark" src="assets/images/sankalp-wordmark-brand-transparent.png" alt="SANKALP — a brand of Jesan Steel Works">
      `;
    }
  });

  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    link.href = whatsappLink(
      link.dataset.whatsappMessage ||
        "Hello SANKALP, I would like to enquire about your steel furniture."
    );
  });

  document.querySelectorAll("[data-phone-display]").forEach((element) => {
    if (element.closest("a[data-call-link]")) return;
    const callLink = document.createElement("a");
    callLink.className = "inline-phone-link";
    callLink.setAttribute("data-call-link", "");
    element.replaceWith(callLink);
    callLink.appendChild(element);
  });

  document.querySelectorAll("[data-call-link]").forEach((link) => {
    link.href = `tel:${config.phoneNumber || ""}`;
    link.setAttribute(
      "aria-label",
      `Call SANKALP at ${config.phoneDisplay || config.phoneNumber || ""}`
    );
  });

  document
    .querySelectorAll(
      "[data-map-link], .contact-dock-location, a[href*='google.com/maps/search']"
    )
    .forEach((link) => {
    link.href = config.showroomMapUrl || "#contact";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute(
      "aria-label",
      `Open Jesan Steel Works showroom location: ${config.showroomAddress || config.location || ""}`
    );
  });

  document.querySelectorAll("[data-email-link]").forEach((link) => {
    link.href = config.email ? `mailto:${config.email}` : "#contact";
  });

  const wireSocialLink = (selector, url, label) => {
    document.querySelectorAll(selector).forEach((link) => {
      if (url) {
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.title = `Open ${label}`;
        link.classList.remove("is-disabled");
        link.removeAttribute("aria-disabled");
      } else {
        link.href = "#";
        link.classList.add("is-disabled");
        link.setAttribute("aria-disabled", "true");
        link.title = `${label} link will be added soon`;
        link.addEventListener("click", (event) => event.preventDefault());
      }
    });
  };

  wireSocialLink("[data-instagram-link]", config.instagramUrl, "Instagram");
  wireSocialLink("[data-facebook-link]", config.facebookUrl, "Facebook");

  /* Use recognizable official brand colours for every social-media entry point. */
  const whatsappLogo = `
    <svg aria-hidden="true" viewBox="0 0 32 32">
      <path d="M16.1 3C9 3 3.2 8.7 3.2 15.8c0 2.2.6 4.4 1.7 6.3L3 29l7-1.8c1.8 1 3.9 1.5 6.1 1.5 7.1 0 12.9-5.7 12.9-12.8S23.2 3 16.1 3Zm0 23.5c-2 0-3.9-.5-5.5-1.5l-.4-.2-4.1 1.1 1.1-4-.3-.4a10.5 10.5 0 0 1-1.6-5.6c0-5.9 4.8-10.7 10.8-10.7 2.9 0 5.6 1.1 7.6 3.1a10.6 10.6 0 0 1 3.2 7.6c0 5.8-4.8 10.6-10.8 10.6Zm5.9-8c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.7-.8-2.8-1.5-3.9-3.4-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.6-.5-.8-.5h-.7c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.8s1.2 3.2 1.4 3.4c.2.2 2.3 3.6 5.7 5 .8.3 1.4.6 1.9.7.8.3 1.6.2 2.2.1.7-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.4-.3-.7-.4Z"></path>
    </svg>`;

  document
    .querySelectorAll(".client-footer-contact > a[data-whatsapp-link]")
    .forEach((link) => {
      const icon = link.querySelector(".client-footer-icon");
      if (icon) icon.innerHTML = whatsappLogo;
    });

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");

  if (menuToggle && navigation) {
    const closeMenu = () => {
      menuToggle.classList.remove("is-open");
      navigation.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    };

    menuToggle.addEventListener("click", () => {
      const open = !navigation.classList.contains("is-open");
      menuToggle.classList.toggle("is-open", open);
      navigation.classList.toggle("is-open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  const enquiryForm = document.querySelector(".enquiry-form:not(.contact-enquiry-form)");
  const interestButtons = Array.from(
    document.querySelectorAll("[data-product-interest]")
  );
  let selectedInterest =
    interestButtons.find((button) => button.classList.contains("selected"))
      ?.dataset.productInterest || "Designer Almirahs";

  const selectInterest = (name) => {
    selectedInterest = name;
    interestButtons.forEach((button) => {
      const selected = button.dataset.productInterest === name;
      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  };

  interestButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectInterest(button.dataset.productInterest || "Designer Almirahs");
      if (button.matches(".collection-content button")) {
        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  if (enquiryForm) {
    enquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = new FormData(enquiryForm);
      const name = String(form.get("name") || "").trim();
      const phone = String(form.get("phone") || "").trim();
      const note = String(form.get("message") || "").trim();
      const message = [
        `Hello SANKALP, I am interested in ${selectedInterest}.`,
        name && `Name: ${name}`,
        phone && `Phone: ${phone}`,
        note && `Requirement: ${note}`,
      ]
        .filter(Boolean)
        .join("\n");

      const submitButton = enquiryForm.querySelector(".whatsapp-send-button");
      const status = enquiryForm.querySelector(".form-status");
      submitButton?.classList.add("is-sending");
      if (status) status.textContent = "Sending your enquiry to WhatsApp…";
      window.setTimeout(() => openWhatsApp(message), 160);
    });
  }

  const processSection = document.querySelector(".infra-process");
  const revealItems = Array.from(document.querySelectorAll("[data-reveal]:not(.infra-process-step)"));

  /* Reliable reveal animation: content remains visible when JS/observer support is unavailable. */
  if (revealItems.length) {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
      );
      revealItems.forEach((item) => observer.observe(item));
    } else {
      revealItems.forEach((item) => item.classList.add("is-visible"));
    }
  }

  /* Infrastructure steps: one observer handles reveals, timeline progress and rail state.
     No per-scroll layout calculations and no scrollIntoView calls, preventing scroll jumps. */
  const infraSteps = Array.from(document.querySelectorAll(".infra-process-step[id]"));
  const infraRail = document.querySelector(".infra-step-rail-inner");
  const infraRailLinks = Array.from(document.querySelectorAll('.infra-step-rail a[href^="#step-"]'));
  let highestVisibleStep = -1;

  const setCurrentInfraStep = (id) => {
    infraRailLinks.forEach((link) => {
      link.classList.toggle("is-current", link.getAttribute("href") === `#${id}`);
    });

    const activeLink = infraRailLinks.find((link) => link.getAttribute("href") === `#${id}`);
    if (activeLink && infraRail) {
      const targetLeft = activeLink.offsetLeft - (infraRail.clientWidth - activeLink.offsetWidth) / 2;
      const maxLeft = Math.max(0, infraRail.scrollWidth - infraRail.clientWidth);
      infraRail.scrollTo({ left: Math.max(0, Math.min(targetLeft, maxLeft)), behavior: "auto" });
    }
  };

  if (infraSteps.length) {
    if ("IntersectionObserver" in window) {
      const stepObserver = new IntersectionObserver(
        (entries) => {
          const visibleEntries = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const index = infraSteps.indexOf(entry.target);
            entry.target.classList.add("is-visible");
            highestVisibleStep = Math.max(highestVisibleStep, index);
            if (processSection) {
              const progress = Math.min(1, (highestVisibleStep + 1) / infraSteps.length);
              processSection.style.setProperty("--process-progress", String(progress));
            }
          });

          if (visibleEntries[0]) setCurrentInfraStep(visibleEntries[0].target.id);
        },
        { threshold: [0.08, 0.22, 0.42], rootMargin: "-10% 0px -35% 0px" }
      );
      infraSteps.forEach((step) => stepObserver.observe(step));
    } else {
      infraSteps.forEach((step) => step.classList.add("is-visible"));
      if (processSection) processSection.style.setProperty("--process-progress", "1");
    }
  }

  /* Direct rail clicks are smooth, but automatic active-state updates never move the page vertically. */
  infraRailLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const id = link.getAttribute("href")?.slice(1);
      if (id) setCurrentInfraStep(id);
    });
  });


  const contactForm = document.querySelector(".contact-enquiry-form");
  const productCombobox = document.querySelector("[data-product-combobox]");

  if (contactForm && productCombobox) {
    const searchInput = productCombobox.querySelector('[name="productSearch"]');
    const hiddenProduct = productCombobox.querySelector('[name="selectedProduct"]');
    const optionsPanel = productCombobox.querySelector(".product-options");
    const optionButtons = Array.from(
      productCombobox.querySelectorAll("[data-product-value]")
    );
    const noResults = productCombobox.querySelector(".product-no-results");
    const toggleButton = productCombobox.querySelector(".product-toggle");

    const setFieldError = (name, message) => {
      const field = contactForm.querySelector(`[name="${name}"]`)?.closest(
        ".premium-field"
      );
      const error = contactForm.querySelector(`[data-error-for="${name}"]`);
      field?.classList.toggle("has-error", Boolean(message));
      if (error) error.textContent = message;
    };

    const openOptions = () => {
      optionsPanel.hidden = false;
      productCombobox.classList.add("is-open");
      searchInput.setAttribute("aria-expanded", "true");
    };

    const closeOptions = () => {
      optionsPanel.hidden = true;
      productCombobox.classList.remove("is-open");
      searchInput.setAttribute("aria-expanded", "false");
    };

    const filterOptions = () => {
      const query = searchInput.value.trim().toLowerCase();
      let visibleCount = 0;
      optionButtons.forEach((button) => {
        const visible = button.dataset.productValue
          .toLowerCase()
          .includes(query);
        button.hidden = !visible;
        if (visible) visibleCount += 1;
      });
      if (noResults) noResults.hidden = visibleCount > 0;
    };

    const chooseProduct = (value) => {
      searchInput.value = value;
      hiddenProduct.value = value;
      optionButtons.forEach((button) => {
        const selected = button.dataset.productValue === value;
        button.setAttribute("aria-selected", String(selected));
      });
      setFieldError("selectedProduct", "");
      closeOptions();
    };

    searchInput.addEventListener("focus", () => {
      openOptions();
      filterOptions();
    });

    searchInput.addEventListener("input", () => {
      hiddenProduct.value = "";
      openOptions();
      filterOptions();
    });

    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeOptions();
      if (event.key === "Enter") {
        const firstVisible = optionButtons.find((button) => !button.hidden);
        if (firstVisible && optionsPanel.hidden === false) {
          event.preventDefault();
          chooseProduct(firstVisible.dataset.productValue || "");
        }
      }
    });

    toggleButton?.addEventListener("click", () => {
      if (optionsPanel.hidden) {
        openOptions();
        filterOptions();
        searchInput.focus();
      } else {
        closeOptions();
      }
    });

    optionButtons.forEach((button) => {
      button.addEventListener("click", () => {
        chooseProduct(button.dataset.productValue || "");
      });
    });

    document.addEventListener("click", (event) => {
      if (!productCombobox.contains(event.target)) closeOptions();
    });

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const nameInput = contactForm.querySelector('[name="contactName"]');
      const phoneInput = contactForm.querySelector('[name="contactPhone"]');
      const status = contactForm.querySelector(".contact-form-status");
      const name = nameInput.value.trim();
      const phone = phoneInput.value.replace(/\D/g, "");
      const product = hiddenProduct.value.trim();

      setFieldError(
        "contactName",
        name.length >= 2 ? "" : "Please enter your name."
      );
      setFieldError(
        "contactPhone",
        /^\d{10}$/.test(phone) ? "" : "Enter a valid 10-digit mobile number."
      );
      setFieldError(
        "selectedProduct",
        product ? "" : "Please search for or select a product."
      );

      if (name.length < 2 || !/^\d{10}$/.test(phone) || !product) {
        if (status) status.textContent = "Please complete the highlighted fields.";
        return;
      }

      const message = [
        "*NEW PRODUCT ENQUIRY | SANKALP*",
        "——————————————",
        `*Customer name:* ${name}`,
        `*Contact number:* +91 ${phone}`,
        `*Product required:* ${product}`,
        "——————————————",
        "Please share available designs, customization options, pricing and delivery details.",
      ].join("\n");

      const submitButton = contactForm.querySelector(".whatsapp-send-button");
      submitButton?.classList.add("is-sending");
      if (status) status.textContent = "Sending your enquiry to WhatsApp…";
      window.setTimeout(() => openWhatsApp(message), 160);
    });
  }


  /* Raksha Bandhan greeting — mobile and desktop */
  document.querySelectorAll(".independence-day-popup").forEach((popup) => {
    const closeButton = popup.querySelector(".independence-day-popup-close");
    closeButton?.addEventListener("click", () => {
      popup.hidden = true;
    });
  });


  /* dock-footer-visibility: keep quick actions throughout the site, hide them while the footer is visible. */
  const contactDock = document.querySelector(".contact-dock");
  const siteFooter = document.querySelector("footer.site-footer");
  if (contactDock && siteFooter) {
    if ("IntersectionObserver" in window) {
      const dockObserver = new IntersectionObserver(
        (entries) => {
          const footerVisible = entries.some((entry) => entry.isIntersecting);
          contactDock.classList.toggle("is-footer-hidden", footerVisible);
        },
        { threshold: 0.03 }
      );
      dockObserver.observe(siteFooter);
    } else {
      const updateDockVisibility = () => {
        const rect = siteFooter.getBoundingClientRect();
        const footerVisible = rect.top < window.innerHeight && rect.bottom > 0;
        contactDock.classList.toggle("is-footer-hidden", footerVisible);
      };
      window.addEventListener("scroll", updateDockVisibility, { passive: true });
      updateDockVisibility();
    }
  }

})();
