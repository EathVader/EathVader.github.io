// Stack & Queue Interactive Visualization
function initSQDemo() {
  const svg = document.getElementById('sq-svg');
  const log = document.getElementById('sq-log');
  const input = document.getElementById('sq-input');
  let stack = [], queue = [];

  function render(msg) {
    svg.innerHTML = '';
    if (msg) log.textContent = msg;
    // Stack label
    const sl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    sl.setAttribute('x', 20); sl.setAttribute('y', 20); sl.setAttribute('fill', '#93c5fd');
    sl.setAttribute('font-size', '11'); sl.setAttribute('font-weight', '600'); sl.setAttribute('font-family', 'Inter');
    sl.textContent = 'Stack (LIFO):'; svg.appendChild(sl);
    // Stack items (horizontal, top on right)
    stack.forEach((v, i) => {
      const x = 20 + i * 65;
      const r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      r.setAttribute('x', x); r.setAttribute('y', 30); r.setAttribute('width', 55); r.setAttribute('height', 28); r.setAttribute('rx', 5);
      r.setAttribute('fill', i === stack.length - 1 ? '#14532d' : '#172554');
      r.setAttribute('stroke', i === stack.length - 1 ? '#22c55e' : '#3b82f6');
      r.setAttribute('stroke-width', i === stack.length - 1 ? '2' : '1'); svg.appendChild(r);
      const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      t.setAttribute('x', x + 27); t.setAttribute('y', 49); t.setAttribute('text-anchor', 'middle');
      t.setAttribute('fill', i === stack.length - 1 ? '#86efac' : '#93c5fd');
      t.setAttribute('font-size', '12'); t.setAttribute('font-weight', '700'); t.setAttribute('font-family', 'Inter');
      t.textContent = v; svg.appendChild(t);
    });
    if (stack.length) {
      const tp = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      tp.setAttribute('x', 20 + (stack.length - 1) * 65 + 27); tp.setAttribute('y', 72);
      tp.setAttribute('text-anchor', 'middle'); tp.setAttribute('fill', '#22c55e');
      tp.setAttribute('font-size', '9'); tp.setAttribute('font-family', 'Inter');
      tp.textContent = '↑ top'; svg.appendChild(tp);
    }
    // Queue label
    const ql = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    ql.setAttribute('x', 20); ql.setAttribute('y', 95); ql.setAttribute('fill', '#fbbf24');
    ql.setAttribute('font-size', '11'); ql.setAttribute('font-weight', '600'); ql.setAttribute('font-family', 'Inter');
    ql.textContent = 'Queue (FIFO):'; svg.appendChild(ql);
    // Queue items
    queue.forEach((v, i) => {
      const x = 20 + i * 65;
      const r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      r.setAttribute('x', x); r.setAttribute('y', 105); r.setAttribute('width', 55); r.setAttribute('height', 28); r.setAttribute('rx', 5);
      r.setAttribute('fill', i === 0 ? '#14532d' : '#1c1917');
      r.setAttribute('stroke', i === 0 ? '#22c55e' : '#f59e0b');
      r.setAttribute('stroke-width', i === 0 ? '2' : '1'); svg.appendChild(r);
      const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      t.setAttribute('x', x + 27); t.setAttribute('y', 124); t.setAttribute('text-anchor', 'middle');
      t.setAttribute('fill', i === 0 ? '#86efac' : '#fbbf24');
      t.setAttribute('font-size', '12'); t.setAttribute('font-weight', '700'); t.setAttribute('font-family', 'Inter');
      t.textContent = v; svg.appendChild(t);
    });
    if (queue.length) {
      const fp = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      fp.setAttribute('x', 47); fp.setAttribute('y', 145);
      fp.setAttribute('text-anchor', 'middle'); fp.setAttribute('fill', '#22c55e');
      fp.setAttribute('font-size', '9'); fp.setAttribute('font-family', 'Inter');
      fp.textContent = '↑ front'; svg.appendChild(fp);
    }
  }

  document.getElementById('sq-push').addEventListener('click', () => {
    const v = input.value.trim(); if (!v) return;
    stack.push(v); input.value = ''; render(`Stack push: ${v}`); input.focus();
  });
  document.getElementById('sq-pop').addEventListener('click', () => {
    if (!stack.length) { render('Stack 为空'); return; }
    const v = stack.pop(); render(`Stack pop: ${v}`);
  });
  document.getElementById('sq-enq').addEventListener('click', () => {
    const v = input.value.trim(); if (!v) return;
    queue.push(v); input.value = ''; render(`Queue enqueue: ${v}`); input.focus();
  });
  document.getElementById('sq-deq').addEventListener('click', () => {
    if (!queue.length) { render('Queue 为空'); return; }
    const v = queue.shift(); render(`Queue dequeue: ${v}`);
  });
  document.getElementById('sq-reset').addEventListener('click', () => {
    stack = []; queue = []; render('已重置');
  });
  input.addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('sq-push').click(); });
  render('点击按钮操作栈和队列');
}

document.addEventListener('DOMContentLoaded', initSQDemo);
