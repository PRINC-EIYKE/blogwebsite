# 🏛️ PROJECT RULES & ARCHITECTURE SPECIFICATION
**Project:** Ikechukwu’s Personal Finance Dashboard  
**Status:** Living Engineering & Design Contract  
**Stack:** Semantic HTML5, Vanilla Modern CSS, Vanilla Modular JavaScript  

---

## 1. 🎯 Project Overview & Vision
This project is a bespoke, high-performance personal finance dashboard tailored for **Ikechukwu**.  
The dashboard must move far beyond standard generic "AI template" aesthetics. It should feel like an elite, proprietary fintech suite (akin to Linear, Mercury, or Bloomberg Terminal meets Stripe) with tactile precision, high information density, and purposeful micro-interactions.

---

## 2. 🚫 Anti-Generic & Anti-"AI Slop" Design Directives
To ensure this application stands out with authentic craft and character:

1. **No Cliché Gradients or Floating Blobs**: Avoid random pastel purple/cyan radial blur circles in backgrounds.
2. **No Hollow Cards**: Every card must serve actionable utility or convey critical financial metrics; no decorative cards with zero data value.
3. **Typography First**: Use distinct, editorial fintech typography (e.g. *Plus Jakarta Sans* or *Inter* paired with *JetBrains Mono* for currency figures and numbers).
4. **Information Density & Hierarchy**: Provide clear visual weight:
   - Primary metric (Net Worth / Cashflow balance) stands out in high contrast tabular numbers.
   - Secondary labels in muted, legible tones with subtle uppercase letter-spacing (`0.05em`).
   - Real, authentic Nigerian & Global context where appropriate (e.g., Naira `₦` or Multi-currency toggle `₦ / $ / €`, realistic merchant names and categories).
5. **Tactile Borders & Glass Surfaces**: Use crisp `1px solid var(--border-subtle)` with deep matte surfaces instead of heavy blurry drop shadows.
6. **Purposeful Animation**: Micro-transitions (`150ms-250ms ease`) strictly for interactive states (hover, focus, tab switching, toast alerts, modal triggers).

---

## 3. 🎨 Color Theme Recommendations

### Primary Recommendation: **Obsidian Noir & Emerald Vault (Dark Luxury Fintech)**
*Best suited for high-density financial data, reduced eye fatigue, and an ultra-modern executive feel.*

```css
:root {
  /* Surfaces */
  --bg-app: #090D10;             /* Deepest canvas */
  --bg-surface: #11171C;         /* Card & panel surfaces */
  --bg-surface-raised: #182229;  /* Elevated elements, dropdowns, inputs */
  --bg-surface-hover: #1E2B34;   /* Interactive hover state */
  
  /* Borders */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-strong: rgba(255, 255, 255, 0.16);
  --border-accent: rgba(16, 185, 129, 0.35);

  /* Typography */
  --text-primary: #F1F5F9;       /* Brightest white for figures & headings */
  --text-secondary: #94A3B8;     /* Neutral slate for body & labels */
  --text-muted: #64748B;         /* Secondary hints, timestamps */

  /* Financial Accents */
  --accent-emerald: #10B981;     /* Inflow / Positive growth / Completed goals */
  --accent-emerald-glow: rgba(16, 185, 129, 0.12);
  --accent-crimson: #F43F5E;     /* Outflow / Danger / Over-budget */
  --accent-crimson-glow: rgba(244, 63, 94, 0.12);
  --accent-amber: #F59E0B;       /* Warning / Approaching budget / Pending */
  --accent-amber-glow: rgba(245, 158, 11, 0.12);
  --accent-cyan: #06B6D4;        /* Savings vaults & secondary analytics */
  --accent-brand: #10B981;       /* Key CTA highlight */
}
```

### Alternative Option: **Zurich Editorial Light (Swiss Neo-Bank)**
*Clean paper-white minimalist canvas, deep graphite type, cobalt blue and sage accents.*

---

## 4. 📂 Directory Structure & Architecture Guidelines
The existing folder hierarchy (`style/`, `script/`, `media/`) must be respected and organized cleanly:

```text
finance/
├── index.html              # Main application shell & single-page view router
├── RULE.md                 # Project rules & engineering specification (this file)
│
├── style/
│   ├── variables.css       # Design tokens, color system, typography, shadows
│   ├── reset.css           # Modern CSS reset & box-sizing rules
│   ├── layout.css          # Navigation sidebar, topbar, responsive app grid
│   ├── components.css      # Reusable widgets (cards, badges, buttons, modals, tables)
│   └── views.css           # View-specific styles (dashboard, budget, savings, reports)
│
├── script/
│   ├── data.js             # Mock state for Ikechukwu (transactions, budgets, savings)
│   ├── state.js            # State management & reactive updates (add transaction, update budget)
│   ├── charts.js           # Custom SVG/Canvas lightweight responsive visualizers
│   ├── views.js            # Dynamic DOM renderers for each active tab
│   └── app.js              # Application entry point, router, and event listeners
│
└── media/
    ├── icons/              # Clean SVG icons (lucide/feather inspired)
    └── avatars/            # Profile avatar for Ikechukwu
```

---

## 5. 📄 Core Views & Functional Requirements

### 1. **Dashboard (Executive Overview)**
- **Header**: Greeting ("Welcome back, Ikechukwu 👋"), current date, quick currency switch (`₦ NGN` / `$ USD`), and "Add Transaction" modal trigger.
- **Metric Cards (3-4 KPIs)**:
  - Total Net Worth (with % change vs last month).
  - Monthly Inflow (Income).
  - Monthly Outflow (Expenses).
  - Total Savings Stashed.
- **Cashflow Dynamics**: Visual weekly/monthly chart showing income vs expense trends.
- **Quick Action Bar**: "Send Money", "Deposit to Vault", "Set Budget Alert".
- **Recent Transactions Widget**: Latest 5 records with category icons, date, amount (+/- color coded), and receipt tag.
- **Savings Snapshot**: Top active savings goal with progress bar.

### 2. **Transaction History (Deep Ledger)**
- **Filter & Search Toolbar**:
  - Live text search (by merchant or note).
  - Category selector (Housing, Groceries, Tech & Gear, Entertainment, Utilities, Investments).
  - Transaction Type filter (`All`, `Income`, `Expense`).
  - Date Range selector (`This Month`, `Last 30 Days`, `This Year`).
- **Data Table / Card List**:
  - Responsive table on desktop, cards on mobile.
  - Columns: Date, Merchant / Description, Category, Payment Method (Card, Bank Transfer, Crypto), Amount, Status (Completed, Pending).
- **Export Data**: Simulated CSV / PDF export button.

### 3. **Budget Tracker (Discipline Engine)**
- **Total Budget Health**: Overall monthly allowance vs current spent (% gauge).
- **Category Budgets**:
  - Cards with interactive visual meters.
  - Progress bar color shifts:
    - `< 70%`: Normal Emerald.
    - `70% - 90%`: Warning Amber.
    - `> 90%`: Danger Crimson.
  - Metrics: `Spent`, `Remaining`, and `Daily Safe Spend`.
- **Add / Adjust Budget Modal**: Allows Ikechukwu to create new budget categories or update limits dynamically.

### 4. **Savings & Vaults (Wealth Builder)**
- **Goal Cards**:
  - Emergency Fund (3-6 Months safety buffer).
  - Tech Setup / Hardware Fund.
  - Vacation / Travel Fund.
  - Investment Seed Vault.
- **Card Details**: Target amount, saved so far, percentage gauge, projected target completion date.
- **Interactive "Quick Deposit" Button**: Modal to simulate contributing funds immediately from balance into a vault.

### 5. **Financial Reports & Analytics (Intelligence)**
- **Expense Breakdown Chart**: Interactive donut/segmented bar chart showing spending distribution by category.
- **Income vs Expense Comparison**: Bar chart comparing the last 6 months.
- **Savings Rate KPI**: e.g., "You saved 32% of your income this month (Top 10% financial health)".
- **Key Financial Takeaway Insights**: 2-3 dynamic insights (e.g. "Dining out increased by 14% this week", "Utility bills were 8% lower than average").

---

## 6. 📱 Responsive Design & Accessibility Rules
- **Breakpoints**:
  - Mobile: `< 768px` (collapsible bottom navigation or sliding drawer).
  - Tablet: `768px - 1024px` (compact sidebar icon-rail).
  - Desktop: `> 1024px` (full expanded layout with multi-column widgets).
- **Accessibility**:
  - Color contrast ratio minimum `4.5:1` for normal text.
  - Full keyboard navigability (`Tab`, `Enter`, `Escape` to close modals).
  - `aria-label` on all icon-only buttons.
  - Form validation with descriptive inline feedback.

---

## 7. ⚡ Execution Checklist Before Code Delivery
- [ ] Design tokens established in `style/variables.css`.
- [ ] CSS modularized across designated files in `style/`.
- [ ] No external heavy libraries (e.g., no bulky charting bundles; use sleek lightweight native SVG/Canvas).
- [ ] Data layer built in `script/data.js` and `script/state.js` with realistic dummy data for Ikechukwu.
- [ ] Tab switching is seamless and snappy with state persistence.
- [ ] Modals and responsive navigation fully functional.
- [ ] Zero dead buttons; every button either opens a modal, toggles a state, or triggers feedback.
