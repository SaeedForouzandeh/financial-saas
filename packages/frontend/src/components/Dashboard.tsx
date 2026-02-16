import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';
import {
  TrendingUp, TrendingDown, DollarSign,
  ShoppingBag, Users, Package, CreditCard,
  ArrowUp, ArrowDown
} from 'lucide-react';

// تعریف اینترفیس‌ها
interface FinancialData {
  month: string;
  revenue: number;
  expense: number;
  profit: number;
}

interface SalesData {
  day: number;
  sales: number;
}

interface CategoryData {
  name: string;
  value: number;
}

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: string;
  date: string;
}

interface Stats {
  totalSales: number;
  totalProfit: number;
  totalExpenses: number;
  totalProducts: number;
  dailySales: number;
  weeklyGrowth: number;
}

const Dashboard = () => {
  const [financialData, setFinancialData] = useState<FinancialData[]>([]);
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalSales: 0,
    totalProfit: 0,
    totalExpenses: 0,
    totalProducts: 0,
    dailySales: 0,
    weeklyGrowth: 0
  });

  useEffect(() => {
    // داده‌های واقعی‌تر
    const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'];
    
    // داده‌های مالی
    const financial = months.map((month) => ({
      month,
      revenue: 50000000 + Math.random() * 30000000,
      expense: 30000000 + Math.random() * 20000000,
      profit: 20000000 + Math.random() * 15000000
    }));
    setFinancialData(financial);

    // داده‌های فروش روزانه
    const sales = Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      sales: 2000000 + Math.random() * 5000000
    }));
    setSalesData(sales);

    // داده‌های دسته‌بندی
    setCategoryData([
      { name: 'الکترونیک', value: 35 },
      { name: 'پوشاک', value: 25 },
      { name: 'خانگی', value: 20 },
      { name: 'ورزشی', value: 15 },
      { name: 'سایر', value: 5 }
    ]);

    // تراکنش‌های اخیر
    setRecentTransactions([
      { id: 1, description: 'فروش لپ تاپ ایسوس', amount: 15000000, type: 'income', date: '۱۴۰۴/۱۱/۲۸' },
      { id: 2, description: 'خرید موجودی', amount: 5000000, type: 'expense', date: '۱۴۰۴/۱۱/۲۷' },
      { id: 3, description: 'فروش ماوس', amount: 450000, type: 'income', date: '۱۴۰۴/۱۱/۲۷' },
      { id: 4, description: 'پرداخت حقوق', amount: 35000000, type: 'expense', date: '۱۴۰۴/۱۱/۲۵' },
      { id: 5, description: 'فروش مانیتور', amount: 8500000, type: 'income', date: '۱۴۰۴/۱۱/۲۴' },
    ]);

    // آمار کلی
    setStats({
      totalSales: 156800000,
      totalProfit: 42300000,
      totalExpenses: 114500000,
      totalProducts: 156,
      dailySales: 5200000,
      weeklyGrowth: 12.5
    });
  }, []);

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  // تابع فرمت‌کننده اعداد
  const formatNumber = (value: number) => {
    return value.toLocaleString('fa-IR');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 text-white p-4"
    >
      {/* کارت‌های آمار */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">فروش کل</p>
              <p className="text-2xl font-bold mt-2">{formatNumber(stats.totalSales)}</p>
              <div className="flex items-center mt-2 text-emerald-400">
                <ArrowUp className="w-4 h-4 ml-1" />
                <span className="text-sm">+{stats.weeklyGrowth}%</span>
              </div>
            </div>
            <div className="p-3 bg-emerald-500/20 rounded-xl">
              <DollarSign className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">سود خالص</p>
              <p className="text-2xl font-bold mt-2">{formatNumber(stats.totalProfit)}</p>
              <div className="flex items-center mt-2 text-emerald-400">
                <ArrowUp className="w-4 h-4 ml-1" />
                <span className="text-sm">+8.3%</span>
              </div>
            </div>
            <div className="p-3 bg-green-500/20 rounded-xl">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">هزینه‌ها</p>
              <p className="text-2xl font-bold mt-2">{formatNumber(stats.totalExpenses)}</p>
              <div className="flex items-center mt-2 text-red-400">
                <ArrowDown className="w-4 h-4 ml-1" />
                <span className="text-sm">-2.1%</span>
              </div>
            </div>
            <div className="p-3 bg-red-500/20 rounded-xl">
              <TrendingDown className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-400 text-sm">محصولات</p>
              <p className="text-2xl font-bold mt-2">{stats.totalProducts}</p>
              <div className="flex items-center mt-2 text-blue-400">
                <Package className="w-4 h-4 ml-1" />
                <span className="text-sm">۱۵ دسته</span>
              </div>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <ShoppingBag className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* نمودارها */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* نمودار درآمد و هزینه */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50"
        >
          <h3 className="text-lg font-semibold mb-4">روند درآمد و هزینه</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={financialData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                formatter={(value: number) => formatNumber(value)}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                name="درآمد"
              />
              <Area
                type="monotone"
                dataKey="expense"
                stroke="#ef4444"
                fillOpacity={1}
                fill="url(#colorExpense)"
                name="هزینه"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* نمودار فروش روزانه */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50"
        >
          <h3 className="text-lg font-semibold mb-4">فروش روزانه (۳۰ روز اخیر)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                formatter={(value: number) => formatNumber(value)}
              />
              <Bar dataKey="sales" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* نمودار دسته‌بندی محصولات */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50"
        >
          <h3 className="text-lg font-semibold mb-4">توزیع فروش بر اساس دسته</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: { name: string; percent: number }) => 
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* تراکنش‌های اخیر */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50"
        >
          <h3 className="text-lg font-semibold mb-4">تراکنش‌های اخیر</h3>
          <div className="space-y-3">
            {recentTransactions.map((t) => (
              <div key={t.id} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${
                    t.type === 'income' ? 'bg-emerald-500/20' : 'bg-red-500/20'
                  }`}>
                    {t.type === 'income' ?
                      <ArrowUp className="w-4 h-4 text-emerald-400" /> :
                      <ArrowDown className="w-4 h-4 text-red-400" />
                    }
                  </div>
                  <div className="mr-3">
                    <p className="text-sm font-medium">{t.description}</p>
                    <p className="text-xs text-gray-400">{t.date}</p>
                  </div>
                </div>
                <span className={`text-sm font-bold ${
                  t.type === 'income' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {t.type === 'income' ? '+' : '-'}{formatNumber(t.amount)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;