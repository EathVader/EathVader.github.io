// ===== SVG Diagrams =====

function createIntroDiagram() {
  return `<svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" style="max-width:500px">
    <style>
      text { font-family: 'Inter', sans-serif; fill: #e2e8f0; }
      .key { font-size: 14px; font-weight: 600; }
      .prio { font-size: 10px; fill: #94a3b8; }
      .edge { stroke: #475569; stroke-width: 1.5; }
    </style>
    <!-- Tree: root 20(4), left 10(2), right 30(1) -->
    <circle cx="250" cy="50" r="22" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
    <text x="250" y="48" text-anchor="middle" class="key">20</text>
    <text x="250" y="62" text-anchor="middle" class="prio">prio:4</text>
    
    <circle cx="150" cy="110" r="22" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
    <text x="150" y="108" text-anchor="middle" class="key">10</text>
    <text x="150" y="122" text-anchor="middle" class="prio">prio:2</text>
    
    <circle cx="350" cy="110" r="22" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
    <text x="350" y="108" text-anchor="middle" class="key">30</text>
    <text x="350" y="122" text-anchor="middle" class="prio">prio:1</text>
    
    <line x1="228" y1="50" x2="172" y2="110" class="edge"/>
    <line x1="272" y1="50" x2="328" y2="110" class="edge"/>
    
    <text x="80" y="180" font-size="12" fill="#94a3b8">BST: 10 &lt; 20 &lt; 30</text>
    <text x="80" y="195" font-size="12" fill="#94a3b8">Heap: 4 > 2 > 1</text>
  </svg>`;
}

function createStructureDiagram() {
  return `<svg viewBox="0 0 400 150" xmlns="http://www.w3.org/2000/svg" style="max-width:400px">
    <style>
      text { font-family: 'Inter', sans-serif; fill: #e2e8f0; }
      .key { font-size: 13px; font-weight: 600; }
      .prio { font-size: 10px; fill: #22c55e; }
      .edge { stroke: #475569; stroke-width: 1.5; }
    </style>
    <rect x="150" y="20" width="100" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
    <text x="200" y="50" text-anchor="middle" class="key">key</text>
    <text x="200" y="70" text-anchor="middle" class="prio">priority: random()</text>
    <text x="200" y="90" text-anchor="middle" font-size="10" fill="#94a3b8">left | right</text>
  </svg>`;
}

function createInsertDiagram() {
  return `<svg viewBox="0 0 500 220" xmlns="http://www.w3.org/2000/svg" style="max-width:500px">
    <style>
      text { font-family: 'Inter', sans-serif; fill: #e2e8f0; }
      .key { font-size: 14px; font-weight: 600; }
      .prio { font-size: 10px; fill: #94a3b8; }
      .edge { stroke: #475569; stroke-width: 1.5; }
      .new { stroke: #22c55e; stroke-width: 2; stroke-dasharray: 4; }
    </style>
    <!-- Before: 20(4) is root, insert 25(2) to right -->
    <text x="80" y="25" font-size="12" fill="#f59e0b">Before: Insert 25 with priority 2</text>
    
    <circle cx="150" cy="80" r="22" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
    <text x="150" y="78" text-anchor="middle" class="key">20</text>
    <text x="150" y="92" text-anchor="middle" class="prio">4</text>
    
    <circle cx="250" cy="140" r="22" fill="#14532d" stroke="#22c55e" stroke-width="2" class="new"/>
    <text x="250" y="138" text-anchor="middle" class="key" fill="#22c55e">25</text>
    <text x="250" y="152" text-anchor="middle" class="prio" fill="#22c55e">2</text>
    
    <line x1="172" y1="80" x2="228" y2="140" class="edge"/>
    
    <!-- Arrow -->
    <text x="350" y="100" font-size="20" fill="#3b82f6">→</text>
    
    <!-- After: rotate right, 25 becomes root -->
    <text x="420" y="25" font-size="12" fill="#22c55e">After: Right rotation!</text>
    
    <circle cx="450" cy="80" r="22" fill="#14532d" stroke="#22c55e" stroke-width="2"/>
    <text x="450" y="78" text-anchor="middle" class="key" fill="#22c55e">25</text>
    <text x="450" y="92" text-anchor="middle" class="prio">2</text>
    
    <circle cx="380" cy="140" r="22" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
    <text x="380" y="138" text-anchor="middle" class="key">20</text>
    <text x="380" y="152" text-anchor="middle" class="prio">4</text>
    
    <line x1="428" y1="100" x2="392" y2="140" class="edge"/>
  </svg>`;
}

function createDeleteDiagram() {
  return `<svg viewBox="0 0 500 180" xmlns="http://www.w3.org/2000/svg" style="max-width:500px">
    <style>
      text { font-family: 'Inter', sans-serif; fill: #e2e8f0; }
      .key { font-size: 14px; font-weight: 600; }
      .prio { font-size: 10px; fill: #94a3b8; }
      .edge { stroke: #475569; stroke-width: 1.5; }
      .del { stroke: #ef4444; stroke-width: 2; stroke-dasharray: 4; }
    </style>
    <text x="50" y="25" font-size="12" fill="#f59e0b">Delete 30: rotate down to leaf</text>
    
    <!-- 20 is root, delete 30 -->
    <circle cx="120" cy="60" r="22" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
    <text x="120" y="58" text-anchor="middle" class="key">20</text>
    <text x="120" y="72" text-anchor="middle" class="prio">4</text>
    
    <!-- 30 is target to delete -->
    <circle cx="220" cy="60" r="22" fill="#450a0a" stroke="#ef4444" stroke-width="2" class="del"/>
    <text x="220" y="58" text-anchor="middle" class="key" fill="#ef4444">30</text>
    <text x="220" y="72" text-anchor="middle" class="prio">1</text>
    
    <circle cx="170" cy="110" r="22" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
    <text x="170" y="108" text-anchor="middle" class="key">10</text>
    <text x="170" y="122" text-anchor="middle" class="prio">2</text>
    
    <circle cx="270" cy="110" r="22" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
    <text x="270" y="108" text-anchor="middle" class="key">40</text>
    <text x="270" y="122" text-anchor="middle" class="prio">3</text>
    
    <line x1="142" y1="60" x2="170" y2="110" class="edge"/>
    <line x1="198" y1="60" x2="248" y2="110" class="edge"/>
  </svg>`;
}

function createRotateRDiagram() {
  return `<svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg" style="max-width:400px">
    <style>
      text { font-family: 'Inter', sans-serif; fill: #e2e8f0; }
      .key { font-size: 14px; font-weight: 600; }
      .label { font-size: 11px; fill: #94a3b8; }
    </style>
    <text x="200" y="20" text-anchor="middle" font-size="13" fill="#60a5fa">Right Rotation (绕y右旋)</text>
    
    <!-- Before -->
    <text x="80" y="50" font-size="11" fill="#94a3b8">Before</text>
    <circle cx="100" cy="80" r="20" fill="#1e3a5f" stroke="#3b82f6"/>
    <text x="100" y="78" text-anchor="middle" class="key">y</text>
    <circle cx="60" cy="130" r="20" fill="#14532d" stroke="#22c55e"/>
    <text x="60" y="128" text-anchor="middle" class="key" fill="#22c55e">x</text>
    <circle cx="140" cy="130" r="20" fill="#1e3a5f" stroke="#3b82f6"/>
    <text x="140" y="128" text-anchor="middle" class="key">T2</text>
    <line x1="85" y1="95" x2="65" y2="115" stroke="#475569"/>
    <line x1="115" y1="95" x2="135" y2="115" stroke="#475569"/>
    
    <!-- Arrow -->
    <text x="200" y="110" font-size="18" fill="#3b82f6">→</text>
    
    <!-- After -->
    <text x="320" y="50" font-size="11" fill="#94a3b8">After</text>
    <circle cx="300" cy="80" r="20" fill="#14532d" stroke="#22c55e"/>
    <text x="300" y="78" text-anchor="middle" class="key" fill="#22c55e">x</text>
    <circle cx="260" cy="130" r="20" fill="#1e3a5f" stroke="#3b82f6"/>
    <text x="260" y="128" text-anchor="middle" class="key">T1</text>
    <circle cx="340" cy="130" r="20" fill="#1e3a5f" stroke="#3b82f6"/>
    <text x="340" y="128" text-anchor="middle" class="key">y</text>
    <line x1="285" y1="95" x2="265" y2="115" stroke="#475569"/>
    <line x1="315" y1="95" x2="335" y2="115" stroke="#475569"/>
  </svg>`;
}

function createRotateLDiagram() {
  return `<svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg" style="max-width:400px">
    <style>
      text { font-family: 'Inter', sans-serif; fill: #e2e8f0; }
      .key { font-size: 14px; font-weight: 600; }
      .label { font-size: 11px; fill: #94a3b8; }
    </style>
    <text x="200" y="20" text-anchor="middle" font-size="13" fill="#60a5fa">Left Rotation (绕x左旋)</text>
    
    <!-- Before -->
    <text x="80" y="50" font-size="11" fill="#94a3b8">Before</text>
    <circle cx="100" cy="80" r="20" fill="#1e3a5f" stroke="#3b82f6"/>
    <text x="100" y="78" text-anchor="middle" class="key">x</text>
    <circle cx="140" cy="130" r="20" fill="#14532d" stroke="#22c55e"/>
    <text x="140" y="128" text-anchor="middle" class="key" fill="#22c55e">y</text>
    <circle cx="60" cy="130" r="20" fill="#1e3a5f" stroke="#3b82f6"/>
    <text x="60" y="128" text-anchor="middle" class="key">T1</text>
    <line x1="115" y1="95" x2="135" y2="115" stroke="#475569"/>
    <line x1="85" y1="95" x2="65" y2="115" stroke="#475569"/>
    
    <!-- Arrow -->
    <text x="200" y="110" font-size="18" fill="#3b82f6">→</text>
    
    <!-- After -->
    <text x="320" y="50" font-size="11" fill="#94a3b8">After</text>
    <circle cx="300" cy="80" r="20" fill="#14532d" stroke="#22c55e"/>
    <text x="300" y="78" text-anchor="middle" class="key" fill="#22c55e">y</text>
    <circle cx="340" cy="130" r="20" fill="#1e3a5f" stroke="#3b82f6"/>
    <text x="340" y="128" text-anchor="middle" class="key">T2</text>
    <circle cx="260" cy="130" r="20" fill="#1e3a5f" stroke="#3b82f6"/>
    <text x="260" y="128" text-anchor="middle" class="key">x</text>
    <line x1="315" y1="95" x2="335" y2="115" stroke="#475569"/>
    <line x1="285" y1="95" x2="265" y2="115" stroke="#475569"/>
  </svg>`;
}

// ===== Interactive Demo =====

class TreapNode {
  constructor(key) {
    this.key = key;
    this.priority = Math.random();
    this.left = null;
    this.right = null;
  }
}

let root = null;

function rotateRight(y) {
  const x = y.left;
  y.left = x.right;
  x.right = y;
  return x;
}

function rotateLeft(x) {
  const y = x.right;
  x.right = y.left;
  y.left = x;
  return y;
}

function treapInsert(node, key) {
  if (!node) return new TreapNode(key);
  
  if (key < node.key) {
    node.left = treapInsert(node.left, key);
  } else if (key > node.key) {
    node.right = treapInsert(node.right, key);
  } else {
    return node;
  }
  
  if (node.left && node.left.priority > node.priority) {
    node = rotateRight(node);
  } else if (node.right && node.right.priority > node.priority) {
    node = rotateLeft(node);
  }
  
  return node;
}

function treapDelete(node, key) {
  if (!node) return null;
  
  if (key < node.key) {
    node.left = treapDelete(node.left, key);
  } else if (key > node.key) {
    node.right = treapDelete(node.right, key);
  } else {
    if (!node.left) return node.right;
    if (!node.right) return node.left;
    
    if (node.left.priority > node.right.priority) {
      node = rotateRight(node);
      node.right = treapDelete(node.right, key);
    } else {
      node = rotateLeft(node);
      node.left = treapDelete(node.left, key);
    }
  }
  
  return node;
}

function renderTree() {
  const canvas = document.getElementById('tree-canvas');
  if (!root) {
    canvas.innerHTML = '<p style="color:#64748b">树为空</p>';
    return;
  }
  
  const width = 800;
  const height = 300;
  
  let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="max-width:100%">`;
  svg += `<style>
    .node circle { stroke-width: 2; }
    .node text { font-family: 'Inter', sans-serif; text-anchor: middle; }
    .key { font-size: 12px; font-weight: 600; fill: #fff; }
    .prio { font-size: 9px; fill: #94a3b8; }
    .edge { stroke: #475569; stroke-width: 1.5; }
  </style>`;
  
  const positions = [];
  const levelWidth = 80;
  const startX = width / 2;
  
  function traverse(node, x, y, level) {
    if (!node) return;
    
    const spread = levelWidth * Math.pow(1.3, level);
    const leftX = x - spread / 2;
    const rightX = x + spread / 2;
    const nextY = y + 50;
    
    positions.push({ node, x, y });
    
    if (node.left) {
      svg += `<line x1="${x}" y1="${y}" x2="${leftX}" y2="${nextY}" class="edge"/>`;
      traverse(node.left, leftX, nextY, level + 1);
    }
    if (node.right) {
      svg += `<line x1="${x}" y1="${y}" x2="${rightX}" y2="${nextY}" class="edge"/>`;
      traverse(node.right, rightX, nextY, level + 1);
    }
  }
  
  traverse(root, startX, 40, 0);
  
  positions.forEach(p => {
    const color = p.node.priority > 0.5 ? '#22c55e' : p.node.priority > 0.3 ? '#3b82f6' : '#f59e0b';
    svg += `<g class="node">
      <circle cx="${p.x}" cy="${p.y}" r="18" fill="#1e3a5f" stroke="${color}"/>
      <text x="${p.x}" y="${p.y - 2}" class="key">${p.node.key}</text>
      <text x="${p.x}" y="${p.y + 10}" class="prio">${p.node.priority.toFixed(2)}</text>
    </g>`;
  });
  
  svg += '</svg>';
  canvas.innerHTML = svg;
}

function insertKey() {
  const input = document.getElementById('key-input');
  const key = parseInt(input.value);
  if (isNaN(key)) return;
  
  root = treapInsert(root, key);
  renderTree();
  updateOutput();
}

function deleteKey() {
  const input = document.getElementById('key-input');
  const key = parseInt(input.value);
  if (isNaN(key)) return;
  
  root = treapDelete(root, key);
  renderTree();
  updateOutput();
}

function randomInsert() {
  const keys = [];
  while (keys.length < 10) {
    const k = Math.floor(Math.random() * 100) + 1;
    if (!keys.includes(k)) keys.push(k);
  }
  keys.forEach(k => root = treapInsert(root, k));
  renderTree();
  updateOutput();
}

function clearTree() {
  root = null;
  renderTree();
  updateOutput();
}

function updateOutput() {
  const output = document.getElementById('demo-output');
  if (!root) {
    output.innerHTML = '树为空';
    return;
  }
  
  let count = 0;
  function countNodes(n) { if (n) { count++; countNodes(n.left); countNodes(n.right); } }
  countNodes(root);
  
  output.innerHTML = `节点数: ${count}\n点击"插入"添加更多节点，或"删除"移除节点`;
}

function initDemo() {
  document.getElementById('key-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') insertKey();
  });
  renderTree();
}

// Scroll to top
window.addEventListener('scroll', () => {
  const btn = document.getElementById('back-top');
  if (btn) btn.classList.toggle('show', window.scrollY > 400);
});
