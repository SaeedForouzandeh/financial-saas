import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, User, Building, Percent, Palette, Bell, Lock, CreditCard } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('company');

  const tabs = [
    { id: 'company', name: 'شرکت', icon: Building },
    { id: 'profile', name: 'پروفایل', icon: User },
    { id: 'tax', name: 'مالیات', icon: Percent },
    { id: 'appearance', name: 'ظاهر', icon: Palette },
    { id: 'notifications', name: 'اعلان‌ها', icon: Bell },
    { id: 'security', name: 'امنیت', icon: Lock },
    { id: 'payment', name: 'پرداخت', icon: CreditCard },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-white"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">تنظیمات</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-emerald-600 px-6 py-2 rounded-lg flex items-center space-x-2 space-x-reverse"
        >
          <Save className="w-4 h-4 ml-2" />
          <span>ذخیره تغییرات</span>
        </motion.button>
      </div>

      {/* تب‌ها */}
      <div className="flex space-x-2 space-x-reverse mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 space-x-reverse transition-colors
              ${activeTab === tab.id 
                ? 'bg-emerald-600 text-white' 
                : 'bg-gray-800/40 text-gray-300 hover:bg-gray-700/50'}`}
          >
            <tab.icon className="w-4 h-4 ml-2" />
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* محتوای تب‌ها */}
      <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
        {activeTab === 'company' && (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold mb-4">اطلاعات شرکت</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-sm block mb-2">نام شرکت</label>
                <input 
                  type="text" 
                  defaultValue="شرکت نمونه" 
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-2">شناسه ملی</label>
                <input 
                  type="text" 
                  defaultValue="۱۲۳۴۵۶۷۸۹۰" 
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-2">شماره اقتصادی</label>
                <input 
                  type="text" 
                  defaultValue="۹۸۷۶۵۴۳۲۱" 
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-2">تلفن</label>
                <input 
                  type="text" 
                  defaultValue="۰۲۱-۱۲۳۴۵۶۷۸" 
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-gray-400 text-sm block mb-2">آدرس</label>
                <textarea 
                  rows={3}
                  defaultValue="تهران، خیابان ولیعصر، پلاک ۱۲۳"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'tax' && (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold mb-4">تنظیمات مالیاتی</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-sm block mb-2">نرخ مالیات بر ارزش افزوده</label>
                <div className="flex items-center">
                  <input 
                    type="number" 
                    defaultValue="9" 
                    className="w-24 bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                  <span className="mr-2">درصد</span>
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-2">نرخ مالیات عملکرد</label>
                <div className="flex items-center">
                  <input 
                    type="number" 
                    defaultValue="25" 
                    className="w-24 bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                  <span className="mr-2">درصد</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'appearance' && (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold mb-4">تنظیمات ظاهری</h3>
            <div>
              <label className="text-gray-400 text-sm block mb-2">تم</label>
              <select className="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500">
                <option>تیره</option>
                <option>روشن</option>
                <option>سیستم</option>
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-sm block mb-2">رنگ اصلی</label>
              <div className="flex space-x-2 space-x-reverse">
                <div className="w-8 h-8 rounded-full bg-emerald-500 cursor-pointer border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-blue-500 cursor-pointer"></div>
                <div className="w-8 h-8 rounded-full bg-purple-500 cursor-pointer"></div>
                <div className="w-8 h-8 rounded-full bg-red-500 cursor-pointer"></div>
                <div className="w-8 h-8 rounded-full bg-orange-500 cursor-pointer"></div>
              </div>
            </div>
          </motion.div>
        )}

        {/* تب‌های دیگه - به همین سادگی */}
        {activeTab !== 'company' && activeTab !== 'tax' && activeTab !== 'appearance' && (
          <div className="text-center py-12 text-gray-400">
            <p>تنظیمات {tabs.find(t => t.id === activeTab)?.name} در حال توسعه است</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Settings;