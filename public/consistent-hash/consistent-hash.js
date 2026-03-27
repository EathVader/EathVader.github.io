// ===== SVG Diagrams =====

function createProblemDiagram() {
  return `<svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg" style="max-width:700px">
    <style>
      text { font-family: 'Inter', sans-serif; fill: #e2e8f0; }
      .label { font-size: 12px; fill: #94a3b8; }
      .title-text { font-size: 13px; font-weight: 600; }
      .strike { text-decoration: line-through; fill: #ef4444; }
    </style>
    <!-- Before -->
    <text x="170" y="20" text-anchor="middle" class="title-text" fill="#60a5fa">hash(key) % 3</text>
    <rect x="20" y="35" width="80" height="32" rx="6" fill="#1e3a5f" stroke="#3b82f6"/>
    <text x="60" y="56" text-anchor="middle" font-size="12">Server 0</text>
    <rect x="130" y="35" width="80" height="32" rx="6" fill="#1e3a5f" stroke="#3b82f6"/>
    <text x="170" y="56" text-anchor="middle" font-size="12">Server 1</text>
    <rect x="240" y="35" width="80" height="32" rx="6" fill="#1e3a5f" stroke="#3b82f6"/>
    <text x="280" y="56" text-anchor="middle" font-size="12">Server 2</text>
    ${[0,1,2,3,4,5].map((i) => {
      const x = 40 + i * 55;
      const s = i % 3;
      const tx = 60 + s * 110;
      return `<rect x="${x}" y="90" width="44" height="24" rx="4" fill="#14532d" stroke="#22c55e"/>
        <text x="${x+22}" y="106" text-anchor="middle" font-size="10">key${i}</text>
        <line x1="${x+22}" y1="88" x2="${tx}" y2="67" stroke="#334155" stroke-dasharray="3"/>`;
    }).join('')}
    <text x="170" y="140" text-anchor="middle" class="label">✅ 均匀分布，一切正常</text>

    <!-- After: Server 1 down -->
    <text x="530" y="20" text-anchor="middle" class="title-text" fill="#ef4444">Server 1 宕机 → hash(key) % 2</text>
    <rect x="400" y="35" width="80" height="32" rx="6" fill="#1e3a5f" stroke="#3b82f6"/>
    <text x="440" y="56" text-anchor="middle" font-size="12">Server 0</text>
    <rect x="500" y="35" width="80" height="32" rx="6" fill="#451a03" stroke="#ef4444" stroke-dasharray="4"/>
    <text x="540" y="56" text-anchor="middle" font-size="12" fill="#ef4444">Server 1 ✗</text>
    <rect x="610" y="35" width="80" height="32" rx="6" fill="#1e3a5f" stroke="#3b82f6"/>
    <text x="650" y="56" text-anchor="middle" font-size="12">Server 2</text>
    ${[0,1,2,3,4,5].map((i) => {
      const x = 410 + i * 48;
      const oldS = i % 3;
      const newS = i % 2;
      const changed = oldS !== newS;
      const tx = 440 + newS * 210;
      return `<rect x="${x}" y="90" width="38" height="24" rx="4" fill="${changed ? '#451a03' : '#14532d'}" stroke="${changed ? '#f59e0b' : '#22c55e'}"/>
        <text x="${x+19}" y="106" text-anchor="middle" font-size="10"${changed ? ' fill="#f59e0b"' : ''}>key${i}</text>
        <line x1="${x+19}" y1="88" x2="${tx}" y2="67" stroke="${changed ? '#f59e0b' : '#334155'}" stroke-dasharray="3"/>`;
    }).join('')}
    <text x="530" y="140" text-anchor="middle" class="label" fill="#f59e0b">⚠️ 大部分 key 重新映射！</text>

    <!-- Arrow -->
    <line x1="340" y1="75" x2="380" y2="75" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrow)"/>
    <defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#60a5fa"/></marker></defs>
  </svg>`;
}

function createRingDiagram() {
  const cx = 200, cy = 150, r = 110;
  const positions = [
    { angle: -90, label: '0', sub: '(2³²)' },
    { angle: 0, label: '2³⁰', sub: '' },
    { angle: 90, label: '2³¹', sub: '' },
    { angle: 180, label: '3·2³⁰', sub: '' },
  ];
  let marks = positions.map(p => {
    const rad = p.angle * Math.PI / 180;
    const x = cx + r * Math.cos(rad);
    const y = cy + r * Math.sin(rad);
    const lx = cx + (r + 25) * Math.cos(rad);
    const ly = cy + (r + 25) * Math.sin(rad);
    return `<circle cx="${x}" cy="${y}" r="3" fill="#94a3b8"/>
      <text x="${lx}" y="${ly + 4}" text-anchor="middle" font-size="11" fill="#94a3b8">${p.label}</text>`;
  }).join('');

  return `<svg viewBox="0 0 400 310" xmlns="http://www.w3.org/2000/svg" style="max-width:400px">
    <style>text { font-family: 'Inter', sans-serif; }</style>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#475569" stroke-width="2.5"/>
    <!-- Clockwise arrow -->
    <path d="M ${cx+r+8},${cy-15} A ${r+8} ${r+8} 0 0 1 ${cx+r+8},${cy+15}" fill="none" stroke="#60a5fa" stroke-width="1.5" marker-end="url(#arrowB)"/>
    <text x="${cx+r+20}" y="${cy+4}" font-size="10" fill="#60a5fa">顺时针</text>
    ${marks}
    <text x="${cx}" y="${cy}" text-anchor="middle" font-size="13" fill="#e2e8f0" font-weight="600">Hash Space</text>
    <text x="${cx}" y="${cy+18}" text-anchor="middle" font-size="11" fill="#94a3b8">[0, 2³²-1]</text>
    <defs><marker id="arrowB" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#60a5fa"/></marker></defs>
  </svg>`;
}

function createMappingDiagram() {
  const cx = 220, cy = 170, r = 120;
  const nodes = [
    { angle: -60, name: 'A', color: '#3b82f6' },
    { angle: 60, name: 'B', color: '#22c55e' },
    { angle: 180, name: 'C', color: '#f59e0b' },
  ];
  const keys = [
    { angle: -20, name: 'key1', target: 'B' },
    { angle: 100, name: 'key2', target: 'C' },
    { angle: 220, name: 'key3', target: 'A' },
  ];

  let svg = `<svg viewBox="0 0 440 360" xmlns="http://www.w3.org/2000/svg" style="max-width:440px">
    <style>text { font-family: 'Inter', sans-serif; }</style>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#475569" stroke-width="2"/>`;

  // Draw arcs showing ownership ranges
  nodes.forEach((n, i) => {
    const rad = n.angle * Math.PI / 180;
    const x = cx + r * Math.cos(rad);
    const y = cy + r * Math.sin(rad);
    svg += `<circle cx="${x}" cy="${y}" r="14" fill="${n.color}" opacity="0.9"/>
      <text x="${x}" y="${y + 4}" text-anchor="middle" font-size="11" fill="#fff" font-weight="600">${n.name}</text>`;
    const lx = cx + (r + 30) * Math.cos(rad);
    const ly = cy + (r + 30) * Math.sin(rad);
    svg += `<text x="${lx}" y="${ly + 4}" text-anchor="middle" font-size="10" fill="${n.color}">Server${n.name}</text>`;
  });

  keys.forEach(k => {
    const rad = k.angle * Math.PI / 180;
    const x = cx + r * Math.cos(rad);
    const y = cy + r * Math.sin(rad);
    const target = nodes.find(n => n.name === k.target);
    const trad = target.angle * Math.PI / 180;
    const tx = cx + r * Math.cos(trad);
    const ty = cy + r * Math.sin(trad);
    svg += `<circle cx="${x}" cy="${y}" r="5" fill="#a78bfa"/>
      <text x="${cx + (r + 30) * Math.cos(rad)}" y="${cy + (r + 30) * Math.sin(rad) + 4}" text-anchor="middle" font-size="10" fill="#a78bfa">${k.name}</text>`;
    // Dashed arrow along ring direction
    svg += `<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="${target.color}" stroke-width="1" stroke-dasharray="4" opacity="0.5"/>`;
  });

  svg += `<text x="${cx}" y="${cy}" text-anchor="middle" font-size="12" fill="#94a3b8">顺时针查找</text></svg>`;
  return svg;
}

function createVnodesDiagram() {
  const cx = 200, cy = 150, r = 110;
  const colors = { A: '#3b82f6', B: '#22c55e', C: '#f59e0b' };
  // Without vnodes
  const noVnodes = [
    { angle: 30, node: 'A' }, { angle: 150, node: 'B' }, { angle: 160, node: 'C' }
  ];
  // With vnodes
  const withVnodes = [
    { angle: 0, node: 'A' }, { angle: 60, node: 'B' }, { angle: 120, node: 'C' },
    { angle: 180, node: 'A' }, { angle: 240, node: 'B' }, { angle: 300, node: 'C' },
    { angle: 30, node: 'A' }, { angle: 90, node: 'B' }, { angle: 210, node: 'C' },
  ];

  function drawRing(offsetX, title, points, showLabel) {
    let s = `<text x="${offsetX + cx}" y="20" text-anchor="middle" font-size="13" fill="#e2e8f0" font-weight="600">${title}</text>`;
    s += `<circle cx="${offsetX + cx}" cy="${cy}" r="${r}" fill="none" stroke="#475569" stroke-width="2"/>`;
    points.forEach(p => {
      const rad = p.angle * Math.PI / 180;
      const x = offsetX + cx + r * Math.cos(rad);
      const y = cy + r * Math.sin(rad);
      s += `<circle cx="${x}" cy="${y}" r="${showLabel ? 8 : 6}" fill="${colors[p.node]}" opacity="0.85"/>`;
      if (showLabel) {
        s += `<text x="${x}" y="${y + 3.5}" text-anchor="middle" font-size="8" fill="#fff" font-weight="600">${p.node}</text>`;
      }
    });
    return s;
  }

  return `<svg viewBox="0 0 700 310" xmlns="http://www.w3.org/2000/svg" style="max-width:700px">
    <style>text { font-family: 'Inter', sans-serif; }</style>
    ${drawRing(-50, '❌ 无虚拟节点 — 分布不均', noVnodes, true)}
    ${drawRing(250, '✅ 有虚拟节点 — 分布均匀', withVnodes, true)}
    <!-- Legend -->
    <circle cx="250" cy="290" r="6" fill="${colors.A}"/><text x="262" y="294" font-size="11" fill="#94a3b8">ServerA</text>
    <circle cx="340" cy="290" r="6" fill="${colors.B}"/><text x="352" y="294" font-size="11" fill="#94a3b8">ServerB</text>
    <circle cx="430" cy="290" r="6" fill="${colors.C}"/><text x="442" y="294" font-size="11" fill="#94a3b8">ServerC</text>
  </svg>`;
}

function createChangeDiagram() {
  const cx = 180, cy = 150, r = 100;
  const colors = { A: '#3b82f6', B: '#22c55e', C: '#f59e0b', D: '#a78bfa' };

  function ring(ox, nodes, keys, title, highlight) {
    let s = `<text x="${ox + cx}" y="20" text-anchor="middle" font-size="12" fill="#e2e8f0" font-weight="600">${title}</text>`;
    s += `<circle cx="${ox + cx}" cy="${cy}" r="${r}" fill="none" stroke="#475569" stroke-width="2"/>`;
    nodes.forEach(n => {
      const rad = n.angle * Math.PI / 180;
      const x = ox + cx + r * Math.cos(rad);
      const y = cy + r * Math.sin(rad);
      const dead = n.dead;
      s += `<circle cx="${x}" cy="${y}" r="12" fill="${dead ? '#334155' : colors[n.name]}" ${dead ? 'stroke="#ef4444" stroke-width="2" stroke-dasharray="3"' : ''}/>`;
      s += `<text x="${x}" y="${y + 4}" text-anchor="middle" font-size="10" fill="${dead ? '#ef4444' : '#fff'}" font-weight="600">${n.name}${dead ? '✗' : ''}</text>`;
    });
    keys.forEach(k => {
      const rad = k.angle * Math.PI / 180;
      const x = ox + cx + (r - 20) * Math.cos(rad);
      const y = cy + (r - 20) * Math.sin(rad);
      s += `<circle cx="${x}" cy="${y}" r="4" fill="${k.moved ? '#ef4444' : '#a5f3fc'}"/>`;
      s += `<text x="${x}" y="${y - 8}" text-anchor="middle" font-size="8" fill="${k.moved ? '#fca5a5' : '#94a3b8'}">${k.name}</text>`;
    });
    return s;
  }

  const normalNodes = [
    { angle: -60, name: 'A' }, { angle: 60, name: 'B' }, { angle: 180, name: 'C' }
  ];
  const normalKeys = [
    { angle: -20, name: 'k1' }, { angle: 20, name: 'k2' }, { angle: 120, name: 'k3' }
  ];
  const removeNodes = [
    { angle: -60, name: 'A' }, { angle: 60, name: 'B', dead: true }, { angle: 180, name: 'C' }
  ];
  const removeKeys = [
    { angle: -20, name: 'k1' }, { angle: 20, name: 'k2', moved: true }, { angle: 120, name: 'k3' }
  ];

  return `<svg viewBox="0 0 700 310" xmlns="http://www.w3.org/2000/svg" style="max-width:700px">
    <style>text { font-family: 'Inter', sans-serif; }</style>
    ${ring(-20, normalNodes, normalKeys, '正常状态', null)}
    <text x="330" y="155" text-anchor="middle" font-size="20" fill="#60a5fa">→</text>
    ${ring(340, removeNodes, removeKeys, 'ServerB 宕机 — 仅 k2 迁移', null)}
  </svg>`;
}


// ===== Interactive Demo =====

const NODE_COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#a78bfa', '#ec4899', '#14b8a6', '#f97316', '#06b6d4'];

// Simple hash function for demo (FNV-1a inspired)
function simpleHash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

let demoState = {
  nodes: [],      // { name, color, vnodeCount }
  maxHash: 4294967296, // 2^32
};

function getAngle(hash) {
  return (hash / demoState.maxHash) * 360;
}

function getAllVnodes() {
  const vnodes = [];
  demoState.nodes.forEach(node => {
    for (let i = 0; i < node.vnodeCount; i++) {
      const h = simpleHash(`${node.name}#${i}`);
      vnodes.push({ hash: h, angle: getAngle(h), node: node.name, color: node.color });
    }
  });
  vnodes.sort((a, b) => a.hash - b.hash);
  return vnodes;
}

function findNode(key) {
  const vnodes = getAllVnodes();
  if (!vnodes.length) return null;
  const h = simpleHash(key);
  for (const vn of vnodes) {
    if (vn.hash >= h) return vn;
  }
  return vnodes[0]; // wrap around
}

function drawRingVis(highlightKey) {
  const vnodes = getAllVnodes();
  const cx = 180, cy = 180, r = 140;
  const size = 380;

  let svg = `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="max-width:${size}px">
    <style>text { font-family: 'Inter', sans-serif; }</style>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#475569" stroke-width="2"/>
    <text x="${cx}" y="${cy - 8}" text-anchor="middle" font-size="12" fill="#94a3b8">Hash Ring</text>
    <text x="${cx}" y="${cy + 8}" text-anchor="middle" font-size="10" fill="#64748b">[0, 2³²-1]</text>`;

  // Draw vnodes
  vnodes.forEach(vn => {
    const rad = (vn.angle - 90) * Math.PI / 180;
    const x = cx + r * Math.cos(rad);
    const y = cy + r * Math.sin(rad);
    svg += `<circle cx="${x}" cy="${y}" r="4" fill="${vn.color}" opacity="0.7"/>`;
  });

  // Draw physical node labels (one per node, at first vnode position)
  const seen = new Set();
  vnodes.forEach(vn => {
    if (seen.has(vn.node)) return;
    seen.add(vn.node);
    const rad = (vn.angle - 90) * Math.PI / 180;
    const lx = cx + (r + 22) * Math.cos(rad);
    const ly = cy + (r + 22) * Math.sin(rad);
    svg += `<text x="${lx}" y="${ly + 4}" text-anchor="middle" font-size="10" fill="${vn.color}" font-weight="600">${vn.node}</text>`;
  });

  // Draw key lookup
  if (highlightKey) {
    const h = simpleHash(highlightKey);
    const angle = getAngle(h);
    const rad = (angle - 90) * Math.PI / 180;
    const kx = cx + (r - 20) * Math.cos(rad);
    const ky = cy + (r - 20) * Math.sin(rad);
    svg += `<circle cx="${kx}" cy="${ky}" r="6" fill="#ef4444" stroke="#fff" stroke-width="1.5"/>`;
    svg += `<text x="${kx}" y="${ky - 10}" text-anchor="middle" font-size="9" fill="#fca5a5">${highlightKey}</text>`;

    const target = findNode(highlightKey);
    if (target) {
      const trad = (target.angle - 90) * Math.PI / 180;
      const tx = cx + r * Math.cos(trad);
      const ty = cy + r * Math.sin(trad);
      svg += `<line x1="${kx}" y1="${ky}" x2="${tx}" y2="${ty}" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4"/>`;
      svg += `<circle cx="${tx}" cy="${ty}" r="7" fill="none" stroke="#fff" stroke-width="2"/>`;
    }
  }

  svg += '</svg>';
  return svg;
}

function initDemo() {
  // Start with 3 nodes
  demoState.nodes = [
    { name: 'ServerA', color: NODE_COLORS[0], vnodeCount: 8 },
    { name: 'ServerB', color: NODE_COLORS[1], vnodeCount: 8 },
    { name: 'ServerC', color: NODE_COLORS[2], vnodeCount: 8 },
  ];
  renderDemo();
}

function renderDemo(highlightKey) {
  document.getElementById('ring-canvas').innerHTML = drawRingVis(highlightKey);
  const nodeList = demoState.nodes.map(n =>
    `<span style="color:${n.color}">● ${n.name}</span> (${n.vnodeCount} vnodes)`
  ).join('  ');
  document.getElementById('demo-output').innerHTML =
    `节点: ${nodeList || '(空)'}\n虚拟节点总数: ${getAllVnodes().length}`;
}

function addNode() {
  const name = document.getElementById('node-input').value.trim();
  const vnodes = parseInt(document.getElementById('vnode-count').value) || 8;
  if (!name) return;
  if (demoState.nodes.find(n => n.name === name)) {
    document.getElementById('demo-output').textContent = `⚠️ 节点 "${name}" 已存在`;
    return;
  }
  const color = NODE_COLORS[demoState.nodes.length % NODE_COLORS.length];
  demoState.nodes.push({ name, color, vnodeCount: vnodes });
  renderDemo();
}

function removeNode() {
  const name = document.getElementById('node-input').value.trim();
  const idx = demoState.nodes.findIndex(n => n.name === name);
  if (idx === -1) {
    document.getElementById('demo-output').textContent = `⚠️ 节点 "${name}" 不存在`;
    return;
  }
  demoState.nodes.splice(idx, 1);
  renderDemo();
}

function lookupKey() {
  const key = document.getElementById('key-input').value.trim();
  if (!key) return;
  const target = findNode(key);
  if (!target) {
    document.getElementById('demo-output').textContent = '⚠️ 没有可用节点';
    return;
  }
  renderDemo(key);
  const h = simpleHash(key);
  document.getElementById('demo-output').innerHTML +=
    `\n\n🔍 "${key}" → hash=${h} → <span style="color:${target.color}">${target.node}</span>`;
}

function batchLookup() {
  if (!demoState.nodes.length) {
    document.getElementById('demo-output').textContent = '⚠️ 没有可用节点';
    return;
  }
  const counts = {};
  demoState.nodes.forEach(n => counts[n.name] = 0);
  const total = 10000;
  for (let i = 0; i < total; i++) {
    const target = findNode(`random-key-${i}`);
    if (target) counts[target.node]++;
  }
  renderDemo();
  let stats = `\n\n📊 ${total} 个随机 key 的分布:\n`;
  demoState.nodes.forEach(n => {
    const pct = (counts[n.name] / total * 100).toFixed(1);
    const bar = '█'.repeat(Math.round(pct / 2));
    stats += `  <span style="color:${n.color}">${n.name.padEnd(12)}</span> ${bar} ${pct}% (${counts[n.name]})\n`;
  });
  const ideal = (100 / demoState.nodes.length).toFixed(1);
  stats += `\n  理想均匀分布: 每节点 ${ideal}%`;
  document.getElementById('demo-output').innerHTML += stats;
}

// ===== Scroll to top =====
window.addEventListener('scroll', () => {
  const btn = document.getElementById('back-top');
  if (btn) btn.classList.toggle('show', window.scrollY > 400);
});

// ===== Jump Consistent Hash =====
function jumpHash(key, numBuckets) {
  let randomState = xmur3(key);
  let b = -1;
  let j = 0;
  while (j < numBuckets) {
    if (randomState() < 1.0 / (j + 1)) {
      b = j;
    }
    j++;
  }
  return b;
}

// Simple hash function for string keys
function xmur3(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = h << 13 | h >>> 19;
  }
  return function() {
    h = Math.imul(h ^ h >>> 16, 2246822507);
    h = Math.imul(h ^ h >>> 13, 3266489909);
    return (h ^ h >>> 16) >>> 0;
  };
}

function updateJumpDemo() {
  const buckets = document.getElementById('jump-buckets').value;
  document.getElementById('bucket-display').textContent = buckets;
}

function runJumpDemo() {
  const numBuckets = parseInt(document.getElementById('jump-buckets').value);
  const keys = ['user:1001', 'user:1002', 'user:1003', 'product:201', 'order:301', 'session:401'];
  
  let output = `<h4>🔍 Jump Hash 结果 (${numBuckets} 个节点)</h4><table style="width:100%;max-width:400px">
    <tr><th>Key</th><th>映射到节点</th></tr>`;
  
  keys.forEach(key => {
    const bucket = jumpHash(key, numBuckets);
    output += `<tr><td>${key}</td><td style="color:#22c55e">Node ${bucket}</td></tr>`;
  });
  output += '</table>';
  
  // Test with 10000 random keys
  const counts = {};
  for (let i = 0; i < numBuckets; i++) counts[i] = 0;
  for (let i = 0; i < 10000; i++) {
    const bucket = jumpHash(`key-${i}`, numBuckets);
    counts[bucket]++;
  }
  
  output += '<p style="margin-top:1rem">📊 10000 个 key 的分布:</p><div style="display:flex;gap:.25rem;flex-wrap:wrap">';
  for (let i = 0; i < numBuckets; i++) {
    const pct = (counts[i] / 100).toFixed(1);
    const color = pct > 8 || pct < 4 ? '#f59e0b' : '#22c55e';
    output += `<div style="flex:1;min-width:40px;background:${color};padding:.25rem;text-align:center;font-size:.75rem;border-radius:4px">N${i}<br>${pct}%</div>`;
  }
  output += '</div>';
  
  document.getElementById('jump-demo-output').innerHTML = output;
}

function runCompareDemo() {
  const oldBuckets = 4;
  const newBuckets = parseInt(document.getElementById('jump-buckets').value);
  const testKeys = Array.from({length: 1000}, (_, i) => `key-${i}`);
  
  // Jump Hash
  let jumpChanged = 0;
  testKeys.forEach(key => {
    if (jumpHash(key, oldBuckets) !== jumpHash(key, newBuckets)) jumpChanged++;
  });
  
  // Traditional (simple mod)
  let tradChanged = 0;
  testKeys.forEach(key => {
    const oldHash = (xmur3(key)() % oldBuckets + oldBuckets) % oldBuckets;
    const newHash = (xmur3(key)() % newBuckets + newBuckets) % newBuckets;
    if (oldHash !== newHash) tradChanged++;
  });
  
  const output = `<h4>⚖️ 数据迁移对比</h4>
<p>节点数从 ${oldBuckets} 变更为 ${newBuckets}:</p>
<table style="width:100%;max-width:400px">
  <tr><th>算法</th><th>迁移比例</th></tr>
  <tr><td>传统取模</td><td style="color:#ef4444">${(tradChanged / 10).toFixed(1)}%</td></tr>
  <tr><td>Jump Hash</td><td style="color:#22c55e">${(jumpChanged / 10).toFixed(1)}%</td></tr>
</table>
<p style="font-size:.875rem;color:#94a3b8">两者迁移比例相近，但 Jump Hash 无需维护环结构！</p>`;
  
  document.getElementById('jump-demo-output').innerHTML = output;
}