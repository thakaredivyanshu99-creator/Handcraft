// Drawn SVG illustrations for each menu item. They are shown until a real photo
// with the item's `img` file name is added to the images/ folder.

(function () {
  function rng(seed) {
    let s = 0;
    for (let i = 0; i < seed.length; i++) s = (s * 31 + seed.charCodeAt(i)) >>> 0;
    return function () {
      s = (s + 0x6D2B79F5) >>> 0;
      let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    const c = (v) => Math.max(0, Math.min(255, v + amt));
    const r = c(n >> 16), g = c((n >> 8) & 255), b = c(n & 255);
    return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  }

  const BG = `
    <defs>
      <radialGradient id="bg" cx="50%" cy="40%" r="75%"><stop offset="0" stop-color="#FFF6E6"/><stop offset="1" stop-color="#EBCB9A"/></radialGradient>
      <radialGradient id="plate" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#E9D9BE"/></radialGradient>
      <filter id="sh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#3E1F14" flood-opacity=".35"/></filter>
    </defs>
    <rect width="200" height="200" fill="url(#bg)"/>`;

  function plate() {
    return `<ellipse cx="100" cy="112" rx="84" ry="74" fill="url(#plate)" filter="url(#sh)"/>
            <ellipse cx="100" cy="110" rx="68" ry="58" fill="none" stroke="#D9C4A0" stroke-width="2" opacity=".7"/>`;
  }

  function piece(a, r) {
    const spots = [[62, 80], [118, 74], [74, 132], [128, 128]];
    let out = plate();
    spots.forEach(([x, y], i) => {
      const rot = (r() - .5) * 26;
      out += `<g transform="translate(${x} ${y}) rotate(${rot})" filter="url(#sh)">
        <rect x="-26" y="-24" width="52" height="48" rx="8" fill="${a.body}"/>
        <rect x="-26" y="-24" width="52" height="48" rx="8" fill="none" stroke="${shade(a.body, 40)}" stroke-width="2" opacity=".6"/>
        <path d="M-20 -17 H12" stroke="#fff" stroke-opacity=".28" stroke-width="4" stroke-linecap="round"/>`;
      if (a.drizzle) {
        for (let k = -14; k <= 14; k += 14) out += `<path d="M${k - 8} -22 Q${k} 0 ${k + 8} 22" stroke="${a.drizzle}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
      }
      const n = a.bits.length ? 6 : 0;
      for (let k = 0; k < n; k++) {
        const bx = (r() - .5) * 38, by = (r() - .5) * 32;
        const col = a.bits[(k + i) % a.bits.length];
        if (a.big) out += `<ellipse cx="${bx}" cy="${by}" rx="6" ry="7.5" fill="${col}" stroke="#4f6a1e" stroke-width="1.5"/><circle cx="${bx}" cy="${by}" r="2.2" fill="#c0392b"/>`;
        else out += `<rect x="${bx - 3}" y="${by - 3}" width="${5 + r() * 4}" height="${4 + r() * 3}" rx="2" fill="${col}" transform="rotate(${r() * 90} ${bx} ${by})"/>`;
      }
      out += `</g>`;
    });
    return out;
  }

  function bar(a, r) {
    let out = `<ellipse cx="100" cy="150" rx="80" ry="16" fill="#3E1F14" opacity=".18"/>
      <g transform="rotate(-8 100 100)" filter="url(#sh)">
        <rect x="26" y="52" width="148" height="96" rx="10" fill="${a.body}"/>`;
    for (let i = 1; i < 4; i++) out += `<line x1="${26 + i * 37}" y1="52" x2="${26 + i * 37}" y2="148" stroke="${shade(a.body, -25)}" stroke-width="3"/>`;
    for (let j = 1; j < 3; j++) out += `<line x1="26" y1="${52 + j * 32}" x2="174" y2="${52 + j * 32}" stroke="${shade(a.body, -25)}" stroke-width="3"/>`;
    out += `<rect x="26" y="52" width="148" height="96" rx="10" fill="none" stroke="${shade(a.body, 45)}" stroke-width="2.5" opacity=".6"/>`;
    for (let k = 0; k < 34; k++) {
      const x = 34 + r() * 132, y = 60 + r() * 80, col = a.bits[k % a.bits.length];
      out += `<rect x="${x}" y="${y}" width="${5 + r() * 6}" height="${4 + r() * 4}" rx="2" fill="${col}" transform="rotate(${r() * 180} ${x} ${y})"/>`;
    }
    return out + `</g>`;
  }

  function cookie(a, r) {
    const spots = [[70, 82, 40], [128, 88, 38], [98, 136, 42]];
    let out = plate();
    spots.forEach(([x, y, rad], i) => {
      out += `<g filter="url(#sh)"><circle cx="${x}" cy="${y}" r="${rad}" fill="${a.body}"/>
        <circle cx="${x}" cy="${y}" r="${rad}" fill="none" stroke="${shade(a.body, -30)}" stroke-width="3" opacity=".5"/>
        <path d="M${x - rad * .6} ${y - rad * .5} Q${x} ${y - rad * .9} ${x + rad * .5} ${y - rad * .6}" stroke="#fff" stroke-opacity=".25" stroke-width="4" fill="none" stroke-linecap="round"/>`;
      if (a.bits.length === 3 && a.body === "#E9B65C") {
        out += `<circle cx="${x}" cy="${y}" r="9" fill="${a.bits[0]}"/><circle cx="${x - 3}" cy="${y - 3}" r="3" fill="#fff" opacity=".5"/>`;
        out += `<path d="M${x - 16} ${y + 8} q8 -10 14 0 M${x + 4} ${y - 14} q6 6 12 0" stroke="${a.bits[1]}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
      } else {
        for (let k = 0; k < 14; k++) {
          const ang = r() * 6.283, d = Math.sqrt(r()) * (rad - 8);
          const bx = x + Math.cos(ang) * d, by = y + Math.sin(ang) * d;
          out += `<rect x="${bx - 2.5}" y="${by - 2.5}" width="${4 + r() * 4}" height="${3 + r() * 3}" rx="1.5" fill="${a.bits[(k + i) % a.bits.length]}" transform="rotate(${r() * 180} ${bx} ${by})"/>`;
        }
      }
      out += `</g>`;
    });
    return out;
  }

  function swirl(a) {
    const spots = [[68, 84], [130, 88], [98, 138]];
    let out = plate();
    spots.forEach(([x, y]) => {
      out += `<g filter="url(#sh)"><circle cx="${x}" cy="${y}" r="36" fill="${a.body}"/>
        <circle cx="${x}" cy="${y}" r="36" fill="none" stroke="${shade(a.body, -35)}" stroke-width="3" opacity=".55"/>`;
      for (let i = 0; i < 8; i++) {
        const ang = (i / 8) * 6.283;
        out += `<path d="M${x} ${y} Q${x + Math.cos(ang + .6) * 26} ${y + Math.sin(ang + .6) * 26} ${x + Math.cos(ang) * 30} ${y + Math.sin(ang) * 30}" stroke="${shade(a.body, -38)}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>`;
      }
      out += `<circle cx="${x}" cy="${y}" r="7" fill="${shade(a.body, 22)}"/></g>`;
    });
    return out;
  }

  function cupcake(a, r) {
    let out = `<ellipse cx="100" cy="176" rx="60" ry="9" fill="#3E1F14" opacity=".2"/><g filter="url(#sh)">`;
    out += `<path d="M52 108 L64 172 Q100 182 136 172 L148 108 Z" fill="${a.liner}"/>`;
    for (let i = 0; i < 7; i++) out += `<path d="M${58 + i * 14} 110 L${68 + i * 10} 174" stroke="${shade(a.liner, -28)}" stroke-width="3" opacity=".55"/>`;
    out += `<ellipse cx="100" cy="108" rx="50" ry="12" fill="${shade(a.frost, -20)}"/>`;
    out += `<ellipse cx="100" cy="100" rx="48" ry="22" fill="${a.frost}"/>
            <ellipse cx="100" cy="78" rx="36" ry="18" fill="${shade(a.frost, 8)}"/>
            <ellipse cx="100" cy="58" rx="22" ry="13" fill="${shade(a.frost, 16)}"/>
            <path d="M82 66 Q100 50 118 66" stroke="#fff" stroke-opacity=".3" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    if (a.topping === "chips") {
      for (let k = 0; k < 7; k++) { const x = 66 + r() * 68, y = 70 + r() * 36; out += `<rect x="${x}" y="${y}" width="9" height="7" rx="1.5" fill="#241008" transform="rotate(${r() * 90} ${x} ${y})"/>`; }
    } else if (a.topping === "pineapple") {
      out += `<path d="M86 46 L100 28 L114 46 Z" fill="#F7C948"/><path d="M92 46 L100 36 L108 46 Z" fill="#FFE082"/>
              <circle cx="100" cy="30" r="6" fill="#C0392B"/><circle cx="98" cy="28" r="2" fill="#fff" opacity=".6"/>`;
      for (let k = 0; k < 5; k++) out += `<circle cx="${70 + k * 15}" cy="${86 + (k % 2) * 8}" r="3.5" fill="#E8D8A0" stroke="#C9B26B"/>`;
    } else {
      out += `<circle cx="112" cy="46" r="8" fill="#E53935"/><path d="M98 48 l10 -10 l8 10 z" fill="#FB8C00"/><circle cx="88" cy="50" r="7" fill="#8BC34A" stroke="#33691E" stroke-width="2"/>
              <circle cx="88" cy="50" r="2.5" fill="#33691E"/><circle cx="76" cy="84" r="5" fill="#7B1FA2"/><circle cx="124" cy="88" r="5" fill="#E53935"/>
              <circle cx="100" cy="96" r="3" fill="#C0C0C0"/><circle cx="84" cy="100" r="3" fill="#C0C0C0"/><circle cx="116" cy="102" r="3" fill="#C0C0C0"/>`;
    }
    return out + `</g>`;
  }

  window.renderArt = function (item) {
    const a = item.art, r = rng(item.id);
    let body = "";
    if (a.kind === "piece") body = piece(a, r);
    else if (a.kind === "bar") body = bar(a, r);
    else if (a.kind === "cookie") body = cookie(a, r);
    else if (a.kind === "swirl") body = swirl(a);
    else if (a.kind === "cupcake") body = cupcake(a, r);
    return `<svg viewBox="0 0 200 200" role="img" aria-label="${item.name}" preserveAspectRatio="xMidYMid slice">${BG}${body}</svg>`;
  };
})();
