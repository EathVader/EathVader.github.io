// SVG diagram generators for the tutorial

function createArchDiagram() {
  return `
  <svg viewBox="0 0 800 320" xmlns="http://www.w3.org/2000/svg" style="font-family:Inter,sans-serif">
    <defs>
      <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#3b82f6"/><stop offset="100%" stop-color="#6366f1"/></linearGradient>
      <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#22c55e"/><stop offset="100%" stop-color="#14b8a6"/></linearGradient>
      <linearGradient id="g3" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#ef4444"/></linearGradient>
      <linearGradient id="g4" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#a78bfa"/><stop offset="100%" stop-color="#ec4899"/></linearGradient>
      <linearGradient id="g5" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#06b6d4"/><stop offset="100%" stop-color="#3b82f6"/></linearGradient>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa"/></marker>
    </defs>
    <!-- Boxes -->
    <rect x="20" y="110" width="130" height="100" rx="12" fill="url(#g1)" opacity=".9"/>
    <text x="85" y="150" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">📄 Data &amp;</text>
    <text x="85" y="170" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">Tokenizer</text>
    <text x="85" y="192" text-anchor="middle" fill="#dbeafe" font-size="10">文本 → 数字序列</text>

    <rect x="180" y="110" width="130" height="100" rx="12" fill="url(#g2)" opacity=".9"/>
    <text x="245" y="150" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">⚙️ Autograd</text>
    <text x="245" y="170" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">Engine</text>
    <text x="245" y="192" text-anchor="middle" fill="#d1fae5" font-size="10">自动微分引擎</text>

    <rect x="340" y="110" width="130" height="100" rx="12" fill="url(#g3)" opacity=".9"/>
    <text x="405" y="150" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">🧠 GPT</text>
    <text x="405" y="170" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">Model</text>
    <text x="405" y="192" text-anchor="middle" fill="#fef3c7" font-size="10">Transformer 前向传播</text>

    <rect x="500" y="110" width="130" height="100" rx="12" fill="url(#g4)" opacity=".9"/>
    <text x="565" y="150" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">🔄 Training</text>
    <text x="565" y="170" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">Loop</text>
    <text x="565" y="192" text-anchor="middle" fill="#ede9fe" font-size="10">Loss + Adam 优化</text>

    <rect x="660" y="110" width="120" height="100" rx="12" fill="url(#g5)" opacity=".9"/>
    <text x="720" y="150" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">✨ Inference</text>
    <text x="720" y="170" text-anchor="middle" fill="#fff" font-size="13" font-weight="700"></text>
    <text x="720" y="185" text-anchor="middle" fill="#cffafe" font-size="10">文本生成</text>

    <!-- Arrows -->
    <line x1="150" y1="160" x2="178" y2="160" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrowhead)"/>
    <line x1="310" y1="160" x2="338" y2="160" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrowhead)"/>
    <line x1="470" y1="160" x2="498" y2="160" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrowhead)"/>
    <line x1="630" y1="160" x2="658" y2="160" stroke="#60a5fa" stroke-width="2" marker-end="url(#arrowhead)"/>

    <!-- Labels -->
    <text x="400" y="40" text-anchor="middle" fill="#94a3b8" font-size="14" font-weight="600">MicroGPT 整体架构 / Overall Architecture</text>
    <text x="400" y="60" text-anchor="middle" fill="#64748b" font-size="11">~200 行纯 Python，完整实现 GPT 训练与推理</text>

    <!-- Line counts -->
    <text x="85" y="230" text-anchor="middle" fill="#64748b" font-size="10">L1-30</text>
    <text x="245" y="230" text-anchor="middle" fill="#64748b" font-size="10">L33-110</text>
    <text x="405" y="230" text-anchor="middle" fill="#64748b" font-size="10">L112-180</text>
    <text x="565" y="230" text-anchor="middle" fill="#64748b" font-size="10">L182-225</text>
    <text x="720" y="230" text-anchor="middle" fill="#64748b" font-size="10">L227-243</text>

    <!-- Feedback loop -->
    <path d="M565,212 L565,270 L405,270 L405,212" fill="none" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#arrowhead)"/>
    <text x="485" y="285" text-anchor="middle" fill="#a78bfa" font-size="10">反向传播更新参数</text>
  </svg>`;
}

function createAutogradDiagram() {
  return `
  <svg viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg" style="font-family:Inter,sans-serif">
    <defs>
      <marker id="ah2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#60a5fa"/></marker>
      <marker id="ah3" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#f87171"/></marker>
    </defs>
    <text x="350" y="25" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="600">计算图示例: L = log((a * b) + 4)</text>

    <!-- Nodes -->
    <circle cx="80" cy="100" r="30" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
    <text x="80" y="96" text-anchor="middle" fill="#93c5fd" font-size="11" font-weight="700">a</text>
    <text x="80" y="112" text-anchor="middle" fill="#64748b" font-size="9">data=2</text>

    <circle cx="80" cy="200" r="30" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
    <text x="80" y="196" text-anchor="middle" fill="#93c5fd" font-size="11" font-weight="700">b</text>
    <text x="80" y="212" text-anchor="middle" fill="#64748b" font-size="9">data=3</text>

    <circle cx="230" cy="150" r="30" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
    <text x="230" y="146" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="700">c = a*b</text>
    <text x="230" y="162" text-anchor="middle" fill="#64748b" font-size="9">data=6</text>

    <circle cx="230" cy="240" r="22" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
    <text x="230" y="244" text-anchor="middle" fill="#94a3b8" font-size="11">4</text>

    <circle cx="400" cy="170" r="30" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
    <text x="400" y="166" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="700">d = c+4</text>
    <text x="400" y="182" text-anchor="middle" fill="#64748b" font-size="9">data=10</text>

    <circle cx="560" cy="170" r="30" fill="#1e293b" stroke="#22c55e" stroke-width="2"/>
    <text x="560" y="166" text-anchor="middle" fill="#4ade80" font-size="11" font-weight="700">L=log(d)</text>
    <text x="560" y="182" text-anchor="middle" fill="#64748b" font-size="9">data=2.3</text>

    <!-- Forward arrows (blue) -->
    <line x1="108" y1="112" x2="200" y2="140" stroke="#60a5fa" stroke-width="1.5" marker-end="url(#ah2)"/>
    <line x1="108" y1="188" x2="200" y2="160" stroke="#60a5fa" stroke-width="1.5" marker-end="url(#ah2)"/>
    <line x1="260" y1="150" x2="368" y2="165" stroke="#60a5fa" stroke-width="1.5" marker-end="url(#ah2)"/>
    <line x1="250" y1="230" x2="375" y2="185" stroke="#60a5fa" stroke-width="1.5" marker-end="url(#ah2)"/>
    <line x1="430" y1="170" x2="528" y2="170" stroke="#60a5fa" stroke-width="1.5" marker-end="url(#ah2)"/>

    <!-- Backward gradient labels (red) -->
    <text x="560" y="130" text-anchor="middle" fill="#f87171" font-size="10">grad=1.0</text>
    <text x="400" y="130" text-anchor="middle" fill="#f87171" font-size="10">grad=0.1</text>
    <text x="230" y="110" text-anchor="middle" fill="#f87171" font-size="10">grad=0.1</text>
    <text x="80" y="62" text-anchor="middle" fill="#f87171" font-size="10">grad=0.3</text>
    <text x="80" y="248" text-anchor="middle" fill="#f87171" font-size="10">grad=0.2</text>

    <!-- Legend -->
    <line x1="30" y1="270" x2="55" y2="270" stroke="#60a5fa" stroke-width="2"/>
    <text x="60" y="274" fill="#60a5fa" font-size="10">前向传播 Forward</text>
    <text x="200" y="274" fill="#f87171" font-size="10">🔴 grad = 反向传播梯度 Backward gradient</text>
  </svg>`;
}

function createTransformerDiagram() {
  return `
  <svg viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg" style="font-family:Inter,sans-serif">
    <defs>
      <marker id="ah4" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#60a5fa"/></marker>
    </defs>
    <text x="300" y="25" text-anchor="middle" fill="#94a3b8" font-size="14" font-weight="600">GPT 前向传播 / Forward Pass</text>

    <!-- Input -->
    <rect x="200" y="45" width="200" height="36" rx="8" fill="#172554" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="300" y="68" text-anchor="middle" fill="#93c5fd" font-size="12">Token + Position Embedding</text>

    <line x1="300" y1="81" x2="300" y2="100" stroke="#60a5fa" stroke-width="1.5" marker-end="url(#ah4)"/>

    <!-- RMSNorm -->
    <rect x="225" y="102" width="150" height="30" rx="6" fill="#1e293b" stroke="#475569" stroke-width="1"/>
    <text x="300" y="122" text-anchor="middle" fill="#94a3b8" font-size="11">RMSNorm</text>

    <line x1="300" y1="132" x2="300" y2="150" stroke="#60a5fa" stroke-width="1.5" marker-end="url(#ah4)"/>

    <!-- Transformer Block -->
    <rect x="100" y="152" width="400" height="260" rx="12" fill="none" stroke="#334155" stroke-width="1.5" stroke-dasharray="6,3"/>
    <text x="120" y="172" fill="#64748b" font-size="11">Transformer Block × n_layer</text>

    <!-- Attention -->
    <rect x="140" y="185" width="320" height="80" rx="8" fill="#1a1a2e" stroke="#a78bfa" stroke-width="1.5"/>
    <text x="300" y="210" text-anchor="middle" fill="#c4b5fd" font-size="12" font-weight="600">Multi-Head Attention (4 heads)</text>
    <text x="300" y="230" text-anchor="middle" fill="#7c3aed" font-size="10">Q·K^T / √d → Softmax → ×V</text>
    <text x="300" y="248" text-anchor="middle" fill="#64748b" font-size="10">+ Output Projection + Residual</text>

    <line x1="300" y1="265" x2="300" y2="285" stroke="#60a5fa" stroke-width="1.5" marker-end="url(#ah4)"/>

    <!-- RMSNorm 2 -->
    <rect x="225" y="287" width="150" height="26" rx="6" fill="#1e293b" stroke="#475569" stroke-width="1"/>
    <text x="300" y="305" text-anchor="middle" fill="#94a3b8" font-size="11">RMSNorm</text>

    <line x1="300" y1="313" x2="300" y2="330" stroke="#60a5fa" stroke-width="1.5" marker-end="url(#ah4)"/>

    <!-- MLP -->
    <rect x="140" y="332" width="320" height="60" rx="8" fill="#1a1a2e" stroke="#22c55e" stroke-width="1.5"/>
    <text x="300" y="355" text-anchor="middle" fill="#86efac" font-size="12" font-weight="600">MLP Feed-Forward</text>
    <text x="300" y="375" text-anchor="middle" fill="#64748b" font-size="10">Linear(16→64) → ReLU² → Linear(64→16) + Residual</text>

    <line x1="300" y1="412" x2="300" y2="435" stroke="#60a5fa" stroke-width="1.5" marker-end="url(#ah4)"/>

    <!-- Output -->
    <rect x="200" y="437" width="200" height="36" rx="8" fill="#172554" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="300" y="460" text-anchor="middle" fill="#93c5fd" font-size="12">lm_head → Logits (vocab_size)</text>

    <!-- Residual arrows -->
    <path d="M130,200 L130,360 L138,360" fill="none" stroke="#475569" stroke-width="1" stroke-dasharray="4,2"/>
    <text x="115" y="280" fill="#475569" font-size="9" transform="rotate(-90,115,280)">Residual</text>
  </svg>`;
}

function createTrainingDiagram() {
  return `
  <svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" style="font-family:Inter,sans-serif">
    <defs>
      <marker id="ah5" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#60a5fa"/></marker>
      <marker id="ah6" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#f87171"/></marker>
    </defs>
    <text x="350" y="22" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="600">训练循环 / Training Loop (×500 steps)</text>

    <!-- Steps -->
    <rect x="20" y="50" width="110" height="55" rx="8" fill="#172554" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="75" y="73" text-anchor="middle" fill="#93c5fd" font-size="11" font-weight="600">1. 取数据</text>
    <text x="75" y="90" text-anchor="middle" fill="#64748b" font-size="9">Tokenize doc</text>

    <line x1="130" y1="77" x2="155" y2="77" stroke="#60a5fa" stroke-width="1.5" marker-end="url(#ah5)"/>

    <rect x="157" y="50" width="110" height="55" rx="8" fill="#1a1a2e" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="212" y="73" text-anchor="middle" fill="#fbbf24" font-size="11" font-weight="600">2. 前向传播</text>
    <text x="212" y="90" text-anchor="middle" fill="#64748b" font-size="9">GPT → logits</text>

    <line x1="267" y1="77" x2="292" y2="77" stroke="#60a5fa" stroke-width="1.5" marker-end="url(#ah5)"/>

    <rect x="294" y="50" width="110" height="55" rx="8" fill="#1a1a2e" stroke="#ef4444" stroke-width="1.5"/>
    <text x="349" y="73" text-anchor="middle" fill="#fca5a5" font-size="11" font-weight="600">3. 计算损失</text>
    <text x="349" y="90" text-anchor="middle" fill="#64748b" font-size="9">Cross-Entropy</text>

    <line x1="404" y1="77" x2="429" y2="77" stroke="#f87171" stroke-width="1.5" marker-end="url(#ah6)"/>

    <rect x="431" y="50" width="110" height="55" rx="8" fill="#1a1a2e" stroke="#a78bfa" stroke-width="1.5"/>
    <text x="486" y="73" text-anchor="middle" fill="#c4b5fd" font-size="11" font-weight="600">4. 反向传播</text>
    <text x="486" y="90" text-anchor="middle" fill="#64748b" font-size="9">loss.backward()</text>

    <line x1="541" y1="77" x2="566" y2="77" stroke="#f87171" stroke-width="1.5" marker-end="url(#ah6)"/>

    <rect x="568" y="50" width="110" height="55" rx="8" fill="#14532d" stroke="#22c55e" stroke-width="1.5"/>
    <text x="623" y="73" text-anchor="middle" fill="#86efac" font-size="11" font-weight="600">5. Adam更新</text>
    <text x="623" y="90" text-anchor="middle" fill="#64748b" font-size="9">Update params</text>

    <!-- Loop arrow -->
    <path d="M623,107 L623,150 L75,150 L75,107" fill="none" stroke="#475569" stroke-width="1.5" stroke-dasharray="5,3" marker-end="url(#ah5)"/>
    <text x="350" y="168" text-anchor="middle" fill="#64748b" font-size="10">重复 500 次 / Repeat 500 steps</text>
  </svg>`;
}

function createAttentionDiagram() {
  return `
  <svg viewBox="0 0 650 300" xmlns="http://www.w3.org/2000/svg" style="font-family:Inter,sans-serif">
    <defs>
      <marker id="ah7" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#a78bfa"/></marker>
    </defs>
    <text x="325" y="22" text-anchor="middle" fill="#94a3b8" font-size="13" font-weight="600">注意力机制 / Attention Mechanism</text>
    <text x="325" y="40" text-anchor="middle" fill="#64748b" font-size="10">Attention(Q,K,V) = softmax(Q·K^T / √d) · V</text>

    <!-- Input x -->
    <rect x="20" y="80" width="80" height="40" rx="6" fill="#172554" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="60" y="105" text-anchor="middle" fill="#93c5fd" font-size="11">x (16-dim)</text>

    <!-- Q K V -->
    <rect x="160" y="55" width="80" height="32" rx="6" fill="#2e1065" stroke="#a78bfa" stroke-width="1.5"/>
    <text x="200" y="76" text-anchor="middle" fill="#c4b5fd" font-size="11">Q = Wq·x</text>

    <rect x="160" y="95" width="80" height="32" rx="6" fill="#2e1065" stroke="#a78bfa" stroke-width="1.5"/>
    <text x="200" y="116" text-anchor="middle" fill="#c4b5fd" font-size="11">K = Wk·x</text>

    <rect x="160" y="135" width="80" height="32" rx="6" fill="#2e1065" stroke="#a78bfa" stroke-width="1.5"/>
    <text x="200" y="156" text-anchor="middle" fill="#c4b5fd" font-size="11">V = Wv·x</text>

    <line x1="100" y1="92" x2="158" y2="71" stroke="#a78bfa" stroke-width="1" marker-end="url(#ah7)"/>
    <line x1="100" y1="100" x2="158" y2="111" stroke="#a78bfa" stroke-width="1" marker-end="url(#ah7)"/>
    <line x1="100" y1="108" x2="158" y2="151" stroke="#a78bfa" stroke-width="1" marker-end="url(#ah7)"/>

    <!-- Split heads -->
    <rect x="290" y="55" width="120" height="32" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="350" y="76" text-anchor="middle" fill="#fbbf24" font-size="10">Split → 4 heads</text>
    <text x="350" y="76" text-anchor="middle" fill="#fbbf24" font-size="10">Split → 4 heads</text>

    <line x1="240" y1="71" x2="288" y2="71" stroke="#a78bfa" stroke-width="1" marker-end="url(#ah7)"/>

    <!-- Dot product -->
    <rect x="290" y="105" width="120" height="32" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="350" y="126" text-anchor="middle" fill="#fbbf24" font-size="10">Q·K^T / √d</text>

    <!-- Softmax -->
    <rect x="450" y="105" width="80" height="32" rx="6" fill="#14532d" stroke="#22c55e" stroke-width="1.5"/>
    <text x="490" y="126" text-anchor="middle" fill="#86efac" font-size="10">Softmax</text>

    <line x1="410" y1="121" x2="448" y2="121" stroke="#60a5fa" stroke-width="1" marker-end="url(#ah7)"/>

    <!-- Weighted V -->
    <rect x="450" y="155" width="80" height="32" rx="6" fill="#14532d" stroke="#22c55e" stroke-width="1.5"/>
    <text x="490" y="176" text-anchor="middle" fill="#86efac" font-size="10">× V</text>

    <line x1="490" y1="137" x2="490" y2="153" stroke="#60a5fa" stroke-width="1" marker-end="url(#ah7)"/>

    <!-- Concat + Wo -->
    <rect x="560" y="155" width="70" height="32" rx="6" fill="#172554" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="595" y="176" text-anchor="middle" fill="#93c5fd" font-size="10">Wo·concat</text>

    <line x1="530" y1="171" x2="558" y2="171" stroke="#60a5fa" stroke-width="1" marker-end="url(#ah7)"/>

    <!-- Example attention weights -->
    <text x="325" y="220" text-anchor="middle" fill="#94a3b8" font-size="12" font-weight="600">示例: 预测 "emma" 中 m 后面的字符</text>
    <g transform="translate(120,235)">
      <rect x="0" y="0" width="60" height="24" rx="4" fill="#3b82f6" opacity=".2"/>
      <text x="30" y="17" text-anchor="middle" fill="#93c5fd" font-size="10">BOS: 5%</text>
      <rect x="70" y="0" width="60" height="24" rx="4" fill="#3b82f6" opacity=".6"/>
      <text x="100" y="17" text-anchor="middle" fill="#93c5fd" font-size="10">e: 30%</text>
      <rect x="140" y="0" width="60" height="24" rx="4" fill="#3b82f6" opacity=".9"/>
      <text x="170" y="17" text-anchor="middle" fill="#fff" font-size="10">m: 55%</text>
      <rect x="210" y="0" width="60" height="24" rx="4" fill="#3b82f6" opacity=".3"/>
      <text x="240" y="17" text-anchor="middle" fill="#93c5fd" font-size="10">m: 10%</text>
    </g>
    <text x="325" y="280" text-anchor="middle" fill="#64748b" font-size="10">注意力权重越高 = 该位置对预测越重要</text>
  </svg>`;
}
