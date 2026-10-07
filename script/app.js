// Main Application Controller & Event Orchestration

const App = {
  currentView: 'dashboard',

  init() {
    this.bindNavigation();
    this.bindCurrencyToggle();
    this.bindMobileMenu();
    this.bindModals();
    this.bindShortcuts();

    // Subscribe to state updates to re-render active view
    financeState.subscribe((event, payload) => {
      this.renderCurrentView();
    });

    // Initial render
    this.navigateTo('dashboard');
  },

  // View Navigation
  navigateTo(viewName) {
    this.currentView = viewName;

    // Update Desktop Nav
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.view === viewName);
    });

    // Update Mobile Nav
    document.querySelectorAll('.mobile-bottom-nav .mobile-nav-link').forEach(el => {
      el.classList.toggle('active', el.dataset.view === viewName);
    });

    // Update Header
    const titles = {
      dashboard: { title: 'Executive Overview', subtitle: 'Live cashflow and net worth metrics' },
      transactions: { title: 'Transaction Ledger', subtitle: 'Detailed chronological spending records' },
      budget: { title: 'Budget Allocation', subtitle: 'Category ceilings & dynamic threshold alerts' },
      savings: { title: 'Wealth Vaults', subtitle: 'Dedicated goal milestones & emergency buffers' },
      report: { title: 'Intelligence & Reports', subtitle: 'Deep analytical expense distribution & trends' }
    };

    const header = titles[viewName] || { title: 'Dashboard', subtitle: '' };
    document.getElementById('header-view-title').textContent = header.title;
    document.getElementById('header-view-subtitle').textContent = header.subtitle;

    // Show active section
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.remove('active');
    });

    const activeSection = document.getElementById(`view-${viewName}`);
    if (activeSection) {
      activeSection.classList.add('active');
      this.renderCurrentView();
    }

    // Scroll top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close mobile menu if open
    this.closeMobileMenu();
  },

  renderCurrentView() {
    const container = document.getElementById(`view-${this.currentView}`);
    if (!container) return;

    switch (this.currentView) {
      case 'dashboard':
        Views.renderDashboard(container);
        break;
      case 'transactions':
        Views.renderTransactions(container, Views.txFilterState);
        break;
      case 'budget':
        Views.renderBudget(container);
        break;
      case 'savings':
        Views.renderSavings(container);
        break;
      case 'report':
        Views.renderReport(container);
        break;
    }
  },

  bindNavigation() {
    document.querySelectorAll('[data-view]').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = item.dataset.view;
        this.navigateTo(targetView);
      });
    });
  },

  // Currency Switcher (NGN / USD)
  bindCurrencyToggle() {
    const buttons = document.querySelectorAll('.currency-switcher .currency-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const curr = btn.dataset.currency;
        financeState.setCurrency(curr);
        this.showToast(`Switched display currency to ${curr}`, 'info');
      });
    });
  },

  // Mobile Menu
  bindMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const sidebar = document.querySelector('.app-sidebar');
    const backdrop = document.querySelector('.sidebar-backdrop');

    if (toggleBtn && sidebar && backdrop) {
      toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        backdrop.classList.toggle('active');
      });

      backdrop.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    }
  },

  closeMobileMenu() {
    const sidebar = document.querySelector('.app-sidebar');
    const backdrop = document.querySelector('.sidebar-backdrop');
    if (sidebar) sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
  },

  // Modals Management
  bindModals() {
    // Close button clicks
    document.querySelectorAll('.modal-close, [data-modal-close]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.closeAllModals();
      });
    });

    // Close when clicking modal backdrop
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeAllModals();
        }
      });
    });

    // Add Transaction Form
    const txForm = document.getElementById('form-add-tx');
    if (txForm) {
      txForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const description = document.getElementById('tx-desc').value.trim();
        const amount = parseFloat(document.getElementById('tx-amount').value);
        const type = document.getElementById('tx-type').value;
        const category = document.getElementById('tx-category').value;
        const method = document.getElementById('tx-method').value;

        if (!description || isNaN(amount) || amount <= 0) {
          this.showToast('Please enter a valid description and positive amount', 'error');
          return;
        }

        financeState.addTransaction({ description, amount, type, category, method });
        this.closeAllModals();
        this.showToast(`Successfully logged ${type === 'income' ? 'income' : 'expense'}: ${description}`, 'success');
        txForm.reset();
      });
    }

    // Deposit Savings Form
    const depositForm = document.getElementById('form-deposit');
    if (depositForm) {
      depositForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const vaultId = document.getElementById('deposit-vault-id').value;
        const amount = parseFloat(document.getElementById('deposit-amount').value);

        if (isNaN(amount) || amount <= 0) {
          this.showToast('Please enter a valid deposit amount', 'error');
          return;
        }

        financeState.depositToVault(vaultId, amount);
        this.closeAllModals();
        this.showToast('Funds securely routed and vaulted!', 'success');
        depositForm.reset();
      });
    }

    // Budget Update Form
    const budgetForm = document.getElementById('form-budget');
    if (budgetForm) {
      budgetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const budgetId = document.getElementById('budget-edit-id').value;
        const category = document.getElementById('budget-category-name').value.trim();
        const limit = parseFloat(document.getElementById('budget-limit-val').value);

        if (isNaN(limit) || limit <= 0) {
          this.showToast('Please enter a valid budget limit', 'error');
          return;
        }

        if (budgetId) {
          financeState.updateBudget(budgetId, limit);
          this.showToast(`Updated ${category} budget ceiling`, 'success');
        } else {
          financeState.addBudget({ category, limit, color: 'emerald' });
          this.showToast(`Created new budget category: ${category}`, 'success');
        }

        this.closeAllModals();
        budgetForm.reset();
      });
    }
  },

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
    }
  },

  closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.classList.remove('active');
    });
  },

  // Modal helpers
  openAddTxModal() {
    this.openModal('modal-add-tx');
  },

  openDepositModal(defaultVaultId = null) {
    const vaultSelect = document.getElementById('deposit-vault-id');
    if (vaultSelect) {
      const vaults = financeState.getSavingsVaults();
      vaultSelect.innerHTML = vaults.map(v => `
        <option value="${v.id}" ${defaultVaultId === v.id ? 'selected' : ''}>${v.name}</option>
      `).join('');
    }
    this.openModal('modal-deposit');
  },

  openAddBudgetModal() {
    document.getElementById('budget-modal-title').textContent = 'Create New Budget Ceiling';
    document.getElementById('budget-edit-id').value = '';
    document.getElementById('budget-category-name').value = '';
    document.getElementById('budget-category-name').disabled = false;
    document.getElementById('budget-limit-val').value = '';
    this.openModal('modal-budget');
  },

  openAdjustBudgetModal(budgetId, category, currentLimit) {
    document.getElementById('budget-modal-title').textContent = `Adjust Limit for ${category}`;
    document.getElementById('budget-edit-id').value = budgetId;
    document.getElementById('budget-category-name').value = category;
    document.getElementById('budget-category-name').disabled = true;
    document.getElementById('budget-limit-val').value = currentLimit;
    this.openModal('modal-budget');
  },

  // Export Transactions as CSV
  exportCSV() {
    const txs = financeState.getTransactions();
    let csv = 'ID,Date,Description,Category,Type,Amount (NGN),Payment Method,Status\n';
    txs.forEach(t => {
      csv += `"${t.id}","${t.date}","${t.description.replace(/"/g, '""')}","${t.category}","${t.type}","${t.amount}","${t.method}","${t.status}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `ikechukwu_financial_ledger_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.showToast('Transaction audit ledger exported to CSV', 'success');
  },

  // Toast System
  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = Views.getIcon('sparkles');
    if (type === 'success') icon = Views.getIcon('shield');
    if (type === 'error') icon = Views.getIcon('zap');

    toast.innerHTML = `
      <div style="width: 18px; height: 18px; flex-shrink: 0;">${icon}</div>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  },

  // Global Keyboard Shortcuts
  bindShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
        this.closeMobileMenu();
      }
    });
  }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
