// ===== 语法高亮模块 / Syntax Highlighting =====

// 使用 Prism.js 进行语法高亮
(function() {
  // 如果已经加载了 Prism，直接高亮
  if (window.Prism) {
    highlightAll();
    return;
  }

  // 动态加载 Prism
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css';
  document.head.appendChild(css);

  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js';
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-java.min.js';
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-go.min.js';
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-javascript.min.js';
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-typescript.min.js';
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-c.min.js';
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-cpp.min.js';
  script.onload = highlightAll;
  document.head.appendChild(script);
})();

function highlightAll() {
  // 为所有 pre > code 块添加高亮
  document.querySelectorAll('pre code').forEach(block => {
    // 跳过已经高亮的
    if (block.classList.contains('language-')) {
      block.classList.remove('language-');
    }
    if (!block.className.match(/language-/)) {
      // 自动检测语言
      const text = block.textContent;
      if (text.includes('def ') || text.includes('import ') || text.includes('class ') && text.includes(':')) {
        block.classList.add('language-python');
      } else if (text.includes('func ') && text.includes('package ')) {
        block.classList.add('language-go');
      } else if (text.includes('public class') || text.includes('void ')) {
        block.classList.add('language-java');
      }
    }
    if (window.Prism) {
      window.Prism.highlightElement(block);
    }
  });
}

// 自动为代码块添加行号
function addLineNumbers() {
  document.querySelectorAll('pre').forEach(pre => {
    if (!pre.classList.contains('line-numbers')) {
      pre.classList.add('line-numbers');
    }
  });
}

// 导出
window.SyntaxHighlighter = {
  highlightAll,
  addLineNumbers
};
