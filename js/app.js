(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const rupee = (n) => "₹" + n.toLocaleString("en-IN");
  const unitText = (u) => (u === "250g" ? "/ 250g" : "/ " + u);

  /* ---------- WhatsApp ---------- */
  const waLink = (text) => `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(text)}`;
  $$("[data-wa]").forEach((a) => (a.href = waLink(a.dataset.wa)));

  /* ---------- Loader ---------- */
  const word = $("#loaderWord");
  word.innerHTML = [...SHOP.name].map((c, i) => `<span style="animation-delay:${i * 0.08}s">${c}</span>`).join("");
  const hideLoader = () => $("#loader").classList.add("done");
  window.addEventListener("load", () => setTimeout(hideLoader, 1500));
  setTimeout(hideLoader, 3500);

  /* ---------- Header / nav ---------- */
  const header = $("#header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  const burger = $("#burger"), nav = $("#nav");
  const setNav = (open) => { nav.classList.toggle("open", open); burger.setAttribute("aria-expanded", open); };
  burger.addEventListener("click", () => setNav(!nav.classList.contains("open")));
  $$("#nav a").forEach((a) => a.addEventListener("click", () => setNav(false)));
  $("#year").textContent = new Date().getFullYear();

  /* ---------- Scroll reveal ---------- */
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
      }, { threshold: 0.12 })
    : null;
  $$(".reveal").forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 0.08 + "s";
    io ? io.observe(el) : el.classList.add("visible");
  });

  /* ---------- Basket state ---------- */
  let basket = {};
  try { basket = JSON.parse(localStorage.getItem("handcraft-basket") || "{}"); } catch (e) { basket = {}; }
  Object.keys(basket).forEach((id) => { if (!MENU.some((m) => m.id === id)) delete basket[id]; });
  const save = () => { try { localStorage.setItem("handcraft-basket", JSON.stringify(basket)); } catch (e) {} };
  const count = () => Object.values(basket).reduce((a, b) => a + b, 0);
  const total = () => Object.entries(basket).reduce((s, [id, q]) => s + MENU.find((m) => m.id === id).price * q, 0);

  function change(id, d) {
    const q = (basket[id] || 0) + d;
    if (q <= 0) delete basket[id]; else basket[id] = Math.min(q, 99);
    save(); update();
    if (d > 0) { const b = $("#basketOpen"); b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump"); }
  }

  /* ---------- Menu ---------- */
  let activeCat = "all";
  const tabs = $("#tabs");
  tabs.innerHTML = CATEGORIES.map((c) => `<button class="tab${c.id === "all" ? " active" : ""}" role="tab" data-cat="${c.id}">${c.label}</button>`).join("");
  tabs.addEventListener("click", (e) => {
    const t = e.target.closest(".tab"); if (!t) return;
    activeCat = t.dataset.cat;
    $$(".tab", tabs).forEach((b) => b.classList.toggle("active", b === t));
    renderMenu();
  });

  function actionsHTML(id) {
    const q = basket[id] || 0;
    return q
      ? `<div class="qty"><button data-act="dec" aria-label="Remove one">−</button><span>${q}</span><button data-act="inc" aria-label="Add one">+</button></div>`
      : `<button class="add-btn" data-act="inc">Add</button>`;
  }

  function renderMenu() {
    const grid = $("#menuGrid");
    const items = MENU.filter((m) => activeCat === "all" || m.cat === activeCat);
    grid.innerHTML = items.map((m, i) => `
      <article class="item" data-id="${m.id}" style="animation-delay:${i * 0.05}s">
        <div class="item-photo">${renderArt(m)}</div>
        <div class="item-body">
          <div class="item-label" style="background:${m.label}">${m.name}</div>
          <div class="item-price">${rupee(m.price)} <small>${unitText(m.unit)}</small></div>
          <div class="item-actions">${actionsHTML(m.id)}</div>
        </div>
      </article>`).join("");

    // Swap in a real photo when images/<img> exists.
    $$(".item", grid).forEach((card) => {
      const m = MENU.find((x) => x.id === card.dataset.id);
      const probe = new Image();
      probe.onload = () => {
        probe.alt = m.name; probe.loading = "lazy";
        $(".item-photo", card).replaceChildren(probe);
      };
      probe.src = "images/" + m.img;
    });
  }

  $("#menuGrid").addEventListener("click", (e) => {
    const b = e.target.closest("[data-act]"); if (!b) return;
    const id = b.closest(".item").dataset.id;
    change(id, b.dataset.act === "inc" ? 1 : -1);
  });

  // Card tilt on hover (mouse only)
  const grid = $("#menuGrid");
  if (window.matchMedia("(hover: hover)").matches) {
    grid.addEventListener("mousemove", (e) => {
      const card = e.target.closest(".item"); if (!card) return;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px)`;
    });
    grid.addEventListener("mouseout", (e) => {
      const card = e.target.closest(".item"); if (card && !card.contains(e.relatedTarget)) card.style.transform = "";
    });
  }

  /* ---------- Drawer ---------- */
  const drawer = $("#drawer"), overlay = $("#overlay");
  function openDrawer(open) {
    drawer.classList.toggle("open", open);
    overlay.classList.toggle("show", open);
    drawer.setAttribute("aria-hidden", !open);
    document.body.classList.toggle("lock", open);
  }
  $("#basketOpen").addEventListener("click", () => openDrawer(true));
  $("#basketClose").addEventListener("click", () => openDrawer(false));
  overlay.addEventListener("click", () => openDrawer(false));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") openDrawer(false); });

  function renderDrawer() {
    const body = $("#drawerBody");
    const ids = Object.keys(basket);
    if (!ids.length) {
      body.innerHTML = `<div class="empty"><span>🧺</span>Your basket is empty.<br>Add some sweet treats!</div>`;
    } else {
      body.innerHTML = ids.map((id) => {
        const m = MENU.find((x) => x.id === id), q = basket[id];
        return `<div class="line" data-id="${id}">
          <b>${m.name}</b>
          <div class="qty"><button data-act="dec" aria-label="Remove one">−</button><span>${q}</span><button data-act="inc" aria-label="Add one">+</button></div>
          <small>${rupee(m.price)} ${unitText(m.unit)} · ${rupee(m.price * q)}</small>
        </div>`;
      }).join("");
    }
    $("#basketTotal").textContent = rupee(total());
  }
  $("#drawerBody").addEventListener("click", (e) => {
    const b = e.target.closest("[data-act]"); if (!b) return;
    change(b.closest(".line").dataset.id, b.dataset.act === "inc" ? 1 : -1);
  });
  $("#clearBasket").addEventListener("click", () => { basket = {}; save(); update(); });

  function update() {
    $("#basketCount").textContent = count();
    renderDrawer();
    $$("#menuGrid .item").forEach((card) => { $(".item-actions", card).innerHTML = actionsHTML(card.dataset.id); });
  }

  /* ---------- Send order ---------- */
  $("#sendOrder").addEventListener("click", () => {
    if (!count()) { alert("Please add something to your basket first 🙂"); return; }
    const name = $("#custName").value.trim(), addr = $("#custAddress").value.trim();
    const lines = Object.entries(basket).map(([id, q], i) => {
      const m = MENU.find((x) => x.id === id);
      return `${i + 1}. ${m.name} × ${q} (${rupee(m.price)} ${unitText(m.unit)}) = ${rupee(m.price * q)}`;
    });
    const msg = [
      "Hi Handcraft! I would like to order:", "", ...lines, "",
      `Total: ${rupee(total())}`, "",
      `Name: ${name || "-"}`,
      `Delivery address (Katol): ${addr || "-"}`,
    ].join("\n");
    window.open(waLink(msg), "_blank", "noopener");
  });

  /* ---------- Quotes ---------- */
  const qText = $("#quoteText"), qDots = $("#quoteDots");
  let qi = 0, qTimer;
  qDots.innerHTML = QUOTES.map((_, i) => `<button aria-label="Quote ${i + 1}" data-i="${i}"></button>`).join("");
  function showQuote(i) {
    qi = (i + QUOTES.length) % QUOTES.length;
    qText.classList.add("out");
    setTimeout(() => {
      qText.textContent = QUOTES[qi].text;
      qText.lang = QUOTES[qi].lang;
      qText.classList.remove("out"); qText.classList.add("in");
      void qText.offsetWidth;
      qText.classList.remove("in");
    }, 450);
    $$("button", qDots).forEach((b, k) => b.classList.toggle("active", k === qi));
  }
  const startQuotes = () => { clearInterval(qTimer); qTimer = setInterval(() => showQuote(qi + 1), 4500); };
  qDots.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) { showQuote(+b.dataset.i); startQuotes(); } });
  qText.textContent = QUOTES[0].text;
  $$("button", qDots)[0].classList.add("active");
  startQuotes();

  /* ---------- Falling sprinkles ---------- */
  const cv = $("#sprinkles");
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const ctx = cv.getContext("2d");
    const colors = ["#F4A6BE", "#F7C948", "#C8742B", "#7B1E34", "#8BAA3C", "#FFFFFF"];
    let W, H, bits = [];
    const resize = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
    resize(); addEventListener("resize", resize);
    const n = innerWidth < 600 ? 22 : 40;
    for (let i = 0; i < n; i++) bits.push({
      x: Math.random() * innerWidth, y: Math.random() * innerHeight, l: 6 + Math.random() * 7,
      a: Math.random() * 6.28, va: (Math.random() - .5) * .04, vy: .3 + Math.random() * .6,
      c: colors[i % colors.length], o: .35 + Math.random() * .4,
    });
    (function tick() {
      ctx.clearRect(0, 0, W, H);
      bits.forEach((s) => {
        s.y += s.vy; s.a += s.va;
        if (s.y > H + 10) { s.y = -10; s.x = Math.random() * W; }
        ctx.save(); ctx.translate(s.x, s.y); ctx.rotate(s.a);
        ctx.globalAlpha = s.o; ctx.fillStyle = s.c;
        ctx.beginPath(); ctx.roundRect(-s.l / 2, -1.8, s.l, 3.6, 2); ctx.fill();
        ctx.restore();
      });
      requestAnimationFrame(tick);
    })();
  }

  renderMenu();
  update();
})();
