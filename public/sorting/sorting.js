// Sorting Algorithms Interactive Visualization

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

class SortVisualizer {
  constructor(svgId, logId) {
    this.svg = document.getElementById(svgId);
    this.log = document.getElementById(logId);
    this.arr = [];
    this.running = false;
    this.speed = 80;
  }

  setArray(arr) { this.arr = [...arr]; this.render(); }

  render(highlights = new Set(), sorted = new Set()) {
    this.svg.innerHTML = '';
    const W = 700, H = 220, n = this.arr.length;
    if (!n) return;
    const maxVal = Math.max(...this.arr, 1);
    const barW = Math.min((W - 20) / n - 2, 40);
    const gap = 2;
    const totalW = n * (barW + gap);
    const offsetX = (W - totalW) / 2;

    this.arr.forEach((v, i) => {
      const h = (v / maxVal) * (H - 30);
      const x = offsetX + i * (barW + gap);
      const y = H - h - 10;
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', x); rect.setAttribute('y', y);
      rect.setAttribute('width', barW); rect.setAttribute('height', h);
      rect.setAttribute('rx', '2');
      if (highlights.has(i)) rect.setAttribute('fill', '#f59e0b');
      else if (sorted.has(i)) rect.setAttribute('fill', '#22c55e');
      else rect.setAttribute('fill', '#3b82f6');
      this.svg.appendChild(rect);

      const txt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      txt.setAttribute('x', x + barW / 2); txt.setAttribute('y', H - 1);
      txt.setAttribute('text-anchor', 'middle'); txt.setAttribute('font-size', n > 12 ? '7' : '9');
      txt.setAttribute('fill', '#94a3b8'); txt.setAttribute('font-family', 'JetBrains Mono');
      txt.textContent = v;
      this.svg.appendChild(txt);
    });
  }

  async bubbleSort() {
    const a = this.arr, n = a.length;
    let comps = 0, swaps = 0;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - 1 - i; j++) {
        comps++;
        this.render(new Set([j, j + 1]));
        await sleep(this.speed);
        if (a[j] > a[j + 1]) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]]; swaps++;
        }
      }
    }
    this.render(new Set(), new Set(a.map((_, i) => i)));
    this.log.textContent = `✅ 冒泡排序完成：${comps} 次比较，${swaps} 次交换`;
  }

  async selectionSort() {
    const a = this.arr, n = a.length;
    let comps = 0, swaps = 0;
    for (let i = 0; i < n - 1; i++) {
      let min = i;
      for (let j = i + 1; j < n; j++) {
        comps++;
        this.render(new Set([min, j]));
        await sleep(this.speed);
        if (a[j] < a[min]) min = j;
      }
      if (min !== i) { [a[i], a[min]] = [a[min], a[i]]; swaps++; }
    }
    this.render(new Set(), new Set(a.map((_, i) => i)));
    this.log.textContent = `✅ 选择排序完成：${comps} 次比较，${swaps} 次交换`;
  }

  async insertionSort() {
    const a = this.arr, n = a.length;
    let comps = 0, shifts = 0;
    for (let i = 1; i < n; i++) {
      const key = a[i];
      let j = i - 1;
      while (j >= 0 && a[j] > key) {
        comps++; shifts++;
        a[j + 1] = a[j]; j--;
        this.render(new Set([j + 1, i]));
        await sleep(this.speed);
      }
      comps++;
      a[j + 1] = key;
    }
    this.render(new Set(), new Set(a.map((_, i) => i)));
    this.log.textContent = `✅ 插入排序完成：${comps} 次比较，${shifts} 次移动`;
  }

  async quickSort(lo = 0, hi = this.arr.length - 1, depth = 0) {
    if (lo >= hi) return;
    const a = this.arr;
    let pivot = a[hi], i = lo;
    for (let j = lo; j < hi; j++) {
      this.render(new Set([j, hi]));
      await sleep(this.speed);
      if (a[j] < pivot) { [a[i], a[j]] = [a[j], a[i]]; i++; }
    }
    [a[i], a[hi]] = [a[hi], a[i]];
    this.render(new Set([i]));
    await sleep(this.speed);
    await this.quickSort(lo, i - 1, depth + 1);
    await this.quickSort(i + 1, hi, depth + 1);
    if (depth === 0) {
      this.render(new Set(), new Set(a.map((_, i) => i)));
      this.log.textContent = '✅ 快速排序完成';
    }
  }

  async mergeSort(lo = 0, hi = this.arr.length - 1, depth = 0) {
    if (lo >= hi) return;
    const mid = (lo + hi) >> 1;
    await this.mergeSort(lo, mid, depth + 1);
    await this.mergeSort(mid + 1, hi, depth + 1);
    const a = this.arr, tmp = [];
    let i = lo, j = mid + 1;
    while (i <= mid && j <= hi) {
      this.render(new Set([i, j]));
      await sleep(this.speed);
      tmp.push(a[i] <= a[j] ? a[i++] : a[j++]);
    }
    while (i <= mid) tmp.push(a[i++]);
    while (j <= hi) tmp.push(a[j++]);
    for (let k = 0; k < tmp.length; k++) a[lo + k] = tmp[k];
    this.render(new Set(Array.from({ length: hi - lo + 1 }, (_, k) => lo + k)));
    await sleep(this.speed);
    if (depth === 0) {
      this.render(new Set(), new Set(a.map((_, i) => i)));
      this.log.textContent = '✅ 归并排序完成';
    }
  }

  async heapSort() {
    const a = this.arr, n = a.length;
    const siftDown = async (i, size) => {
      while (2 * i + 1 < size) {
        let child = 2 * i + 1;
        if (child + 1 < size && a[child + 1] > a[child]) child++;
        if (a[i] >= a[child]) break;
        [a[i], a[child]] = [a[child], a[i]];
        this.render(new Set([i, child]));
        await sleep(this.speed);
        i = child;
      }
    };
    for (let i = (n >> 1) - 1; i >= 0; i--) await siftDown(i, n);
    for (let i = n - 1; i > 0; i--) {
      [a[0], a[i]] = [a[i], a[0]];
      this.render(new Set([0, i]));
      await sleep(this.speed);
      await siftDown(0, i);
    }
    this.render(new Set(), new Set(a.map((_, i) => i)));
    this.log.textContent = '✅ 堆排序完成';
  }
}

function initSortDemo() {
  const vis = new SortVisualizer('sort-svg', 'sort-log');
  const arrInput = document.getElementById('sort-arr');
  const speedInput = document.getElementById('sort-speed');

  function getArr() {
    return arrInput.value.split(',').map(s => parseInt(s.trim())).filter(v => !isNaN(v));
  }

  function resetArr() { vis.setArray(getArr()); vis.log.textContent = '已重置，选择排序算法开始演示'; }

  document.getElementById('sort-random').addEventListener('click', () => {
    const n = 16;
    const arr = Array.from({ length: n }, () => Math.floor(Math.random() * 50) + 1);
    arrInput.value = arr.join(', ');
    vis.setArray(arr);
    vis.log.textContent = `随机生成 ${n} 个元素`;
  });

  document.getElementById('sort-reset').addEventListener('click', resetArr);

  ['bubble', 'selection', 'insertion', 'quick', 'merge', 'heap'].forEach(name => {
    document.getElementById(`sort-${name}`).addEventListener('click', async () => {
      if (vis.running) return;
      vis.running = true;
      vis.speed = parseInt(speedInput.value) || 80;
      vis.setArray(getArr());
      vis.log.textContent = `⏳ 运行中...`;
      const methods = { bubble: 'bubbleSort', selection: 'selectionSort', insertion: 'insertionSort', quick: 'quickSort', merge: 'mergeSort', heap: 'heapSort' };
      await vis[methods[name]]();
      vis.running = false;
    });
  });

  vis.setArray(getArr());
  vis.log.textContent = '选择排序算法开始演示。试试"随机"按钮生成新数组！';
}

document.addEventListener('DOMContentLoaded', initSortDemo);
