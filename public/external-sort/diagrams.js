// SVG diagram generators for External Merge Sort tutorial

function createRunGenDiagram() {
  return `
  <svg viewBox="0 0 760 300" xmlns="http://www.w3.org/2000/svg" style="font-family:Inter,sans-serif">
    <defs>
      <marker id="ah1" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#60a5fa"/></marker>
      <linearGradient id="gDisk" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#3b82f6"/><stop offset="100%" stop-color="#6366f1"/></linearGradient>
      <linearGradient id="gMem" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#22c55e"/><stop offset="100%" stop-color="#14b8a6"/></linearGradient>
      <linearGradient id="gOut" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#ef4444"/></linearGradient>
    </defs>
    <text x="380" y="25" text-anchor="middle" fill="#94a3b8" font-size="14" font-weight="600">Phase 1: 初始归并段生成 / Initial Run Generation</text>

    <!-- Big file -->
    <rect x="20" y="60" width="140" height="200" rx="10" fill="url(#gDisk)" opacity=".85"/>
    <text x="90" y="90" text-anchor="middle" fill="#fff" font-size="12" font-weight="700">💾 大文件 (10GB)</text>
    <text x="90" y="115" text-anchor="middle" fill="#dbeafe" font-size="10">38, 7, 91, 2, 55,</text>
    <text x="90" y="130" text-anchor="middle" fill="#dbeafe" font-size="10">14, 83, 46, 9, 71,</text>
    <text x="90" y="145" text-anchor="middle" fill="#dbeafe" font-size="10">27, 63, 5, 88, 31,</text>
    <text x="90" y="160" text-anchor="middle" fill="#dbeafe" font-size="10">...</text>
    <text x="90" y="180" text-anchor="middle" fill="#93c5fd" font-size="10">无序数据</text>
    <text x="90" y="195" text-anchor="middle" fill="#93c5fd" font-size="10">Unsorted data</text>

    <!-- Arrow to memory -->
    <line x1="162" y1="140" x2="218" y2="140" stroke="#60a5fa" stroke-width="2" marker-end="url(#ah1)"/>
    <text x="190" y="130" text-anchor="middle" fill="#64748b" font-size="9">读取块</text>

    <!-- Memory -->
    <rect x="220" y="80" width="160" height="130" rx="10" fill="url(#gMem)" opacity=".85"/>
    <text x="300" y="108" text-anchor="middle" fill="#fff" font-size="12" font-weight="700">🧠 内存 (100MB)</text>
    <text x="300" y="135" text-anchor="middle" fill="#d1fae5" font-size="11">读入一块 → 内存排序</text>
    <text x="300" y="155" text-anchor="middle" fill="#d1fae5" font-size="11">quicksort / heapsort</text>
    <text x="300" y="180" text-anchor="middle" fill="#bbf7d0" font-size="10">→ 写出有序归并段</text>

    <!-- Arrow to runs -->
    <line x1="382" y1="140" x2="438" y2="90" stroke="#60a5fa" stroke-width="2" marker-end="url(#ah1)"/>
    <line x1="382" y1="140" x2="438" y2="145" stroke="#60a5fa" stroke-width="2" marker-end="url(#ah1)"/>
    <line x1="382" y1="140" x2="438" y2="200" stroke="#60a5fa" stroke-width="2" marker-end="url(#ah1)"/>

    <!-- Sorted runs -->
    <rect x="440" y="60" width="140" height="50" rx="8" fill="url(#gOut)" opacity=".85"/>
    <text x="510" y="82" text-anchor="middle" fill="#fff" font-size="11" font-weight="600">Run 0 (sorted)</text>
    <text x="510" y="100" text-anchor="middle" fill="#fef3c7" font-size="10">2, 7, 14, 38, 55, 91</text>

    <rect x="440" y="120" width="140" height="50" rx="8" fill="url(#gOut)" opacity=".85"/>
    <text x="510" y="142" text-anchor="middle" fill="#fff" font-size="11" font-weight="600">Run 1 (sorted)</text>
    <text x="510" y="160" text-anchor="middle" fill="#fef3c7" font-size="10">5, 9, 27, 46, 71, 83</text>

    <rect x="440" y="180" width="140" height="50" rx="8" fill="url(#gOut)" opacity=".85"/>
    <text x="510" y="202" text-anchor="middle" fill="#fff" font-size="11" font-weight="600">Run 2 (sorted)</text>
    <text x="510" y="220" text-anchor="middle" fill="#fef3c7" font-size="10">3, 22, 31, 63, 77, 88</text>

    <text x="510" y="250" text-anchor="middle" fill="#64748b" font-size="10">... 共 ~100 个归并段</text>

    <!-- Summary -->
    <rect x="610" y="80" width="140" height="130" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
    <text x="680" y="105" text-anchor="middle" fill="#f8fafc" font-size="11" font-weight="600">📊 结果</text>
    <text x="680" y="128" text-anchor="middle" fill="#94a3b8" font-size="10">10GB ÷ 100MB</text>
    <text x="680" y="148" text-anchor="middle" fill="#94a3b8" font-size="10">= ~100 个归并段</text>
    <text x="680" y="172" text-anchor="middle" fill="#86efac" font-size="10">每段内部有序 ✓</text>
    <text x="680" y="192" text-anchor="middle" fill="#fbbf24" font-size="10">段之间无序 ✗</text>
  </svg>`;
}

function createKWayMergeDiagram() {
  return `
  <svg viewBox="0 0 760 320" xmlns="http://www.w3.org/2000/svg" style="font-family:Inter,sans-serif">
    <defs>
      <marker id="ah2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#60a5fa"/></marker>
    </defs>
    <text x="380" y="25" text-anchor="middle" fill="#94a3b8" font-size="14" font-weight="600">Phase 2: K 路归并 / K-Way Merge</text>

    <!-- Input runs -->
    <rect x="20" y="50" width="120" height="40" rx="6" fill="#172554" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="80" y="66" text-anchor="middle" fill="#93c5fd" font-size="10" font-weight="600">Run 0</text>
    <text x="80" y="82" text-anchor="middle" fill="#64748b" font-size="9">[2, 7, 14, 38...]</text>

    <rect x="20" y="100" width="120" height="40" rx="6" fill="#172554" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="80" y="116" text-anchor="middle" fill="#93c5fd" font-size="10" font-weight="600">Run 1</text>
    <text x="80" y="132" text-anchor="middle" fill="#64748b" font-size="9">[5, 9, 27, 46...]</text>

    <rect x="20" y="150" width="120" height="40" rx="6" fill="#172554" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="80" y="166" text-anchor="middle" fill="#93c5fd" font-size="10" font-weight="600">Run 2</text>
    <text x="80" y="182" text-anchor="middle" fill="#64748b" font-size="9">[3, 22, 31, 63...]</text>

    <rect x="20" y="200" width="120" height="40" rx="6" fill="#172554" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="80" y="216" text-anchor="middle" fill="#93c5fd" font-size="10" font-weight="600">Run 3</text>
    <text x="80" y="232" text-anchor="middle" fill="#64748b" font-size="9">[1, 15, 44, 70...]</text>

    <text x="80" y="260" text-anchor="middle" fill="#475569" font-size="10">... k 个归并段</text>

    <!-- Arrows to heap -->
    <line x1="142" y1="70" x2="238" y2="140" stroke="#60a5fa" stroke-width="1.5" marker-end="url(#ah2)"/>
    <line x1="142" y1="120" x2="238" y2="145" stroke="#60a5fa" stroke-width="1.5" marker-end="url(#ah2)"/>
    <line x1="142" y1="170" x2="238" y2="155" stroke="#60a5fa" stroke-width="1.5" marker-end="url(#ah2)"/>
    <line x1="142" y1="220" x2="238" y2="165" stroke="#60a5fa" stroke-width="1.5" marker-end="url(#ah2)"/>
    <text x="190" y="110" text-anchor="middle" fill="#64748b" font-size="9">各取首元素</text>

    <!-- Min-Heap -->
    <rect x="240" y="80" width="200" height="160" rx="12" fill="#2e1065" stroke="#a78bfa" stroke-width="2"/>
    <text x="340" y="105" text-anchor="middle" fill="#c4b5fd" font-size="12" font-weight="700">🏔️ 最小堆 / Min-Heap</text>

    <!-- Heap tree -->
    <circle cx="340" cy="140" r="16" fill="#1e293b" stroke="#22c55e" stroke-width="2"/>
    <text x="340" y="145" text-anchor="middle" fill="#86efac" font-size="11" font-weight="700">1</text>

    <line x1="328" y1="154" x2="300" y2="172" stroke="#475569" stroke-width="1"/>
    <line x1="352" y1="154" x2="380" y2="172" stroke="#475569" stroke-width="1"/>

    <circle cx="300" cy="186" r="14" fill="#1e293b" stroke="#a78bfa" stroke-width="1.5"/>
    <text x="300" y="190" text-anchor="middle" fill="#c4b5fd" font-size="10">2</text>

    <circle cx="380" cy="186" r="14" fill="#1e293b" stroke="#a78bfa" stroke-width="1.5"/>
    <text x="380" y="190" text-anchor="middle" fill="#c4b5fd" font-size="10">3</text>

    <line x1="290" y1="198" x2="272" y2="212" stroke="#475569" stroke-width="1"/>
    <line x1="310" y1="198" x2="328" y2="212" stroke="#475569" stroke-width="1"/>

    <circle cx="272" cy="224" r="12" fill="#1e293b" stroke="#475569" stroke-width="1"/>
    <text x="272" y="228" text-anchor="middle" fill="#94a3b8" font-size="9">5</text>

    <circle cx="328" cy="224" r="12" fill="#1e293b" stroke="#475569" stroke-width="1"/>
    <text x="328" y="228" text-anchor="middle" fill="#94a3b8" font-size="9">7</text>

    <!-- Arrow from heap to output -->
    <line x1="442" y1="150" x2="498" y2="150" stroke="#22c55e" stroke-width="2" marker-end="url(#ah2)"/>
    <text x="470" y="140" text-anchor="middle" fill="#86efac" font-size="9">弹出最小</text>

    <!-- Output buffer -->
    <rect x="500" y="100" width="120" height="100" rx="10" fill="#14532d" stroke="#22c55e" stroke-width="1.5"/>
    <text x="560" y="125" text-anchor="middle" fill="#86efac" font-size="11" font-weight="600">输出缓冲区</text>
    <text x="560" y="148" text-anchor="middle" fill="#d1fae5" font-size="10">1, 2, 3, 5, 7,</text>
    <text x="560" y="165" text-anchor="middle" fill="#d1fae5" font-size="10">9, 14, 15, ...</text>
    <text x="560" y="188" text-anchor="middle" fill="#bbf7d0" font-size="9">全局有序 ✓</text>

    <!-- Arrow to final file -->
    <line x1="622" y1="150" x2="658" y2="150" stroke="#22c55e" stroke-width="2" marker-end="url(#ah2)"/>

    <rect x="660" y="110" width="90" height="80" rx="8" fill="#172554" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="705" y="140" text-anchor="middle" fill="#93c5fd" font-size="11" font-weight="600">💾 输出</text>
    <text x="705" y="158" text-anchor="middle" fill="#64748b" font-size="10">有序大文件</text>
    <text x="705" y="175" text-anchor="middle" fill="#64748b" font-size="10">Sorted file</text>

    <!-- Loop annotation -->
    <path d="M500,202 L500,280 L340,280 L340,250" fill="none" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#ah2)"/>
    <text x="420" y="295" text-anchor="middle" fill="#a78bfa" font-size="10">弹出后从同一 Run 补入下一个元素 → 重新堆化</text>
  </svg>`;
}

function createHeapDiagram() {
  return `
  <svg viewBox="0 0 600 260" xmlns="http://www.w3.org/2000/svg" style="font-family:Inter,sans-serif">
    <text x="300" y="22" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="600">最小堆结构 / Min-Heap Structure</text>
    <text x="300" y="42" text-anchor="middle" fill="#64748b" font-size="10">parent ≤ children — 堆顶始终是最小值</text>
    <!-- Level 0 -->
    <circle cx="300" cy="80" r="22" fill="#14532d" stroke="#22c55e" stroke-width="2.5"/>
    <text x="300" y="86" text-anchor="middle" fill="#86efac" font-size="13" font-weight="700">1</text>
    <text x="340" y="75" fill="#22c55e" font-size="9">← 堆顶 min</text>
    <!-- Edges L0-L1 -->
    <line x1="282" y1="96" x2="210" y2="138" stroke="#475569" stroke-width="1.5"/>
    <line x1="318" y1="96" x2="390" y2="138" stroke="#475569" stroke-width="1.5"/>
    <!-- Level 1 -->
    <circle cx="200" cy="150" r="20" fill="#1e293b" stroke="#a78bfa" stroke-width="2"/>
    <text x="200" y="156" text-anchor="middle" fill="#c4b5fd" font-size="12" font-weight="600">3</text>
    <circle cx="400" cy="150" r="20" fill="#1e293b" stroke="#a78bfa" stroke-width="2"/>
    <text x="400" y="156" text-anchor="middle" fill="#c4b5fd" font-size="12" font-weight="600">2</text>
    <!-- Edges L1-L2 -->
    <line x1="185" y1="167" x2="140" y2="198" stroke="#475569" stroke-width="1"/>
    <line x1="215" y1="167" x2="260" y2="198" stroke="#475569" stroke-width="1"/>
    <line x1="385" y1="167" x2="340" y2="198" stroke="#475569" stroke-width="1"/>
    <line x1="415" y1="167" x2="460" y2="198" stroke="#475569" stroke-width="1"/>
    <!-- Level 2 -->
    <circle cx="130" cy="210" r="16" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
    <text x="130" y="215" text-anchor="middle" fill="#94a3b8" font-size="10">7</text>
    <circle cx="270" cy="210" r="16" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
    <text x="270" y="215" text-anchor="middle" fill="#94a3b8" font-size="10">5</text>
    <circle cx="330" cy="210" r="16" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
    <text x="330" y="215" text-anchor="middle" fill="#94a3b8" font-size="10">9</text>
    <circle cx="470" cy="210" r="16" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
    <text x="470" y="215" text-anchor="middle" fill="#94a3b8" font-size="10">15</text>
    <!-- Array representation -->
    <text x="300" y="252" text-anchor="middle" fill="#64748b" font-size="10">数组表示: [1, 3, 2, 7, 5, 9, 15]  —  parent(i) = (i-1)//2, children = 2i+1, 2i+2</text>
  </svg>`;
}

function createIODiagram() {
  return `
  <svg viewBox="0 0 700 240" xmlns="http://www.w3.org/2000/svg" style="font-family:Inter,sans-serif">
    <defs>
      <marker id="ah3" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#60a5fa"/></marker>
    </defs>
    <text x="350" y="22" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="600">I/O 缓冲优化 / Double Buffering</text>
    <!-- Disk -->
    <rect x="20" y="60" width="100" height="140" rx="8" fill="#172554" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="70" y="85" text-anchor="middle" fill="#93c5fd" font-size="11" font-weight="600">💾 磁盘</text>
    <text x="70" y="105" text-anchor="middle" fill="#64748b" font-size="9">随机读: ~10ms</text>
    <text x="70" y="120" text-anchor="middle" fill="#64748b" font-size="9">顺序读: ~0.1ms</text>
    <text x="70" y="145" text-anchor="middle" fill="#fbbf24" font-size="9">⚠️ 瓶颈!</text>
    <text x="70" y="165" text-anchor="middle" fill="#64748b" font-size="9">比内存慢</text>
    <text x="70" y="180" text-anchor="middle" fill="#64748b" font-size="9">10万倍</text>
    <!-- Arrow -->
    <line x1="122" y1="120" x2="168" y2="120" stroke="#60a5fa" stroke-width="2" marker-end="url(#ah3)"/>
    <!-- Input buffers -->
    <rect x="170" y="50" width="180" height="160" rx="10" fill="#1e293b" stroke="#334155" stroke-width="1"/>
    <text x="260" y="75" text-anchor="middle" fill="#f8fafc" font-size="11" font-weight="600">输入缓冲区 × k</text>
    <rect x="185" y="85" width="150" height="28" rx="4" fill="#172554" stroke="#3b82f6" stroke-width="1"/>
    <text x="260" y="104" text-anchor="middle" fill="#93c5fd" font-size="9">Run 0 buffer [批量读入]</text>
    <rect x="185" y="118" width="150" height="28" rx="4" fill="#172554" stroke="#3b82f6" stroke-width="1"/>
    <text x="260" y="137" text-anchor="middle" fill="#93c5fd" font-size="9">Run 1 buffer [批量读入]</text>
    <rect x="185" y="151" width="150" height="28" rx="4" fill="#172554" stroke="#3b82f6" stroke-width="1"/>
    <text x="260" y="170" text-anchor="middle" fill="#93c5fd" font-size="9">Run 2 buffer [批量读入]</text>
    <text x="260" y="200" text-anchor="middle" fill="#64748b" font-size="9">每次读一批，减少 I/O 次数</text>
    <!-- Arrow to heap -->
    <line x1="352" y1="120" x2="398" y2="120" stroke="#60a5fa" stroke-width="2" marker-end="url(#ah3)"/>
    <!-- Heap -->
    <rect x="400" y="70" width="100" height="100" rx="10" fill="#2e1065" stroke="#a78bfa" stroke-width="1.5"/>
    <text x="450" y="100" text-anchor="middle" fill="#c4b5fd" font-size="11" font-weight="600">Min-Heap</text>
    <text x="450" y="120" text-anchor="middle" fill="#a78bfa" font-size="10">O(log k)</text>
    <text x="450" y="140" text-anchor="middle" fill="#a78bfa" font-size="10">取最小值</text>
    <!-- Arrow to output -->
    <line x1="502" y1="120" x2="538" y2="120" stroke="#22c55e" stroke-width="2" marker-end="url(#ah3)"/>
    <!-- Output buffer -->
    <rect x="540" y="70" width="140" height="100" rx="10" fill="#14532d" stroke="#22c55e" stroke-width="1.5"/>
    <text x="610" y="95" text-anchor="middle" fill="#86efac" font-size="11" font-weight="600">输出缓冲区</text>
    <text x="610" y="115" text-anchor="middle" fill="#d1fae5" font-size="9">攒满一批再写磁盘</text>
    <text x="610" y="135" text-anchor="middle" fill="#d1fae5" font-size="9">顺序写入 → 高效</text>
    <text x="610" y="155" text-anchor="middle" fill="#bbf7d0" font-size="9">→ 💾 输出文件</text>
    <!-- Bottom note -->
    <text x="350" y="232" text-anchor="middle" fill="#94a3b8" font-size="10">内存分配: k 个输入缓冲 + 1 个输出缓冲 + 堆 (k 个元素) — 总内存 ∝ k，与数据总量无关</text>
  </svg>`;
}
