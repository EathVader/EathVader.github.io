// ===== 公共工具模块 / Common Utilities =====

// 常用哈希函数
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// MD5 哈希
function md5(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return hash;
}

// 多个哈希函数 (用于布隆过滤器等)
function multiHash(str, numHashes) {
  const h1 = hashString(str);
  const h2 = hashString(str + '_salt');
  return Array.from({ length: numHashes }, (_, i) => {
    return (h1 + i * h2) % 2147483647;
  });
}

// 二分查找
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

// 数组 shuffle (洗牌算法)
function shuffleArray(arr) {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// 交换数组元素
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

// 防抖函数
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// 节流函数
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 深度复制对象
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// 创建 SVG 元素
function createSVGElement(tag, attrs) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
  return el;
}

// 滚动到顶部
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 滚动到元素
function scrollToElement(selector) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 导出到全局
window.CommonUtils = {
  hashString,
  md5,
  multiHash,
  binarySearch,
  shuffleArray,
  swap,
  debounce,
  throttle,
  deepClone,
  createSVGElement,
  scrollToTop,
  scrollToElement
};

// ===== 添加浮动返回主页按钮 =====
(function() {
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') return;
  
  const style = document.createElement('style');
  style.textContent = `
    .home-btn {
      position: fixed;
      bottom: 2rem;
      left: 2rem;
      width: 3rem;
      height: 3rem;
      background: linear-gradient(135deg, #3b82f6, #2563eb);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      text-decoration: none;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
      z-index: 1000;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .home-btn:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 16px rgba(59, 130, 246, 0.5);
    }
  `;
  document.head.appendChild(style);
  
  const btn = document.createElement('a');
  btn.href = '/';
  btn.className = 'home-btn';
  btn.innerHTML = '🏠';
  btn.title = '返回主页';
  document.body.appendChild(btn);
})();
