// ===== 可访问性增强 / Accessibility Enhancement =====

(function() {
  // 添加 skip-link
  function addSkipLink() {
    if (document.querySelector('.skip-link')) return;
    
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = '跳到主要内容';
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  // 创建 main 区域
  function createMainRegion() {
    const container = document.querySelector('.container');
    if (container && !document.getElementById('main-content')) {
      container.id = 'main-content';
      container.tabIndex = -1;
    }
  }

  // 添加 ARIA 标签
  function addAriaLabels() {
    // 为导航添加 aria-label
    const nav = document.querySelector('nav');
    if (nav && !nav.getAttribute('aria-label')) {
      nav.setAttribute('aria-label', '目录导航');
    }

    // 为表格添加描述
    document.querySelectorAll('table').forEach((table, i) => {
      const caption = table.querySelector('caption');
      if (!table.getAttribute('aria-describedby')) {
        const descId = `table-desc-${i}`;
        table.setAttribute('aria-describedby', descId);
      }
    });
  }

  // 初始化
  function init() {
    addSkipLink();
    createMainRegion();
    addAriaLabels();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
