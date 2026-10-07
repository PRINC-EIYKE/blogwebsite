// Lightweight Custom SVG Chart Renderers (Zero External Dependencies)

const ChartRenderer = {
  // Cashflow Area & Trend Chart
  renderCashflowChart(containerId, weeklyData) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const width = 640;
    const height = 240;
    const padding = { top: 20, right: 30, bottom: 35, left: 45 };

    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const maxVal = Math.max(...weeklyData.flatMap(d => [d.income, d.expense])) * 1.15;

    const getX = index => padding.left + (index / (weeklyData.length - 1)) * chartW;
    const getY = val => padding.top + chartH - (val / maxVal) * chartH;

    // Build SVG path
    let incomePoints = weeklyData.map((d, i) => `${getX(i)},${getY(d.income)}`);
    let expensePoints = weeklyData.map((d, i) => `${getX(i)},${getY(d.expense)}`);

    const incomeLine = `M ${incomePoints.join(' L ')}`;
    const expenseLine = `M ${expensePoints.join(' L ')}`;

    const incomeArea = `${incomeLine} L ${getX(weeklyData.length - 1)},${padding.top + chartH} L ${getX(0)},${padding.top + chartH} Z`;
    const expenseArea = `${expenseLine} L ${getX(weeklyData.length - 1)},${padding.top + chartH} L ${getX(0)},${padding.top + chartH} Z`;

    const svg = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: 100%; overflow: visible;">
        <defs>
          <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#10B981" stop-opacity="0.28"/>
            <stop offset="100%" stop-color="#10B981" stop-opacity="0.0"/>
          </linearGradient>
          <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#F43F5E" stop-opacity="0.2"/>
            <stop offset="100%" stop-color="#F43F5E" stop-opacity="0.0"/>
          </linearGradient>
        </defs>

        <!-- Horizontal Grid Lines -->
        ${[0, 0.25, 0.5, 0.75, 1].map(ratio => {
          const y = padding.top + chartH * (1 - ratio);
          return `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="rgba(255,255,255,0.06)" stroke-dasharray="3,3" />`;
        }).join('')}

        <!-- Gradient Areas -->
        <path d="${incomeArea}" fill="url(#incomeGrad)" />
        <path d="${expenseArea}" fill="url(#expenseGrad)" />

        <!-- Line Paths -->
        <path d="${incomeLine}" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" />
        <path d="${expenseLine}" fill="none" stroke="#F43F5E" stroke-width="2.5" stroke-linecap="round" />

        <!-- Data Dots & Labels -->
        ${weeklyData.map((d, i) => {
          const x = getX(i);
          const yInc = getY(d.income);
          const yExp = getY(d.expense);
          return `
            <circle cx="${x}" cy="${yInc}" r="4.5" fill="#10B981" stroke="#090D10" stroke-width="2" />
            <circle cx="${x}" cy="${yExp}" r="4.5" fill="#F43F5E" stroke="#090D10" stroke-width="2" />
            <text x="${x}" y="${height - 10}" fill="#64748B" font-size="11" font-weight="600" text-anchor="middle">${d.week}</text>
          `;
        }).join('')}
      </svg>
    `;

    container.innerHTML = svg;
  },

  // 6-Month Income vs Expense Bar Chart
  renderBarComparison(containerId, monthlyData) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const width = 640;
    const height = 260;
    const padding = { top: 20, right: 20, bottom: 40, left: 40 };

    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const maxVal = Math.max(...monthlyData.flatMap(d => [d.income, d.expense])) * 1.15;
    const groupW = chartW / monthlyData.length;
    const barW = Math.min(20, groupW * 0.3);

    const svg = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: 100%;">
        <!-- Gridlines -->
        ${[0, 0.33, 0.66, 1].map(ratio => {
          const y = padding.top + chartH * (1 - ratio);
          return `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="rgba(255,255,255,0.06)" />`;
        }).join('')}

        <!-- Month Bar Groups -->
        ${monthlyData.map((d, i) => {
          const groupX = padding.left + i * groupW + groupW / 2;
          const hInc = (d.income / maxVal) * chartH;
          const hExp = (d.expense / maxVal) * chartH;

          const xInc = groupX - barW - 2;
          const yInc = padding.top + chartH - hInc;

          const xExp = groupX + 2;
          const yExp = padding.top + chartH - hExp;

          return `
            <rect x="${xInc}" y="${yInc}" width="${barW}" height="${hInc}" rx="3" fill="#10B981" />
            <rect x="${xExp}" y="${yExp}" width="${barW}" height="${hExp}" rx="3" fill="#F43F5E" />
            <text x="${groupX}" y="${height - 12}" fill="#94A3B8" font-size="11" font-weight="600" text-anchor="middle">${d.month}</text>
          `;
        }).join('')}
      </svg>
    `;

    container.innerHTML = svg;
  },

  // Category Distribution Donut Chart
  renderDonutChart(containerId, categories) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const size = 240;
    const strokeWidth = 26;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const total = categories.reduce((sum, c) => sum + c.spent, 0);
    let accumulatedOffset = 0;

    const colorPalette = {
      emerald: '#10B981',
      cyan: '#06B6D4',
      amber: '#F59E0B',
      crimson: '#F43F5E',
      violet: '#8B5CF6'
    };

    const segments = categories.map(cat => {
      const percentage = cat.spent / total;
      const strokeDash = `${percentage * circumference} ${circumference}`;
      const strokeOffset = -accumulatedOffset;
      accumulatedOffset += percentage * circumference;
      const strokeColor = colorPalette[cat.color] || '#10B981';

      return `
        <circle 
          cx="${size / 2}" cy="${size / 2}" r="${radius}"
          fill="none" 
          stroke="${strokeColor}" 
          stroke-width="${strokeWidth}" 
          stroke-dasharray="${strokeDash}"
          stroke-dashoffset="${strokeOffset}"
          stroke-linecap="round"
          style="transition: stroke-dasharray 0.8s ease;"
        />
      `;
    }).join('');

    const svg = `
      <svg viewBox="0 0 ${size} ${size}" style="width: 100%; max-width: 240px; transform: rotate(-90deg); margin: 0 auto; display: block;">
        <circle 
          cx="${size / 2}" cy="${size / 2}" r="${radius}"
          fill="none" 
          stroke="rgba(255,255,255,0.06)" 
          stroke-width="${strokeWidth}" 
        />
        ${segments}
      </svg>
    `;

    container.innerHTML = svg;
  }
};
