// View Renderers for all 5 pages

const Views = {
  // SVG Icon Helper
  getIcon(name) {
    const icons = {
      'wallet': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>`,
      'trending-up': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
      'trending-down': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>`,
      'vault': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="12" cy="12" r="3"/><path d="m14.5 9.5 2-2"/><path d="m9.5 14.5-2 2"/><path d="m9.5 9.5-2-2"/><path d="m14.5 14.5 2 2"/></svg>`,
      'arrow-down-left': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="17" y1="7" x2="7" y2="17"/><polyline points="17 17 7 17 7 7"/></svg>`,
      'shopping-bag': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-2Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
      'cloud': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,
      'wifi': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/></svg>`,
      'navigation': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>`,
      'coffee': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h12Z"/><path d="M6 2v2"/><path d="M17 10h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2"/></svg>`,
      'cpu': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>`,
      'activity': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
      'briefcase': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
      'plus': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`,
      'filter': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
      'download': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
      'shield': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>`,
      'utensils': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2"/><path d="M15 11v11"/><path d="M5 2v20"/><path d="M2 2h6v5a3 3 0 0 1-6 0V2Z"/></svg>`,
      'car': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 11 2 11.5 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>`,
      'zap': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
      'heart': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
      'film': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>`,
      'sparkles': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>`
    };
    return icons[name] || icons['wallet'];
  },

  // 1. DASHBOARD VIEW
  renderDashboard(container) {
    const metrics = financeState.getMetrics();
    const transactions = financeState.getTransactions().slice(0, 5);
    const topVault = financeState.getSavingsVaults()[0];
    const topBudget = financeState.getBudgets()[0];

    container.innerHTML = `
      <!-- Top Metric Cards -->
      <div class="kpi-grid">
        <div class="fin-card kpi-card">
          <div class="kpi-label">
            <span>Net Liquid Worth</span>
            <div class="kpi-icon-pill" style="background: rgba(16,185,129,0.15); color: var(--accent-emerald);">
              ${this.getIcon('wallet')}
            </div>
          </div>
          <div class="metric-value">${financeState.formatMoney(metrics.netWorth)}</div>
          <div class="metric-delta positive">
            ${this.getIcon('trending-up')} +14.2% vs last month
          </div>
        </div>

        <div class="fin-card kpi-card">
          <div class="kpi-label">
            <span>Monthly Inflow</span>
            <div class="kpi-icon-pill" style="background: rgba(16,185,129,0.15); color: var(--accent-emerald);">
              ${this.getIcon('trending-up')}
            </div>
          </div>
          <div class="metric-value">${financeState.formatMoney(metrics.monthlyIncome)}</div>
          <div class="metric-delta positive">
            ${this.getIcon('trending-up')} +8.6% run-rate
          </div>
        </div>

        <div class="fin-card kpi-card">
          <div class="kpi-label">
            <span>Monthly Outflow</span>
            <div class="kpi-icon-pill" style="background: rgba(244,63,94,0.15); color: var(--accent-crimson);">
              ${this.getIcon('trending-down')}
            </div>
          </div>
          <div class="metric-value">${financeState.formatMoney(metrics.monthlyExpense)}</div>
          <div class="metric-delta negative">
            ${this.getIcon('trending-down')} 40.2% of income
          </div>
        </div>

        <div class="fin-card kpi-card">
          <div class="kpi-label">
            <span>Total Stashed in Vaults</span>
            <div class="kpi-icon-pill" style="background: rgba(6,182,212,0.15); color: var(--accent-cyan);">
              ${this.getIcon('vault')}
            </div>
          </div>
          <div class="metric-value">${financeState.formatMoney(metrics.totalSaved)}</div>
          <div class="metric-delta positive">
            ${this.getIcon('shield')} 4 Active Vaults
          </div>
        </div>
      </div>

      <!-- Quick Action Strip -->
      <div class="quick-action-strip">
        <button class="quick-action-btn" id="qa-add-tx">
          <div class="action-icon" style="background: var(--accent-emerald-dim); color: var(--accent-emerald);">
            ${this.getIcon('plus')}
          </div>
          <div class="action-meta">
            <h4>Record Transaction</h4>
            <p>Log income or business expense</p>
          </div>
        </button>

        <button class="quick-action-btn" id="qa-deposit-vault">
          <div class="action-icon" style="background: var(--accent-cyan-dim); color: var(--accent-cyan);">
            ${this.getIcon('vault')}
          </div>
          <div class="action-meta">
            <h4>Quick Vault Deposit</h4>
            <p>Allocate funds to targets</p>
          </div>
        </button>

        <button class="quick-action-btn" id="qa-view-budget">
          <div class="action-icon" style="background: var(--accent-amber-dim); color: var(--accent-amber);">
            ${this.getIcon('zap')}
          </div>
          <div class="action-meta">
            <h4>Budget Health</h4>
            <p>Check spending caps</p>
          </div>
        </button>
      </div>

      <!-- Main Dashboard Grid -->
      <div class="dashboard-main-grid">
        <!-- Cashflow Trend Chart -->
        <div class="fin-card">
          <div class="chart-header">
            <div>
              <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary);">Cashflow Velocity</h3>
              <p style="font-size: 0.78rem; color: var(--text-muted);">Weekly Income vs Expense trajectory</p>
            </div>
            <div class="chart-legend">
              <div class="legend-item">
                <span class="legend-dot" style="background: var(--accent-emerald);"></span>
                <span>Inflow</span>
              </div>
              <div class="legend-item">
                <span class="legend-dot" style="background: var(--accent-crimson);"></span>
                <span>Outflow</span>
              </div>
            </div>
          </div>
          <div id="dashboard-cashflow-chart" class="chart-container"></div>
        </div>

        <!-- Savings Spotlight & Top Budget Card -->
        <div style="display: flex; flex-direction: column; gap: var(--space-xl);">
          <!-- Savings Spotlight -->
          <div class="fin-card" style="border-top: 3px solid var(--accent-cyan);">
            <div class="fin-card-header">
              <span class="fin-card-title">Priority Vault</span>
              <span class="badge badge-cyan">${topVault.badge}</span>
            </div>
            <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">
              ${topVault.name}
            </h4>
            <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: var(--space-md);">
              ${topVault.description}
            </p>
            <div style="display: flex; justify-content: space-between; font-size: 0.82rem; margin-bottom: 6px;">
              <span class="font-mono" style="font-weight: 700; color: var(--text-primary);">
                ${financeState.formatMoney(topVault.current)}
              </span>
              <span class="font-mono" style="color: var(--text-muted);">
                of ${financeState.formatMoney(topVault.target)}
              </span>
            </div>
            <div class="progress-container" style="margin-bottom: var(--space-md);">
              <div class="progress-bar progress-cyan" style="width: ${(topVault.current / topVault.target) * 100}%;"></div>
            </div>
            <button class="btn btn-secondary btn-sm" style="width: 100%;" onclick="App.openDepositModal('${topVault.id}')">
              ${this.getIcon('plus')} Quick Deposit
            </button>
          </div>

          <!-- Top Budget Alert Card -->
          <div class="fin-card">
            <div class="fin-card-header">
              <span class="fin-card-title">Largest Budget Category</span>
              <span class="badge badge-emerald">In Range</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
              <span style="font-weight: 600; font-size: 0.95rem; color: var(--text-primary);">${topBudget.category}</span>
              <span class="font-mono" style="font-size: 0.88rem; font-weight: 700; color: var(--text-primary);">
                ${financeState.formatMoney(topBudget.spent)} <span style="color: var(--text-muted); font-size: 0.75rem;">/ ${financeState.formatMoney(topBudget.limit)}</span>
              </span>
            </div>
            <div class="progress-container">
              <div class="progress-bar progress-emerald" style="width: ${(topBudget.spent / topBudget.limit) * 100}%;"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Transactions Section -->
      <div class="fin-card">
        <div class="fin-card-header">
          <div>
            <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary);">Recent Financial Activity</h3>
            <p style="font-size: 0.78rem; color: var(--text-muted);">Real-time ledger updates for Ikechukwu</p>
          </div>
          <button class="btn btn-outline btn-sm" onclick="App.navigateTo('transactions')">
            View Full Ledger →
          </button>
        </div>

        <div class="tx-list">
          ${transactions.map(tx => `
            <div class="tx-item">
              <div class="tx-left">
                <div class="tx-avatar">
                  ${this.getIcon(tx.icon)}
                </div>
                <div class="tx-info">
                  <h5>${tx.description}</h5>
                  <span>${tx.category} • ${tx.method}</span>
                </div>
              </div>
              <div class="tx-right">
                <div class="tx-amount ${tx.type === 'income' ? 'positive' : 'negative'}">
                  ${tx.type === 'income' ? '+' : '-'}${financeState.formatMoney(tx.amount)}
                </div>
                <div class="tx-date">${tx.date}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Render SVG cashflow chart
    ChartRenderer.renderCashflowChart('dashboard-cashflow-chart', initialData.cashflowWeekly);

    // Bind Quick Actions
    document.getElementById('qa-add-tx').onclick = () => App.openAddTxModal();
    document.getElementById('qa-deposit-vault').onclick = () => App.openDepositModal();
    document.getElementById('qa-view-budget').onclick = () => App.navigateTo('budget');
  },

  // 2. TRANSACTION HISTORY VIEW
  renderTransactions(container, filterState = { query: '', category: 'all', type: 'all' }) {
    const filtered = financeState.getFilteredTransactions(filterState);
    const categories = ['all', 'Tech & Cloud', 'Food & Dining', 'Utilities', 'Transport', 'Health & Lifestyle', 'Income'];

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-xl); flex-wrap: wrap; gap: var(--space-md);">
        <div>
          <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary);">Transaction Ledger</h2>
          <p style="font-size: 0.82rem; color: var(--text-muted);">Audit-grade records with category tagging & filtering</p>
        </div>
        <div style="display: flex; gap: var(--space-sm);">
          <button class="btn btn-secondary" onclick="App.exportCSV()">
            ${this.getIcon('download')} Export CSV
          </button>
          <button class="btn btn-primary" onclick="App.openAddTxModal()">
            ${this.getIcon('plus')} Record Entry
          </button>
        </div>
      </div>

      <!-- Filter Toolbar -->
      <div class="tx-filter-bar">
        <div class="input-with-icon" style="width: 100%; max-width: 320px;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input type="text" id="tx-search-input" class="form-input" placeholder="Search merchant, service, or note..." value="${filterState.query}" />
        </div>

        <div class="filter-group-left">
          ${categories.map(c => `
            <button class="filter-pill-btn ${filterState.category.toLowerCase() === c.toLowerCase() ? 'active' : ''}" 
              onclick="Views.updateTxFilter({ category: '${c}' })">
              ${c === 'all' ? 'All Categories' : c}
            </button>
          `).join('')}
        </div>

        <div style="display: flex; gap: 4px; background: var(--bg-surface-raised); padding: 3px; border-radius: var(--radius-pill); border: 1px solid var(--border-subtle);">
          <button class="currency-btn ${filterState.type === 'all' ? 'active' : ''}" onclick="Views.updateTxFilter({ type: 'all' })">All</button>
          <button class="currency-btn ${filterState.type === 'income' ? 'active' : ''}" onclick="Views.updateTxFilter({ type: 'income' })">Inflow</button>
          <button class="currency-btn ${filterState.type === 'expense' ? 'active' : ''}" onclick="Views.updateTxFilter({ type: 'expense' })">Outflow</button>
        </div>
      </div>

      <!-- Ledger Table -->
      <div class="fin-table-container">
        <table class="fin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Transaction / Merchant</th>
              <th>Category</th>
              <th>Method</th>
              <th>Status</th>
              <th style="text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.length === 0 ? `
              <tr>
                <td colspan="6" style="text-align: center; padding: 48px; color: var(--text-muted);">
                  No transactions match your search filter.
                </td>
              </tr>
            ` : filtered.map(tx => `
              <tr>
                <td class="font-mono" style="font-size: 0.8rem; color: var(--text-muted);">${tx.date}</td>
                <td>
                  <div style="display: flex; align-items: center; gap: var(--space-sm);">
                    <div style="width: 28px; height: 28px; border-radius: 6px; background: var(--bg-surface-raised); display: flex; align-items: center; justify-content: center; color: var(--text-secondary);">
                      ${this.getIcon(tx.icon)}
                    </div>
                    <span style="font-weight: 600; color: var(--text-primary);">${tx.description}</span>
                  </div>
                </td>
                <td><span class="badge badge-neutral">${tx.category}</span></td>
                <td><span style="font-size: 0.82rem; color: var(--text-secondary);">${tx.method}</span></td>
                <td><span class="badge badge-emerald">Completed</span></td>
                <td style="text-align: right;">
                  <span class="font-mono ${tx.type === 'income' ? 'positive' : 'negative'}" style="font-weight: 700; font-size: 0.95rem; color: ${tx.type === 'income' ? 'var(--accent-emerald)' : 'var(--text-primary)'};">
                    ${tx.type === 'income' ? '+' : '-'}${financeState.formatMoney(tx.amount)}
                  </span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <div style="margin-top: var(--space-md); font-size: 0.78rem; color: var(--text-muted); text-align: right;">
        Showing ${filtered.length} entries in database
      </div>
    `;

    // Search input listener
    const searchInput = document.getElementById('tx-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        Views.updateTxFilter({ query: e.target.value });
      });
    }
  },

  // Active filter state helper for transactions
  txFilterState: { query: '', category: 'all', type: 'all' },
  updateTxFilter(newFilter) {
    this.txFilterState = { ...this.txFilterState, ...newFilter };
    const container = document.getElementById('view-transactions');
    if (container) {
      this.renderTransactions(container, this.txFilterState);
    }
  },

  // 3. BUDGET VIEW
  renderBudget(container) {
    const budgets = financeState.getBudgets();
    const totalLimit = budgets.reduce((sum, b) => sum + b.limit, 0);
    const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
    const overallPercentage = Math.round((totalSpent / totalLimit) * 100);
    const daysLeft = 26; // days in cycle
    const safeDailySpend = Math.max(0, Math.round((totalLimit - totalSpent) / daysLeft));

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-xl); flex-wrap: wrap; gap: var(--space-md);">
        <div>
          <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary);">Budget Discipline Engine</h2>
          <p style="font-size: 0.82rem; color: var(--text-muted);">Real-time allocation caps and dynamic overspend thresholds</p>
        </div>
        <button class="btn btn-primary" onclick="App.openAddBudgetModal()">
          ${this.getIcon('plus')} New Category Cap
        </button>
      </div>

      <!-- Budget Hero Card -->
      <div class="fin-card budget-overview-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-md);">
          <div>
            <span class="fin-card-title">Monthly Spending Ceiling</span>
            <div style="font-family: var(--font-mono); font-size: 2.2rem; font-weight: 800; color: var(--text-primary); margin-top: 4px;">
              ${financeState.formatMoney(totalSpent)} <span style="font-size: 1.1rem; color: var(--text-muted); font-weight: 500;">/ ${financeState.formatMoney(totalLimit)}</span>
            </div>
          </div>
          <div style="text-align: right;">
            <span class="badge ${overallPercentage > 85 ? 'badge-amber' : 'badge-emerald'}" style="font-size: 0.85rem; padding: 6px 14px;">
              ${overallPercentage}% Utilized
            </span>
          </div>
        </div>

        <div class="progress-container" style="height: 12px; margin-bottom: var(--space-md);">
          <div class="progress-bar ${overallPercentage > 85 ? 'progress-amber' : 'progress-emerald'}" style="width: ${Math.min(overallPercentage, 100)}%;"></div>
        </div>

        <div class="budget-stats-row">
          <div class="budget-stat-item">
            <h6>Remaining Allowance</h6>
            <p style="color: var(--accent-emerald);">${financeState.formatMoney(totalLimit - totalSpent)}</p>
          </div>
          <div class="budget-stat-item">
            <h6>Safe Daily Spend Pace</h6>
            <p>${financeState.formatMoney(safeDailySpend)} / day</p>
          </div>
          <div class="budget-stat-item">
            <h6>Cycle Renewal</h6>
            <p style="font-size: 1.1rem; color: var(--text-secondary);">${daysLeft} Days Remaining</p>
          </div>
        </div>
      </div>

      <!-- Categories Grid -->
      <div class="budget-grid">
        ${budgets.map(b => {
          const pct = Math.round((b.spent / b.limit) * 100);
          let progressClass = 'progress-emerald';
          let badgeClass = 'badge-emerald';
          let statusText = 'Normal Pace';

          if (pct >= 90) {
            progressClass = 'progress-crimson';
            badgeClass = 'badge-crimson';
            statusText = 'Limit Warning';
          } else if (pct >= 70) {
            progressClass = 'progress-amber';
            badgeClass = 'badge-amber';
            statusText = 'Approaching Cap';
          }

          return `
            <div class="fin-card budget-category-card">
              <div>
                <div class="budget-cat-header">
                  <div class="budget-cat-left">
                    <div class="budget-cat-icon" style="background: var(--bg-surface-raised); color: var(--text-primary); border: 1px solid var(--border-subtle);">
                      ${this.getIcon(b.icon)}
                    </div>
                    <div>
                      <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary);">${b.category}</h4>
                      <span style="font-size: 0.72rem; color: var(--text-muted);">${pct}% used</span>
                    </div>
                  </div>
                  <span class="badge ${badgeClass}">${statusText}</span>
                </div>

                <div style="margin-top: var(--space-lg); margin-bottom: var(--space-xs);">
                  <div class="budget-spent-row">
                    <span class="spent-value">${financeState.formatMoney(b.spent)}</span>
                    <span class="limit-value">Limit: ${financeState.formatMoney(b.limit)}</span>
                  </div>
                </div>

                <div class="progress-container">
                  <div class="progress-bar ${progressClass}" style="width: ${Math.min(pct, 100)}%;"></div>
                </div>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: var(--space-sm); margin-top: var(--space-sm);">
                <span style="font-size: 0.75rem; color: var(--text-muted);">
                  Left: <strong style="color: var(--text-primary); font-family: var(--font-mono);">${financeState.formatMoney(Math.max(0, b.limit - b.spent))}</strong>
                </span>
                <button class="btn btn-outline btn-sm" onclick="App.openAdjustBudgetModal('${b.id}', '${b.category}', ${b.limit})">
                  Edit Cap
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  // 4. SAVINGS & VAULTS VIEW
  renderSavings(container) {
    const vaults = financeState.getSavingsVaults();
    const metrics = financeState.getMetrics();
    const totalTarget = vaults.reduce((sum, v) => sum + v.target, 0);

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-xl); flex-wrap: wrap; gap: var(--space-md);">
        <div>
          <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary);">Savings & Wealth Vaults</h2>
          <p style="font-size: 0.82rem; color: var(--text-muted);">Segregated capital reserves and long-term milestones for Ikechukwu</p>
        </div>
        <button class="btn btn-primary" onclick="App.openDepositModal()">
          ${this.getIcon('plus')} Stash Funds
        </button>
      </div>

      <!-- Hero Grid -->
      <div class="savings-hero-grid">
        <div class="fin-card" style="background: linear-gradient(135deg, rgba(6,182,212,0.1), rgba(9,13,16,0.95)); border: 1px solid rgba(6,182,212,0.3);">
          <span class="fin-card-title">Accumulated Vault Capital</span>
          <div style="font-family: var(--font-mono); font-size: 2.2rem; font-weight: 800; color: var(--text-primary); margin: 8px 0;">
            ${financeState.formatMoney(metrics.totalSaved)}
          </div>
          <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: var(--space-md);">
            Across ${vaults.length} dedicated investment targets
          </p>
          <div class="badge badge-cyan">
            ${this.getIcon('shield')} ${(metrics.totalSaved / totalTarget * 100).toFixed(1)}% of total milestone
          </div>
        </div>

        <div class="fin-card" style="display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div class="fin-card-header">
              <span class="fin-card-title">Automated Vault Allocation Rule</span>
              <span class="badge badge-emerald">Active Policy</span>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">
              Every incoming retainer wire automatically channels <strong>20%</strong> into the Emergency Safety Buffer and <strong>10%</strong> into the Real Estate Syndicate before opening balance is released.
            </p>
          </div>
          <div style="display: flex; gap: var(--space-sm); margin-top: var(--space-md);">
            <button class="btn btn-secondary btn-sm" onclick="App.showToast('Policy verified: 30% total auto-split active', 'info')">
              Configure Split Rule
            </button>
          </div>
        </div>
      </div>

      <!-- Vault Cards Grid -->
      <div class="vault-grid">
        ${vaults.map(v => {
          const pct = Math.min(100, Math.round((v.current / v.target) * 100));
          return `
            <div class="fin-card vault-card accent-${v.accent}">
              <div class="vault-header">
                <div>
                  <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 2px;">${v.name}</h3>
                  <p style="font-size: 0.78rem; color: var(--text-muted);">${v.description}</p>
                </div>
                <span class="vault-badge badge-${v.accent}">${v.badge}</span>
              </div>

              <div>
                <div class="vault-meta-row" style="margin-bottom: 6px;">
                  <span class="font-mono" style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary);">
                    ${financeState.formatMoney(v.current)}
                  </span>
                  <span class="font-mono" style="font-size: 0.88rem; color: var(--text-muted); align-self: flex-end;">
                    Goal: ${financeState.formatMoney(v.target)}
                  </span>
                </div>

                <div class="progress-container" style="height: 10px; margin-bottom: 8px;">
                  <div class="progress-bar progress-${v.accent}" style="width: ${pct}%;"></div>
                </div>

                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted);">
                  <span>Progress: <strong style="color: var(--text-primary);">${pct}%</strong></span>
                  <span>Target Date: <strong style="color: var(--text-primary);">${v.targetDate}</strong></span>
                </div>
              </div>

              <div style="display: flex; gap: var(--space-sm); border-top: 1px solid var(--border-subtle); padding-top: var(--space-md);">
                <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="App.openDepositModal('${v.id}')">
                  ${this.getIcon('plus')} Deposit Funds
                </button>
                <button class="btn btn-outline btn-sm" onclick="App.showToast('Vault lock is secured with 2FA protocol', 'info')">
                  ${this.getIcon('shield')} Details
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  // 5. REPORTS & ANALYTICS VIEW
  renderReport(container) {
    const metrics = financeState.getMetrics();
    const budgets = financeState.getBudgets();

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-xl); flex-wrap: wrap; gap: var(--space-md);">
        <div>
          <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--text-primary);">Financial Intelligence & Reports</h2>
          <p style="font-size: 0.82rem; color: var(--text-muted);">Holistic spending distribution and 6-month historical comparisons</p>
        </div>
        <div style="display: flex; gap: var(--space-sm);">
          <button class="btn btn-secondary" onclick="window.print()">
            ${this.getIcon('download')} Print / PDF Statement
          </button>
        </div>
      </div>

      <!-- Top Row Analytics -->
      <div class="report-top-row">
        <div class="fin-card">
          <span class="fin-card-title">Savings Rate</span>
          <div class="metric-value" style="color: var(--accent-emerald);">${metrics.savingsRate}%</div>
          <p style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">Top quartile financial health</p>
        </div>

        <div class="fin-card">
          <span class="fin-card-title">Primary Outflow Sector</span>
          <div class="metric-value" style="font-size: 1.35rem; color: var(--text-primary);">Tech & Cloud</div>
          <p style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">24% of monthly expenditure</p>
        </div>

        <div class="fin-card">
          <span class="fin-card-title">Liquid Runway</span>
          <div class="metric-value" style="color: var(--accent-cyan);">13.0 Mo</div>
          <p style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">At current monthly burn rate</p>
        </div>
      </div>

      <!-- Charts Grid -->
      <div class="report-charts-grid">
        <!-- Donut Category Breakdown -->
        <div class="fin-card">
          <div class="fin-card-header">
            <span class="fin-card-title">Expense Breakdown by Category</span>
          </div>
          <div id="report-donut-chart" style="margin-bottom: var(--space-lg);"></div>
          
          <!-- Category List -->
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${budgets.map(b => `
              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.04);">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span class="legend-dot" style="background: var(--accent-${b.color});"></span>
                  <span style="color: var(--text-secondary);">${b.category}</span>
                </div>
                <span class="font-mono" style="font-weight: 600; color: var(--text-primary);">${financeState.formatMoney(b.spent)}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 6-Month Comparison Bar Chart -->
        <div class="fin-card">
          <div class="chart-header">
            <div>
              <span class="fin-card-title">6-Month Inflow vs Outflow Comparison</span>
              <p style="font-size: 0.78rem; color: var(--text-muted);">Visualized historical trends (May - Oct 2026)</p>
            </div>
            <div class="chart-legend">
              <div class="legend-item">
                <span class="legend-dot" style="background: var(--accent-emerald);"></span>
                <span>Income</span>
              </div>
              <div class="legend-item">
                <span class="legend-dot" style="background: var(--accent-crimson);"></span>
                <span>Expense</span>
              </div>
            </div>
          </div>
          <div id="report-bar-chart" class="chart-container" style="height: 280px;"></div>
        </div>
      </div>

      <!-- Financial Takeaways -->
      <div class="fin-card">
        <div class="fin-card-header">
          <span class="fin-card-title">Executive Takeaways & Financial Observations</span>
          <span class="badge badge-emerald">Audited</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-lg);">
          ${initialData.insights.map(item => `
            <div class="insight-card" style="margin-bottom: 0;">
              <div class="insight-icon" style="background: ${item.type === 'positive' ? 'var(--accent-emerald-dim)' : item.type === 'warning' ? 'var(--accent-amber-dim)' : 'var(--accent-cyan-dim)'}; color: ${item.type === 'positive' ? 'var(--accent-emerald)' : item.type === 'warning' ? 'var(--accent-amber)' : 'var(--accent-cyan)'};">
                ${this.getIcon(item.type === 'positive' ? 'trending-up' : item.type === 'warning' ? 'zap' : 'sparkles')}
              </div>
              <div class="insight-content">
                <h5>${item.title}</h5>
                <p>${item.description}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Render Charts
    ChartRenderer.renderDonutChart('report-donut-chart', budgets);
    ChartRenderer.renderBarComparison('report-bar-chart', initialData.historicalMonthly);
  }
};
