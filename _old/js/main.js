document.addEventListener("DOMContentLoaded", function () {
  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Tabs (ubytování stránka)
  var tabButtons = document.querySelectorAll("[data-tab-target]");
  tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var group = btn.closest("[data-tabs]");
      group.querySelectorAll("[data-tab-target]").forEach(function (b) {
        b.setAttribute("aria-selected", "false");
      });
      group.querySelectorAll(".tab-panel").forEach(function (p) {
        p.classList.remove("is-active");
      });
      btn.setAttribute("aria-selected", "true");
      document.getElementById(btn.getAttribute("data-tab-target")).classList.add("is-active");
    });
  });

  // Gallery filter
  var filterButtons = document.querySelectorAll("[data-filter]");
  var galleryItems = document.querySelectorAll(".gallery-item");
  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterButtons.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      btn.setAttribute("aria-pressed", "true");
      var filter = btn.getAttribute("data-filter");
      galleryItems.forEach(function (item) {
        var match = filter === "all" || item.getAttribute("data-category") === filter;
        item.classList.toggle("is-hidden", !match);
      });
    });
  });

  // Lightbox
  var lightbox = document.querySelector(".lightbox");
  if (lightbox && galleryItems.length) {
    var lbImg = lightbox.querySelector("img");
    var lbCaption = lightbox.querySelector("figcaption");
    var items = Array.prototype.slice.call(galleryItems);
    var currentIndex = 0;

    function visibleItems() {
      return items.filter(function (item) { return !item.classList.contains("is-hidden"); });
    }

    function openAt(item) {
      var visible = visibleItems();
      currentIndex = visible.indexOf(item);
      show(visible);
    }

    function show(visible) {
      var item = visible[currentIndex];
      var img = item.querySelector("img");
      lbImg.src = img.getAttribute("data-full") || img.src;
      lbImg.alt = img.alt;
      lbCaption.textContent = item.querySelector("figcaption") ? item.querySelector("figcaption").textContent : "";
      lightbox.classList.add("is-open");
    }

    items.forEach(function (item) {
      item.addEventListener("click", function () { openAt(item); });
    });

    lightbox.querySelector(".lightbox-close").addEventListener("click", function () {
      lightbox.classList.remove("is-open");
    });

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) lightbox.classList.remove("is-open");
    });

    lightbox.querySelector(".lightbox-prev").addEventListener("click", function () {
      var visible = visibleItems();
      currentIndex = (currentIndex - 1 + visible.length) % visible.length;
      show(visible);
    });

    lightbox.querySelector(".lightbox-next").addEventListener("click", function () {
      var visible = visibleItems();
      currentIndex = (currentIndex + 1) % visible.length;
      show(visible);
    });

    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("is-open")) return;
      if (e.key === "Escape") lightbox.classList.remove("is-open");
      if (e.key === "ArrowLeft") lightbox.querySelector(".lightbox-prev").click();
      if (e.key === "ArrowRight") lightbox.querySelector(".lightbox-next").click();
    });
  }
});
