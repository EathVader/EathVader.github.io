// Red-Black Tree Interactive Visualization
const RED = 'red', BLACK = 'black';

class Node {
  constructor(val, color = RED) {
    this.val = val; this.color = color;
    this.left = null; this.right = null; this.parent = null;
  }
}

class RBTree {
  constructor() { this.root = null; this.steps = []; }

  rotateLeft(x) {
    const y = x.right;
    x.right = y.left;
    if (y.left) y.left.parent = x;
    y.parent = x.parent;
    if (!x.parent) this.root = y;
    else if (x === x.parent.left) x.parent.left = y;
    else x.parent.right = y;
    y.left = x; x.parent = y;
  }

  rotateRight(x) {
    const y = x.left;
    x.left = y.right;
    if (y.right) y.right.parent = x;
    y.parent = x.parent;
    if (!x.parent) this.root = y;
    else if (x === x.parent.right) x.parent.right = y;
    else x.parent.left = y;
    y.right = x; x.parent = y;
  }

  insert(val) {
    const node = new Node(val);
    let y = null, x = this.root;
    while (x) { y = x; x = val < x.val ? x.left : x.right; }
    node.parent = y;
    if (!y) this.root = node;
    else if (val < y.val) y.left = node;
    else y.right = node;
    this.steps.push({ action: `插入 ${val}（红色）`, highlight: val });
    this.fixInsert(node);
    this.snapshot();
  }

  fixInsert(z) {
    while (z.parent && z.parent.color === RED) {
      if (z.parent === z.parent.parent?.left) {
        const y = z.parent.parent.right;
        if (y && y.color === RED) {
          z.parent.color = BLACK; y.color = BLACK;
          z.parent.parent.color = RED; z = z.parent.parent;
          this.steps.push({ action: `Case 1：叔叔红 → 变色，向上`, highlight: z.val });
        } else {
          if (z === z.parent.right) {
            z = z.parent; this.rotateLeft(z);
            this.steps.push({ action: `Case 2：右孩子 → 左旋`, highlight: z.val });
          }
          z.parent.color = BLACK; z.parent.parent.color = RED;
          this.rotateRight(z.parent.parent);
          this.steps.push({ action: `Case 3：左孩子 → 变色+右旋`, highlight: z.val });
        }
      } else {
        const y = z.parent.parent?.left;
        if (y && y.color === RED) {
          z.parent.color = BLACK; y.color = BLACK;
          z.parent.parent.color = RED; z = z.parent.parent;
          this.steps.push({ action: `Case 1：叔叔红 → 变色，向上`, highlight: z.val });
        } else {
          if (z === z.parent.left) {
            z = z.parent; this.rotateRight(z);
            this.steps.push({ action: `Case 2：左孩子 → 右旋`, highlight: z.val });
          }
          z.parent.color = BLACK; z.parent.parent.color = RED;
          this.rotateLeft(z.parent.parent);
          this.steps.push({ action: `Case 3：右孩子 → 变色+左旋`, highlight: z.val });
        }
      }
    }
    this.root.color = BLACK;
  }

  snapshot() {
    // Serialize tree state for rendering
  }
}

// SVG Renderer
function renderTree(tree, svgEl) {
  svgEl.innerHTML = '';
  if (!tree.root) { return; }
  const positions = new Map();
  const W = svgEl.clientWidth || 600, H = svgEl.clientHeight || 300;

  function layout(node, x, y, spread) {
    if (!node) return;
    positions.set(node, { x, y });
    layout(node.left, x - spread, y + 55, spread * 0.55);
    layout(node.right, x + spread, y + 55, spread * 0.55);
  }
  layout(tree.root, W / 2, 35, W / 4.5);

  // Draw edges first
  positions.forEach((pos, node) => {
    [node.left, node.right].forEach(child => {
      if (child && positions.has(child)) {
        const cp = positions.get(child);
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', pos.x); line.setAttribute('y1', pos.y);
        line.setAttribute('x2', cp.x); line.setAttribute('y2', cp.y);
        line.setAttribute('stroke', '#334155'); line.setAttribute('stroke-width', '1.5');
        svgEl.appendChild(line);
      }
    });
  });

  // Draw nodes
  positions.forEach((pos, node) => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', pos.x); circle.setAttribute('cy', pos.y); circle.setAttribute('r', '18');
    if (node.color === RED) {
      circle.setAttribute('fill', '#7f1d1d'); circle.setAttribute('stroke', '#ef4444'); circle.setAttribute('stroke-width', '2');
    } else {
      circle.setAttribute('fill', '#1e293b'); circle.setAttribute('stroke', '#e2e8f0'); circle.setAttribute('stroke-width', '2');
    }
    g.appendChild(circle);
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', pos.x); text.setAttribute('y', pos.y + 5);
    text.setAttribute('text-anchor', 'middle'); text.setAttribute('font-size', '13');
    text.setAttribute('font-weight', '700'); text.setAttribute('font-family', 'Inter');
    text.setAttribute('fill', node.color === RED ? '#fca5a5' : '#f8fafc');
    text.textContent = node.val;
    g.appendChild(text);
    svgEl.appendChild(g);
  });
}

// Interactive Demo
function initDemo() {
  const svg = document.getElementById('rbt-svg');
  const log = document.getElementById('rbt-log');
  const input = document.getElementById('rbt-input');
  const btnInsert = document.getElementById('rbt-insert');
  const btnReset = document.getElementById('rbt-reset');
  const btnExample = document.getElementById('rbt-example');
  let tree = new RBTree();

  function refresh() {
    renderTree(tree, svg);
    log.textContent = tree.steps.length ? tree.steps.map((s, i) => `${i + 1}. ${s.action}`).join('\n') : '等待操作...';
  }

  btnInsert.addEventListener('click', () => {
    const val = parseInt(input.value);
    if (isNaN(val)) return;
    tree.steps = [];
    tree.insert(val);
    input.value = '';
    refresh();
    input.focus();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') btnInsert.click();
  });

  btnReset.addEventListener('click', () => {
    tree = new RBTree(); tree.steps = [];
    refresh();
  });

  btnExample.addEventListener('click', () => {
    tree = new RBTree(); tree.steps = [];
    [7, 3, 18, 10, 22, 8, 11, 26].forEach(v => tree.insert(v));
    refresh();
  });

  refresh();
}

// Step-by-step walkthrough
function initWalkthrough() {
  const svg = document.getElementById('walk-svg');
  const info = document.getElementById('walk-info');
  const btnNext = document.getElementById('walk-next');
  const btnPrev = document.getElementById('walk-prev');
  const btnRestart = document.getElementById('walk-restart');

  const values = [7, 3, 18, 10, 22, 8, 11, 26];
  let step = 0;
  const trees = [];
  const descriptions = [];

  // Pre-compute all states
  const t = new RBTree();
  trees.push(null); descriptions.push('空树，准备开始插入');
  values.forEach(v => {
    t.steps = [];
    t.insert(v);
    // Deep clone tree for snapshot
    trees.push(JSON.parse(JSON.stringify(t, (k, v) => k === 'parent' ? undefined : v)));
    const desc = [`插入 ${v}`].concat(t.steps.map(s => s.action)).join(' → ');
    descriptions.push(desc);
  });

  function rebuildTree(data) {
    if (!data || !data.root) return new RBTree();
    const tree = new RBTree();
    function rebuild(d, parent) {
      if (!d) return null;
      const n = new Node(d.val, d.color);
      n.parent = parent;
      n.left = rebuild(d.left, n);
      n.right = rebuild(d.right, n);
      return n;
    }
    tree.root = rebuild(data.root, null);
    return tree;
  }

  function render() {
    const display = rebuildTree(trees[step]);
    renderTree(display, svg);
    info.textContent = `[${step}/${values.length}] ${descriptions[step]}`;
    btnPrev.disabled = step === 0;
    btnNext.disabled = step >= values.length;
  }

  btnNext.addEventListener('click', () => { if (step < values.length) { step++; render(); } });
  btnPrev.addEventListener('click', () => { if (step > 0) { step--; render(); } });
  btnRestart.addEventListener('click', () => { step = 0; render(); });
  render();
}

document.addEventListener('DOMContentLoaded', () => { initDemo(); initWalkthrough(); });
