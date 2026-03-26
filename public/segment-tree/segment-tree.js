// Segment Tree Interactive Visualization

class SegTree {
  constructor(arr) {
    this.n = arr.length;
    this.tree = new Array(4 * this.n).fill(0);
    this.lazy = new Array(4 * this.n).fill(0);
    this.data = [...arr];
    if (this.n > 0) this._build(1, 0, this.n - 1);
  }

  _build(node, l, r) {
    if (l === r) { this.tree[node] = this.data[l]; return; }
    const mid = (l + r) >> 1;
    this._build(2 * node, l, mid);
    this._build(2 * node + 1, mid + 1, r);
    this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1];
  }

  _pushDown(node) {
    if (this.lazy[node] !== 0) {
      const v = this.lazy[node];
      this.lazy[2 * node] += v;
      this.lazy[2 * node + 1] += v;
      // We need l,r info — store in separate call
      this.lazy[node] = 0;
    }
  }

  query(node, l, r, ql, qr) {
    if (ql <= l && r <= qr) return this.tree[node];
    if (ql > r || qr < l) return 0;
    const mid = (l + r) >> 1;
    return this.query(2 * node, l, mid, ql, qr) +
           this.query(2 * node + 1, mid + 1, r, ql, qr);
  }

  update(node, l, r, idx, val) {
    if (l === r) { this.tree[node] = val; this.data[idx] = val; return; }
    const mid = (l + r) >> 1;
    if (idx <= mid) this.update(2 * node, l, mid, idx, val);
    else this.update(2 * node + 1, mid + 1, r, idx, val);
    this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1];
  }

  queryRange(ql, qr) { return this.query(1, 0, this.n - 1, ql, qr); }
  pointUpdate(idx, val) { this.update(1, 0, this.n - 1, idx, val); }
}

function renderSegTree(st, svgEl, highlightNodes = new Set(), highlightColor = '#f59e0b') {
  svgEl.innerHTML = '';
  const W = 700, H = 320;
  if (st.n === 0) return;

  // Calculate tree depth
  const depth = Math.ceil(Math.log2(st.n)) + 1;
  const positions = new Map();

  // BFS layout
  function layout(node, l, r, x, y, spread) {
    if (l > r || node >= st.tree.length) return;
    positions.set(node, { x, y, l, r, val: st.tree[node] });
    if (l === r) return;
    const mid = (l + r) >> 1;
    const ns = spread * 0.48;
    layout(2 * node, l, mid, x - spread, y + 55, ns);
    layout(2 * node + 1, mid + 1, r, x + spread, y + 55, ns);
  }
  const initSpread = Math.min(W / 3, 50 * st.n);
  layout(1, 0, st.n - 1, W / 2, 30, initSpread);

  // Draw edges
  positions.forEach((pos, node) => {
    [2 * node, 2 * node + 1].forEach(child => {
      if (!positions.has(child)) return;
      const cp = positions.get(child);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', pos.x); line.setAttribute('y1', pos.y);
      line.setAttribute('x2', cp.x); line.setAttribute('y2', cp.y);
      line.setAttribute('stroke', highlightNodes.has(child) ? highlightColor : '#334155');
      line.setAttribute('stroke-width', highlightNodes.has(child) ? '2.5' : '1.5');
      svgEl.appendChild(line);
    });
  });

  // Draw nodes
  positions.forEach((pos, node) => {
    const isHL = highlightNodes.has(node);
    const isLeaf = pos.l === pos.r;
    const r = isLeaf ? 16 : 20;

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', pos.x); circle.setAttribute('cy', pos.y); circle.setAttribute('r', r);
    if (isHL) {
      circle.setAttribute('fill', '#451a03'); circle.setAttribute('stroke', highlightColor); circle.setAttribute('stroke-width', '2.5');
    } else if (isLeaf) {
      circle.setAttribute('fill', '#14532d'); circle.setAttribute('stroke', '#22c55e'); circle.setAttribute('stroke-width', '2');
    } else {
      circle.setAttribute('fill', '#172554'); circle.setAttribute('stroke', '#3b82f6'); circle.setAttribute('stroke-width', '1.5');
    }
    svgEl.appendChild(circle);

    // Value text
    const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    txt.setAttribute('x', pos.x); txt.setAttribute('y', pos.y + 4);
    txt.setAttribute('text-anchor', 'middle'); txt.setAttribute('font-size', isLeaf ? '11' : '12');
    txt.setAttribute('font-weight', '700'); txt.setAttribute('font-family', 'JetBrains Mono');
    txt.setAttribute('fill', isHL ? '#fbbf24' : isLeaf ? '#86efac' : '#93c5fd');
    txt.textContent = pos.val;
    svgEl.appendChild(txt);

    // Range label
    const lbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    lbl.setAttribute('x', pos.x); lbl.setAttribute('y', pos.y - r - 4);
    lbl.setAttribute('text-anchor', 'middle'); lbl.setAttribute('font-size', '8');
    lbl.setAttribute('fill', '#64748b'); lbl.setAttribute('font-family', 'Inter');
    lbl.textContent = pos.l === pos.r ? `[${pos.l}]` : `[${pos.l},${pos.r}]`;
    svgEl.appendChild(lbl);
  });

  return positions;
}

function initSegTreeDemo() {
  const svg = document.getElementById('seg-svg');
  const log = document.getElementById('seg-log');
  const arrInput = document.getElementById('seg-arr');
  const qlInput = document.getElementById('seg-ql');
  const qrInput = document.getElementById('seg-qr');
  const idxInput = document.getElementById('seg-idx');
  const valInput = document.getElementById('seg-val');

  let st = new SegTree([2, 5, 1, 4, 9, 3]);

  function refresh(msg, hl = new Set()) {
    renderSegTree(st, svg, hl);
    if (msg) log.textContent = msg;
  }

  document.getElementById('seg-build').addEventListener('click', () => {
    const arr = arrInput.value.split(',').map(s => parseInt(s.trim())).filter(v => !isNaN(v));
    if (arr.length === 0 || arr.length > 8) { log.textContent = '请输入 1~8 个数字，逗号分隔'; return; }
    st = new SegTree(arr);
    refresh(`✅ 构建完成：[${arr.join(', ')}]，共 ${arr.length} 个元素`);
  });

  document.getElementById('seg-query').addEventListener('click', () => {
    const ql = parseInt(qlInput.value), qr = parseInt(qrInput.value);
    if (isNaN(ql) || isNaN(qr) || ql < 0 || qr >= st.n || ql > qr) {
      log.textContent = `请输入有效范围 [0, ${st.n - 1}]`; return;
    }
    const result = st.queryRange(ql, qr);
    // Find visited nodes for highlighting
    const visited = new Set();
    function trace(node, l, r) {
      if (ql <= l && r <= qr) { visited.add(node); return; }
      if (ql > r || qr < l) return;
      visited.add(node);
      const mid = (l + r) >> 1;
      trace(2 * node, l, mid);
      trace(2 * node + 1, mid + 1, r);
    }
    trace(1, 0, st.n - 1);
    refresh(`🔍 query(${ql}, ${qr}) = ${result}　（黄色节点为查询路径）`, visited);
  });

  document.getElementById('seg-update').addEventListener('click', () => {
    const idx = parseInt(idxInput.value), val = parseInt(valInput.value);
    if (isNaN(idx) || isNaN(val) || idx < 0 || idx >= st.n) {
      log.textContent = `请输入有效索引 [0, ${st.n - 1}]`; return;
    }
    st.pointUpdate(idx, val);
    const visited = new Set();
    function trace(node, l, r) {
      visited.add(node);
      if (l === r) return;
      const mid = (l + r) >> 1;
      if (idx <= mid) trace(2 * node, l, mid);
      else trace(2 * node + 1, mid + 1, r);
    }
    trace(1, 0, st.n - 1);
    refresh(`✅ update(${idx}, ${val}) 完成　（黄色节点为更新路径）`, visited);
  });

  document.getElementById('seg-reset').addEventListener('click', () => {
    arrInput.value = '2, 5, 1, 4, 9, 3';
    st = new SegTree([2, 5, 1, 4, 9, 3]);
    refresh('已重置为默认数组 [2, 5, 1, 4, 9, 3]');
  });

  refresh('数组 [2, 5, 1, 4, 9, 3] 的线段树。试试查询和更新操作！');
}

document.addEventListener('DOMContentLoaded', initSegTreeDemo);
