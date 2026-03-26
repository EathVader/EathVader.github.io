// Bloom Filter Interactive Demo

class BloomFilter {
  constructor(size = 32, numHash = 3) {
    this.size = size;
    this.numHash = numHash;
    this.bits = new Array(size).fill(0);
    this.items = [];
  }

  _hashes(str) {
    const results = [];
    for (let i = 0; i < this.numHash; i++) {
      let hash = 0;
      for (let j = 0; j < str.length; j++) {
        hash = (hash * 31 + str.charCodeAt(j) + i * 7) & 0x7fffffff;
      }
      results.push(hash % this.size);
    }
    return results;
  }

  add(str) {
    const positions = this._hashes(str);
    positions.forEach(p => this.bits[p] = 1);
    this.items.push(str);
    return positions;
  }

  test(str) {
    const positions = this._hashes(str);
    const exists = positions.every(p => this.bits[p] === 1);
    return { exists, positions, isFalsePositive: exists && !this.items.includes(str) };
  }
}

function renderBloom(bf, svgEl, highlights = [], highlightColor = '#3b82f6') {
  svgEl.innerHTML = '';
  const W = 700, H = 100;
  const cellW = Math.min((W - 40) / bf.size, 20);
  const totalW = bf.size * cellW;
  const offsetX = (W - totalW) / 2;
  const hlSet = new Set(highlights);

  bf.bits.forEach((bit, i) => {
    const x = offsetX + i * cellW;
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', x); rect.setAttribute('y', 20);
    rect.setAttribute('width', cellW - 1); rect.setAttribute('height', 40);
    rect.setAttribute('rx', '2');
    if (hlSet.has(i)) {
      rect.setAttribute('fill', bit ? '#451a03' : '#172554');
      rect.setAttribute('stroke', '#f59e0b'); rect.setAttribute('stroke-width', '2');
    } else {
      rect.setAttribute('fill', bit ? '#14532d' : '#1e293b');
      rect.setAttribute('stroke', bit ? '#22c55e' : '#334155');
    }
    svgEl.appendChild(rect);

    const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    txt.setAttribute('x', x + (cellW - 1) / 2); txt.setAttribute('y', 45);
    txt.setAttribute('text-anchor', 'middle'); txt.setAttribute('font-size', '10');
    txt.setAttribute('fill', bit ? '#86efac' : '#475569');
    txt.setAttribute('font-family', 'JetBrains Mono');
    txt.textContent = bit;
    svgEl.appendChild(txt);

    // Index
    if (bf.size <= 32) {
      const idx = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      idx.setAttribute('x', x + (cellW - 1) / 2); idx.setAttribute('y', 75);
      idx.setAttribute('text-anchor', 'middle'); idx.setAttribute('font-size', '7');
      idx.setAttribute('fill', '#475569'); idx.setAttribute('font-family', 'JetBrains Mono');
      idx.textContent = i;
      svgEl.appendChild(idx);
    }
  });

  // Stats
  const ones = bf.bits.filter(b => b).length;
  const pct = ((ones / bf.size) * 100).toFixed(0);
  const lbl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  lbl.setAttribute('x', W / 2); lbl.setAttribute('y', 92);
  lbl.setAttribute('text-anchor', 'middle'); lbl.setAttribute('font-size', '10');
  lbl.setAttribute('fill', '#94a3b8'); lbl.setAttribute('font-family', 'Inter');
  lbl.textContent = `已插入 ${bf.items.length} 个元素 | ${ones}/${bf.size} 位为 1 (${pct}%) | ${bf.numHash} 个哈希函数`;
  svgEl.appendChild(lbl);
}

function initBloomDemo() {
  const svg = document.getElementById('bloom-svg');
  const log = document.getElementById('bloom-log');
  const input = document.getElementById('bloom-input');
  const sizeInput = document.getElementById('bloom-size');
  const hashInput = document.getElementById('bloom-hash');
  let bf = new BloomFilter(32, 3);

  function refresh(msg, hl = []) {
    renderBloom(bf, svg, hl);
    if (msg) log.textContent = msg;
  }

  document.getElementById('bloom-add').addEventListener('click', () => {
    const w = input.value.trim();
    if (!w) return;
    const positions = bf.add(w);
    input.value = '';
    refresh(`✅ 插入 "${w}" → 位置 [${positions.join(', ')}] 置为 1`, positions);
    input.focus();
  });

  document.getElementById('bloom-test').addEventListener('click', () => {
    const w = input.value.trim();
    if (!w) return;
    const { exists, positions, isFalsePositive } = bf.test(w);
    if (exists && isFalsePositive) {
      refresh(`⚠️ "${w}" 可能存在（误判！实际未插入）→ 位置 [${positions.join(', ')}] 都为 1`, positions);
    } else if (exists) {
      refresh(`✅ "${w}" 可能存在 → 位置 [${positions.join(', ')}] 都为 1`, positions);
    } else {
      refresh(`❌ "${w}" 一定不存在 → 位置 [${positions.join(', ')}] 有 0`, positions);
    }
  });

  document.getElementById('bloom-reset').addEventListener('click', () => {
    const size = parseInt(sizeInput.value) || 32;
    const numHash = parseInt(hashInput.value) || 3;
    bf = new BloomFilter(Math.min(size, 64), Math.min(numHash, 7));
    refresh('已重置');
  });

  document.getElementById('bloom-example').addEventListener('click', () => {
    bf = new BloomFilter(32, 3);
    ['apple', 'banana', 'cherry', 'date', 'elderberry'].forEach(w => bf.add(w));
    refresh('已加载示例：apple, banana, cherry, date, elderberry。试试查询 "fig"（不存在）和 "grape"（可能误判）');
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('bloom-add').click();
  });

  refresh('等待操作... 试试点击"示例"按钮');
}

document.addEventListener('DOMContentLoaded', initBloomDemo);
