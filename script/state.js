// Application State Management

class FinanceState {
  constructor(initialState) {
    this.data = JSON.parse(JSON.stringify(initialState));
    this.listeners = [];
  }

  // Subscribe to state changes
  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notify(eventType, payload) {
    this.listeners.forEach(cb => cb(eventType, payload));
  }

  // Currency helpers
  getCurrency() {
    return this.data.currency;
  }

  setCurrency(curr) {
    if (this.data.rates[curr]) {
      this.data.currency = curr;
      this.notify('currency_change', curr);
    }
  }

  formatMoney(amountInNGN) {
    const curr = this.data.currency;
    const rate = this.data.rates[curr];
    const symbol = this.data.currencySymbols[curr];
    const converted = amountInNGN * rate;

    if (curr === 'NGN') {
      return `${symbol}${Math.round(converted).toLocaleString('en-NG')}`;
    } else {
      return `${symbol}${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
  }

  // Transactions
  getTransactions() {
    return [...this.data.transactions];
  }

  addTransaction(tx) {
    const newTx = {
      id: `tx-${Date.now()}`,
      description: tx.description,
      category: tx.category,
      type: tx.type, // 'income' | 'expense'
      amount: parseFloat(tx.amount), // in NGN
      date: tx.date || new Date().toISOString().split('T')[0],
      method: tx.method || 'Direct Wire',
      status: 'completed',
      icon: tx.type === 'income' ? 'arrow-down-left' : 'shopping-bag'
    };

    this.data.transactions.unshift(newTx);

    // Update balances
    if (newTx.type === 'income') {
      this.data.monthlyIncome += newTx.amount;
      this.data.netWorth += newTx.amount;
    } else {
      this.data.monthlyExpense += newTx.amount;
      this.data.netWorth -= newTx.amount;

      // Update matching budget if any
      const budget = this.data.budgets.find(b => b.category.toLowerCase().includes(newTx.category.toLowerCase()));
      if (budget) {
        budget.spent += newTx.amount;
      }
    }

    this.notify('transaction_added', newTx);
  }

  getFilteredTransactions({ query = '', category = 'all', type = 'all' }) {
    return this.data.transactions.filter(tx => {
      const matchQuery = query === '' || 
        tx.description.toLowerCase().includes(query.toLowerCase()) ||
        tx.category.toLowerCase().includes(query.toLowerCase());
      
      const matchCategory = category === 'all' || 
        tx.category.toLowerCase() === category.toLowerCase();

      const matchType = type === 'all' || tx.type === type;

      return matchQuery && matchCategory && matchType;
    });
  }

  // Budgets
  getBudgets() {
    return [...this.data.budgets];
  }

  updateBudget(budgetId, newLimit) {
    const budget = this.data.budgets.find(b => b.id === budgetId);
    if (budget) {
      budget.limit = parseFloat(newLimit);
      this.notify('budget_updated', budget);
    }
  }

  addBudget(budgetData) {
    const newBudget = {
      id: `b-${Date.now()}`,
      category: budgetData.category,
      limit: parseFloat(budgetData.limit),
      spent: 0,
      color: budgetData.color || 'emerald',
      icon: budgetData.icon || 'tag'
    };
    this.data.budgets.push(newBudget);
    this.notify('budget_added', newBudget);
  }

  // Savings
  getSavingsVaults() {
    return [...this.data.savingsVaults];
  }

  depositToVault(vaultId, amount) {
    const vault = this.data.savingsVaults.find(v => v.id === vaultId);
    if (vault) {
      const depositAmount = parseFloat(amount);
      vault.current += depositAmount;
      this.data.totalSaved += depositAmount;
      this.data.netWorth += depositAmount; // Increases saved assets
      
      // Also register as transaction transfer
      this.data.transactions.unshift({
        id: `tx-dep-${Date.now()}`,
        description: `Deposit to ${vault.name}`,
        category: "Savings Transfer",
        type: "expense",
        amount: depositAmount,
        date: new Date().toISOString().split('T')[0],
        method: "Vault Stash",
        status: "completed",
        icon: "shield"
      });

      this.notify('savings_deposited', { vault, amount: depositAmount });
    }
  }

  // Totals & KPI
  getMetrics() {
    return {
      netWorth: this.data.netWorth,
      monthlyIncome: this.data.monthlyIncome,
      monthlyExpense: this.data.monthlyExpense,
      totalSaved: this.data.totalSaved,
      savingsRate: ((this.data.monthlyIncome - this.data.monthlyExpense) / this.data.monthlyIncome * 100).toFixed(1)
    };
  }

  getUser() {
    return this.data.user;
  }
}

// Global state instance
const financeState = new FinanceState(initialData);
