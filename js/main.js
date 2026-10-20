(function () {
  "use strict";

  // TODO: set to the real enquiry inbox
  var CONTACT_EMAIL = "hello@splitpinengineering.co.nz";

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  // ---------- Footer year ----------
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // ---------- Mobile nav ----------
  var toggle = $(".nav-toggle");
  function setNav(open) {
    document.body.classList.toggle("nav-open", open);
    if (toggle) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
  }
  if (toggle) {
    toggle.addEventListener("click", function () { setNav(!document.body.classList.contains("nav-open")); });
    $$(".site-nav a").forEach(function (a) { a.addEventListener("click", function () { setNav(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setNav(false); });
  }

  // ---------- Reveal on scroll ----------
  var revealEls = $$(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  // ---------- Mobile call bar (shows after the hero) ----------
  var callBar = $(".call-bar");
  var hero = $(".hero");
  if (callBar && hero && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      callBar.classList.toggle("is-visible", !entries[0].isIntersecting);
    }, { threshold: 0.15 }).observe(hero);
  } else if (callBar) {
    callBar.classList.add("is-visible");
  }

  // ---------- Gallery ----------
  var galleryEl = $("#gallery");
  var filtersEl = $("#filters");
  if (galleryEl && window.GALLERY) {
    var cats = window.GALLERY_CATEGORIES;
    var items = window.GALLERY.map(function (g) {
      return { id: g[0], cat: g[1], title: g[2], w: g[3], h: g[4] };
    });
    var visible = items.slice();

    // Build tiles
    var frag = document.createDocumentFragment();
    items.forEach(function (it, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "gallery-item";
      b.dataset.cat = it.cat;
      b.dataset.index = i;
      b.setAttribute("aria-label", "View photo: " + it.title);
      b.innerHTML =
        '<img src="/images/work/thumb/' + it.id + '.webp" alt="' + it.title.replace(/"/g, "&quot;") +
        '" width="' + it.w + '" height="' + it.h + '" loading="lazy" decoding="async">' +
        '<span class="tag">' + cats[it.cat] + "</span>";
      frag.appendChild(b);
    });
    galleryEl.appendChild(frag);
    var tiles = $$(".gallery-item", galleryEl);

    // Build filter chips
    function chip(key, label, count) {
      var c = document.createElement("button");
      c.type = "button";
      c.className = "chip";
      c.dataset.filter = key;
      c.setAttribute("aria-pressed", key === "all" ? "true" : "false");
      c.innerHTML = label + '<span class="count">' + count + "</span>";
      return c;
    }
    filtersEl.appendChild(chip("all", "All", items.length));
    Object.keys(cats).forEach(function (k) {
      var n = items.filter(function (it) { return it.cat === k; }).length;
      if (n) filtersEl.appendChild(chip(k, cats[k], n));
    });

    // Show photos in batches so the page doesn't get endless on phones
    var PAGE = window.matchMedia("(min-width: 900px)").matches ? 16 : 12;
    var shown = PAGE;
    var currentKey = "all";
    var moreBtn = $("#gallery-more");

    function render() {
      visible = [];
      tiles.forEach(function (t, i) {
        var match = currentKey === "all" || t.dataset.cat === currentKey;
        if (match) visible.push(items[i]);
        t.hidden = !match || visible.length > shown;
      });
      var left = visible.length - shown;
      moreBtn.hidden = left <= 0;
      moreBtn.textContent = "Show more (" + left + ")";
    }
    function applyFilter(key) {
      if (key !== "all" && !cats[key]) key = "all";
      $$(".chip", filtersEl).forEach(function (c) {
        c.setAttribute("aria-pressed", String(c.dataset.filter === key));
      });
      currentKey = key;
      shown = PAGE;
      render();
    }
    filtersEl.addEventListener("click", function (e) {
      var c = e.target.closest(".chip");
      if (!c) return;
      applyFilter(c.dataset.filter);
      // Keep the filter in the URL so it can be shared or linked to (/work?cat=gates)
      var url = c.dataset.filter === "all" ? location.pathname : location.pathname + "?cat=" + c.dataset.filter;
      history.replaceState(null, "", url);
    });
    moreBtn.addEventListener("click", function () { shown += PAGE; render(); });
    applyFilter(new URLSearchParams(location.search).get("cat") || "all");

    // Lightbox
    var lb = $("#lightbox");
    var lbImg = $("#lb-img");
    var lbTitle = $("#lb-title");
    var lbCat = $("#lb-cat");
    var lbCount = $("#lb-count");
    var current = 0;
    var lastFocus = null;

    function show(pos) {
      current = (pos + visible.length) % visible.length;
      var it = visible[current];
      lbImg.src = "/images/work/full/" + it.id + ".webp";
      lbImg.alt = it.title;
      lbTitle.textContent = it.title;
      lbCat.textContent = cats[it.cat];
      lbCount.textContent = (current + 1) + " / " + visible.length;
      // Preload neighbours
      [current + 1, current - 1].forEach(function (p) {
        var n = visible[(p + visible.length) % visible.length];
        new Image().src = "/images/work/full/" + n.id + ".webp";
      });
    }
    function open(item) {
      lastFocus = document.activeElement;
      lb.hidden = false;
      requestAnimationFrame(function () { lb.classList.add("is-open"); });
      document.body.style.overflow = "hidden";
      show(visible.indexOf(item));
      $("#lb-close").focus();
    }
    function close() {
      lb.classList.remove("is-open");
      document.body.style.overflow = "";
      setTimeout(function () { lb.hidden = true; lbImg.src = ""; }, 250);
      if (lastFocus) lastFocus.focus();
    }

    galleryEl.addEventListener("click", function (e) {
      var t = e.target.closest(".gallery-item");
      if (t) open(items[+t.dataset.index]);
    });
    $("#lb-close").addEventListener("click", close);
    $("#lb-prev").addEventListener("click", function () { show(current - 1); });
    $("#lb-next").addEventListener("click", function () { show(current + 1); });
    lb.addEventListener("click", function (e) {
      if (e.target === lb || e.target.id === "lb-stage") close();
    });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(current - 1);
      else if (e.key === "ArrowRight") show(current + 1);
      else if (e.key === "Tab") { // keep focus inside the dialog
        var f = $$("button", lb);
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
        else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
      }
    });

    // Swipe
    var x0 = null, y0 = null;
    var stage = $("#lb-stage");
    stage.addEventListener("touchstart", function (e) {
      x0 = e.touches[0].clientX; y0 = e.touches[0].clientY;
    }, { passive: true });
    stage.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      var dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) show(current + (dx < 0 ? 1 : -1));
      else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) close();
      x0 = y0 = null;
    });
  }

  // ---------- Quote form (opens the visitor's email app) ----------
  var form = $("#quote-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // form.elements avoids clashing with HTMLFormElement's own .name property
      var f = form.elements;
      var name = f.namedItem("name").value.trim();
      var msg = f.namedItem("message").value.trim();
      var type = f.namedItem("type").value;
      if (!name) { f.namedItem("name").reportValidity(); return; }
      if (!msg) { f.namedItem("message").reportValidity(); return; }
      var body =
        "Name: " + name + "\n" +
        "Phone: " + (f.namedItem("phone").value.trim() || "-") + "\n" +
        "Job type: " + type + "\n\n" + msg + "\n";
      window.location.href = "mailto:" + CONTACT_EMAIL +
        "?subject=" + encodeURIComponent("Quote request: " + type + " (" + name + ")") +
        "&body=" + encodeURIComponent(body);
    });
  }
})();
