import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Moon, Sun, LogOut, User, 
  Globe, Settings, Bell, 
  Home, FileText, Package, Building2 
} from 'lucide-react';

const MenuBar = () => {
  const { user, logout } = useAuth();
  const { theme, language, toggleTheme, toggleLanguage, t, isRTL } = useTheme();

  return (
    <motion.div
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className={`h-12 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 
        flex items-center justify-between px-4 text-white`}
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
    >
      {/* سمت راست - لوگو و منو */}
      <div className="flex items-center space-x-4" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
        <span className="text-emerald-500 font-bold text-lg">💰 SaaS</span>
        
        <div className="hidden md:flex items-center space-x-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
          <button className="flex items-center px-3 py-1 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white transition-colors">
            <Home className="w-4 h-4 ml-1" />
            <span>{t('dashboard')}</span>
          </button>
          <button className="flex items-center px-3 py-1 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white transition-colors">
            <FileText className="w-4 h-4 ml-1" />
            <span>{t('invoices')}</span>
          </button>
          <button className="flex items-center px-3 py-1 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white transition-colors">
            <Package className="w-4 h-4 ml-1" />
            <span>{t('products')}</span>
          </button>
          <button className="flex items-center px-3 py-1 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white transition-colors">
            <Building2 className="w-4 h-4 ml-1" />
            <span>{t('companies')}</span>
          </button>
        </div>
      </div>

      {/* سمت چپ - تنظیمات و پروفایل */}
      <div className="flex items-center space-x-3" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
        {/* دکمه تغییر تم */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white transition-colors"
          title={t('theme')}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* دکمه تغییر زبان */}
        <button
          onClick={toggleLanguage}
          className="px-3 py-1 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white transition-colors flex items-center"
          title={t('language')}
        >
          <Globe className="w-4 h-4 ml-1" />
          <span className="text-sm font-medium">{language === 'fa' ? 'FA' : 'EN'}</span>
        </button>

        {/* نوتیفیکیشن */}
        <button className="p-2 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* تنظیمات */}
        <button className="p-2 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white transition-colors">
          <Settings className="w-4 h-4" />
        </button>

        {/* جداکننده */}
        <div className="w-px h-6 bg-gray-700 mx-2"></div>

        {/* پروفایل کاربر */}
        <div className="flex items-center space-x-2" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
          <div className="text-right">
            <div className="text-sm font-medium">{user?.fullName || user?.username || 'کاربر'}</div>
            <div className="text-xs text-gray-400">{user?.role || 'user'}</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <User className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* خروج */}
        <button
          onClick={logout}
          className="p-2 rounded-lg hover:bg-red-500/20 text-gray-300 hover:text-red-400 transition-colors"
          title={t('logout')}
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default MenuBar;