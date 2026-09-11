/* ============================================================
   STARS SMP — APPLICATION
   ============================================================ */
(function(){
  "use strict";

  /* ---------- Helpers ---------- */
  const $ = (sel, ctx) => (ctx||document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx||document).querySelectorAll(sel));
  const el = (tag, attrs, html) => {
    const e = document.createElement(tag);
    if(attrs) for(const k in attrs){
      if(k === "class") e.className = attrs[k];
      else if(k === "html") e.innerHTML = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
    if(html !== undefined) e.innerHTML = html;
    return e;
  };

  /* ============================================================
     HEADER / MOBILE NAV
     ============================================================ */
  const hamburger = $("#hamburger");
  const mobileNav = $("#mobileNav");
  hamburger.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    hamburger.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  $$("#mobileNav a").forEach(a => a.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  }));

  /* Discord links */
  $$("#discordBtnHeader, #discordBtnMobile, #discordBtnJoin").forEach(b => {
    b.href = SERVER_INFO.discord;
  });

  /* Header background intensifies on scroll */
  const header = $(".site-header");
  window.addEventListener("scroll", () => {
    header.style.background = window.scrollY > 40
      ? "rgba(5,6,15,0.88)"
      : "rgba(5,6,15,0.55)";
  }, { passive:true });

  /* ============================================================
     SCROLL REVEAL
     ============================================================ */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  function observeReveals(){
    $$(".reveal:not(.in)").forEach(node => revealObserver.observe(node));
  }

  /* ============================================================
     HERO CONSTELLATION (signature motif)
     ============================================================ */
  function buildHeroConstellation(){
    const host = $("#heroConstellation");
    const cx = 200, cy = 200, r = 150;
    const n = ELEMENTS.length;
    const points = ELEMENTS.map((elt, i) => {
      const angle = (Math.PI * 2 * i / n) - Math.PI/2;
      return {
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
        elt
      };
    });

    let lines = "";
    points.forEach((p, i) => {
      const next = points[(i+1) % n];
      lines += `<line class="cosmic-line" x1="${p.x}" y1="${p.y}" x2="${next.x}" y2="${next.y}" stroke-dasharray="2 4" opacity="0.35"/>`;
      lines += `<line x1="${p.x}" y1="${p.y}" x2="${cx}" y2="${cy}" stroke="rgba(245,242,232,0.06)" stroke-width="1"/>`;
    });

    let nodes = "";
    points.forEach((p, i) => {
      nodes += `
        <g>
          <circle cx="${p.x}" cy="${p.y}" r="16" fill="${p.elt.color}" opacity="0.14">
            <animate attributeName="opacity" values="0.10;0.28;0.10" dur="${3.5 + i*0.3}s" repeatCount="indefinite"/>
          </circle>
          <circle cx="${p.x}" cy="${p.y}" r="4.5" fill="${p.elt.color}"/>
          <text x="${p.x}" y="${p.y + 26 * Math.sign(p.y-cy || 1)}" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="9" fill="rgba(245,242,232,0.55)" letter-spacing="1">${p.elt.symbol}</text>
        </g>`;
    });

    host.innerHTML = `
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        ${lines}
        <circle cx="${cx}" cy="${cy}" r="46" fill="none" stroke="rgba(212,175,106,0.4)" stroke-width="1"/>
        <path d="M${cx} ${cy-22} L${cx+7} ${cy-7} L${cx+22} ${cy} L${cx+7} ${cy+7} L${cx} ${cy+22} L${cx-7} ${cy+7} L${cx-22} ${cy} L${cx-7} ${cy-7} Z"
              fill="none" stroke="#d4af6a" stroke-width="1"/>
        <circle cx="${cx}" cy="${cy}" r="3" fill="#ff4fa3">
          <animate attributeName="r" values="2.5;4;2.5" dur="2.6s" repeatCount="indefinite"/>
        </circle>
        ${nodes}
      </svg>`;
  }

  /* ============================================================
     ELEMENT ROWS (Pouvoirs)
     ============================================================ */
  function buildElementRows(){
    const host = $("#elementRows");
    host.innerHTML = "";
    ELEMENTS.forEach(e => {
      const row = el("div", { class:"element-row reveal", style:`--el-color:${e.color}` });
      row.innerHTML = `
        <div class="element-symbol" style="--el-color:${e.color}">${e.symbol}</div>
        <div class="element-main">
          <h3>${e.name}</h3>
          <p class="element-dimension">${e.dimension}</p>
          <p class="element-desc">${e.description}</p>
          <p class="element-theme">${e.theme}</p>
          <ul class="capacities-list">
            ${e.capacities.map(c => `<li>${c}</li>`).join("")}
          </ul>
        </div>
        <div class="element-side">
          <div class="access-compare">
            <div class="access-block is-public">
              <span class="access-label">PUBLIC</span>
              <div class="access-flow">Craft du pouvoir</div>
            </div>
            <div class="access-block is-private">
              <span class="access-label">PRIVATE</span>
              <div class="access-flow">Rune → ${e.dimension} → Boss → Drop ${e.name}</div>
            </div>
          </div>
          <div class="craft-slot">${e.craftPlaceholder}<br>Recette à ajouter</div>
        </div>
      `;
      host.appendChild(row);
    });
  }

  /* ============================================================
     DIMENSIONS — grid + detail panel + cosmic map
     ============================================================ */
  function buildDimensions(){
    const grid = $("#dimGrid");
    grid.innerHTML = "";
    ELEMENTS.forEach(e => {
      const card = el("button", {
        class:"dim-card reveal",
        style:`--el-color:${e.color}`,
        "data-id": e.id,
        type:"button"
      });
      card.innerHTML = `
        <span class="dim-symbol">${e.symbol}</span>
        <p class="dim-name">${e.dimension}</p>
        <p class="dim-element">${e.name}</p>
      `;
      card.addEventListener("click", () => openDimDetail(e.id));
      grid.appendChild(card);
    });

    $("#dimDetailClose").addEventListener("click", closeDimDetail);

    buildCosmicMap();
  }

  function openDimDetail(id){
    const e = ELEMENTS.find(x => x.id === id);
    if(!e) return;
    const panel = $("#dimDetail");
    $("#dimDetailTitle").textContent = e.dimension;
    $("#dimDetailTitle").style.color = e.color;
    $("#dimDetailBody").innerHTML = `
      <div>
        <div class="dim-detail-fact"><span class="fact-label">ÉLÉMENT</span><span class="fact-value">${e.symbol} ${e.name}</span></div>
        <div class="dim-detail-fact"><span class="fact-label">DESCRIPTION</span><span class="fact-value">${e.description}</span></div>
        <div class="dim-detail-fact"><span class="fact-label">AMBIANCE</span><span class="fact-value">${e.theme}</span></div>
      </div>
      <div>
        <div class="dim-detail-fact"><span class="fact-label">GARDIEN</span><span class="fact-value">${e.boss.name}</span></div>
        <div class="dim-detail-fact"><span class="fact-label">RUNE NÉCESSAIRE</span><span class="fact-value">Rune ${e.name}</span></div>
        <div class="dim-detail-fact"><span class="fact-label">RÉCOMPENSE</span><span class="fact-value">Pouvoir ${e.name}</span></div>
      </div>
    `;
    panel.classList.add("open");
    panel.scrollIntoView({ behavior:"smooth", block:"center" });
  }
  function closeDimDetail(){
    $("#dimDetail").classList.remove("open");
  }

  function buildCosmicMap(){
    const host = $("#cosmicMap");
    const w = 700, h = 460, cx = w/2, cy = h/2, r = 170;
    const n = ELEMENTS.length;
    const pts = ELEMENTS.map((e,i) => {
      const angle = (Math.PI*2*i/n) - Math.PI/2;
      return { x: cx + r*Math.cos(angle), y: cy + r*Math.sin(angle), e };
    });

    let lines = "";
    pts.forEach((p,i) => {
      const next = pts[(i+1)%n];
      lines += `<line class="cosmic-line" x1="${p.x}" y1="${p.y}" x2="${next.x}" y2="${next.y}"/>`;
    });

    let nodes = "";
    pts.forEach(p => {
      nodes += `
        <g class="cosmic-node" data-id="${p.e.id}" tabindex="0" role="button" aria-label="${p.e.dimension}">
          <circle cx="${p.x}" cy="${p.y}" r="22" fill="${p.e.color}" opacity="0.12"/>
          <circle cx="${p.x}" cy="${p.y}" r="7" fill="${p.e.color}"/>
          <text x="${p.x}" y="${p.y + 34}" text-anchor="middle">${p.e.dimension}</text>
        </g>`;
    });

    host.innerHTML = `
      <svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
        ${lines}
        <circle cx="${cx}" cy="${cy}" r="4" fill="#ff4fa3"/>
        ${nodes}
      </svg>`;

    $$(".cosmic-node", host).forEach(node => {
      const id = node.getAttribute("data-id");
      node.addEventListener("click", () => openDimDetail(id));
      node.addEventListener("keydown", (ev) => {
        if(ev.key === "Enter" || ev.key === " "){ ev.preventDefault(); openDimDetail(id); }
      });
    });
  }

  /* ============================================================
     BOSS ENTRIES
     ============================================================ */
  function buildBossList(){
    const host = $("#bossList");
    host.innerHTML = "";
    ELEMENTS.forEach(e => {
      const b = e.boss;
      const entry = el("div", { class:"boss-entry reveal", style:`--el-color:${e.color}` });
      entry.innerHTML = `
        <div class="boss-visual">
          <div class="boss-glyph">${e.symbol}</div>
        </div>
        <div class="boss-info">
          <p class="boss-kicker">${e.dimension} — GARDIEN</p>
          <h3 class="boss-name">${b.title}</h3>
          <p class="boss-story">${b.story}</p>
          <div class="boss-meta">
            <div><span class="m-label">ÉLÉMENT</span><span class="m-value">${e.symbol} ${e.name}</span></div>
            <div><span class="m-label">DIFFICULTÉ</span><span class="m-value">${b.difficulty}</span></div>
            <div><span class="m-label">PHASES DE COMBAT</span><span class="m-value">${b.phases}</span></div>
            <div><span class="m-label">ARÈNE</span><span class="m-value">${b.arena}</span></div>
          </div>
          <ul class="boss-abilities">
            ${b.abilities.map(a => `<li>${a}</li>`).join("")}
          </ul>
          <div class="drop-banner">DROP : POUVOIR ${e.name}</div>
        </div>
      `;
      host.appendChild(entry);
    });
  }

  /* ============================================================
     PRIVATE PROGRESSION STEPS
     ============================================================ */
  function buildPrivateSteps(){
    const host = $("#privateSteps");
    host.innerHTML = "";
    PRIVATE_STEPS.forEach((s, i) => {
      const row = el("div", { class:"step-row" });
      row.innerHTML = `
        <div class="step-num">${String(i+1).padStart(2,"0")}</div>
        <div>
          <div class="step-label">${s.label}</div>
          <div class="step-desc">${s.desc}</div>
        </div>
      `;
      host.appendChild(row);
    });
  }

  /* ============================================================
     LORE
     ============================================================ */
  function buildLore(){
    const host = $("#loreBody");
    host.innerHTML = LORE_INTRO.paragraphs.map(p => `<p>${p}</p>`).join("");
  }

  /* ============================================================
     JOIN SECTION — IP copy
     ============================================================ */
  function setupJoin(){
    $("#serverIp").textContent = SERVER_INFO.ip;
    $("#serverVersion").textContent = "Version Minecraft : " + SERVER_INFO.version;

    const copyBtn = $("#copyIpBtn");
    const toast = $("#toast");
    copyBtn.addEventListener("click", async () => {
      try{
        await navigator.clipboard.writeText(SERVER_INFO.ip);
      }catch(err){
        /* clipboard may be unavailable; fail silently, still show feedback */
      }
      copyBtn.textContent = "Copié !";
      copyBtn.classList.add("copied");
      toast.classList.add("show");
      setTimeout(() => {
        copyBtn.textContent = "Copier l'IP";
        copyBtn.classList.remove("copied");
        toast.classList.remove("show");
      }, 1800);
    });
  }

  /* ============================================================
     INIT
     ============================================================ */
  function init(){
    buildHeroConstellation();
    buildElementRows();
    buildDimensions();
    buildBossList();
    buildPrivateSteps();
    buildLore();
    setupJoin();
    observeReveals();
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
