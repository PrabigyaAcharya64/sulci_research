/* Slide annotations for reveal.js decks: pen, highlighter, stroke eraser, laser,
 * undo/redo, per-slide persistence (localStorage) and JSON export/import.
 *
 * Usage (after Reveal.initialize):  installAnnotations(Reveal);
 * Load this file BEFORE Reveal.initialize so stable slide ids can be read from
 * data-markdown before the markdown plugin clears that attribute.
 *
 * The toolbar is fixed at the left edge of the screen and always visible
 * (hidden only in the slide overview).
 *
 * Strokes are stored in slide coordinates (config width × height, e.g. 1280 × 720),
 * so they stay aligned at any window size, in fullscreen and on any resolution.
 *
 * Keys (ignored while typing in a field):
 *   D pen · I highlighter · E eraser · R laser · M or Esc pointer
 *   Ctrl/Cmd+Z undo · Ctrl/Cmd+Shift+Z or Ctrl+Y redo
 */
(function () {
  'use strict';

  const NS = 'http://www.w3.org/2000/svg';
  const COLORS = [
    { name: 'Red', value: '#DC2626' }, { name: 'Blue', value: '#1D4ED8' },
    { name: 'Green', value: '#16A34A' }, { name: 'Yellow', value: '#FACC15' },
    { name: 'Black', value: '#1A1A1A' }, { name: 'White', value: '#FFFFFF' }
  ];
  const WIDTH_RANGE = { pen: [1, 24], highlighter: [8, 60] };
  const ERASER_RADIUS = 12;            // slide units

  // ------------------------------------------------------------------ stable slide ids
  // Runs at load time, before the markdown plugin empties data-markdown.
  function slug(text) {
    return String(text).toLowerCase().replace(/\.[a-z]+$/, '').replace(/^.*\//, '')
      .replace(/^\d+[-_ ]*/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }
  function stampSlideIds(root) {
    const used = new Set();
    (root || document).querySelectorAll('.reveal .slides section').forEach((s, i) => {
      if (s.dataset.annotationId) { used.add(s.dataset.annotationId); return; }
      const src = s.getAttribute('data-markdown') || s.id || '';
      let id = src ? slug(src) : '';
      if (!id) return;                  // filled in later from the heading or index
      let unique = id, k = 2;
      while (used.has(unique)) unique = id + '-' + k++;
      used.add(unique);
      s.dataset.annotationId = unique;
    });
  }
  stampSlideIds();

  // ------------------------------------------------------------------ storage helpers
  function readJSON(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (_) { return fallback; }
  }
  function writeJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch (_) { return false; }
  }

  // ------------------------------------------------------------------ icons
  const I = (d, extra) => `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${d}${extra || ''}</svg>`;
  const S = 'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
  const ICONS = {
    pointer: I(`<path ${S} d="M6 3.5l12 7.2-5.3 1.4 3.2 5.6-2.4 1.4-3.2-5.6L6.3 17z"/>`),
    pen: I(`<path ${S} d="M4 20l1.2-4.6L15.6 5a2.1 2.1 0 013 3L8.2 18.4z"/><path ${S} d="M13.8 6.8l3.4 3.4"/>`),
    highlighter: I(`<path ${S} d="M9 14.5l6.8-9.3a1.9 1.9 0 012.7-.3l.9.7a1.9 1.9 0 01.3 2.7L12.6 17z"/><path ${S} d="M9 14.5l3.6 2.5-1.6 2.2H7.4L7 17.6z"/><path ${S} d="M4 20.5h16" opacity=".55"/>`),
    eraser: I(`<path ${S} d="M8.5 19.5l-4.2-4.2a1.6 1.6 0 010-2.3l8.4-8.4a1.6 1.6 0 012.3 0l4.6 4.6a1.6 1.6 0 010 2.3L12 19.5z"/><path ${S} d="M9.3 8.9l6.3 6.3M8.5 19.5H20"/>`),
    laser: I(`<circle cx="12" cy="12" r="3.2" fill="currentColor"/><circle cx="12" cy="12" r="7.5" ${S} opacity=".45"/>`),
    width: I(`<path fill="none" stroke="currentColor" stroke-linecap="round" d="M5 7h14" stroke-width="1.2"/><path fill="none" stroke="currentColor" stroke-linecap="round" d="M5 12h14" stroke-width="2.4"/><path fill="none" stroke="currentColor" stroke-linecap="round" d="M5 17.5h14" stroke-width="4"/>`),
    undo: I(`<path ${S} d="M9 7.5L5 11.5l4 4"/><path ${S} d="M5.5 11.5H14a5 5 0 010 10h-2"/>`),
    redo: I(`<path ${S} d="M15 7.5l4 4-4 4"/><path ${S} d="M18.5 11.5H10a5 5 0 000 10h2"/>`),
    clear: I(`<path ${S} d="M5 7h14M10 7V5h4v2M7 7l.8 12.2a1.5 1.5 0 001.5 1.3h5.4a1.5 1.5 0 001.5-1.3L17 7"/>`),
    more: I(`<g fill="currentColor"><circle cx="6" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="18" cy="12" r="1.6"/></g>`)
  };

  // ------------------------------------------------------------------ styles
  const CSS = `
  .anno-layer { position: fixed; left: 0; top: 0; z-index: 30; pointer-events: none; touch-action: auto; overflow: visible; }
  .anno-layer.drawing { pointer-events: auto; touch-action: none; cursor: crosshair; }
  .anno-layer.erasing { pointer-events: auto; touch-action: none; cursor: none; }
  .anno-layer.lasering { pointer-events: auto; touch-action: none; cursor: none; }
  .anno-layer.anno-hl { mix-blend-mode: multiply; pointer-events: none !important; }
  html.anno-overview .anno-layer { display: none; }

  .anno-bar {
    position: fixed; left: 14px; top: 50%; transform: translateY(-50%); z-index: 45; display: flex; flex-direction: column; align-items: center; gap: 2px;
    padding: 6px; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px;
    box-shadow: 0 6px 22px rgba(16, 24, 40, 0.10); font-family: Inter, system-ui, sans-serif;
    user-select: none; -webkit-user-select: none; touch-action: none;
  }
  .anno-bar[hidden] { display: none; }
  html.anno-overview .anno-bar { display: none; }
  .anno-bar .anno-sep { width: 22px; height: 1px; background: #E5E7EB; margin: 4px 0; }
  .anno-btn {
    width: 34px; height: 34px; padding: 7px; border: 0; border-radius: 8px; background: transparent;
    color: #1A1A1A; cursor: pointer; display: grid; place-items: center; position: relative;
  }
  .anno-btn svg { width: 20px; height: 20px; display: block; }
  .anno-btn:hover { background: #F3F4F6; }
  .anno-btn:focus-visible { outline: 2px solid rgba(29, 78, 216, 0.55); outline-offset: 1px; }
  .anno-btn[aria-pressed="true"] { background: #EEF2FF; color: #1D4ED8; }
  .anno-btn:disabled { opacity: 0.35; cursor: default; background: transparent; }
  .anno-swatch-btn .anno-chip { width: 18px; height: 18px; border-radius: 50%; border: 1px solid rgba(0, 0, 0, 0.18); }
  .anno-pop {
    position: fixed; z-index: 46; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 12px;
    box-shadow: 0 10px 28px rgba(16, 24, 40, 0.14); padding: 12px; font: 13px/1.3 Inter, system-ui, sans-serif; color: #1A1A1A;
  }
  .anno-pop[hidden] { display: none; }
  .anno-pop h3 { font: 500 12px Inter, system-ui, sans-serif; color: #6B7280; margin: 0 0 8px; letter-spacing: .02em; }
  .anno-swatches { display: grid; grid-template-columns: repeat(6, 26px); gap: 8px; }
  .anno-swatch { width: 26px; height: 26px; border-radius: 50%; border: 1px solid rgba(0, 0, 0, 0.18); cursor: pointer; padding: 0; }
  .anno-swatch[aria-checked="true"] { outline: 2px solid #1D4ED8; outline-offset: 2px; }
  .anno-swatch:focus-visible { outline: 2px solid #1D4ED8; outline-offset: 2px; }
  .anno-custom { display: flex; align-items: center; gap: 8px; margin-top: 12px; color: #6B7280; }
  .anno-custom input { width: 34px; height: 26px; padding: 0; border: 1px solid #E5E7EB; border-radius: 6px; background: #fff; cursor: pointer; }
  .anno-width { display: grid; gap: 10px; width: 200px; }
  .anno-width input[type=range] { width: 100%; accent-color: #1D4ED8; }
  .anno-width .anno-preview { height: 46px; border: 1px solid #F0F1F3; border-radius: 8px; display: grid; place-items: center; }
  .anno-width .anno-val { font-family: 'IBM Plex Mono', monospace; color: #6B7280; }
  .anno-menu { display: grid; gap: 2px; min-width: 190px; padding: 6px; }
  .anno-menu button {
    text-align: left; border: 0; background: transparent; padding: 8px 10px; border-radius: 8px;
    font: 13px Inter, system-ui, sans-serif; color: #1A1A1A; cursor: pointer;
  }
  .anno-menu button:hover, .anno-menu button:focus-visible { background: #F3F4F6; outline: none; }
  .anno-menu .anno-hint { padding: 8px 10px 4px; color: #9CA3AF; font-size: 12px; line-height: 1.5; border-top: 1px solid #F0F1F3; margin-top: 4px; }
  .anno-toast {
    position: fixed; left: 50%; bottom: 28px; transform: translateX(-50%); z-index: 47;
    background: #1A1A1A; color: #fff; font: 13px Inter, system-ui, sans-serif; padding: 8px 14px; border-radius: 8px;
    opacity: 0; transition: opacity 260ms ease-in 1.8s; pointer-events: none; white-space: nowrap;
  }
  .anno-toast.show { opacity: 0.92; transition: none; }
  .anno-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
  @media print { .anno-bar, .anno-pop, .anno-toast { display: none !important; } }
  @media (prefers-reduced-motion: reduce) { .anno-toast { transition: none; } }
  `;

  // ------------------------------------------------------------------ geometry
  function smoothPath(pts) {
    if (!pts.length) return '';
    const f = (v) => Math.round(v * 10) / 10;
    if (pts.length === 1) return `M${f(pts[0][0])},${f(pts[0][1])}l0.01,0`;
    if (pts.length === 2) return `M${f(pts[0][0])},${f(pts[0][1])}L${f(pts[1][0])},${f(pts[1][1])}`;
    let d = `M${f(pts[0][0])},${f(pts[0][1])}`;
    for (let i = 1; i < pts.length - 1; i++) {
      const mx = (pts[i][0] + pts[i + 1][0]) / 2, my = (pts[i][1] + pts[i + 1][1]) / 2;
      d += `Q${f(pts[i][0])},${f(pts[i][1])} ${f(mx)},${f(my)}`;
    }
    const last = pts[pts.length - 1];
    return d + `L${f(last[0])},${f(last[1])}`;
  }
  function distToSegment(px, py, ax, ay, bx, by) {
    const dx = bx - ax, dy = by - ay, L2 = dx * dx + dy * dy;
    let t = L2 ? ((px - ax) * dx + (py - ay) * dy) / L2 : 0;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
  }
  function strokeHit(stroke, x, y, r) {
    const tol = stroke.width / 2 + r, b = stroke.bbox;
    if (b && (x < b[0] - tol || x > b[2] + tol || y < b[1] - tol || y > b[3] + tol)) return false;
    const p = stroke.points;
    if (p.length === 1) return Math.hypot(x - p[0][0], y - p[0][1]) <= tol;
    for (let i = 0; i < p.length - 1; i++) if (distToSegment(x, y, p[i][0], p[i][1], p[i + 1][0], p[i + 1][1]) <= tol) return true;
    return false;
  }
  function bbox(points) {
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const [x, y] of points) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
    return [x0, y0, x1, y1];
  }
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  const validColor = (c) => typeof c === 'string' && /^#[0-9a-fA-F]{6}$/.test(c);

  // ------------------------------------------------------------------ main
  window.installAnnotations = function (deck, options) {
    if (!deck || window.slideAnnotations) return;
    options = options || {};

    // speaker-view previews load the deck with ?receiver: show strokes, no tools
    const receiver = /[?&]receiver/.test(location.search);
    const KEY = 'reveal-annotations:v1:' + location.pathname;
    const PREFS_KEY = 'reveal-annotations:prefs:v1';
    const cfg = deck.getConfig();
    const W = cfg.width, H = cfg.height;

    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    // ---------------------------------------------------------------- state
    const data = readJSON(KEY, { version: 1, width: W, height: H, slides: {} });
    if (!data.slides) data.slides = {};
    const prefs = Object.assign({
      tool: 'pointer',
      pen: { color: '#DC2626', width: 4 }, highlighter: { color: '#FACC15', width: 24 }
    }, readJSON(PREFS_KEY, {}));
    prefs.tool = 'pointer';                       // always start in navigation mode
    delete prefs.collapsed; delete prefs.pos;      // toolbar is permanent and fixed
    const history = {};                           // slideId → { undo: [], redo: [] }
    let tool = 'pointer';

    function savePrefs() { writeJSON(PREFS_KEY, prefs); }
    // Saves are coalesced with a microtask, not setTimeout: decks that load the shared
    // animation controller freeze timers while animations are paused (P key).
    let savePending = false;
    function save() {
      if (savePending) return;
      savePending = true;
      queueMicrotask(() => {
        savePending = false;
        if (!writeJSON(KEY, data)) toast('Could not save annotations (storage full or blocked)');
      });
    }
    function flush() { savePending = false; writeJSON(KEY, data); }
    window.addEventListener('pagehide', flush);

    function slideId(section) {
      section = section || deck.getCurrentSlide();
      if (!section) return null;
      if (!section.dataset.annotationId) {
        const h = section.querySelector('h1, h2');
        const idx = deck.getIndices(section);
        section.dataset.annotationId = (h && slug(h.textContent)) || ('slide-' + idx.h + (idx.v ? '-' + idx.v : ''));
      }
      return section.dataset.annotationId;
    }
    const strokesOf = (id) => data.slides[id] || (data.slides[id] = []);
    const hist = (id) => history[id] || (history[id] = { undo: [], redo: [] });

    // ---------------------------------------------------------------- overlay
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'anno-layer');
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('aria-hidden', 'true');
    // highlights get their own layer so `multiply` blends with the slide underneath
    const svgHL = document.createElementNS(NS, 'svg');
    svgHL.setAttribute('class', 'anno-layer anno-hl');
    svgHL.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svgHL.setAttribute('aria-hidden', 'true');
    const gHL = document.createElementNS(NS, 'g');
    svgHL.appendChild(gHL);
    const gPen = document.createElementNS(NS, 'g');
    const gLive = document.createElementNS(NS, 'g');
    const gCursor = document.createElementNS(NS, 'g');
    svg.append(gPen, gLive, gCursor);
    const eraserRing = document.createElementNS(NS, 'circle');
    eraserRing.setAttribute('r', ERASER_RADIUS);
    eraserRing.setAttribute('fill', 'rgba(255,255,255,0.35)');
    eraserRing.setAttribute('stroke', '#6B7280');
    eraserRing.setAttribute('stroke-width', '1.2');
    eraserRing.setAttribute('vector-effect', 'non-scaling-stroke');
    eraserRing.style.display = 'none';
    const laserTrail = document.createElementNS(NS, 'path');
    laserTrail.setAttribute('fill', 'none');
    laserTrail.setAttribute('stroke', '#EF4444');
    laserTrail.setAttribute('stroke-linecap', 'round');
    laserTrail.setAttribute('stroke-linejoin', 'round');
    laserTrail.setAttribute('stroke-width', '5');
    laserTrail.setAttribute('opacity', '0.45');
    const laserDot = document.createElementNS(NS, 'circle');
    laserDot.setAttribute('r', '7');
    laserDot.setAttribute('fill', '#EF4444');
    laserDot.setAttribute('stroke', 'rgba(255,255,255,0.9)');
    laserDot.setAttribute('stroke-width', '2');
    laserDot.style.filter = 'drop-shadow(0 0 6px rgba(239,68,68,0.85))';
    laserDot.style.display = 'none';
    gCursor.append(eraserRing, laserTrail, laserDot);
    // outside .reveal so reveal's swipe handlers never see drawing gestures;
    // the body is inside the fullscreen element (document.documentElement)
    document.body.append(svgHL, svg);

    function slideRect() {
      const el = deck.getSlidesElement();
      return el.getBoundingClientRect();
    }
    function place() {
      const r = slideRect();
      if (!r.width || !r.height) return;
      for (const el of [svgHL, svg]) {
        el.style.left = r.left + 'px';
        el.style.top = r.top + 'px';
        el.style.width = r.width + 'px';
        el.style.height = r.height + 'px';
      }
    }
    function toSlide(e) {
      const r = svg.getBoundingClientRect();
      return [(e.clientX - r.left) / r.width * W, (e.clientY - r.top) / r.height * H];
    }

    function makePath(s) {
      const p = document.createElementNS(NS, 'path');
      p.setAttribute('d', smoothPath(s.points));
      p.setAttribute('fill', 'none');
      p.setAttribute('stroke', s.color);
      p.setAttribute('stroke-width', s.width);
      p.setAttribute('stroke-linecap', 'round');
      p.setAttribute('stroke-linejoin', 'round');
      if (s.tool === 'highlighter') p.setAttribute('opacity', '0.42');
      p.dataset.id = s.id;
      return p;
    }
    function render() {
      gHL.replaceChildren(); gPen.replaceChildren();
      if (deck.isOverview()) return;
      const id = slideId();
      if (!id) return;
      for (const s of strokesOf(id)) (s.tool === 'highlighter' ? gHL : gPen).appendChild(makePath(s));
      updateButtons();
    }

    // ---------------------------------------------------------------- actions (undoable)
    function apply(action, inverse) {
      const list = strokesOf(action.slide);
      const add = (arr) => { for (const s of arr) if (!list.some((x) => x.id === s.id)) list.push(s); list.sort((a, b) => a.t - b.t); };
      const remove = (arr) => { const ids = new Set(arr.map((s) => s.id)); data.slides[action.slide] = list.filter((s) => !ids.has(s.id)); };
      const type = inverse ? { add: 'remove', remove: 'add' }[action.type] : action.type;
      if (type === 'add') add(action.strokes); else remove(action.strokes);
      if (!data.slides[action.slide].length) delete data.slides[action.slide];
    }
    function commit(action) {
      apply(action, false);
      const h = hist(action.slide);
      h.undo.push(action); h.redo.length = 0;
      save(); render();
    }
    function undo() {
      const id = slideId(); const h = hist(id);
      const a = h.undo.pop(); if (!a) return;
      apply(a, true); h.redo.push(a); save(); render();
    }
    function redo() {
      const id = slideId(); const h = hist(id);
      const a = h.redo.pop(); if (!a) return;
      apply(a, false); h.undo.push(a); save(); render();
    }
    function clearSlide() {
      const id = slideId(); const list = strokesOf(id);
      if (!list.length) return;
      commit({ type: 'remove', slide: id, strokes: list.slice() });
      toast('Slide annotations cleared — undo to restore');
    }

    // ---------------------------------------------------------------- pointer input
    let live = null;         // stroke being drawn
    let erasing = null;      // { removed: Map }
    let laserPts = [];

    function onDown(e) {
      if (tool === 'pointer' || e.button > 0) return;
      e.preventDefault(); e.stopPropagation();
      closePops();
      try { svg.setPointerCapture(e.pointerId); } catch (_) { }
      const [x, y] = toSlide(e);
      if (tool === 'pen' || tool === 'highlighter') {
        const p = prefs[tool];
        live = { id: uid(), t: Date.now(), tool, color: p.color, width: p.width, points: [[x, y]], pointerId: e.pointerId };
        live.el = makePath(live);
        (tool === 'highlighter' ? gHL : gLive).appendChild(live.el);
      } else if (tool === 'eraser') {
        erasing = { removed: new Map(), pointerId: e.pointerId };
        eraseAt(x, y);
      }
    }
    function onMove(e) {
      const [x, y] = toSlide(e);
      if (tool === 'eraser') { eraserRing.setAttribute('cx', x); eraserRing.setAttribute('cy', y); eraserRing.style.display = ''; }
      if (tool === 'laser') { laserMove(x, y); return; }
      if (live && e.pointerId === live.pointerId) {
        const evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
        for (const ev of (evs.length ? evs : [e])) {
          const q = toSlide(ev), last = live.points[live.points.length - 1];
          if (Math.hypot(q[0] - last[0], q[1] - last[1]) >= 0.8) live.points.push(q);
        }
        live.el.setAttribute('d', smoothPath(live.points));
        e.preventDefault();
      } else if (erasing && e.pointerId === erasing.pointerId) {
        const evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
        for (const ev of (evs.length ? evs : [e])) { const q = toSlide(ev); eraseAt(q[0], q[1]); }
        e.preventDefault();
      }
    }
    function onUp(e) {
      if (live && e.pointerId === live.pointerId) {
        const s = live; live = null;
        s.el.remove();
        delete s.el; delete s.pointerId;
        s.bbox = bbox(s.points);
        s.points = s.points.map(([x, y]) => [Math.round(x * 10) / 10, Math.round(y * 10) / 10]);
        commit({ type: 'add', slide: slideId(), strokes: [s] });
      } else if (erasing && e.pointerId === erasing.pointerId) {
        const removed = Array.from(erasing.removed.values());
        erasing = null;
        if (removed.length) {
          // the strokes were hidden during the gesture; make the removal one undo step
          const id = slideId();
          const h = hist(id);
          const action = { type: 'remove', slide: id, strokes: removed };
          apply(action, false); h.undo.push(action); h.redo.length = 0; save(); render();
        }
      }
    }
    function eraseAt(x, y) {
      const id = slideId();
      for (const s of strokesOf(id)) {
        if (erasing.removed.has(s.id)) continue;
        if (!s.bbox) s.bbox = bbox(s.points);
        if (strokeHit(s, x, y, ERASER_RADIUS)) {
          erasing.removed.set(s.id, s);
          const el = svg.querySelector(`path[data-id="${s.id}"]`) || svgHL.querySelector(`path[data-id="${s.id}"]`);
          if (el) el.style.display = 'none';
        }
      }
    }
    function onLeave() { eraserRing.style.display = 'none'; if (tool === 'laser') laserHide(); }

    // laser: a dot with a short fading trail; nothing is stored
    let laserRaf = 0;
    function laserMove(x, y) {
      laserDot.style.display = '';
      laserDot.setAttribute('cx', x); laserDot.setAttribute('cy', y);
      // Date.now(), not performance.now(): the animation controller freezes the latter while paused
      laserPts.push([x, y, Date.now()]);
      const paused = window.animationPauseController && window.animationPauseController.isPaused();
      if (paused) { laserPts = []; laserTrail.setAttribute('d', ''); return; }
      if (!laserRaf) laserRaf = requestAnimationFrame(laserTick);
    }
    function laserTick() {
      laserRaf = 0;
      const now = Date.now();
      laserPts = laserPts.filter((p) => now - p[2] < 260);
      laserTrail.setAttribute('d', laserPts.length > 1 ? smoothPath(laserPts) : '');
      if (laserPts.length) laserRaf = requestAnimationFrame(laserTick);
    }
    function laserHide() { laserDot.style.display = 'none'; laserPts = []; laserTrail.setAttribute('d', ''); }

    svg.addEventListener('pointerdown', onDown);
    svg.addEventListener('pointermove', onMove);
    svg.addEventListener('pointerup', onUp);
    svg.addEventListener('pointercancel', onUp);
    svg.addEventListener('pointerleave', onLeave);
    // keep reveal (and the browser) from treating drawing gestures as swipes or clicks
    ['touchstart', 'touchmove', 'click', 'dblclick', 'contextmenu', 'wheel'].forEach((t) =>
      svg.addEventListener(t, (e) => { if (tool !== 'pointer') { e.stopPropagation(); if (t !== 'wheel') e.preventDefault(); } }, { passive: false }));

    // ---------------------------------------------------------------- toolbar
    const bar = document.createElement('div');
    bar.className = 'anno-bar';
    bar.setAttribute('role', 'toolbar');
    bar.setAttribute('aria-label', 'Annotation tools');
    bar.setAttribute('aria-orientation', 'vertical');
    const live_region = document.createElement('div');
    live_region.className = 'anno-sr';
    live_region.setAttribute('aria-live', 'polite');

    function btn(icon, label, onClick, o) {
      o = o || {};
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'anno-btn ' + (o.cls || '');
      b.innerHTML = ICONS[icon] || icon;
      b.setAttribute('aria-label', label);
      b.title = label + (o.key ? `  (${o.key})` : '');
      if (o.toggle) b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); onClick(b, e); });
      bar.appendChild(b);
      return b;
    }
    const sep = () => { const s = document.createElement('div'); s.className = 'anno-sep'; s.setAttribute('role', 'separator'); bar.appendChild(s); };

    const toolBtns = {
      pointer: btn('pointer', 'Pointer: navigate slides', () => setTool('pointer'), { toggle: true, key: 'M / Esc' }),
      pen: btn('pen', 'Pen', () => setTool('pen'), { toggle: true, key: 'D' }),
      highlighter: btn('highlighter', 'Highlighter', () => setTool('highlighter'), { toggle: true, key: 'I' }),
      eraser: btn('eraser', 'Eraser: remove strokes', () => setTool('eraser'), { toggle: true, key: 'E' }),
      laser: btn('laser', 'Laser pointer', () => setTool('laser'), { toggle: true, key: 'R' })
    };
    sep();
    const colorBtn = btn('<span class="anno-chip"></span>', 'Color', (b) => togglePop(colorPop, b), { cls: 'anno-swatch-btn' });
    colorBtn.setAttribute('aria-haspopup', 'dialog');
    colorBtn.setAttribute('aria-expanded', 'false');
    const widthBtn = btn('width', 'Stroke thickness', (b) => togglePop(widthPop, b));
    widthBtn.setAttribute('aria-haspopup', 'dialog');
    widthBtn.setAttribute('aria-expanded', 'false');
    sep();
    const undoBtn = btn('undo', 'Undo', undo, { key: 'Ctrl+Z' });
    const redoBtn = btn('redo', 'Redo', redo, { key: 'Ctrl+Shift+Z' });
    const clearBtn = btn('clear', 'Clear this slide', clearSlide);
    const moreBtn = btn('more', 'More: export, import', (b) => togglePop(menuPop, b));
    moreBtn.setAttribute('aria-haspopup', 'menu');
    moreBtn.setAttribute('aria-expanded', 'false');
    bar.appendChild(live_region);


    // ---------------------------------------------------------------- popovers
    function pop(cls) { const p = document.createElement('div'); p.className = 'anno-pop ' + (cls || ''); p.hidden = true; return p; }

    const colorPop = pop();
    colorPop.setAttribute('role', 'dialog');
    colorPop.setAttribute('aria-label', 'Annotation color');
    const ch = document.createElement('h3'); colorPop.appendChild(ch);
    const sw = document.createElement('div'); sw.className = 'anno-swatches'; sw.setAttribute('role', 'radiogroup');
    sw.setAttribute('aria-label', 'Preset colors');
    COLORS.forEach((c) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'anno-swatch'; b.style.background = c.value;
      b.setAttribute('role', 'radio'); b.setAttribute('aria-label', c.name); b.title = c.name;
      b.dataset.color = c.value;
      b.addEventListener('click', () => { setColor(c.value); });
      sw.appendChild(b);
    });
    colorPop.appendChild(sw);
    const custom = document.createElement('label'); custom.className = 'anno-custom';
    const customInput = document.createElement('input'); customInput.type = 'color';
    customInput.setAttribute('aria-label', 'Custom color');
    customInput.addEventListener('input', () => setColor(customInput.value));
    custom.append(customInput, document.createTextNode('Custom color'));
    colorPop.appendChild(custom);

    const widthPop = pop();
    widthPop.setAttribute('role', 'dialog');
    widthPop.setAttribute('aria-label', 'Stroke thickness');
    const wBox = document.createElement('div'); wBox.className = 'anno-width';
    const wh = document.createElement('h3');
    const range = document.createElement('input'); range.type = 'range'; range.step = '1';
    range.setAttribute('aria-label', 'Stroke thickness');
    const prev = document.createElementNS(NS, 'svg'); prev.setAttribute('viewBox', '0 0 200 46'); prev.setAttribute('width', '100%'); prev.setAttribute('height', '46');
    const prevPath = document.createElementNS(NS, 'path');
    prevPath.setAttribute('d', 'M14,30 C60,6 100,40 186,16'); prevPath.setAttribute('fill', 'none'); prevPath.setAttribute('stroke-linecap', 'round');
    prev.appendChild(prevPath);
    const pv = document.createElement('div'); pv.className = 'anno-preview'; pv.appendChild(prev);
    const wVal = document.createElement('div'); wVal.className = 'anno-val';
    range.addEventListener('input', () => setWidth(parseFloat(range.value)));
    wBox.append(wh, pv, range, wVal);
    widthPop.appendChild(wBox);

    const menuPop = pop('anno-menu');
    menuPop.setAttribute('role', 'menu');
    menuPop.setAttribute('aria-label', 'Annotation file options');
    const mItem = (label, fn) => {
      const b = document.createElement('button'); b.type = 'button'; b.textContent = label; b.setAttribute('role', 'menuitem');
      b.addEventListener('click', () => { closePops(); fn(); }); menuPop.appendChild(b); return b;
    };
    mItem('Export annotations (JSON)', exportJSON);
    mItem('Import annotations (JSON)…', () => fileInput.click());
    mItem('Clear all slides…', clearAll);
    const hint = document.createElement('div'); hint.className = 'anno-hint';
    hint.innerHTML = 'D pen · I highlighter · E eraser<br>R laser · M / Esc pointer<br>Ctrl+Z undo · Ctrl+Shift+Z redo';
    menuPop.appendChild(hint);
    const fileInput = document.createElement('input');
    fileInput.type = 'file'; fileInput.accept = 'application/json,.json'; fileInput.hidden = true;
    fileInput.addEventListener('change', () => { const f = fileInput.files[0]; fileInput.value = ''; if (f) importJSON(f); });

    const toastEl = document.createElement('div'); toastEl.className = 'anno-toast'; toastEl.setAttribute('role', 'status');
    // shown instantly, then faded out by a delayed CSS transition (no timers needed)
    function toast(msg) {
      toastEl.textContent = msg;
      toastEl.classList.add('show');
      void toastEl.offsetWidth;            // commit the visible state before fading
      toastEl.classList.remove('show');
    }

    let openPop = null, openBtn = null;
    function placePop(p, anchor) {
      const r = anchor.getBoundingClientRect(), pr = p.getBoundingClientRect(), br = bar.getBoundingClientRect();
      const right = br.right + 10 + pr.width < innerWidth;
      const x = right ? br.right + 10 : br.left - 10 - pr.width;
      const y = Math.max(8, Math.min(innerHeight - pr.height - 8, r.top + r.height / 2 - pr.height / 2));
      p.style.left = x + 'px'; p.style.top = y + 'px';
    }
    function togglePop(p, anchor) {
      if (openPop === p) { closePops(); return; }
      closePops();
      syncPops();
      p.hidden = false; placePop(p, anchor);
      openPop = p; openBtn = anchor; anchor.setAttribute('aria-expanded', 'true');
      const first = p.querySelector('[aria-checked="true"], input[type=range], button');
      if (first) first.focus();
    }
    function closePops(returnFocus) {
      if (!openPop) return;
      openPop.hidden = true;
      if (openBtn) { openBtn.setAttribute('aria-expanded', 'false'); if (returnFocus) openBtn.focus(); }
      openPop = null; openBtn = null;
    }
    document.addEventListener('pointerdown', (e) => {
      if (openPop && !openPop.contains(e.target) && !bar.contains(e.target)) closePops();
    }, true);

    // ---------------------------------------------------------------- tool / color / width
    const drawTool = () => (tool === 'highlighter' ? 'highlighter' : 'pen');
    function setTool(t) {
      tool = t;
      svg.classList.toggle('drawing', t === 'pen' || t === 'highlighter');
      svg.classList.toggle('erasing', t === 'eraser');
      svg.classList.toggle('lasering', t === 'laser');
      if (t !== 'eraser') eraserRing.style.display = 'none';
      if (t !== 'laser') laserHide();
      Object.entries(toolBtns).forEach(([k, b]) => b.setAttribute('aria-pressed', String(k === t)));
      syncChip();
      live_region.textContent = { pointer: 'Pointer mode', pen: 'Pen', highlighter: 'Highlighter', eraser: 'Eraser', laser: 'Laser pointer' }[t];
    }
    function setColor(c) {
      if (!validColor(c)) return;
      prefs[drawTool()].color = c.toUpperCase(); savePrefs(); syncChip(); syncPops();
      if (tool === 'pointer' || tool === 'eraser' || tool === 'laser') setTool(drawTool());
    }
    function setWidth(w) {
      const t = drawTool(), [lo, hi] = WIDTH_RANGE[t];
      prefs[t].width = Math.max(lo, Math.min(hi, w)); savePrefs(); syncPops();
    }
    function syncChip() {
      colorBtn.querySelector('.anno-chip').style.background = prefs[drawTool()].color;
      colorBtn.setAttribute('aria-label', `Color (${drawTool()}): ${prefs[drawTool()].color}`);
    }
    function syncPops() {
      const t = drawTool(), p = prefs[t];
      ch.textContent = t === 'highlighter' ? 'Highlighter color' : 'Pen color';
      sw.querySelectorAll('.anno-swatch').forEach((b) => b.setAttribute('aria-checked', String(b.dataset.color.toUpperCase() === p.color.toUpperCase())));
      customInput.value = p.color.toLowerCase();
      const [lo, hi] = WIDTH_RANGE[t];
      range.min = lo; range.max = hi; range.value = p.width;
      wh.textContent = t === 'highlighter' ? 'Highlighter thickness' : 'Pen thickness';
      wVal.textContent = p.width + ' px at slide size';
      prevPath.setAttribute('stroke', p.color);
      prevPath.setAttribute('stroke-width', Math.min(40, p.width));
      prevPath.setAttribute('opacity', t === 'highlighter' ? '0.38' : '1');
    }
    function updateButtons() {
      const h = hist(slideId());
      undoBtn.disabled = !h.undo.length;
      redoBtn.disabled = !h.redo.length;
      clearBtn.disabled = !strokesOf(slideId()).length;
      if (!data.slides[slideId()] || !data.slides[slideId()].length) delete data.slides[slideId()];
    }

    // ---------------------------------------------------------------- export / import
    function exportJSON() {
      flush();
      const out = { format: 'reveal-annotations', version: 1, deck: location.pathname, width: W, height: H, exported: new Date().toISOString(), slides: data.slides };
      const blob = new Blob([JSON.stringify(out, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = (document.title || 'slides').replace(/[^\w-]+/g, '-').toLowerCase() + '-annotations.json';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      toast('Annotations exported');
    }
    function cleanStroke(s, sx, sy) {
      if (!s || !Array.isArray(s.points) || !s.points.length) return null;
      const pts = s.points.filter((p) => Array.isArray(p) && Number.isFinite(p[0]) && Number.isFinite(p[1]))
        .map((p) => [Math.round(p[0] * sx * 10) / 10, Math.round(p[1] * sy * 10) / 10]);
      if (!pts.length) return null;
      const t = s.tool === 'highlighter' ? 'highlighter' : 'pen';
      return {
        id: typeof s.id === 'string' ? s.id : uid(), t: Number(s.t) || Date.now(), tool: t,
        color: validColor(s.color) ? s.color : '#DC2626',
        width: Math.max(0.5, Math.min(80, Number(s.width) || 4)), points: pts, bbox: bbox(pts)
      };
    }
    function importJSON(file) {
      const reader = new FileReader();
      reader.onload = () => {
        let obj;
        try { obj = JSON.parse(reader.result); } catch (_) { toast('Not a valid JSON file'); return; }
        if (!obj || typeof obj.slides !== 'object') { toast('No annotations found in that file'); return; }
        const sx = obj.width ? W / obj.width : 1, sy = obj.height ? H / obj.height : 1;
        const incoming = {};
        let n = 0;
        for (const id of Object.keys(obj.slides)) {
          const list = (obj.slides[id] || []).map((s) => cleanStroke(s, sx, sy)).filter(Boolean);
          if (list.length) { incoming[id] = list; n += list.length; }
        }
        const hasAny = Object.keys(data.slides).length > 0;
        if (hasAny && !window.confirm('Replace the current annotations with the imported ones?')) return;
        data.slides = incoming;
        Object.keys(history).forEach((k) => delete history[k]);
        flush(); render();
        toast(`Imported ${n} stroke${n === 1 ? '' : 's'}`);
      };
      reader.readAsText(file);
    }
    function clearAll() {
      if (!Object.keys(data.slides).length) { toast('No annotations to clear'); return; }
      if (!window.confirm('Remove annotations from every slide? This cannot be undone.')) return;
      data.slides = {};
      Object.keys(history).forEach((k) => delete history[k]);
      flush(); render();
      toast('All annotations cleared');
    }

    function positionBar() { if (openPop && openBtn) placePop(openPop, openBtn); }

    // roving focus inside the toolbar and popovers; keep reveal from seeing these keys
    bar.addEventListener('keydown', (e) => {
      const items = Array.from(bar.querySelectorAll('.anno-btn:not(:disabled)'));
      const i = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); e.stopPropagation(); items[(i + 1) % items.length].focus(); }
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); items[(i - 1 + items.length) % items.length].focus(); }
      else if (e.key === 'Home') { e.preventDefault(); e.stopPropagation(); items[0].focus(); }
      else if (e.key === 'End') { e.preventDefault(); e.stopPropagation(); items[items.length - 1].focus(); }
      else if (e.key === ' ' || e.key === 'Enter') e.stopPropagation();
    });
    [colorPop, widthPop, menuPop].forEach((p) => p.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); closePops(true); return; }
      if (p === colorPop && /^Arrow/.test(e.key) && e.target.classList.contains('anno-swatch')) {
        const all = Array.from(sw.children), i = all.indexOf(e.target);
        const n = all[(i + (e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1) + all.length) % all.length];
        n.focus(); setColor(n.dataset.color);
      } else if (p === menuPop && /^Arrow(Up|Down)$/.test(e.key)) {
        const all = Array.from(menuPop.querySelectorAll('button')), i = all.indexOf(document.activeElement);
        all[(i + (e.key === 'ArrowDown' ? 1 : -1) + all.length) % all.length].focus();
      }
      e.stopPropagation();                // arrows, space etc. stay inside the popover
    }));

    // ---------------------------------------------------------------- global shortcuts
    function typing(t) { return t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)); }
    document.addEventListener('keydown', (e) => {
      if (typing(e.target)) return;
      const mod = e.ctrlKey || e.metaKey, k = e.key.toLowerCase();
      if (mod && !e.altKey && (k === 'z' || k === 'y')) {
        e.preventDefault(); e.stopImmediatePropagation();
        if (k === 'y' || e.shiftKey) redo(); else undo();
        return;
      }
      if (mod || e.altKey) return;
      if (e.key === 'Escape') {
        if (openPop) { e.preventDefault(); e.stopImmediatePropagation(); closePops(true); return; }
        if (tool !== 'pointer') { e.preventDefault(); e.stopImmediatePropagation(); setTool('pointer'); return; }
        return;                           // otherwise reveal's own Esc (overview) runs
      }
      if (deck.isOverview()) return;
      const map = { d: 'pen', i: 'highlighter', e: 'eraser', r: 'laser', m: 'pointer' };
      if (map[k]) {
        e.preventDefault(); e.stopImmediatePropagation();
        setTool(tool === map[k] && k !== 'm' ? 'pointer' : map[k]);
      }
    }, true);

    // ---------------------------------------------------------------- reveal events
    deck.on('slidechanged', () => { if (live) { live.el.remove(); live = null; } erasing = null; render(); });
    deck.on('overviewshown', () => { document.documentElement.classList.add('anno-overview'); closePops(); render(); });
    deck.on('overviewhidden', () => { document.documentElement.classList.remove('anno-overview'); place(); render(); });
    deck.on('resize', () => { place(); positionBar(); });
    deck.on('ready', () => { stampSlideIds(); place(); render(); });
    window.addEventListener('resize', () => { place(); positionBar(); });
    document.addEventListener('fullscreenchange', () => requestAnimationFrame(() => { place(); positionBar(); }));
    document.addEventListener('webkitfullscreenchange', () => requestAnimationFrame(() => { place(); positionBar(); }));
    if (window.ResizeObserver) new ResizeObserver(() => place()).observe(deck.getSlidesElement());
    // another window (e.g. the speaker view) changed the stored annotations
    window.addEventListener('storage', (e) => {
      if (e.key !== KEY) return;
      const next = readJSON(KEY, null);
      if (next && next.slides) { data.slides = next.slides; render(); }
    });

    if (!receiver) {
      document.body.append(bar, colorPop, widthPop, menuPop, fileInput, toastEl);
      setTool('pointer');
      savePrefs();
    }
    if (deck.isReady()) { stampSlideIds(); place(); render(); }

    window.slideAnnotations = Object.freeze({
      setTool, getTool: () => tool, undo, redo, clearSlide, exportJSON,
      strokes: (id) => (data.slides[id || slideId()] || []).slice(),
      slideId: () => slideId()
    });
  };
})();
