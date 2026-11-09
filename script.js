// Shared navigation, contact links, project lightboxes and footer year.
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
      nav.classList.toggle("open", !isOpen);
      document.body.classList.toggle("no-scroll", !isOpen);
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      nav.classList.remove("open");
      document.body.classList.remove("no-scroll");
    }));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        nav.classList.remove("open");
        document.body.classList.remove("no-scroll");
      }
    });
  }

  // Replace this placeholder with your WhatsApp number in international format,
  // digits only, with no plus sign. Example Nigeria: 2348012345678.
  const WHATSAPP_NUMBER = "2348054721850";
  document.querySelectorAll("[data-whatsapp]").forEach(link => {
    link.href = `https://wa.me/${WHATSAPP_NUMBER}`;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.addEventListener("click", event => {
      if (WHATSAPP_NUMBER.includes("X")) {
        event.preventDefault();
        alert("Add your WhatsApp number in script.js first. Use international format without the + sign.");
      }
    });
  });

  // Add your X profile URL here when ready.
  const X_PROFILE_URL = "https://x.com/tomithaeditor?s=11";
  document.querySelectorAll("[data-social-x]").forEach(link => {
    if (X_PROFILE_URL) {
      link.href = X_PROFILE_URL;
      link.target = "_blank";
      link.rel = "noreferrer";
    } else {
      link.addEventListener("click", event => {
        event.preventDefault();
        alert("Add your X profile URL in script.js first.");
      });
    }
  });

  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  // Video pages: set data-video to the YouTube video ID when the playback system is ready.
  const videoLightbox = document.getElementById("video-lightbox");
  if (videoLightbox) {
    const content = videoLightbox.querySelector(".lightbox-content");
    const closeButton = videoLightbox.querySelector(".lightbox-close");
    const closeVideo = () => {
      videoLightbox.classList.remove("active");
      videoLightbox.setAttribute("aria-hidden", "true");
      content.innerHTML = "";
      document.body.classList.remove("no-scroll");
    };
    document.querySelectorAll("[data-video]").forEach(button => {
      button.addEventListener("click", () => {
        const id = button.dataset.video.trim();
        if (!id) {
          alert("This is a project placeholder. Add the YouTube video ID when you are ready.");
          return;
        }
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${encodeURIComponent(id)}?autoplay=1`;
        iframe.title = "Portfolio video";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        iframe.referrerPolicy = "strict-origin-when-cross-origin";
        iframe.allowFullscreen = true;
        content.appendChild(iframe);
        videoLightbox.classList.add("active");
        videoLightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("no-scroll");
      });
    });
    closeButton?.addEventListener("click", closeVideo);
    videoLightbox.addEventListener("click", event => { if (event.target === videoLightbox) closeVideo(); });
    document.addEventListener("keydown", event => { if (event.key === "Escape") closeVideo(); });
  }

  const imageLightbox = document.getElementById("image-lightbox");
  if (imageLightbox) {
    const image = imageLightbox.querySelector("img");
    const closeButton = imageLightbox.querySelector(".lightbox-close");
    const closeImage = () => {
      imageLightbox.classList.remove("active");
      imageLightbox.setAttribute("aria-hidden", "true");
      image.removeAttribute("src");
      document.body.classList.remove("no-scroll");
    };
    document.querySelectorAll("[data-image]").forEach(button => {
      button.addEventListener("click", () => {
        const src = button.dataset.image.trim();
        if (!src) {
          alert("This is a thumbnail placeholder. Add the image path when you are ready.");
          return;
        }
        image.src = src;
        imageLightbox.classList.add("active");
        imageLightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("no-scroll");
      });
    });
    closeButton?.addEventListener("click", closeImage);
    imageLightbox.addEventListener("click", event => { if (event.target === imageLightbox) closeImage(); });
    document.addEventListener("keydown", event => { if (event.key === "Escape") closeImage(); });
  }
});
