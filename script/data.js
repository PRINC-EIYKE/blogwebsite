// Initial state and realistic mock dataset for Ikechukwu's Personal Finance Dashboard

const initialData = {
  user: {
    name: "Ikechukwu",
    email: "ikechukwu@investor.io",
    tier: "Apex Member",
    avatarInitials: "IK"
  },
  currency: "NGN", // "NGN" or "USD"
  rates: {
    NGN: 1,
    USD: 0.00067 // 1 NGN = ~0.00067 USD (approx 1,500 NGN / USD)
  },
  currencySymbols: {
    NGN: "₦",
    USD: "$"
  },
  
  // Balance Overview (in NGN)
  netWorth: 14850000,
  monthlyIncome: 2850000,
  monthlyExpense: 1145000,
  totalSaved: 6420000,

  // Cashflow Trend Data (Weekly for current month)
  cashflowWeekly: [
    { week: "Week 1", income: 750000, expense: 280000 },
    { week: "Week 2", income: 600000, expense: 310000 },
    { week: "Week 3", income: 850000, expense: 245000 },
    { week: "Week 4", income: 650000, expense: 310000 }
  ],

  // 6-Month Historical Analytics
  historicalMonthly: [
    { month: "May", income: 2400000, expense: 1250000 },
    { month: "Jun", income: 2600000, expense: 1380000 },
    { month: "Jul", income: 2500000, expense: 1100000 },
    { month: "Aug", income: 3100000, expense: 1420000 },
    { month: "Sep", income: 2750000, expense: 1190000 },
    { month: "Oct", income: 2850000, expense: 1145000 }
  ],

  // Transactions Ledger
  transactions: [
    {
      id: "tx-101",
      description: "AWS Cloud Infrastructure",
      category: "Tech & Cloud",
      type: "expense",
      amount: 148500,
      date: "2026-10-04",
      method: "Virtual USD Card",
      status: "completed",
      icon: "cloud"
    },
    {
      id: "tx-102",
      description: "Fintech Advisory Retainer",
      category: "Income",
      type: "income",
      amount: 1200000,
      date: "2026-10-03",
      method: "Direct Wire",
      status: "completed",
      icon: "arrow-down-left"
    },
    {
      id: "tx-103",
      description: "Spar Premium Groceries",
      category: "Food & Dining",
      type: "expense",
      amount: 86200,
      date: "2026-10-02",
      method: "Mastercard Debit",
      status: "completed",
      icon: "shopping-bag"
    },
    {
      id: "tx-104",
      description: "Eko Atlantic High-Speed Fiber",
      category: "Utilities",
      type: "expense",
      amount: 45000,
      date: "2026-10-01",
      method: "Auto Debit",
      status: "completed",
      icon: "wifi"
    },
    {
      id: "tx-105",
      description: "Seed Investment Dividend",
      category: "Income",
      type: "income",
      amount: 650000,
      date: "2026-09-29",
      method: "Bank Transfer",
      status: "completed",
      icon: "trending-up"
    },
    {
      id: "tx-106",
      description: "Uber Black Chauffeur Service",
      category: "Transport",
      type: "expense",
      amount: 32400,
      date: "2026-09-28",
      method: "Apple Pay",
      status: "completed",
      icon: "navigation"
    },
    {
      id: "tx-107",
      description: "Shima Japanese Dining",
      category: "Food & Dining",
      type: "expense",
      amount: 72000,
      date: "2026-09-27",
      method: "Mastercard Debit",
      status: "completed",
      icon: "coffee"
    },
    {
      id: "tx-108",
      description: "GitHub Enterprise & Copilot",
      category: "Tech & Cloud",
      type: "expense",
      amount: 38000,
      date: "2026-09-25",
      method: "Virtual USD Card",
      status: "completed",
      icon: "cpu"
    },
    {
      id: "tx-109",
      description: "Quarterly Wellness & Gym Club",
      category: "Health & Lifestyle",
      type: "expense",
      amount: 110000,
      date: "2026-09-22",
      method: "Bank Transfer",
      status: "completed",
      icon: "activity"
    },
    {
      id: "tx-110",
      description: "Consulting Milestone Payout",
      category: "Income",
      type: "income",
      amount: 1000000,
      date: "2026-09-20",
      method: "Direct Wire",
      status: "completed",
      icon: "briefcase"
    }
  ],

  // Budgets
  budgets: [
    {
      id: "b-1",
      category: "Food & Dining",
      limit: 220000,
      spent: 158200,
      color: "emerald",
      icon: "utensils"
    },
    {
      id: "b-2",
      category: "Tech & Cloud",
      limit: 300000,
      spent: 186500,
      color: "cyan",
      icon: "cpu"
    },
    {
      id: "b-3",
      category: "Transport & Fuel",
      limit: 120000,
      spent: 104000,
      color: "amber",
      icon: "car"
    },
    {
      id: "b-4",
      category: "Utilities & Fiber",
      limit: 80000,
      spent: 45000,
      color: "emerald",
      icon: "zap"
    },
    {
      id: "b-5",
      category: "Health & Wellness",
      limit: 150000,
      spent: 110000,
      color: "cyan",
      icon: "heart"
    },
    {
      id: "b-6",
      category: "Entertainment & Leisure",
      limit: 100000,
      spent: 94000,
      color: "amber",
      icon: "film"
    }
  ],

  // Savings Vaults
  savingsVaults: [
    {
      id: "sv-1",
      name: "Emergency Safety Buffer",
      description: "6 months liquid runway in diversified yields",
      target: 6000000,
      current: 4250000,
      accent: "emerald",
      badge: "High Priority",
      targetDate: "Dec 2026"
    },
    {
      id: "sv-2",
      name: "M3 Studio & Hardware Lab",
      description: "Dedicated tech upgrade for local AI workstation",
      target: 2500000,
      current: 1850000,
      accent: "cyan",
      badge: "Target 74%",
      targetDate: "Nov 2026"
    },
    {
      id: "sv-3",
      name: "Real Estate Syndicate Share",
      description: "Commercial residential fractional allocation",
      target: 10000000,
      current: 3200000,
      accent: "violet",
      badge: "Long Term",
      targetDate: "Jun 2027"
    },
    {
      id: "sv-4",
      name: "Global Tech Summit & Tokyo Flight",
      description: "Developer conference, flights, and luxury hotel stay",
      target: 3500000,
      current: 1120000,
      accent: "amber",
      badge: "Annual Trip",
      targetDate: "March 2027"
    }
  ],

  // AI-Free Analytical Takeaways
  insights: [
    {
      title: "Strong Savings Momentum",
      description: "Your savings rate currently stands at 38.2% of total income, well above the recommended 25% target.",
      type: "positive"
    },
    {
      title: "Transport Ceiling Warning",
      description: "Transport spend is at 86.6% of limit with 18 days remaining in the cycle. Consider adjusting rideshare frequency.",
      type: "warning"
    },
    {
      title: "Fixed Costs Optimisation",
      description: "Tech infrastructure costs decreased by 12% following cloud instance reservations last month.",
      type: "info"
    }
  ]
};
