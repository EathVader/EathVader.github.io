// AVL Tree Interactive Visualization

class AVLNode {
  constructor(val) {
    this.val = val; this.height = 0;
    this.left = null; this.right = null;
  }
}

class AVLTree {
  constructor() { this.root = null; this.steps = []; }

  height(n) { return n ? n.height : -1; }
  bf(n) { return n ? this.height(n.left) - this.height(n.right) : 0; }
  updateH(n) { if (n) n.height = 1 + Math.max(this.height(n.left), this.height(n.right)); }

  rotateRight(y) {
    const x = y.left, T2 = x.right;
    x.right = y; y.left = T2;
    this.updateH(y); this.updateH(x);
    return x;
  }
  rotateLeft(x) {
    const y = x.right, T2 = y.left;
    y.left = x; x.right = T2;
    this.updateH(x); this.updateH(y);
    return y;
  }

  balance(n) {
    this.updateH(n);
    const b = this.bf(n);
    if (b === 2) {
      if (this.bf(n.left) < 0) {
        this.steps.push(`LR 型：先左旋 ${n.left.val}，再右旋 ${n.val}`);
        n.left = this.rotateLeft(n.left);
      } else {
        this.steps.push(`LL 型：右旋 ${n.val}`);
      }
      return this.rotateRight(n);
    }
    if (b === -2) {
      if (this.bf(n.right) > 0) {
        this.steps.push(`RL 型：先右旋 ${n.right.val}，再左旋 ${n.val}`);
        n.right = this.rotateRight(n.right);
      } else {
        this.steps.push(`RR 型：左旋 ${n.val}`);
      }
      return this.rotateLeft(n);
    }
    return n;
  }

  _insert(n, val) {
    if (!n) return new AVLNode(val);
    if (val < n.val) n.left = this._insert(n.left, val);
    else if (val > n.val) n.right = this._insert(n.right, val);
    else return n;
    return this.balance(n);
  }

  insert(val) {
    this.steps = [`插入 ${val}`];
    this.root = this._insert(this.root, val);
  }
}

function renderAVL(tree, svgEl) {
  svgEl.innerHTML = '';
  if (!tree.root) return;
  const W = svgEl.clientWidth || 600, H = 280;
  const pos = new Map();

  function layout(n, x, y, spread) {
    if (!n) return;
    pos.set(n, { x, y });
    layout(n.left, x - spread, y + 60, spread * 0.55);
    layout(n.right, x + spread, y + 60, spread * 0.55);
  }
  layout(tree.root, W / 2, 35, W / 4.5);

  pos.forEach((p, n) => {
    [n.left, n.right].forEach(c => {
      if (c && pos.has(c)) {
        const cp = pos.get(c);
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', p.x); line.setAttribute('y1', p.y);
        line.setAttribute('x2', cp.x); line.setAttribute('y2', cp.y);
        line.setAttribute('stroke', '#334155'); line.setAttribute('stroke-width', '1.5');
        svgEl.appendChild(line);
      }
    });
  });

  pos.forEach((p, n) => {
    const bf = (n.left ? n.left.height : -1) - (n.right ? n.right.height : -1);
    const isUnbalanced = Math.abs(bf) > 1;
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', p.x); circle.setAttribute('cy', p.y); circle.setAttribute('r', '18');
    circle.setAttribute('fill', isUnbalanced ? '#450a0a' : '#172554');
    circle.setAttribute('stroke', isUnbalanced ? '#ef4444' : '#3b82f6');
    circle.setAttribute('stroke-width', '2');
    svgEl.appendChild(circle);

    const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    txt.setAttribute('x', p.x); txt.setAttribute('y', p.y + 5);
    txt.setAttribute('text-anchor', 'middle'); txt.setAttribute('font-size', '13');
    txt.setAttribute('font-weight', '700'); txt.setAttribute('font-family', 'Inter');
    txt.setAttribute('fill', isUnbalanced ? '#fca5a5' : '#93c5fd');
    txt.textContent = n.val;
    svgEl.appendChild(txt);

    // bf label
    const bfTxt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    bfTxt.setAttribute('x', p.x + 22); bfTxt.setAttribute('y', p.y - 10);
    bfTxt.setAttribute('font-size', '9'); bfTxt.setAttribute('font-family', 'Inter');
    bfTxt.setAttribute('fill', isUnbalanced ? '#ef4444' : '#64748b');
    bfTxt.textContent = `bf=${bf}`;
    svgEl.appendChild(bfTxt);
  });
}

function initAVLDemo() {
  const svg = document.getElementById('avl-svg');
  const log = document.getElementById('avl-log');
  const input = document.getElementById('avl-input');
  const btnInsert = document.getElementById('avl-insert');
  const btnReset = document.getElementById('avl-reset');
  const btnExample = document.getElementById('avl-example');
  let tree = new AVLTree();

  function refresh() {
    renderAVL(tree, svg);
    log.textContent = tree.steps.length ? tree.steps.join(' → ') : '等待操作...';
  }

  btnInsert.addEventListener('click', () => {
    const val = parseInt(input.value);
    if (isNaN(val)) return;
    tree.insert(val);
    input.value = '';
    refresh();
    input.focus();
  });
  input.addEventListener('keydown', e => { if (e.key === 'Enter') btnInsert.click(); });
  btnReset.addEventListener('click', () => { tree = new AVLTree(); tree.steps = []; refresh(); });
  btnExample.addEventListener('click', () => {
    tree = new AVLTree();
    [10, 20, 30, 40, 50, 25].forEach(v => tree.insert(v));
    refresh();
  });
  refresh();
}

document.addEventListener('DOMContentLoaded', initAVLDemo);
