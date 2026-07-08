document.addEventListener("DOMContentLoaded", () => {
  const dropdownContainers = document.querySelectorAll('.dropdown-container');
  const leftColumns = document.querySelectorAll('.left-side');
  const rightColumns = document.querySelectorAll('.right-side');

  dropdownContainers.forEach(container => {
    const btn = container.querySelector('.add-crypto-btn');
    const dropdown = container.querySelector('.dropdown-list');

    if (!btn || !dropdown) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation(); 
      document.querySelectorAll('.dropdown-list').forEach(list => {
        if (list !== dropdown) list.classList.add('hidden');
      });
      dropdown.classList.toggle('hidden');
    });

    dropdown.querySelectorAll('li').forEach(item => {
      item.addEventListener('click', (e) => {
        const name = item.dataset.name;
        const price = item.dataset.price;
        const imgSrc = item.dataset.img; 
        
        leftColumns.forEach((leftCol, index) => {
          const rightCol = rightColumns[index];
          if (!rightCol) return;

          const newItem = document.createElement('div');
          newItem.className = 'crypto-item';
          
          const leftCount = leftCol.children.length;
          const rightCount = rightCol.children.length;

          if (leftCount <= rightCount) {
            newItem.className = 'crypto-item appear-left';
            newItem.innerHTML = `
                <span class="price">${price}</span>
                <span class="name">${name}</span>
                <img src="${imgSrc}" alt="${name}" class="coin-icon">
            `;
            leftCol.appendChild(newItem);
          } else {
            newItem.className = 'crypto-item appear-right';
            newItem.innerHTML = `
                <img src="${imgSrc}" alt="${name}" class="coin-icon">
                <span class="name">${name}</span>
                <span class="price">${price}</span>
            `;
            rightCol.appendChild(newItem);
          }
        });

        dropdown.classList.add('hidden');
      });
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-list').forEach(list => {
      list.classList.add('hidden');
    });
  });

  const ARC_RADIUS = 400; 
  const MAX_SHIFT = 180;  

  function calculateCurve() {
    const centerCircles = document.querySelectorAll('.center-circle');
    
    centerCircles.forEach(centerCircle => {
      if (centerCircle.offsetParent === null) return;

      const circleRect = centerCircle.getBoundingClientRect();
      const centerY = circleRect.top + (circleRect.height / 2);
      const dashboard = centerCircle.closest('.crypto-dashboard');
      if (!dashboard) return;

      const desktopLeft = dashboard.querySelector('.left-side');
      const desktopRight = dashboard.querySelector('.right-side');
      const applyCurveToColumn = (column, isRightSide) => {
        if (!column) return;
        Array.from(column.children).forEach(item => {
          const itemRect = item.getBoundingClientRect();
          const itemCenterY = itemRect.top + (itemRect.height / 2);
          
          const dy = Math.abs(centerY - itemCenterY);
          const safeDy = Math.min(dy, ARC_RADIUS); 
          
          let shiftX = ARC_RADIUS - Math.sqrt(ARC_RADIUS * ARC_RADIUS - safeDy * safeDy);
          shiftX = Math.min(shiftX, MAX_SHIFT); 
          
          item.style.transform = `translateX(${isRightSide ? -shiftX : shiftX}px)`;
        });
      };

      applyCurveToColumn(desktopLeft, false);
      applyCurveToColumn(desktopRight, true);
    });
  }

  const observer = new MutationObserver(() => {
    setTimeout(calculateCurve, 50);
  });

  leftColumns.forEach(col => observer.observe(col, { childList: true }));
  rightColumns.forEach(col => observer.observe(col, { childList: true }));
  setTimeout(calculateCurve, 50);
  window.addEventListener('resize', () => requestAnimationFrame(calculateCurve));
});