// Interactive demo for External Merge Sort - K-way merge with min-heap visualization

class MinHeap {
  constructor() { this.data = []; }
  size() { return this.data.length; }
  peek() { return this.data[0]; }

  push(val) {
    this.data.push(val);
    let i = this.data.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.data[p].val <= this.data[i].val) break;
      [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
      i = p;
    }
  }

  pop() {
    const top = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      let i = 0;
      while (true) {
        let s = i, l = 2*i+1, r = 2*i+2;
        if (l < this.data.length && this.data[l].val < this.data[s].val) s = l;
        if (r < this.data.length && this.data[r].val < this.data[s].val) s = r;
        if (s === i) break;
        [this.data[s], this.data[i]] = [this.data[i], this.data[s]];
        i = s;
      }
    }
    return top;
  }

  toArray() { return this.data.slice(); }
}

// Color palette for runs
const RUN_COLORS = [
  {bg:'#172554',border:'#3b82f6',text:'#93c5fd'},
  {bg:'#14532d',border:'#22c55e',text:'#86efac'},
  {bg:'#451a03',border:'#f59e0b',text:'#fbbf24'},
  {bg:'#2e1065',border:'#a78bfa',text:'#c4b5fd'},
  {bg:'#1e1e1e',border:'#ef4444',text:'#fca5a5'},
  {bg:'#0c4a6e',border:'#06b6d4',text:'#67e8f9'},
];

// ===== K-Way Merge Demo =====
let demoState = null;

function initDemo() {
  const k = parseInt(document.getElementById('demo-k').value) || 4;
  const runs = [];
  for (let i = 0; i < k; i++) {
    const len = 4 + Math.floor(Math.random() * 4);
    const arr = [];
    let v = Math.floor(Math.random() * 10) + 1;
    for (let j = 0; j < len; j++) {
      arr.push(v);
      v += Math.floor(Math.random() * 15) + 1;
    }
    runs.push(arr);
  }

  const heap = new MinHeap();
  const pointers = new Array(k).fill(0);
  for (let i = 0; i < k; i++) {
    heap.push({val: runs[i][0], run: i});
    pointers[i] = 1;
  }

  demoState = { runs, heap, pointers, output: [], step: 0, done: false, lastPop: -1, lastRun: -1 };
  renderDemo();
}

function stepDemo() {
  if (!demoState || demoState.done) return;
  const {runs, heap, pointers, output} = demoState;
  if (heap.size() === 0) { demoState.done = true; renderDemo(); return; }

  const min = heap.pop();
  output.push({val: min.val, run: min.run});
  demoState.lastPop = min.val;
  demoState.lastRun = min.run;

  const ri = min.run;
  if (pointers[ri] < runs[ri].length) {
    heap.push({val: runs[ri][pointers[ri]], run: ri});
    pointers[ri]++;
  }

  demoState.step++;
  if (heap.size() === 0) demoState.done = true;
  renderDemo();
}

function runAllDemo() {
  if (!demoState) return;
  while (!demoState.done) stepDemo();
}

function renderDemo() {
  const el = document.getElementById('demo-output');
  if (!demoState) { el.textContent = '点击"初始化"开始 / Click Init to start'; return; }
  const {runs, heap, pointers, output, step, done, lastPop, lastRun} = demoState;

  let html = `<div style="margin-bottom:.75rem"><strong>Step ${step}</strong>${done?' — ✅ 完成 Done!':''}</div>`;

  // Render runs as card piles
  html += '<div class="card-piles">';
  for (let i = 0; i < runs.length; i++) {
    const c = RUN_COLORS[i % RUN_COLORS.length];
    html += `<div class="card-pile"><div class="label" style="color:${c.text}">Run ${i}</div>`;
    for (let j = 0; j < runs[i].length; j++) {
      const used = j < pointers[i] - (heap.toArray().some(h=>h.run===i && h.val===runs[i][j]) ? 0 : 0);
      const inHeap = heap.toArray().some(h=>h.run===i && h.val===runs[i][j]);
      const consumed = j < pointers[i] && !inHeap;
      const opacity = consumed ? '0.3' : '1';
      const hl = (lastRun === i && runs[i][j] === lastPop && j === pointers[i]-1) ? ' highlight' : '';
      html += `<div class="card${hl}" style="background:${c.bg};border-color:${c.border};color:${c.text};opacity:${opacity}">${runs[i][j]}</div>`;
    }
    html += '</div>';
  }
  html += '</div>';

  // Render heap
  const heapArr = heap.toArray();
  html += '<div style="margin:.75rem 0"><strong>🏔️ Min-Heap:</strong> ';
  if (heapArr.length === 0) {
    html += '<span style="color:#64748b">空 / empty</span>';
  } else {
    html += heapArr.map((h,i) => {
      const c = RUN_COLORS[h.run % RUN_COLORS.length];
      return `<span style="display:inline-block;padding:2px 8px;margin:2px;border-radius:12px;background:${c.bg};border:1px solid ${c.border};color:${c.text};font-size:.85rem">${h.val}<sub style="font-size:.65rem;color:#64748b">R${h.run}</sub></span>`;
    }).join('');
  }
  html += '</div>';

  // Render output
  html += '<div style="margin-top:.5rem"><strong>📤 输出 Output:</strong> ';
  if (output.length === 0) {
    html += '<span style="color:#64748b">空 / empty</span>';
  } else {
    html += output.map(o => {
      const c = RUN_COLORS[o.run % RUN_COLORS.length];
      return `<span style="color:${c.text}">${o.val}</span>`;
    }).join(', ');
  }
  html += '</div>';

  el.innerHTML = html;
}

// ===== Back to top =====
window.addEventListener('scroll', () => {
  const btn = document.getElementById('back-top');
  if (btn) btn.classList.toggle('show', window.scrollY > 400);
});
