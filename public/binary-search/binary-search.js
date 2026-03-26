// Binary Search Interactive Visualization
function initBinarySearchDemo() {
  const svg = document.getElementById('bs-svg');
  const log = document.getElementById('bs-log');
  const input = document.getElementById('bs-input');
  const arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  let left, right, mid, target, found, stepping;

  function reset() {
    left = 0; right = arr.length - 1; mid = -1; target = null; found = -1; stepping = false;
    render('数组: [' + arr.join(', ') + '] — 输入目标值开始搜索');
  }

  function render(msg) {
    svg.innerHTML = '';
    if (msg) log.textContent = msg;
    const w = 58, gap = 8, startX = (700 - arr.length * (w + gap)) / 2;
    arr.forEach((v, i) => {
      const x = startX + i * (w + gap);
      const r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      r.setAttribute('x', x); r.setAttribute('y', 25); r.setAttribute('width', w);
      r.setAttribute('height', 32); r.setAttribute('rx', 5);
      if (found === i) { r.setAttribute('fill', '#14532d'); r.setAttribute('stroke', '#22c55e'); r.setAttribute('stroke-width', '2'); }
      else if (stepping && (i < left || i > right)) { r.setAttribute('fill', '#1e293b'); r.setAttribute('stroke', '#334155'); }
      else if (i === mid) { r.setAttribute('fill', '#1c1917'); r.setAttribute('stroke', '#f59e0b'); r.setAttribute('stroke-width', '2'); }
      else { r.setAttribute('fill', '#172554'); r.setAttribute('stroke', '#3b82f6'); }
      svg.appendChild(r);
      const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      t.setAttribute('x', x + w / 2); t.setAttribute('y', 46); t.setAttribute('text-anchor', 'middle');
      t.setAttribute('font-size', '13'); t.setAttribute('font-weight', '700'); t.setAttribute('font-family', 'Inter');
      t.setAttribute('fill', found === i ? '#86efac' : (stepping && (i < left || i > right)) ? '#475569' : i === mid ? '#fbbf24' : '#93c5fd');
      t.textContent = v; svg.appendChild(t);
      // Pointer labels
      if (stepping || found >= 0) {
        const labels = [];
        if (i === left) labels.push({ text: 'L', color: '#22c55e' });
        if (i === right) labels.push({ text: 'R', color: '#f87171' });
        if (i === mid) labels.push({ text: 'mid', color: '#f59e0b' });
        labels.forEach((lb, li) => {
          const lt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          lt.setAttribute('x', x + w / 2); lt.setAttribute('y', 78 + li * 12);
          lt.setAttribute('text-anchor', 'middle'); lt.setAttribute('font-size', '9');
          lt.setAttribute('fill', lb.color); lt.setAttribute('font-family', 'Inter');
          lt.textContent = lb.text; svg.appendChild(lt);
        });
      }
    });
  }

  function step() {
    if (!stepping || left > right) {
      if (found < 0 && stepping) log.textContent = `❌ 未找到 ${target}`;
      stepping = false; return;
    }
    mid = left + Math.floor((right - left) / 2);
    if (arr[mid] === target) { found = mid; stepping = false; render(`✅ 找到 ${target}，索引 = ${mid}`); return; }
    if (arr[mid] < target) { render(`arr[${mid}]=${arr[mid]} < ${target} → 搜右半`); left = mid + 1; }
    else { render(`arr[${mid}]=${arr[mid]} > ${target} → 搜左半`); right = mid - 1; }
  }

  document.getElementById('bs-search').addEventListener('click', () => {
    target = parseInt(input.value); if (isNaN(target)) return;
    left = 0; right = arr.length - 1; found = -1; stepping = true;
    const run = () => { if (!stepping) return; step(); if (stepping) setTimeout(run, 800); };
    render(`搜索 ${target}...`); setTimeout(run, 400);
  });

  document.getElementById('bs-step').addEventListener('click', () => {
    if (!stepping) {
      target = parseInt(input.value); if (isNaN(target)) return;
      left = 0; right = arr.length - 1; found = -1; stepping = true;
      render(`开始搜索 ${target}，点击"单步执行"逐步查看`); return;
    }
    step();
  });

  document.getElementById('bs-reset').addEventListener('click', reset);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('bs-search').click(); });
  reset();
}

document.addEventListener('DOMContentLoaded', initBinarySearchDemo);
