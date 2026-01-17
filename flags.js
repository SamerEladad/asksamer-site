(() => {
  const FLAGS = [
    "🇪🇬","🇸🇦","🇦🇪","🇯🇴","🇵🇸","🇱🇧","🇸🇾","🇮🇶","🇩🇪","🇰🇼",
    "🇶🇦","🇧🇭","🇴🇲","🇾🇪","🇲🇦","🇩🇿","🇹🇳","🇱🇾","🇸🇩","🇲🇷",
    "🇸🇴","🇩🇯","🇰🇲"
  ];

  function makeColumnHTML(startIndex, lines) {
    const out = [];
    for (let i = 0; i < lines; i++) {
      out.push(FLAGS[(startIndex + i) % FLAGS.length]);
    }
    // Duplicate content to allow seamless scroll
    return out.join("<br>") + "<br>" + out.join("<br>") + "<br>";
  }

  function getColumnCount() {
    const w = window.innerWidth;
    if (w >= 1440) return 16;
    if (w >= 1200) return 14;
    if (w >= 1024) return 12;
    if (w >= 768) return 10;
    return 8; // mobile stays visually similar
  }

  function renderFlags() {
    // Remove existing if re-rendering (e.g., resize)
    const existing = document.querySelector(".flag-bg");
    if (existing) existing.remove();

    const bg = document.createElement("div");
    bg.className = "flag-bg";
    bg.setAttribute("aria-hidden", "true");

    const columns = getColumnCount();
    const linesPerColumn = 22;

    for (let c = 0; c < columns; c++) {
      const col = document.createElement("div");
      col.className = "flag-column " + (c % 2 === 0 ? "up" : "down");
      col.innerHTML = makeColumnHTML(c, linesPerColumn);
      bg.appendChild(col);
    }

    document.body.prepend(bg);
  }

  // Initial render
  renderFlags();

  // Re-render on resize (debounced)
  let t = null;
  window.addEventListener("resize", () => {
    clearTimeout(t);
    t = setTimeout(renderFlags, 150);
  });
})();