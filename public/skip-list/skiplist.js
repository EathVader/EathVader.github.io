// Skip List Interactive Visualization

class SkipNode {
  constructor(val, level) {
    this.val = val;
    this.next = new Array(level + 1).fill(null);
  }
}

class SkipList {
  constructor(maxLevel = 4, p = 0.5) {
    this.maxLevel = maxLevel;
    this.p = p;
    this.level = 0;
    this.head = new SkipNode(-Infinity, maxLevel);
  }

  randomLevel() {
    let lvl = 0;
    while (Math.random() < this.p && lvl < this.maxLevel) lvl++;
    return lvl;
  }

  insert(val) {
    const update = new Array(this.maxLevel + 1).fill(null);
    let curr = this.head;
    for (let i = this.level; i >= 0; i--) {
      while (curr.next[i] && curr.next[i].val < val) curr = curr.next[i];
      update[i] = curr;
    }
    const lvl = this.randomLevel();
    if (lvl > this.level) {
      for (let i = this.level + 1; i <= lvl; i++) update[i] = this.head;
      this.level = lvl;
    }
    const node = new SkipNode(val, lvl);
    for (let i = 0; i <= lvl; i++) {
      node.next[i] = update[i].next[i];
      update[i].next[i] = node;
    }
  }

  search(val) {
    let curr = this.head;
    const path = [];
    for (let i = this.level; i >= 0; i--) {
      while (curr.next[i] && curr.next[i].val < val) {
        path.push({ node: curr, level: i });
        curr = curr.next[i];
      }
      path.push({ node: curr, level: i });
    }
    curr = curr.next[0];
    return { found: curr && curr.val === val, path };
  }

  toArray() {
    const levels = [];
    for (let i = this.level; i >= 0; i--) {
      const row = [];
      let curr = this.head.next[i];
      while (curr) { row.push(curr.val); curr = curr.next[i]; }
      levels.push(row);
    }
    return levels;
  }
}

function renderSkipList(sl, svgEl, searchPath = null) {
  svgEl.innerHTML = '';
  const W = 700, H = 240;
  const allNodes = [];
  let curr = sl.head.next[0];
  while (curr) { allNodes.push(curr); curr = curr.next[0]; }
  const n = allNodes.length;
  if (!n) return;

  const nodeW = Math.min(50, (W - 100) / (n + 1));
  const levelH = 40;
  const baseY = H - 30;
  const startX = 60;

  // Position map: val -> x
  const posX = new Map();
  posX.set(-Infinity, 20);
  allNodes.forEach((node, i) => posX.set(node.val, startX + i * nodeW));

  // Draw levels
  for (let lvl = 0; lvl <= sl.level; lvl++) {
    const y = baseY - lvl * levelH;
    // Level label
    const lbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    lbl.setAttribute('x', 5); lbl.setAttribute('y', y + 4);
    lbl.setAttribute('font-size', '9'); lbl.setAttribute('fill', '#64748b');
    lbl.setAttribute('font-family', 'Inter');
    lbl.textContent = `L${lvl}`;
    svgEl.appendChild(lbl);

    // Head node
    const headRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    headRect.setAttribute('x', 15); headRect.setAttribute('y', y - 10);
    headRect.setAttribute('width', 20); headRect.setAttribute('height', 20);
    headRect.setAttribute('rx', '3'); headRect.setAttribute('fill', '#1e293b'); headRect.setAttribute('stroke', '#475569');
    svgEl.appendChild(headRect);
    const headTxt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    headTxt.setAttribute('x', 25); headTxt.setAttribute('y', y + 4);
    headTxt.setAttribute('text-anchor', 'middle'); headTxt.setAttribute('font-size', '8');
    headTxt.setAttribute('fill', '#64748b'); headTxt.setAttribute('font-family', 'Inter');
    headTxt.textContent = 'H';
    svgEl.appendChild(headTxt);

    // Nodes and edges at this level
    let prev = sl.head;
    let prevX = 25;
    let node = sl.head.next[lvl];
    while (node) {
      const x = posX.get(node.val);
      // Edge
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', prevX + 10); line.setAttribute('y1', y);
      line.setAttribute('x2', x); line.setAttribute('y2', y);
      line.setAttribute('stroke', '#334155'); line.setAttribute('stroke-width', '1');
      line.setAttribute('marker-end', 'url(#arrowSL)');
      svgEl.appendChild(line);

      // Node rect
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', x); rect.setAttribute('y', y - 12);
      rect.setAttribute('width', nodeW - 6); rect.setAttribute('height', 24);
      rect.setAttribute('rx', '4');
      if (lvl === 0) {
        rect.setAttribute('fill', '#14532d'); rect.setAttribute('stroke', '#22c55e'); rect.setAttribute('stroke-width', '1.5');
      } else {
        rect.setAttribute('fill', '#172554'); rect.setAttribute('stroke', '#3b82f6');
      }
      svgEl.appendChild(rect);

      const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      txt.setAttribute('x', x + (nodeW - 6) / 2); txt.setAttribute('y', y + 4);
      txt.setAttribute('text-anchor', 'middle'); txt.setAttribute('font-size', '11');
      txt.setAttribute('font-weight', '700'); txt.setAttribute('font-family', 'JetBrains Mono');
      txt.setAttribute('fill', lvl === 0 ? '#86efac' : '#93c5fd');
      txt.textContent = node.val;
      svgEl.appendChild(txt);

      prevX = x + (nodeW - 6) / 2;
      prev = node;
      node = node.next[lvl];
    }
  }

  // Arrow marker
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
  marker.setAttribute('id', 'arrowSL'); marker.setAttribute('viewBox', '0 0 10 10');
  marker.setAttribute('refX', '9'); marker.setAttribute('refY', '5');
  marker.setAttribute('markerWidth', '4'); marker.setAttribute('markerHeight', '4');
  marker.setAttribute('orient', 'auto');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M0 0L10 5L0 10z'); path.setAttribute('fill', '#475569');
  marker.appendChild(path); defs.appendChild(marker); svgEl.prepend(defs);
}

function initSkipListDemo() {
  const svg = document.getElementById('sl-svg');
  const log = document.getElementById('sl-log');
  const input = document.getElementById('sl-input');
  let sl = new SkipList(4, 0.5);

  function refresh(msg) { renderSkipList(sl, svg); if (msg) log.textContent = msg; }

  document.getElementById('sl-insert').addEventListener('click', () => {
    const v = parseInt(input.value);
    if (isNaN(v)) return;
    sl.insert(v);
    input.value = '';
    refresh(`✅ 插入 ${v}`);
    input.focus();
  });

  document.getElementById('sl-search').addEventListener('click', () => {
    const v = parseInt(input.value);
    if (isNaN(v)) return;
    const { found } = sl.search(v);
    refresh(found ? `✅ 找到 ${v}` : `❌ ${v} 不存在`);
  });

  document.getElementById('sl-reset').addEventListener('click', () => {
    sl = new SkipList(4, 0.5);
    refresh('已重置');
  });

  document.getElementById('sl-example').addEventListener('click', () => {
    sl = new SkipList(4, 0.5);
    [3, 6, 7, 9, 12, 17, 19, 21, 25, 26].forEach(v => sl.insert(v));
    refresh('已加载示例：3, 6, 7, 9, 12, 17, 19, 21, 25, 26');
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('sl-insert').click();
  });

  refresh('等待操作... 试试点击"示例"按钮');
}

document.addEventListener('DOMContentLoaded', initSkipListDemo);
