// ===== SimHash Implementation =====
function stringHash(source, bits) {
  if (!source) return 0;
  let x = source.charCodeAt(0) << 7;
  const m = 1000003;
  const mask = (1 << bits) - 1;
  for (let i = 0; i < source.length; i++) {
    x = ((x * m) ^ source.charCodeAt(i)) & mask;
  }
  return (x ^ source.length) & mask;
}

function computeSimHash(tokens, bits) {
  bits = bits || 32;
  const v = new Array(bits).fill(0);
  for (const t of tokens) {
    const h = stringHash(t, bits);
    for (let i = 0; i < bits; i++) {
      if (h & (1 << i)) v[i] += 1;
      else v[i] -= 1;
    }
  }
  let fp = 0;
  for (let i = 0; i < bits; i++) {
    if (v[i] >= 0) fp |= (1 << i);
  }
  return fp;
}

function hammingDistance(a, b, bits) {
  let x = (a ^ b) & ((1 << bits) - 1);
  let d = 0;
  while (x) { d++; x &= x - 1; }
  return d;
}

function toBinary(n, bits) {
  return n.toString(2).padStart(bits, '0');
}

// ===== Interactive Demo =====
function runSimHashDemo() {
  const bits = 32;
  const textA = document.getElementById('sh-input-a').value;
  const textB = document.getElementById('sh-input-b').value;
  const tokensA = textA.toLowerCase().split(/\s+/).filter(Boolean);
  const tokensB = textB.toLowerCase().split(/\s+/).filter(Boolean);
  const hashA = computeSimHash(tokensA, bits);
  const hashB = computeSimHash(tokensB, bits);
  const dist = hammingDistance(hashA, hashB, bits);
  const binA = toBinary(hashA, bits);
  const binB = toBinary(hashB, bits);

  // Highlight differing bits
  let diffStr = '';
  for (let i = 0; i < bits; i++) {
    diffStr += binA[i] !== binB[i] ? '^' : ' ';
  }

  const similarity = ((bits - dist) / bits * 100).toFixed(1);
  const verdict = dist <= 3 ? '✅ 近似重复' : dist <= 10 ? '⚠️ 部分相似' : '❌ 不相似';

  document.getElementById('sh-output').textContent =
    `文本 A tokens: [${tokensA.join(', ')}]\n` +
    `文本 B tokens: [${tokensB.join(', ')}]\n\n` +
    `SimHash A: ${binA}\n` +
    `SimHash B: ${binB}\n` +
    `差异位:    ${diffStr}\n\n` +
    `海明距离: ${dist}  |  相似度: ${similarity}%  |  ${verdict}`;
}

// ===== SVG Diagrams =====

function createFeatureExtractionDiagram() {
  return `<svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg" style="font-family:Inter,sans-serif">
  <!-- Document -->
  <rect x="20" y="60" width="140" height="80" rx="8" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
  <text x="90" y="95" text-anchor="middle" fill="#93c5fd" font-size="13" font-weight="600">📄 文档</text>
  <text x="90" y="118" text-anchor="middle" fill="#64748b" font-size="11">"the cat sat on the mat"</text>

  <!-- Arrow -->
  <line x1="170" y1="100" x2="230" y2="100" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrow-blue)"/>
  <text x="200" y="88" text-anchor="middle" fill="#94a3b8" font-size="10">分词</text>

  <!-- Features -->
  <rect x="240" y="30" width="100" height="140" rx="8" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
  <text x="290" y="55" text-anchor="middle" fill="#93c5fd" font-size="12" font-weight="600">特征词</text>
  <text x="290" y="78" text-anchor="middle" fill="#a5f3fc" font-size="11">"the"  × 2</text>
  <text x="290" y="98" text-anchor="middle" fill="#a5f3fc" font-size="11">"cat"  × 1</text>
  <text x="290" y="118" text-anchor="middle" fill="#a5f3fc" font-size="11">"sat"  × 1</text>
  <text x="290" y="138" text-anchor="middle" fill="#a5f3fc" font-size="11">"mat"  × 1</text>
  <text x="290" y="158" text-anchor="middle" fill="#64748b" font-size="10">...</text>

  <!-- Arrow -->
  <line x1="350" y1="100" x2="410" y2="100" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrow-blue)"/>
  <text x="380" y="88" text-anchor="middle" fill="#94a3b8" font-size="10">hash</text>

  <!-- Hash values -->
  <rect x="420" y="30" width="160" height="140" rx="8" fill="#1e3a5f" stroke="#a78bfa" stroke-width="2"/>
  <text x="500" y="55" text-anchor="middle" fill="#c4b5fd" font-size="12" font-weight="600">Hash + 权重</text>
  <text x="500" y="78" text-anchor="middle" fill="#a5f3fc" font-size="11">"the" → 101100 w=2</text>
  <text x="500" y="98" text-anchor="middle" fill="#a5f3fc" font-size="11">"cat" → 100110 w=1</text>
  <text x="500" y="118" text-anchor="middle" fill="#a5f3fc" font-size="11">"sat" → 011010 w=1</text>
  <text x="500" y="138" text-anchor="middle" fill="#a5f3fc" font-size="11">"mat" → 110001 w=1</text>

  <!-- Arrow -->
  <line x1="590" y1="100" x2="640" y2="100" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrow-blue)"/>
  <text x="615" y="88" text-anchor="middle" fill="#94a3b8" font-size="10">合并</text>

  <!-- Fingerprint -->
  <rect x="650" y="60" width="130" height="80" rx="8" fill="#2e1065" stroke="#a78bfa" stroke-width="2"/>
  <text x="715" y="90" text-anchor="middle" fill="#c4b5fd" font-size="12" font-weight="600">🔍 SimHash</text>
  <text x="715" y="115" text-anchor="middle" fill="#a5f3fc" font-size="14" font-weight="700">110001</text>

  <defs><marker id="arrow-blue" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#60a5fa"/></marker></defs>
</svg>`;
}

function createHashWeightDiagram() {
  return `<svg viewBox="0 0 800 280" xmlns="http://www.w3.org/2000/svg" style="font-family:'JetBrains Mono',monospace">
  <!-- Header -->
  <text x="400" y="25" text-anchor="middle" fill="#f8fafc" font-size="13" font-weight="600" font-family="Inter,sans-serif">每个特征的 hash 按权重转换为 +w / -w，然后纵向累加</text>

  <!-- Column headers -->
  <text x="120" y="55" text-anchor="middle" fill="#94a3b8" font-size="11">特征</text>
  <text x="200" y="55" text-anchor="middle" fill="#94a3b8" font-size="11">权重</text>
  <text x="290" y="55" text-anchor="middle" fill="#94a3b8" font-size="11">hash</text>
  <text x="500" y="55" text-anchor="middle" fill="#94a3b8" font-size="11">加权向量 (1→+w, 0→-w)</text>

  <!-- Row: "the" w=2 -->
  <text x="120" y="85" text-anchor="middle" fill="#a5f3fc" font-size="12">"the"</text>
  <text x="200" y="85" text-anchor="middle" fill="#fbbf24" font-size="12">w=2</text>
  <text x="290" y="85" text-anchor="middle" fill="#93c5fd" font-size="12">101100</text>
  <text x="500" y="85" text-anchor="middle" fill="#86efac" font-size="12">[+2, -2, +2, +2, -2, -2]</text>

  <!-- Row: "cat" w=1 -->
  <text x="120" y="115" text-anchor="middle" fill="#a5f3fc" font-size="12">"cat"</text>
  <text x="200" y="115" text-anchor="middle" fill="#fbbf24" font-size="12">w=1</text>
  <text x="290" y="115" text-anchor="middle" fill="#93c5fd" font-size="12">100110</text>
  <text x="500" y="115" text-anchor="middle" fill="#86efac" font-size="12">[+1, -1, -1, +1, +1, -1]</text>

  <!-- Row: "sat" w=1 -->
  <text x="120" y="145" text-anchor="middle" fill="#a5f3fc" font-size="12">"sat"</text>
  <text x="200" y="145" text-anchor="middle" fill="#fbbf24" font-size="12">w=1</text>
  <text x="290" y="145" text-anchor="middle" fill="#93c5fd" font-size="12">011010</text>
  <text x="500" y="145" text-anchor="middle" fill="#86efac" font-size="12">[-1, +1, +1, -1, +1, -1]</text>

  <!-- Row: "mat" w=1 -->
  <text x="120" y="175" text-anchor="middle" fill="#a5f3fc" font-size="12">"mat"</text>
  <text x="200" y="175" text-anchor="middle" fill="#fbbf24" font-size="12">w=1</text>
  <text x="290" y="175" text-anchor="middle" fill="#93c5fd" font-size="12">110001</text>
  <text x="500" y="175" text-anchor="middle" fill="#86efac" font-size="12">[+1, +1, -1, -1, -1, +1]</text>

  <!-- Separator -->
  <line x1="360" y1="195" x2="640" y2="195" stroke="#475569" stroke-width="1" stroke-dasharray="4"/>

  <!-- Sum -->
  <text x="290" y="220" text-anchor="middle" fill="#f8fafc" font-size="12" font-weight="600">累加 Σ</text>
  <text x="500" y="220" text-anchor="middle" fill="#fbbf24" font-size="13" font-weight="700">[+3, -1, +1, +1, -1, -3]</text>

  <!-- Arrow -->
  <line x1="500" y1="232" x2="500" y2="252" stroke="#a78bfa" stroke-width="2" marker-end="url(#arrow-purple)"/>

  <!-- Result -->
  <text x="500" y="272" text-anchor="middle" fill="#c4b5fd" font-size="14" font-weight="700">正→1 负→0 ⟹ SimHash = 110100</text>

  <defs><marker id="arrow-purple" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#a78bfa"/></marker></defs>
</svg>`;
}

function createXORDiagram() {
  const bits = ['1','1','0','0','0','1'];
  const bitsB = ['1','1','0','1','0','0'];
  const w = 50, startX = 175;

  let svg = `<svg viewBox="0 0 800 220" xmlns="http://www.w3.org/2000/svg" style="font-family:'JetBrains Mono',monospace">`;
  svg += `<text x="130" y="52" text-anchor="end" fill="#93c5fd" font-size="13" font-weight="600">指纹 A:</text>`;
  svg += `<text x="130" y="102" text-anchor="end" fill="#f9a8d4" font-size="13" font-weight="600">指纹 B:</text>`;
  svg += `<text x="130" y="162" text-anchor="end" fill="#fbbf24" font-size="13" font-weight="600">A ⊕ B:</text>`;

  for (let i = 0; i < 6; i++) {
    const x = startX + i * w;
    const xor = bits[i] === bitsB[i] ? '0' : '1';
    const diffColor = xor === '1' ? '#ef4444' : '#334155';
    const diffTextColor = xor === '1' ? '#fca5a5' : '#64748b';

    // A bits
    svg += `<rect x="${x}" y="30" width="40" height="35" rx="4" fill="#1e3a5f" stroke="#3b82f6" stroke-width="1.5"/>`;
    svg += `<text x="${x+20}" y="53" text-anchor="middle" fill="#a5f3fc" font-size="16" font-weight="700">${bits[i]}</text>`;

    // B bits
    svg += `<rect x="${x}" y="80" width="40" height="35" rx="4" fill="#3b1e4f" stroke="#a78bfa" stroke-width="1.5"/>`;
    svg += `<text x="${x+20}" y="103" text-anchor="middle" fill="#d8b4fe" font-size="16" font-weight="700">${bitsB[i]}</text>`;

    // XOR result
    svg += `<rect x="${x}" y="140" width="40" height="35" rx="4" fill="${xor === '1' ? '#451a03' : '#0f172a'}" stroke="${diffColor}" stroke-width="2"/>`;
    svg += `<text x="${x+20}" y="163" text-anchor="middle" fill="${diffTextColor}" font-size="16" font-weight="700">${xor}</text>`;
  }

  svg += `<text x="600" y="162" fill="#fbbf24" font-size="14" font-weight="700">→ 海明距离 = 2</text>`;
  svg += `<text x="600" y="185" fill="#94a3b8" font-size="11">（XOR 结果中 1 的个数）</text>`;
  svg += `</svg>`;
  return svg;
}

function createHammingComparisonDiagram() {
  const pairs = [
    { label: 'p1 vs p2', dist: 4, color: '#22c55e', desc: '近似重复' },
    { label: 'p1 vs p3', dist: 16, color: '#ef4444', desc: '不相似' },
    { label: 'p2 vs p3', dist: 12, color: '#f59e0b', desc: '差异较大' },
  ];

  let svg = `<svg viewBox="0 0 800 180" xmlns="http://www.w3.org/2000/svg" style="font-family:Inter,sans-serif">`;
  svg += `<text x="400" y="25" text-anchor="middle" fill="#f8fafc" font-size="13" font-weight="600">三段文本的 SimHash 海明距离比较</text>`;
  svg += `<text x="400" y="45" text-anchor="middle" fill="#64748b" font-size="11">p1="the cat sat on the mat"  p2="the cat sat on a mat"  p3="we all scream for ice cream"</text>`;

  pairs.forEach((p, i) => {
    const y = 70 + i * 38;
    const barW = p.dist * 18;
    svg += `<text x="140" y="${y+14}" text-anchor="end" fill="#94a3b8" font-size="12">${p.label}</text>`;
    svg += `<rect x="155" y="${y}" width="${barW}" height="22" rx="4" fill="${p.color}" opacity="0.3"/>`;
    svg += `<rect x="155" y="${y}" width="${barW}" height="22" rx="4" fill="none" stroke="${p.color}" stroke-width="1.5"/>`;
    svg += `<text x="${165 + barW}" y="${y+15}" fill="${p.color}" font-size="12" font-weight="700">${p.dist}</text>`;
    svg += `<text x="${210 + barW}" y="${y+15}" fill="#94a3b8" font-size="11">${p.desc}</text>`;
  });

  // Threshold line
  svg += `<line x1="${155 + 3*18}" y1="62" x2="${155 + 3*18}" y2="170" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="4"/>`;
  svg += `<text x="${155 + 3*18}" y="175" text-anchor="middle" fill="#22c55e" font-size="10">阈值=3</text>`;

  svg += `</svg>`;
  return svg;
}

// ===== Scroll to top =====
window.addEventListener('scroll', () => {
  const btn = document.getElementById('back-top');
  if (btn) btn.classList.toggle('show', window.scrollY > 400);
});