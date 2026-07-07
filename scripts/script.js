document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById('add-crypto-btn');
  const dropdown = document.getElementById('crypto-dropdown');
  const leftColumn = document.getElementById('left-column');
  const rightColumn = document.getElementById('right-column');

  btn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    dropdown.classList.toggle('hidden');
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.add('hidden');
    }
  });

  dropdown.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', (e) => {
      const name = e.target.dataset.name;
      const price = e.target.dataset.price;
      const imgSrc = e.target.dataset.img; 
      
      const newItem = document.createElement('div');
      newItem.className = 'crypto-item';
      
      const leftCount = leftColumn.children.length;
      const rightCount = rightColumn.children.length;

      if (leftCount <= rightCount) {
        newItem.innerHTML = `
            <span class="price">${price}</span>
            <span class="name">${name}</span>
            <img src="${imgSrc}" alt="${name}" class="coin-icon">
        `;
        leftColumn.appendChild(newItem);
      } else {
        newItem.innerHTML = `
            <img src="${imgSrc}" alt="${name}" class="coin-icon">
            <span class="name">${name}</span>
            <span class="price">${price}</span>
        `;
        rightColumn.appendChild(newItem);
      }

      dropdown.classList.add('hidden');
    });
  });

  const ARC_RADIUS = 400; 
  const MAX_SHIFT = 180;  

  function calculateCurve() {
    const centerCircle = document.getElementById('center-circle');
    if (!centerCircle) return;

    const circleRect = centerCircle.getBoundingClientRect();
    const centerY = circleRect.top + (circleRect.height / 2);

    const applyCurveToColumn = (column, isRightSide) => {
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

    applyCurveToColumn(leftColumn, false);
    applyCurveToColumn(rightColumn, true);
  }

  const observer = new MutationObserver(() => {
    setTimeout(calculateCurve, 50);
  });

  observer.observe(leftColumn, { childList: true });
  observer.observe(rightColumn, { childList: true });

  setTimeout(calculateCurve, 50);
  window.addEventListener('resize', () => requestAnimationFrame(calculateCurve));
});