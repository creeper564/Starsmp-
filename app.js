(function(){
"use strict";
const $=(s,c)=>(c||document).querySelector(s), $$=(s,c)=>[...(c||document).querySelectorAll(s)];
const root=document.documentElement;
let mode="public", curEl=ELEMENTS[0].id, curDim=null;

/* ----- Rendu dépendant du mode ----- */
function renderTabs(){
  $("#elTabs").innerHTML=ELEMENTS.map(e=>`<button class="tab" role="tab" style="--el:${e.color}" data-id="${e.id}" aria-selected="${e.id===curEl}">${e.symbol} ${e.name}</button>`).join("");
  $$("#elTabs .tab").forEach(b=>b.onclick=()=>{curEl=b.dataset.id;renderTabs();renderElement();});
}
function renderElement(){
  const e=ELEMENTS.find(x=>x.id===curEl), p=$("#elPanel");
  p.style.setProperty("--el",e.color);
  const side=mode==="public"
    ? `<div class="slot">${e.craftImage?`<img src="${e.craftImage}" alt="Recette ${e.name}">`:`${e.craftPlaceholder}<br>Recette à ajouter`}</div>`
    : `<div class="path"><span>Rune ${e.name}</span><span>Dimension ${e.dimension}</span><span>Gardien : ${e.boss.name}</span><span>Drop : pouvoir ${e.name}</span></div>`;
  p.innerHTML=`<div><h3>${e.symbol} ${e.name}</h3>
    ${mode==="private"?`<p class="dimname">${e.dimension}</p>`:""}
    <p>${e.description}</p><ul class="chips">${e.capacities.map(c=>`<li>${c}</li>`).join("")}</ul></div>${side}`;
}
function renderDims(){
  $("#dimGrid").innerHTML=ELEMENTS.map(e=>`<button class="dim" style="--el:${e.color}" data-id="${e.id}" aria-expanded="${e.id===curDim}"><b>${e.dimension}</b><small>${e.symbol} ${e.name}</small></button>`).join("");
  $$("#dimGrid .dim").forEach(b=>b.onclick=()=>{curDim=curDim===b.dataset.id?null:b.dataset.id;renderDims();renderDimPanel();});
}
function renderDimPanel(){
  const p=$("#dimPanel"), e=ELEMENTS.find(x=>x.id===curDim);
  p.hidden=!e; if(!e) return;
  const b=e.boss; p.style.setProperty("--el",e.color);
  p.innerHTML=`<div><h3>${b.title}</h3><p class="dimname">${e.dimension}</p><p>${b.story}</p>
    <ul class="chips">${b.abilities.map(a=>`<li>${a}</li>`).join("")}</ul></div>
    <div class="meta"><div><small>Difficulté</small>${b.difficulty}</div><div><small>Phases</small>${b.phases}</div>
    <div style="grid-column:1/-1"><small>Arène</small>${b.arena}</div><div style="grid-column:1/-1"><small>Récompense</small>Pouvoir ${e.name}</div></div>`;
}
function renderSteps(){
  const list=mode==="public"?PUBLIC_STEPS:PRIVATE_STEPS;
  $("#steps").innerHTML=list.map(s=>`<li><div><b>${s.label}</b><span>${s.desc}</span></div></li>`).join("");
}
function renderAll(){renderTabs();renderElement();renderDims();renderDimPanel();renderSteps();}

/* ----- Bascule Public / Privé ----- */
function setMode(m,animate){
  if(m===mode&&animate) return;
  const apply=()=>{
    mode=m; root.dataset.mode=m;
    $$(".switch button").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.set===m)));
    renderAll();
    try{localStorage.setItem("stars-mode",m);}catch(_){}
    history.replaceState(null,"",(m==="private"?"?mode=private":location.pathname)+location.hash);
  };
  if(!animate){apply();return;}
  const w=$("#wipe"); w.classList.add("on");
  setTimeout(()=>{apply();window.scrollTo({top:0});w.classList.remove("on");},300);
}
$$(".switch button").forEach(b=>b.onclick=()=>setMode(b.dataset.set,true));

/* ----- IP, Discord, statut ----- */
const ipOk=SERVER_INFO.ip&&!SERVER_INFO.ip.startsWith("[");
$("#ip").textContent=SERVER_INFO.ip; $("#ver").textContent="Version Minecraft : "+SERVER_INFO.version;
$("#discord").href=SERVER_INFO.discord;
$$("[data-copy]").forEach(b=>b.onclick=async()=>{
  try{await navigator.clipboard.writeText(SERVER_INFO.ip);}catch(_){}
  const t=$("#toast"); t.classList.add("show"); setTimeout(()=>t.classList.remove("show"),1700);
});
if(ipOk){
  fetch("https://api.mcsrvstat.us/3/"+encodeURIComponent(SERVER_INFO.ip)).then(r=>r.json()).then(d=>{
    if(!d.online) return;
    const s=$("#status"); s.classList.add("live");
    s.querySelectorAll("span").forEach(x=>x.remove());
    s.insertAdjacentHTML("beforeend",`<span>En ligne · ${d.players.online}/${d.players.max} joueurs</span>`);
  }).catch(()=>{});
}

/* ----- Lore ----- */
$("#lore").innerHTML=LORE_INTRO.paragraphs.map(p=>`<p>${p}</p>`).join("");

/* ----- Init : ?mode=private > préférence enregistrée > public ----- */
let start="public";
try{start=new URLSearchParams(location.search).get("mode")||localStorage.getItem("stars-mode")||"public";}catch(_){}
setMode(start==="private"?"private":"public",false);
})();
