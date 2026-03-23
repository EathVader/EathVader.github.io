// Interactive demos for the tutorial

// ===== Demo 1: Tokenizer =====
function runTokenizerDemo() {
  const input = document.getElementById('tok-input').value.toLowerCase();
  const chars = ['<BOS>','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  const stoi = {};
  chars.forEach((ch, i) => stoi[ch] = i);

  const tokens = [0]; // BOS
  let valid = true;
  for (const ch of input) {
    if (stoi[ch] !== undefined) {
      tokens.push(stoi[ch]);
    } else {
      valid = false;
      break;
    }
  }
  tokens.push(0); // BOS end

  const out = document.getElementById('tok-output');
  if (!valid) {
    out.textContent = '⚠️ 只支持小写英文字母 / Only lowercase a-z supported';
    return;
  }
  const labels = ['BOS', ...input.split(''), 'BOS'];
  let result = `输入 Input: "${input}"\n`;
  result += `字符 Chars: [${labels.map(c => `"${c}"`).join(', ')}]\n`;
  result += `编码 Token IDs: [${tokens.join(', ')}]\n\n`;
  result += `映射 Mapping:\n`;
  labels.forEach((ch, i) => {
    result += `  "${ch}" → ${tokens[i]}${i < labels.length - 1 ? '\n' : ''}`;
  });
  out.textContent = result;
}

// ===== Demo 2: Value (Autograd) =====
class DemoValue {
  constructor(data, children = [], op = '') {
    this.data = data;
    this.grad = 0;
    this._backward = () => {};
    this._prev = children;
    this._op = op;
    this.label = '';
  }

  add(other) {
    const out = new DemoValue(this.data + other.data, [this, other], '+');
    const self = this;
    out._backward = () => {
      self.grad += out.grad;
      other.grad += out.grad;
    };
    return out;
  }

  mul(other) {
    const out = new DemoValue(this.data * other.data, [this, other], '*');
    const self = this;
    out._backward = () => {
      self.grad += other.data * out.grad;
      other.grad += self.data * out.grad;
    };
    return out;
  }

  log() {
    const out = new DemoValue(Math.log(this.data), [this], 'log');
    const self = this;
    out._backward = () => {
      self.grad += (1 / self.data) * out.grad;
    };
    return out;
  }

  backward() {
    const topo = [];
    const visited = new Set();
    const buildTopo = (v) => {
      if (!visited.has(v)) {
        visited.add(v);
        for (const child of v._prev) buildTopo(child);
        topo.push(v);
      }
    };
    buildTopo(this);
    this.grad = 1;
    for (const v of topo.reverse()) v._backward();
  }
}

function runAutogradDemo() {
  const aVal = parseFloat(document.getElementById('ag-a').value) || 2;
  const bVal = parseFloat(document.getElementById('ag-b').value) || 3;

  const a = new DemoValue(aVal); a.label = 'a';
  const b = new DemoValue(bVal); b.label = 'b';
  const four = new DemoValue(4); four.label = '4';

  const c = a.mul(b); c.label = 'c = a*b';
  const d = c.add(four); d.label = 'd = c+4';
  const L = d.log(); L.label = 'L = log(d)';

  L.backward();

  const out = document.getElementById('ag-output');
  let result = `=== 前向传播 Forward Pass ===\n`;
  result += `a = ${aVal}\n`;
  result += `b = ${bVal}\n`;
  result += `c = a * b = ${c.data}\n`;
  result += `d = c + 4 = ${d.data}\n`;
  result += `L = log(d) = ${L.data.toFixed(4)}\n\n`;
  result += `=== 反向传播 Backward Pass ===\n`;
  result += `L.grad = ${L.grad.toFixed(4)}  (起点，始终为1)\n`;
  result += `d.grad = ${d.grad.toFixed(4)}  (dL/dd = 1/d = 1/${d.data})\n`;
  result += `c.grad = ${c.grad.toFixed(4)}  (dL/dc = dL/dd * dd/dc = ${d.grad.toFixed(4)} * 1)\n`;
  result += `a.grad = ${a.grad.toFixed(4)}  (dL/da = dL/dc * dc/da = ${c.grad.toFixed(4)} * ${bVal})\n`;
  result += `b.grad = ${b.grad.toFixed(4)}  (dL/db = dL/dc * dc/db = ${c.grad.toFixed(4)} * ${aVal})\n\n`;
  result += `✅ 链式法则验证 Chain Rule Check:\n`;
  result += `  dL/da = 1/d * b = 1/${d.data} * ${bVal} = ${(1/d.data * bVal).toFixed(4)} ✓`;
  out.textContent = result;
}

// ===== Demo 3: Softmax =====
function runSoftmaxDemo() {
  const raw = document.getElementById('sm-input').value.split(',').map(Number);
  if (raw.some(isNaN)) {
    document.getElementById('sm-output').textContent = '⚠️ 请输入逗号分隔的数字';
    return;
  }
  const maxVal = Math.max(...raw);
  const exps = raw.map(v => Math.exp(v - maxVal));
  const total = exps.reduce((a, b) => a + b, 0);
  const probs = exps.map(e => e / total);

  let result = `输入 Logits: [${raw.join(', ')}]\n`;
  result += `减去最大值 (数值稳定): [${raw.map(v => (v - maxVal).toFixed(2)).join(', ')}]\n`;
  result += `exp(): [${exps.map(e => e.toFixed(4)).join(', ')}]\n`;
  result += `总和 Sum: ${total.toFixed(4)}\n\n`;
  result += `Softmax 概率 Probabilities:\n`;
  probs.forEach((p, i) => {
    const bar = '█'.repeat(Math.round(p * 30));
    result += `  [${i}] ${(p * 100).toFixed(1)}% ${bar}\n`;
  });
  result += `\n总和验证 Sum check: ${probs.reduce((a, b) => a + b, 0).toFixed(6)} ≈ 1.0 ✓`;
  document.getElementById('sm-output').textContent = result;
}

// ===== Demo 4: Temperature =====
function runTemperatureDemo() {
  const temp = parseFloat(document.getElementById('temp-val').value) || 0.6;
  document.getElementById('temp-display').textContent = temp.toFixed(1);
  const logits = [2.5, 1.0, 0.5, -0.5, -1.0];
  const labels = ['a', 'e', 'i', 'o', 'u'];
  const scaled = logits.map(l => l / temp);
  const maxVal = Math.max(...scaled);
  const exps = scaled.map(v => Math.exp(v - maxVal));
  const total = exps.reduce((a, b) => a + b, 0);
  const probs = exps.map(e => e / total);

  let result = `Temperature = ${temp.toFixed(1)}\n`;
  result += `原始 Logits:  [${logits.join(', ')}]\n`;
  result += `缩放后 Scaled: [${scaled.map(s => s.toFixed(2)).join(', ')}]\n\n`;
  result += `概率分布 Probability Distribution:\n`;
  probs.forEach((p, i) => {
    const bar = '█'.repeat(Math.round(p * 40));
    result += `  "${labels[i]}" ${(p * 100).toFixed(1).padStart(5)}% ${bar}\n`;
  });
  result += `\n`;
  if (temp < 0.5) result += `🧊 极低温度: 几乎确定性选择最高概率 / Very deterministic`;
  else if (temp < 1.0) result += `❄️ 低温度: 偏向高概率选项，较保守 / Conservative`;
  else if (temp === 1.0) result += `🌡️ 标准温度: 原始概率分布 / Original distribution`;
  else result += `🔥 高温度: 更随机，更"有创意" / More random & creative`;
  document.getElementById('temp-output').textContent = result;
}

// ===== Demo 5: Cross-Entropy =====
function runCrossEntropyDemo() {
  const prob = parseFloat(document.getElementById('ce-prob').value) || 0.5;
  document.getElementById('ce-display').textContent = (prob * 100).toFixed(0) + '%';
  const loss = -Math.log(prob);

  let result = `模型给正确答案的概率: ${(prob * 100).toFixed(1)}%\n`;
  result += `交叉熵损失 = -log(${prob.toFixed(3)}) = ${loss.toFixed(4)}\n\n`;

  const examples = [0.01, 0.1, 0.25, 0.5, 0.75, 0.9, 0.99];
  result += `损失对照表 Loss Reference:\n`;
  examples.forEach(p => {
    const l = -Math.log(p);
    const marker = Math.abs(p - prob) < 0.02 ? ' ← 当前' : '';
    const bar = '█'.repeat(Math.min(Math.round(l * 5), 30));
    result += `  P=${(p*100).toFixed(0).padStart(3)}% → loss=${l.toFixed(3)} ${bar}${marker}\n`;
  });
  result += `\n`;
  if (loss < 0.5) result += `✅ 损失很低，模型预测很准！/ Great prediction!`;
  else if (loss < 1.5) result += `⚠️ 损失中等，还有提升空间 / Room for improvement`;
  else result += `❌ 损失很高，模型预测很差 / Poor prediction`;
  document.getElementById('ce-output').textContent = result;
}

// ===== Demo 6: RMSNorm =====
function runRMSNormDemo() {
  const raw = document.getElementById('rms-input').value.split(',').map(Number);
  if (raw.some(isNaN) || raw.length === 0) {
    document.getElementById('rms-output').textContent = '⚠️ 请输入逗号分隔的数字';
    return;
  }
  const ms = raw.reduce((s, x) => s + x * x, 0) / raw.length;
  const scale = 1 / Math.sqrt(ms + 1e-5);
  const normed = raw.map(x => x * scale);

  const msBefore = raw.reduce((s, x) => s + x * x, 0) / raw.length;
  const msAfter = normed.reduce((s, x) => s + x * x, 0) / normed.length;

  let result = `输入 Input:  [${raw.map(v => v.toFixed(2)).join(', ')}]\n`;
  result += `均方值 MS = Σ(x²)/n = ${ms.toFixed(4)}\n`;
  result += `缩放因子 Scale = 1/√(MS + ε) = ${scale.toFixed(4)}\n\n`;
  result += `归一化后 Normalized: [${normed.map(v => v.toFixed(4)).join(', ')}]\n\n`;
  result += `验证 Verification:\n`;
  result += `  归一化前 RMS = √(${msBefore.toFixed(4)}) = ${Math.sqrt(msBefore).toFixed(4)}\n`;
  result += `  归一化后 RMS = √(${msAfter.toFixed(4)}) = ${Math.sqrt(msAfter).toFixed(4)} ≈ 1.0 ✓`;
  document.getElementById('rms-output').textContent = result;
}

// ===== Back to top =====
window.addEventListener('scroll', () => {
  const btn = document.getElementById('back-top');
  if (btn) btn.classList.toggle('show', window.scrollY > 400);
});
