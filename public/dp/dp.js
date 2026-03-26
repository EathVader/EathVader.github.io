// DP Interactive Table Visualizer

const state = {
  problem: 'coin',
  steps: [],
  stepIdx: -1,
  autoTimer: null,
  dp: null,
  labels: null,
};

function el(id) { return document.getElementById(id); }

// Render a 1D DP table
function render1D(dp, labels, highlight, sources) {
  const c = el('dp-table-container');
  let html = '<table style="font-size:.85rem"><tr><th style="background:#0f172a"></th>';
  labels.forEach((l, i) => {
    html += `<th>${l}</th>`;
  });
  html += '</tr><tr><td style="font-weight:700;color:#60a5fa">dp</td>';
  dp.forEach((v, i) => {
    let cls = '';
    if (i === highlight) cls = 'background:#172554;border:2px solid #3b82f6;color:#60a5fa;font-weight:700';
    else if (sources && sources.includes(i)) cls = 'background:#451a03;border:2px solid #f59e0b;color:#fbbf24;font-weight:700';
    else if (v !== Infinity && v !== null && state.stepIdx >= 0) cls = 'background:#14532d;color:#86efac';
    const display = v === Infinity ? '∞' : (v === null ? '-' : v);
    html += `<td style="${cls}">${display}</td>`;
  });
  html += '</tr></table>';
  c.innerHTML = html;
}

// Render a 2D DP table
function render2D(dp, rowLabels, colLabels, highlight, sources) {
  const c = el('dp-table-container');
  let html = '<table style="font-size:.82rem"><tr><th style="background:#0f172a"></th>';
  colLabels.forEach(l => { html += `<th>${l}</th>`; });
  html += '</tr>';
  dp.forEach((row, i) => {
    html += `<tr><td style="font-weight:700;color:#60a5fa">${rowLabels[i]}</td>`;
    row.forEach((v, j) => {
      let cls = '';
      if (highlight && highlight[0] === i && highlight[1] === j)
        cls = 'background:#172554;border:2px solid #3b82f6;color:#60a5fa;font-weight:700';
      else if (sources && sources.some(s => s[0] === i && s[1] === j))
        cls = 'background:#451a03;border:2px solid #f59e0b;color:#fbbf24;font-weight:700';
      else if (v !== null && v !== undefined)
        cls = 'background:#14532d;color:#86efac';
      const display = v === null ? '-' : v;
      html += `<td style="${cls}">${display}</td>`;
    });
    html += '</tr>';
  });
  html += '</table>';
  c.innerHTML = html;
}

// Setup Coin Change problem
function setupCoin() {
  const coinsStr = el('dp-coins').value;
  const amount = parseInt(el('dp-amount').value) || 11;
  const coins = coinsStr.split(',').map(s => parseInt(s.trim())).filter(n => n > 0);
  if (!coins.length || amount < 1 || amount > 30) {
    el('dp-log').textContent = '⚠️ 请输入有效的硬币和金额（金额 1-30）';
    return false;
  }
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  const labels = Array.from({ length: amount + 1 }, (_, i) => i);
  const steps = [];

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] + 1 < dp[i]) {
        dp[i] = dp[i - coin] + 1;
        steps.push({
          idx: i,
          val: dp[i],
          source: i - coin,
          coin,
          msg: `dp[${i}] = dp[${i - coin}] + 1 = ${dp[i]}（用了 ${coin} 元硬币）`,
          snapshot: [...dp],
        });
      }
    }
    if (dp[i] === Infinity) {
      steps.push({
        idx: i,
        val: Infinity,
        source: null,
        coin: null,
        msg: `dp[${i}] = ∞（无法凑出）`,
        snapshot: [...dp],
      });
    }
  }

  state.steps = steps;
  state.dp = new Array(amount + 1).fill(Infinity);
  state.dp[0] = 0;
  state.labels = labels;
  render1D(state.dp, labels, null, null);
  el('dp-log').textContent = `✅ 已初始化：coins=[${coins}], amount=${amount}，共 ${steps.length} 步。点击"下一步"开始。`;
  return true;
}

// Setup Fibonacci problem
function setupFib() {
  const n = parseInt(el('dp-fib-n').value) || 10;
  if (n < 2 || n > 20) {
    el('dp-log').textContent = '⚠️ 请输入 n（2-20）';
    return false;
  }
  const dp = new Array(n + 1).fill(null);
  dp[0] = 0; dp[1] = 1;
  const labels = Array.from({ length: n + 1 }, (_, i) => i);
  const steps = [];

  const full = [0, 1];
  for (let i = 2; i <= n; i++) {
    full[i] = full[i - 1] + full[i - 2];
    steps.push({
      idx: i,
      val: full[i],
      sources: [i - 1, i - 2],
      msg: `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${full[i - 1]} + ${full[i - 2]} = ${full[i]}`,
      snapshot: full.slice(0, i + 1),
    });
  }

  state.steps = steps;
  state.dp = new Array(n + 1).fill(null);
  state.dp[0] = 0; state.dp[1] = 1;
  state.labels = labels;
  render1D(state.dp, labels, null, null);
  el('dp-log').textContent = `✅ 已初始化：fib(${n})，共 ${steps.length} 步。点击"下一步"开始。`;
  return true;
}

// Setup LCS problem
function setupLCS() {
  const a = el('dp-lcs-a').value.toUpperCase() || 'ABCBDAB';
  const b = el('dp-lcs-b').value.toUpperCase() || 'BDCAB';
  if (a.length > 10 || b.length > 10) {
    el('dp-log').textContent = '⚠️ 字符串长度不超过 10';
    return false;
  }
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(null));
  for (let i = 0; i <= m; i++) dp[i][0] = 0;
  for (let j = 0; j <= n; j++) dp[0][j] = 0;

  const full = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  const steps = [];

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      let sources, msg;
      if (a[i - 1] === b[j - 1]) {
        full[i][j] = full[i - 1][j - 1] + 1;
        sources = [[i - 1, j - 1]];
        msg = `A[${i}]='${a[i - 1]}' == B[${j}]='${b[j - 1]}' → dp[${i}][${j}] = dp[${i - 1}][${j - 1}]+1 = ${full[i][j]}`;
      } else {
        full[i][j] = Math.max(full[i - 1][j], full[i][j - 1]);
        sources = full[i - 1][j] >= full[i][j - 1] ? [[i - 1, j]] : [[i, j - 1]];
        msg = `A[${i}]='${a[i - 1]}' ≠ B[${j}]='${b[j - 1]}' → dp[${i}][${j}] = max(dp[${i - 1}][${j}], dp[${i}][${j - 1}]) = ${full[i][j]}`;
      }
      steps.push({
        pos: [i, j],
        val: full[i][j],
        sources,
        msg,
        snapshot: full.map(r => [...r]),
      });
    }
  }

  state.steps = steps;
  state.dp = dp;
  state.labels = { rowLabels: ['""', ...a.split('')], colLabels: ['""', ...b.split('')] };
  render2D(dp, state.labels.rowLabels, state.labels.colLabels, null, null);
  el('dp-log').textContent = `✅ 已初始化：LCS("${a}", "${b}")，共 ${steps.length} 步。点击"下一步"开始。`;
  return true;
}

// Execute one step
function doStep() {
  if (state.stepIdx >= state.steps.length - 1) {
    stopAuto();
    el('dp-log').textContent = '🎉 填表完成！';
    return;
  }
  state.stepIdx++;
  const step = state.steps[state.stepIdx];

  if (state.problem === 'lcs') {
    // 2D step
    const snap = step.snapshot;
    // Build display dp from snapshot up to current step
    const dp = state.dp;
    dp[step.pos[0]][step.pos[1]] = step.val;
    render2D(dp, state.labels.rowLabels, state.labels.colLabels, step.pos, step.sources);
  } else {
    // 1D step (coin or fib)
    const dp = state.dp;
    if (state.problem === 'coin') {
      dp[step.idx] = step.val;
      const sources = step.source !== null ? [step.source] : [];
      render1D(dp, state.labels, step.idx, sources);
    } else {
      dp[step.idx] = step.val;
      render1D(dp, state.labels, step.idx, step.sources);
    }
  }
  el('dp-log').textContent = `[${state.stepIdx + 1}/${state.steps.length}] ${step.msg}`;
}

function stopAuto() {
  if (state.autoTimer) { clearInterval(state.autoTimer); state.autoTimer = null; }
}

function resetState() {
  stopAuto();
  state.steps = [];
  state.stepIdx = -1;
  state.dp = null;
  state.labels = null;
  el('dp-table-container').innerHTML = '';
  el('dp-log').textContent = '已重置。选择问题并点击"开始填表"。';
}

// Toggle parameter panels
function toggleParams() {
  const p = state.problem;
  document.querySelectorAll('.dp-params').forEach(e => e.style.display = 'none');
  const target = el('dp-params-' + p);
  if (target) target.style.display = 'flex';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  const problemSelect = el('dp-problem');
  problemSelect.addEventListener('change', () => {
    state.problem = problemSelect.value;
    toggleParams();
    resetState();
  });

  el('dp-start').addEventListener('click', () => {
    stopAuto();
    state.stepIdx = -1;
    state.problem = problemSelect.value;
    let ok = false;
    if (state.problem === 'coin') ok = setupCoin();
    else if (state.problem === 'fib') ok = setupFib();
    else if (state.problem === 'lcs') ok = setupLCS();
    if (!ok) return;
  });

  el('dp-step').addEventListener('click', doStep);

  el('dp-auto').addEventListener('click', () => {
    if (state.autoTimer) { stopAuto(); return; }
    if (state.steps.length === 0) {
      el('dp-log').textContent = '⚠️ 请先点击"开始填表"';
      return;
    }
    state.autoTimer = setInterval(() => {
      if (state.stepIdx >= state.steps.length - 1) { stopAuto(); return; }
      doStep();
    }, 500);
  });

  el('dp-reset').addEventListener('click', resetState);

  toggleParams();
});
