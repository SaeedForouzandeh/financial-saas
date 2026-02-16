import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';
type Language = 'fa' | 'en';

interface ThemeContextType {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  fa: {
    // منوی اصلی
    dashboard: 'داشبورد',
    invoices: 'فاکتورها',
    products: 'محصولات',
    companies: 'شرکت‌ها',
    reports: 'گزارشات',
    settings: 'تنظیمات',
    ai: 'تحلیل هوشمند',
    
    // احراز هویت
    login: 'ورود',
    register: 'ثبت نام',
    username: 'نام کاربری',
    password: 'رمز عبور',
    email: 'ایمیل',
    logout: 'خروج',
    
    // دکمه‌ها
    search: 'جستجو...',
    add: 'افزودن',
    save: 'ذخیره',
    cancel: 'لغو',
    delete: 'حذف',
    edit: 'ویرایش',
    close: 'بستن',
    minimize: 'کوچک کردن',
    maximize: 'بزرگ کردن',
    restore: 'بازگردانی',
    
    // متریک‌های مالی
    total_sales: 'فروش کل',
    total_profit: 'سود خالص',
    total_expenses: 'هزینه‌ها',
    total_products: 'محصولات',
    daily_sales: 'فروش روزانه',
    weekly_growth: 'رشد هفتگی',
    
    // محصولات
    product_code: 'کد محصول',
    product_name: 'نام محصول',
    category: 'دسته‌بندی',
    price: 'قیمت',
    cost: 'قیمت خرید',
    stock: 'موجودی',
    profit: 'سود',
    
    // شرکت‌ها
    company_name: 'نام شرکت',
    tax_number: 'شناسه ملی',
    address: 'آدرس',
    phone: 'تلفن',
    employees: 'کارمندان',
    salary: 'حقوق',
    position: 'سمت',
    
    // پیام‌ها
    welcome: 'خوش آمدید',
    success: 'عملیات موفق',
    error: 'خطا',
    confirm: 'تایید',
    
    // تنظیمات
    appearance: 'ظاهر',
    language: 'زبان',
    theme: 'تم',
    dark: 'تیره',
    light: 'روشن',
    system: 'سیستم',
  },
  en: {
    // Main menu
    dashboard: 'Dashboard',
    invoices: 'Invoices',
    products: 'Products',
    companies: 'Companies',
    reports: 'Reports',
    settings: 'Settings',
    ai: 'AI Analysis',
    
    // Auth
    login: 'Login',
    register: 'Register',
    username: 'Username',
    password: 'Password',
    email: 'Email',
    logout: 'Logout',
    
    // Buttons
    search: 'Search...',
    add: 'Add',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close',
    minimize: 'Minimize',
    maximize: 'Maximize',
    restore: 'Restore',
    
    // Financial metrics
    total_sales: 'Total Sales',
    total_profit: 'Net Profit',
    total_expenses: 'Expenses',
    total_products: 'Products',
    daily_sales: 'Daily Sales',
    weekly_growth: 'Weekly Growth',
    
    // Products
    product_code: 'Product Code',
    product_name: 'Product Name',
    category: 'Category',
    price: 'Price',
    cost: 'Cost',
    stock: 'Stock',
    profit: 'Profit',
    
    // Companies
    company_name: 'Company Name',
    tax_number: 'Tax Number',
    address: 'Address',
    phone: 'Phone',
    employees: 'Employees',
    salary: 'Salary',
    position: 'Position',
    
    // Messages
    welcome: 'Welcome',
    success: 'Success',
    error: 'Error',
    confirm: 'Confirm',
    
    // Settings
    appearance: 'Appearance',
    language: 'Language',
    theme: 'Theme',
    dark: 'Dark',
    light: 'Light',
    system: 'System',
  }
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // تشخیص زبان سیستم
  const getSystemLanguage = (): Language => {
    const systemLang = navigator.language;
    return systemLang.startsWith('fa') ? 'fa' : 'en';
  };

  // تشخیص تم سیستم
  const getSystemTheme = (): Theme => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState<Theme>(getSystemTheme());
  const [language, setLanguage] = useState<Language>(getSystemLanguage());

  useEffect(() => {
    // اعمال تم
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
    
    // اعمال دایرکشن
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // ذخیره در localStorage
    localStorage.setItem('theme', theme);
    localStorage.setItem('language', language);
  }, [theme, language]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'fa' ? 'en' : 'fa');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.fa] || key;
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      language, 
      toggleTheme, 
      toggleLanguage, 
      t,
      isRTL: language === 'fa'
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};