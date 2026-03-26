// Radix Tree (Patricia Trie) Interactive Visualization

class RadixNode {
  constructor(label = '', isEnd = false) {
    this.label = label;
    this.isEnd = isEnd;
    this.children = {};
  }
}

class RadixTree {
  constructor() { this.root = new RadixNode(); }

  insert(word) {
    if (!word) return;
    this._insert(this.root, word + '$');
  }

  _insert(node, s) {
    if (!s.length) { node.isEnd = true; return; }
    for (const [key, child] of Object.entries(node.children)) {
      const cp = this._commonPrefix(key, s);
      if (cp === 0) continue;
      if (cp === key.length && cp === s.length) {
        child.isEnd = true; return;
      }
      if (cp === key.length) {
        this._insert(child, s.slice(cp)); return;
      }
      // Split: cp < key.length
      const splitNode = new RadixNode(key.slice(0, cp), false);
      child.label = key.slice(cp);
      splitNode.children[child.label] = child;
      delete node.children[key];
      node.children[splitNode.label] = splitNode;
      if (cp === s.length) {
        splitNode.isEnd = true;
      } else {
        const newNode = new RadixNode(s.slice(cp), true);
        splitNode.children[newNode.label] = newNode;
      }
      return;
    }
    node.children[s] = new RadixNode(s, true);
  }

  search(word) {
    return this._search(this.root, word + '$');
  }

  _search(node, s) {
    if (!s.length) return node.isEnd;
    for (const [key, child] of Object.entries(node.children)) {
      const cp = this._commonPrefix(key, s);
      if (cp === 0) continue;
      if (cp === key.length) return this._search(child, s.slice(cp));
      return false;
    }
    return false;
  }

  _commonPrefix(a, b) {
    let i = 0;
    while (i < a.length && i < b.length && a[i] === b[i]) i++;
    return i;
  }
}

function renderRadixTree(tree, svgEl, highlightPath = null) {
  svgEl.innerHTML = '';
  const W = 700, H = 340;
  const positions = [];

  function layout(node, x, y, spread, depth) {
    const id = positions.length;
    const displayLabel = node === tree.root ? 'root' : node.label.replace('$', '');
    const hasTerminal = node.label.endsWith('$') || node.isEnd;
    positions.push({ id, node, x, y, label: displayLabel, isEnd: hasTerminal, children: [] });
    const keys = Object.keys(node.children).sort();
    const n = keys.length;
    keys.forEach((k, i) => {
      const child = node.children[k];
      const cx = x + (i - (n - 1) / 2) * Math.max(spread / Math.max(n, 1), 45);
      const cy = y + 65;
      const childId = layout(child, cx, cy, spread * 0.5, depth + 1);
      positions[id].children.push(childId);
    });
    return id;
  }
  layout(tree.root, W / 2, 30, W / 2.5, 0);

  // Draw edges with labels
  positions.forEach(p => {
    p.children.forEach(cid => {
      const cp = positions[cid];
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', p.x); line.setAttribute('y1', p.y);
      line.setAttribute('x2', cp.x); line.setAttribute('y2', cp.y);
      line.setAttribute('stroke', '#334155'); line.setAttribute('stroke-width', '1.5');
      svgEl.appendChild(line);
    });
  });

  // Draw nodes
  positions.forEach(p => {
    const isRoot = p.node === tree.root;
    const w = Math.max(p.label.length * 9 + 16, 30);
    const h = 24;
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', p.x - w / 2); rect.setAttribute('y', p.y - h / 2);
    rect.setAttribute('width', w); rect.setAttribute('height', h);
    rect.setAttribute('rx', '6');
    if (isRoot) {
      rect.setAttribute('fill', '#1e293b'); rect.setAttribute('stroke', '#475569');
    } else if (p.isEnd) {
      rect.setAttribute('fill', '#14532d'); rect.setAttribute('stroke', '#22c55e'); rect.setAttribute('stroke-width', '2');
    } else {
      rect.setAttribute('fill', '#172554'); rect.setAttribute('stroke', '#3b82f6'); rect.setAttribute('stroke-width', '1.5');
    }
    svgEl.appendChild(rect);

    const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    txt.setAttribute('x', p.x); txt.setAttribute('y', p.y + 4);
    txt.setAttribute('text-anchor', 'middle'); txt.setAttribute('font-size', isRoot ? '10' : '11');
    txt.setAttribute('font-weight', '700'); txt.setAttribute('font-family', 'JetBrains Mono');
    txt.setAttribute('fill', isRoot ? '#64748b' : p.isEnd ? '#86efac' : '#93c5fd');
    txt.textContent = isRoot ? '·' : p.label;
    svgEl.appendChild(txt);
  });
}

function initRadixDemo() {
  const svg = document.getElementById('radix-svg');
  const log = document.getElementById('radix-log');
  const input = document.getElementById('radix-input');
  let tree = new RadixTree();

  function refresh(msg) {
    renderRadixTree(tree, svg);
    if (msg) log.textContent = msg;
  }

  document.getElementById('radix-insert').addEventListener('click', () => {
    const w = input.value.trim().toLowerCase().replace(/[^a-z]/g, '');
    if (!w) return;
    tree.insert(w);
    input.value = '';
    refresh(`✅ 插入 "${w}" 成功`);
    input.focus();
  });

  document.getElementById('radix-search').addEventListener('click', () => {
    const w = input.value.trim().toLowerCase().replace(/[^a-z]/g, '');
    if (!w) return;
    const found = tree.search(w);
    refresh(found ? `✅ 找到 "${w}"` : `❌ "${w}" 不在树中`);
  });

  document.getElementById('radix-reset').addEventListener('click', () => {
    tree = new RadixTree();
    refresh('已重置');
  });

  document.getElementById('radix-example').addEventListener('click', () => {
    tree = new RadixTree();
    ['romane', 'romanus', 'romulus', 'rubens', 'ruber', 'rubicon', 'rubicundus'].forEach(w => tree.insert(w));
    refresh('已加载经典示例：romane, romanus, romulus, rubens, ruber, rubicon, rubicundus');
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('radix-insert').click();
  });

  refresh('等待操作... 试试点击"示例"按钮');
}

document.addEventListener('DOMContentLoaded', initRadixDemo);
