// Binary Tree Interactive Visualization

class TreeNode {
  constructor(val) { this.val = val; this.left = null; this.right = null; }
}

function buildFromArray(arr) {
  if (!arr.length || arr[0] === null) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;
  while (i < arr.length && queue.length) {
    const node = queue.shift();
    if (i < arr.length && arr[i] !== null) {
      node.left = new TreeNode(arr[i]);
      queue.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i]);
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function renderTree(root, svgEl, highlightSet = new Set(), order = []) {
  svgEl.innerHTML = '';
  if (!root) return;
  const W = 700, positions = new Map();
  let idx = 0;

  function layout(node, x, y, spread) {
    if (!node) return;
    positions.set(node, { x, y, idx: idx++ });
    layout(node.left, x - spread, y + 55, spread * 0.52);
    layout(node.right, x + spread, y + 55, spread * 0.52);
  }
  layout(root, W / 2, 30, W / 4.5);

  // Edges
  positions.forEach((pos, node) => {
    [node.left, node.right].forEach(child => {
      if (!child || !positions.has(child)) return;
      const cp = positions.get(child);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', pos.x); line.setAttribute('y1', pos.y);
      line.setAttribute('x2', cp.x); line.setAttribute('y2', cp.y);
      line.setAttribute('stroke', '#334155'); line.setAttribute('stroke-width', '1.5');
      svgEl.appendChild(line);
    });
  });

  // Order labels
  if (order.length) {
    order.forEach((node, i) => {
      if (!positions.has(node)) return;
      const p = positions.get(node);
      const lbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      lbl.setAttribute('x', p.x + 18); lbl.setAttribute('y', p.y - 10);
      lbl.setAttribute('font-size', '9'); lbl.setAttribute('fill', '#f59e0b');
      lbl.setAttribute('font-family', 'JetBrains Mono'); lbl.setAttribute('font-weight', '600');
      lbl.textContent = i + 1;
      svgEl.appendChild(lbl);
    });
  }

  // Nodes
  positions.forEach((pos, node) => {
    const isHL = highlightSet.has(node);
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', pos.x); circle.setAttribute('cy', pos.y); circle.setAttribute('r', '16');
    circle.setAttribute('fill', isHL ? '#451a03' : '#172554');
    circle.setAttribute('stroke', isHL ? '#f59e0b' : '#3b82f6');
    circle.setAttribute('stroke-width', isHL ? '2.5' : '1.5');
    svgEl.appendChild(circle);

    const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    txt.setAttribute('x', pos.x); txt.setAttribute('y', pos.y + 4);
    txt.setAttribute('text-anchor', 'middle'); txt.setAttribute('font-size', '12');
    txt.setAttribute('font-weight', '700'); txt.setAttribute('font-family', 'JetBrains Mono');
    txt.setAttribute('fill', isHL ? '#fbbf24' : '#93c5fd');
    txt.textContent = node.val;
    svgEl.appendChild(txt);
  });
}

function initBTDemo() {
  const svg = document.getElementById('bt-svg');
  const log = document.getElementById('bt-log');
  const arrInput = document.getElementById('bt-arr');
  let root = buildFromArray([1, 2, 3, 4, 5, 6, 7]);

  function refresh(msg, hl = new Set(), order = []) {
    renderTree(root, svg, hl, order);
    if (msg) log.textContent = msg;
  }

  document.getElementById('bt-build').addEventListener('click', () => {
    const arr = arrInput.value.split(',').map(s => {
      const t = s.trim();
      return t === 'null' || t === '' ? null : parseInt(t);
    });
    root = buildFromArray(arr);
    refresh(`✅ 构建完成，共 ${arr.filter(v => v !== null).length} 个节点`);
  });

  function collectOrder(node, type) {
    const res = [];
    function pre(n) { if (!n) return; res.push(n); pre(n.left); pre(n.right); }
    function ino(n) { if (!n) return; ino(n.left); res.push(n); ino(n.right); }
    function post(n) { if (!n) return; post(n.left); post(n.right); res.push(n); }
    function level(r) {
      if (!r) return;
      const q = [r];
      while (q.length) { const n = q.shift(); res.push(n); if (n.left) q.push(n.left); if (n.right) q.push(n.right); }
    }
    if (type === 'pre') pre(node);
    else if (type === 'in') ino(node);
    else if (type === 'post') post(node);
    else level(node);
    return res;
  }

  ['pre', 'in', 'post', 'level'].forEach(type => {
    document.getElementById(`bt-${type}`).addEventListener('click', () => {
      const order = collectOrder(root, type);
      const names = { pre: '前序', in: '中序', post: '后序', level: '层序' };
      refresh(`${names[type]}遍历：${order.map(n => n.val).join(' → ')}`, new Set(order), order);
    });
  });

  document.getElementById('bt-depth').addEventListener('click', () => {
    function maxDepth(n) { return n ? Math.max(maxDepth(n.left), maxDepth(n.right)) + 1 : 0; }
    refresh(`🌲 最大深度 = ${maxDepth(root)}`);
  });

  document.getElementById('bt-mirror').addEventListener('click', () => {
    function mirror(n) { if (!n) return; [n.left, n.right] = [n.right, n.left]; mirror(n.left); mirror(n.right); }
    mirror(root);
    refresh('🪞 已翻转（镜像）');
  });

  document.getElementById('bt-reset').addEventListener('click', () => {
    arrInput.value = '1, 2, 3, 4, 5, 6, 7';
    root = buildFromArray([1, 2, 3, 4, 5, 6, 7]);
    refresh('已重置');
  });

  refresh('完全二叉树 [1,2,3,4,5,6,7]。试试遍历和操作！');
}

document.addEventListener('DOMContentLoaded', initBTDemo);
