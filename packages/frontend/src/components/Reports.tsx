import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react';

const Reports = () => {
  const reports = [
    { id: 1, name: 'گزارش سود و زیان', icon: TrendingUp, color: 'emerald', date: '1404/11/28' },
    { id: 2, name: 'ترازنامه', icon: FileText, color: 'blue', date: '1404/11/28' },
    { id: 3, name: 'گردش حساب', icon: DollarSign, color: 'purple', date: '1404/11/28' },
    { id: 4, name: 'گزارش مالیات', icon: TrendingDown, color: 'red', date: '1404/11/28' },
    { id: 5, name: 'صورت‌های مالی', icon: FileText, color: 'green', date: '1404/11/28' },
    { id: 6, name: 'گزارش فروش', icon: TrendingUp, color: 'orange', date: '1404/11/28' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-white"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">گزارشات مالی</h2>
        <div className="flex space-x-2 space-x-reverse">
          <button className="bg-emerald-600 px-4 py-2 rounded-lg flex items-center space-x-2 space-x-reverse">
            <Calendar className="w-4 h-4 ml-2" />
            <span>انتخاب بازه</span>
          </button>
          <button className="bg-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 space-x-reverse">
            <Download className="w-4 h-4 ml-2" />
            <span>خروجی اکسل</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <motion.div
            key={report.id}
            whileHover={{ scale: 1.02 }}
            className={`bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 
              border border-gray-700/50 shadow-xl cursor-pointer
              hover:border-${report.color}-500/50 transition-all`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 bg-${report.color}-500/20 rounded-xl`}>
                <report.icon className={`w-6 h-6 text-${report.color}-400`} />
              </div>
              <span className="text-sm text-gray-400">{report.date}</span>
            </div>
            
            <h3 className="text-lg font-semibold mb-2">{report.name}</h3>
            
            <div className="flex justify-between items-center">
              <button className="text-emerald-400 hover:text-emerald-300 text-sm">
                مشاهده گزارش
              </button>
              <button className="text-gray-400 hover:text-gray-300">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* بخش گزارش‌های ذخیره شده */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">گزارش‌های اخیر</h3>
        <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-4 border border-gray-700/50">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-3 px-4">نام گزارش</th>
                <th className="py-3 px-4">تاریخ ایجاد</th>
                <th className="py-3 px-4">نوع</th>
                <th className="py-3 px-4">عملیات</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700/50">
                <td className="py-3 px-4">گزارش سود و زیان دی ماه</td>
                <td className="py-3 px-4">1404/10/15</td>
                <td className="py-3 px-4">PDF</td>
                <td className="py-3 px-4">
                  <button className="text-emerald-400 hover:text-emerald-300 ml-3">دانلود</button>
                  <button className="text-blue-400 hover:text-blue-300">مشاهده</button>
                </td>
              </tr>
              <tr className="border-b border-gray-700/50">
                <td className="py-3 px-4">ترازنامه پایان سال</td>
                <td className="py-3 px-4">1404/12/29</td>
                <td className="py-3 px-4">Excel</td>
                <td className="py-3 px-4">
                  <button className="text-emerald-400 hover:text-emerald-300 ml-3">دانلود</button>
                  <button className="text-blue-400 hover:text-blue-300">مشاهده</button>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4">گردش حساب سه ماهه</td>
                <td className="py-3 px-4">1404/11/01</td>
                <td className="py-3 px-4">PDF</td>
                <td className="py-3 px-4">
                  <button className="text-emerald-400 hover:text-emerald-300 ml-3">دانلود</button>
                  <button className="text-blue-400 hover:text-blue-300">مشاهده</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default Reports;