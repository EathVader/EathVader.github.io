// LRU Cache interactive demo
(function () {
  // --- LRU Cache implementation ---
  class Node {
    constructor(k, v) { this.key = k; this.val = v; this.prev = null; this.next = null; }
  }

  class LRU {
    constructor(cap) {
      this.cap = cap;
      this.size = 0;
      this.map = new Map();
      this.head = new Node(0, 0);
      this.tail = new Node(0, 0);
      this.head.next = this.tail;
      this.tail.prev = this.head;
    }
    _remove(n) { n.prev.next = n.next; n.next.prev = n.prev; }
    _addHead(n) {
      n.prev = this.head; n.next = this.head.next;
      this.head.next.prev = n; this.head.next = n;
    }
    get(k) {
      if (!this.map.has(k)) return -1;
      const n = this.map.get(k);
      this._remove(n); this._addHead(n);
      return n.val;
    }
    put(k, v) {
      if (this.map.has(k)) {
        const n = this.map.get(k); n.val = v;
        this._remove(n); this._addHead(n);
        return null;
      }
      const n = new Node(k, v);
      this.map.set(k, n); this._addHead(n); this.size++;
      if (this.size > this.cap) {
        const t = this.tail.prev;
        this._remove(t); this.map.delete(t.key); this.size--;
        return t.key; // evicted key
      }
      return null;
    }
    toArray() {
      const arr = []; let c = this.head.next;
      while (c !== this.tail) { arr.push({ key: c.key, val: c.val }); c = c.next; }
      return arr;
    }
  }

  let cache;
  const logs = [];

  function getEl(id) { return document.getElementById(id); }

  function render() {
    const vis = getEl('demo-visual');
    if (!vis) return;
    const items = cache.toArray();
    // Build SVG visualization
    const nodeW = 80, nodeH = 36, gap = 8, sentW = 36;
    const totalW = sentW + gap + items.length * (nodeW + gap) + sentW + 20;
    const w = Math.max(totalW, 300);
    let svg = `<svg viewBox="0 0 ${w} 70" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">`;
    let x = 10;
    // HEAD
    svg += `<rect x="${x}" y="18" width="${sentW}" height="${nodeH}" rx="4" fill="#334155" stroke="#64748b"/>`;
    svg += `<text x="${x + sentW / 2}" y="40" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="Inter">H</text>`;
    x += sentW;
    // Nodes
    items.forEach((item, i) => {
      svg += `<line x1="${x}" y1="36" x2="${x + gap}" y2="36" stroke="#94a3b8" stroke-width="1"/>`;
      x += gap;
      const isFirst = i === 0;
      const isLast = i === items.length - 1;
      const fill = isFirst ? '#14532d' : isLast ? '#451a03' : '#1e293b';
      const stroke = isFirst ? '#22c55e' : isLast ? '#f59e0b' : '#334155';
      const textFill = isFirst ? '#86efac' : isLast ? '#fcd34d' : '#cbd5e1';
      svg += `<rect x="${x}" y="18" width="${nodeW}" height="${nodeH}" rx="6" fill="${fill}" stroke="${stroke}"/>`;
      svg += `<text x="${x + nodeW / 2}" y="34" text-anchor="middle" fill="${textFill}" font-size="10" font-family="JetBrains Mono">${item.key}: ${item.val}</text>`;
      if (isFirst) svg += `<text x="${x + nodeW / 2}" y="48" text-anchor="middle" fill="#64748b" font-size="8" font-family="Inter">MRU</text>`;
      if (isLast && items.length > 1) svg += `<text x="${x + nodeW / 2}" y="48" text-anchor="middle" fill="#64748b" font-size="8" font-family="Inter">LRU</text>`;
      x += nodeW;
    });
    // TAIL
    svg += `<line x1="${x}" y1="36" x2="${x + gap}" y2="36" stroke="#94a3b8" stroke-width="1"/>`;
    x += gap;
    svg += `<rect x="${x}" y="18" width="${sentW}" height="${nodeH}" rx="4" fill="#334155" stroke="#64748b"/>`;
    svg += `<text x="${x + sentW / 2}" y="40" text-anchor="middle" fill="#94a3b8" font-size="10" font-family="Inter">T</text>`;
    svg += '</svg>';
    vis.innerHTML = `<div class="diagram" style="margin:0;padding:.75rem">${svg}<div class="caption">容量: ${cache.cap} | 当前: ${cache.size}</div></div>`;
    // Log
    getEl('demo-log').textContent = logs.slice(-8).join('\n');
  }

  window.resetDemo = function () {
    const cap = parseInt(getEl('demo-cap').value);
    cache = new LRU(cap);
    logs.length = 0;
    logs.push(`--- 新建 LRU Cache, 容量=${cap} ---`);
    render();
  };

  window.demoPut = function () {
    const k = parseInt(getEl('demo-key').value);
    const v = parseInt(getEl('demo-val').value);
    const evicted = cache.put(k, v);
    let msg = `put(${k}, ${v})`;
    if (evicted !== null) msg += ` → 淘汰 key=${evicted}`;
    logs.push(msg);
    render();
  };

  window.demoGet = function () {
    const k = parseInt(getEl('demo-key').value);
    const result = cache.get(k);
    logs.push(`get(${k}) → ${result === -1 ? '-1 (未命中)' : result}`);
    render();
  };

  // Init on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.resetDemo());
  } else {
    window.resetDemo();
  }
})();
