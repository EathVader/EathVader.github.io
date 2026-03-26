// Trie Interactive Visualization

class TrieNode {
  constructor(char = '') {
    this.char = char;
    this.children = {};
    this.isEnd = false;
    this.count = 0;
  }
}

class Trie {
  constructor() { this.root = new TrieNode(); }

  insert(word) {
    let node = this.root;
    for (const c of word) {
      if (!node.children[c]) node.children[c] = new TrieNode(c);
      node = node.children[c];
      node.count++;
    }
    node.isEnd = true;
    return true;
  }

  search(word) {
    let node = this.root;
    for (const c of word) {
      if (!node.children[c]) return false;
      node = node.children[c];
    }
    return node.isEnd;
  }

  prefixSearch(prefix) {
    let node = this.root;
    for (const c of prefix) {
      if (!node.children[c]) return [];
      node = node.children[c];
    }
    const results = [];
    const dfs = (n, path) => {
      if (n.isEnd) results.push(path);
      for (const [c, child] of Object.entries(n.children)) dfs(child, path + c);
    };
    dfs(node, prefix);
    return results;
  }
}

function renderTrie(trie, svgEl, highlight = null, highlightColor = '#3b82f6') {
  svgEl.innerHTML = '';
  const W = svgEl.clientWidth || 700, H = 320;
  const positions = new Map();

  // Layout: BFS to assign positions
  const queue = [{ node: trie.root, x: W / 2, y: 30, spread: W / 3 }];
  const allNodes = [];
  while (queue.length) {
    const { node, x, y, spread } = queue.shift();
    positions.set(node, { x, y });
    allNodes.push(node);
    const keys = Object.keys(node.children);
    const n = keys.length;
    keys.forEach((c, i) => {
      const child = node.children[c];
      const cx = x + (i - (n - 1) / 2) * Math.max(spread / Math.max(n, 1), 30);
      const cy = y + 60;
      queue.push({ node: child, x: cx, y: cy, spread: spread * 0.6 });
    });
  }

  // Draw edges
  positions.forEach((pos, node) => {
    for (const child of Object.values(node.children)) {
      if (!positions.has(child)) continue;
      const cp = positions.get(child);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', pos.x); line.setAttribute('y1', pos.y);
      line.setAttribute('x2', cp.x); line.setAttribute('y2', cp.y);
      line.setAttribute('stroke', '#334155'); line.setAttribute('stroke-width', '1.5');
      svgEl.appendChild(line);
      // Edge label
      const mx = (pos.x + cp.x) / 2, my = (pos.y + cp.y) / 2;
      const lbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      lbl.setAttribute('x', mx + 6); lbl.setAttribute('y', my);
      lbl.setAttribute('font-size', '10'); lbl.setAttribute('fill', '#64748b');
      lbl.setAttribute('font-family', 'JetBrains Mono');
      lbl.textContent = child.char;
      svgEl.appendChild(lbl);
    }
  });

  // Draw nodes
  positions.forEach((pos, node) => {
    const isHighlighted = highlight && node.char === highlight;
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', pos.x); circle.setAttribute('cy', pos.y); circle.setAttribute('r', '14');
    if (node === trie.root) {
      circle.setAttribute('fill', '#1e293b'); circle.setAttribute('stroke', '#475569');
    } else if (node.isEnd) {
      circle.setAttribute('fill', '#14532d'); circle.setAttribute('stroke', '#22c55e');
      circle.setAttribute('stroke-width', '2');
    } else {
      circle.setAttribute('fill', '#172554'); circle.setAttribute('stroke', '#3b82f6');
    }
    svgEl.appendChild(circle);

    const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    txt.setAttribute('x', pos.x); txt.setAttribute('y', pos.y + 4);
    txt.setAttribute('text-anchor', 'middle'); txt.setAttribute('font-size', '12');
    txt.setAttribute('font-weight', '700'); txt.setAttribute('font-family', 'JetBrains Mono');
    txt.setAttribute('fill', node === trie.root ? '#64748b' : node.isEnd ? '#86efac' : '#93c5fd');
    txt.textContent = node === trie.root ? '·' : node.char;
    svgEl.appendChild(txt);
  });
}

function initTrieDemo() {
  const svg = document.getElementById('trie-svg');
  const log = document.getElementById('trie-log');
  const input = document.getElementById('trie-input');
  let trie = new Trie();

  function refresh(msg) {
    renderTrie(trie, svg);
    if (msg) log.textContent = msg;
  }

  document.getElementById('trie-insert').addEventListener('click', () => {
    const w = input.value.trim().toLowerCase().replace(/[^a-z]/g, '');
    if (!w) return;
    trie.insert(w);
    input.value = '';
    refresh(`✅ 插入 "${w}" 成功`);
    input.focus();
  });

  document.getElementById('trie-search').addEventListener('click', () => {
    const w = input.value.trim().toLowerCase();
    if (!w) return;
    const found = trie.search(w);
    refresh(found ? `✅ 找到 "${w}"` : `❌ "${w}" 不在 Trie 中`);
  });

  document.getElementById('trie-prefix').addEventListener('click', () => {
    const w = input.value.trim().toLowerCase();
    if (!w) return;
    const results = trie.prefixSearch(w);
    refresh(results.length ? `🔍 前缀 "${w}" 的所有单词：${results.join(', ')}` : `❌ 没有以 "${w}" 开头的单词`);
  });

  document.getElementById('trie-reset').addEventListener('click', () => {
    trie = new Trie();
    refresh('已重置');
  });

  document.getElementById('trie-example').addEventListener('click', () => {
    trie = new Trie();
    ['tea', 'ten', 'to', 'in', 'inn', 'apple', 'app'].forEach(w => trie.insert(w));
    refresh('已加载示例：tea, ten, to, in, inn, apple, app');
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('trie-insert').click();
  });

  refresh('等待操作...');
}

document.addEventListener('DOMContentLoaded', initTrieDemo);
