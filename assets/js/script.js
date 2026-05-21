  const products = [
    { id:1,  name:"Obsidian Chronograph",   cat:"Watches",     emoji:"⌚", price:429, desc:"Swiss movement with sapphire crystal glass and 100m water resistance." },
    { id:2,  name:"Silk Lounge Chair",       cat:"Furniture",   emoji:"🪑", price:899, badge:null,  desc:"Mid-century silhouette in hand-stitched Italian silk upholstery." },
    { id:3,  name:"Matte Noir Sunglasses",   cat:"Eyewear",     emoji:"🕶️", price:185,  desc:"Polarised UV400 lenses in a lightweight titanium frame." },
    { id:4,  name:"Marble Desk Set",         cat:"Stationery",  emoji:"🪨", price:120, badge:null,  desc:"Hand-carved Carrara marble pen holder, tray, and letter opener set." },
    { id:5,  name:"Cedarwood Cologne",       cat:"Fragrance",   emoji:"🌿", price:210, badge:null,  desc:"Warm base of cedarwood and amber with bergamot top notes." },
    { id:6,  name:"Leather Tote Bag",        cat:"Bags",        emoji:"👜", price:340,  desc:"Full-grain vegetable-tanned leather with brass hardware." },
    { id:7,  name:"Ember Pour-Over Set",     cat:"Kitchen",     emoji:"☕", price:95,  badge:null,  desc:"Borosilicate glass dripper with walnut handle and filters." },
    { id:8,  name:"Arc Floor Lamp",          cat:"Furniture",   emoji:"💡", price:560, badge:null,  desc:"Brushed brass arc with a pleated ivory linen shade." },
    { id:9,  name:"Cashmere Throw",          cat:"Textiles",    emoji:"🧣", price:275,  desc:"100% Mongolian cashmere in 12 seasonal colourways." },
    { id:10, name:"Porcelain Tea Set",       cat:"Kitchen",     emoji:"🍵", price:150, badge:null,  desc:"Minimalist glaze with a six-cup set and matching teapot." },
    { id:11, name:"Gold Bangle Stack",       cat:"Jewellery",   emoji:"💛", price:320,  desc:"Three 18k gold-plated bangles designed to layer." },
    { id:12, name:"Woven Wall Art",          cat:"Decor",       emoji:"🎨", price:195, badge:null,  desc:"Handwoven merino wool tapestry with earthy geometric motifs." },
    { id:13, name:"Pilot Fountain Pen",      cat:"Stationery",  emoji:"🖊️", price:89,  badge:null,  desc:"Fine nib, ebonite feed, and a barrel of black resin." },
    { id:14, name:"Denim Field Jacket",      cat:"Apparel",     emoji:"🧥", price:260,  desc:"Selvedge denim with a relaxed fit and reinforced seams." },
    { id:15, name:"Cedar Shoe Trees",        cat:"Accessories", emoji:"🌲", price:55,  badge:null,  desc:"Hand-carved aromatic cedarwood to maintain shoe shape." },
    { id:16, name:"Tortoise Reading Glasses",cat:"Eyewear",     emoji:"👓", price:140, badge:null,  desc:"Acetate frames with blue-light filtering lenses." },
  ];

  const categories = ["All", ...new Set(products.map(p => p.cat))];
  let activeCategory = "All";

  const filterBar = document.getElementById("filterBar");
  categories.forEach(cat => {
    const pill = document.createElement("button");
    pill.className = "pill" + (cat === "All" ? " active" : "");
    pill.textContent = cat;
    pill.addEventListener("click", () => {
      activeCategory = cat;
      document.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      render();
    });
    filterBar.appendChild(pill);
  });

  document.getElementById("searchInput").addEventListener("input", render);

  function render() {
    const query = document.getElementById("searchInput").value.toLowerCase().trim();
    const filtered = products.filter(p => {
      const matchCat = activeCategory === "All" || p.cat === activeCategory;
      const matchQ   = !query || p.name.toLowerCase().includes(query) || p.cat.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query);
      return matchCat && matchQ;
    });

    document.getElementById("countNum").textContent = filtered.length;

    const grid  = document.getElementById("grid");
    const empty = document.getElementById("empty");
    grid.innerHTML = "";

    if (filtered.length === 0) {
      grid.style.display = "none";
      empty.style.display = "flex";
      return;
    }

    grid.style.display = "grid";
    empty.style.display = "none";

    const colors = ["#1e1a14","#131a1e","#1a1318","#14191a","#1a1a14","#1e1518"];
    filtered.forEach((p, i) => {
      const card = document.createElement("div");
      card.className = "card";
      card.style.animationDelay = `${i * 50}ms`;
      card.innerHTML = `
        <div class="card-img" style="background:${colors[i % colors.length]}">
          ${p.badge ? `<div class="badge">${p.badge}</div>` : ""}
          <span style="z-index:1">${p.emoji}</span>
        </div>
        <div class="card-body">
          <div class="card-cat">${p.cat}</div>
          <div class="card-name">${p.name}</div>
          <div class="card-desc">${p.desc}</div>
        </div>
        <div class="card-foot">
          <div class="price">$${p.price}</div>
          <button class="btn-add" onclick="addToCart(this)">Add to Cart</button>
        </div>`;
      grid.appendChild(card);
    });
  }

  function addToCart(btn) {
    const orig = btn.textContent;
    btn.textContent = "✓ Added";
    btn.style.background = "#4caf82";
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = "";
    }, 1500);
  }

  render();