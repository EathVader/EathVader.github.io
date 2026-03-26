// Linked List Interactive Visualization
class LLNode {
  constructor(val, next = null) { this.val = val; this.next = next; this.cycleTarget = false; }
}

function initLinkedListDemo() {
  const svg = document.getElementById('ll-svg');
  const log = document.getElementById('ll-log');
  const input = document.getElementById('ll-input');
  let head = null, hasCycle = false;

  function render(msg) {
    svg.innerHTML = '';
    if (msg) log.textContent = msg;
    if (!head) { log.textContent = msg || '链表为空'; return; }
    let node = head, x = 30, visited = new Set();
    while (node && !visited.has(node)) {
      visited.add(node);
      const r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      r.setAttribute('x', x); r.setAttribute('y', 40); r.setAttribute('width', 55);
      r.setAttribute('height', 30); r.setAttribute('rx', 6);
      r.setAttribute('fill', node.cycleTarget ? '#1c1917' : '#172554');
      r.setAttribute('stroke', node.cycleTarget ? '#f59e0b' : '#3b82f6');
      r.setAttribute('stroke-width', node.cycleTarget ? '2' : '1.5');
      svg.appendChild(r);
      const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      t.setAttribute('x', x + 27); t.setAttribute('y', 60); t.setAttribute('text-anchor', 'middle');
      t.setAttribute('fill', node.cycleTarget ? '#fbbf24' : '#93c5fd');
      t.setAttribute('font-size', '13'); t.setAttribute('font-weight', '700');
      t.setAttribute('font-family', 'Inter'); t.textContent = node.val;
      svg.appendChild(t);
      if (node.next) {
        const ln = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        ln.setAttribute('x1', x + 55); ln.setAttribute('y1', 55);
        ln.setAttribute('x2', x + 75); ln.setAttribute('y2', 55);
        ln.setAttribute('stroke', '#3b82f6'); ln.setAttribute('stroke-width', '1.5');
        svg.appendChild(ln);
        const tri = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        tri.setAttribute('points', `${x+75},50 ${x+75},60 ${x+82},55`);
        tri.setAttribute('fill', '#3b82f6');
        svg.appendChild(tri);
      } else {
        const nt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        nt.setAttribute('x', x + 65); nt.setAttribute('y', 60);
        nt.setAttribute('fill', '#f87171'); nt.setAttribute('font-size', '10');
        nt.setAttribute('font-family', 'Inter'); nt.textContent = 'null';
        svg.appendChild(nt);
      }
      x += 85;
      node = node.next;
    }
    if (node && visited.has(node)) {
      const ct = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      ct.setAttribute('x', x); ct.setAttribute('y', 60);
      ct.setAttribute('fill', '#f87171'); ct.setAttribute('font-size', '10');
      ct.setAttribute('font-family', 'Inter'); ct.textContent = '↩ cycle!';
      svg.appendChild(ct);
    }
  }

  document.getElementById('ll-append').addEventListener('click', () => {
    const v = parseInt(input.value); if (isNaN(v)) return;
    hasCycle = false;
    if (!head) { head = new LLNode(v); } else {
      let n = head; while (n.next) n = n.next; n.next = new LLNode(v);
    }
    input.value = ''; render(`追加 ${v}`); input.focus();
  });

  document.getElementById('ll-prepend').addEventListener('click', () => {
    const v = parseInt(input.value); if (isNaN(v)) return;
    hasCycle = false; head = new LLNode(v, head);
    input.value = ''; render(`头插 ${v}`); input.focus();
  });

  document.getElementById('ll-reverse').addEventListener('click', () => {
    if (hasCycle) { render('⚠️ 有环，无法反转'); return; }
    let prev = null, curr = head;
    while (curr) { const next = curr.next; curr.next = prev; prev = curr; curr = next; }
    head = prev; render('✅ 链表已反转');
  });

  document.getElementById('ll-cycle').addEventListener('click', () => {
    let slow = head, fast = head;
    while (fast && fast.next) {
      slow = slow.next; fast = fast.next.next;
      if (slow === fast) { render('🔴 检测到环！'); return; }
    }
    render('🟢 无环');
  });

  document.getElementById('ll-make-cycle').addEventListener('click', () => {
    if (!head || !head.next) { render('至少需要 2 个节点'); return; }
    let tail = head; while (tail.next) tail = tail.next;
    tail.next = head; head.cycleTarget = true; hasCycle = true;
    render('已制造环（尾→头），点击"检测环"试试');
  });

  document.getElementById('ll-reset').addEventListener('click', () => {
    head = null; hasCycle = false; render('已重置');
  });

  input.addEventListener('keydown', e => { if (e.key === 'Enter') document.getElementById('ll-append').click(); });
  render('点击按钮操作链表');
}

document.addEventListener('DOMContentLoaded', initLinkedListDemo);
