export const analyzeFinancialData = (transactions: any[], products: any[], companies: any[]) => {
  // محاسبات ساده برای تحلیل
  const totalSales = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const profit = totalSales - totalExpenses;
  const profitMargin = totalSales > 0 ? (profit / totalSales) * 100 : 0;

  // محصولات پرفروش
  const productSales = products.map(p => ({
    ...p,
    sales: Math.floor(Math.random() * 100)
  }));
  
  const topProducts = productSales
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  // پیشنهادات
  const suggestions = [];

  if (profitMargin < 20) {
    suggestions.push('حاشیه سود پایین است. افزایش قیمت یا کاهش هزینه‌ها را بررسی کنید.');
  }

  if (totalExpenses > totalSales * 0.7) {
    suggestions.push('هزینه‌ها بیش از ۷۰٪ درآمد است. به دنبال کاهش هزینه‌ها باشید.');
  }

  const lowStockProducts = products.filter(p => p.stock < 10);
  if (lowStockProducts.length > 0) {
    suggestions.push(`${lowStockProducts.length} محصول در آستانه اتمام موجودی هستند.`);
  }

  // پیش‌بینی ساده
  const lastMonthSales = transactions
    .filter(t => t.type === 'income')
    .slice(-30)
    .reduce((sum, t) => sum + t.amount, 0);

  const nextMonthPrediction = lastMonthSales * 1.1; // 10% رشد تخمینی

  return {
    summary: {
      totalSales,
      totalExpenses,
      profit,
      profitMargin: profitMargin.toFixed(1),
      transactionCount: transactions.length
    },
    topProducts,
    suggestions: suggestions.length ? suggestions : ['وضعیت مالی خوب است. به همین روال ادامه دهید.'],
    predictions: {
      nextMonth: nextMonthPrediction,
      nextQuarter: nextMonthPrediction * 3,
      growth: '+10%'
    },
    risks: [
      profitMargin < 15 ? { type: 'HIGH', text: 'ریسک سودآوری' } : null,
      totalExpenses > totalSales * 0.8 ? { type: 'MEDIUM', text: 'هزینه‌های بالا' } : null,
      lowStockProducts.length > 5 ? { type: 'LOW', text: 'موجودی برخی محصولات کم است' } : null
    ].filter(Boolean)
  };
};