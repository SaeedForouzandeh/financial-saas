import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AnimatePresence } from 'framer-motion';
import Dashboard from './components/Dashboard';
import InvoiceGenerator from './components/Invoice/InvoiceGenerator';
import Products from './components/Products';
import Companies from './components/Companies';
import Settings from './components/Settings';
import Login from './components/auth/Login';
import Window from './components/Window';
import Dock from './components/Dock';
import MenuBar from './components/MenuBar';
import { analyzeFinancialData } from './utils/aiAnalyzer';
import './styles/globals.css';

const AppContent = () => {
  const { user } = useAuth();
  const { language } = useTheme();
  const [windows, setWindows] = useState<any[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1);

  useEffect(() => {
    if (user) {
      // باز کردن داشبورد بعد از ورود
      openWindow('dashboard', language === 'fa' ? 'داشبورد' : 'Dashboard', <Dashboard />);
    }
  }, [user]);

  const openWindow = (id: string, title: string, component: React.ReactNode) => {
    const existing = windows.find(w => w.id === id && !w.isMinimized);
    if (existing) {
      bringToFront(id);
      return;
    }

    const minimized = windows.find(w => w.id === id && w.isMinimized);
    if (minimized) {
      setWindows(windows.map(w => 
        w.id === id ? { ...w, isMinimized: false, zIndex: nextZIndex } : w
      ));
      setNextZIndex(prev => prev + 1);
      return;
    }

    setWindows([...windows, {
      id,
      title,
      isOpen: true,
      isMinimized: false,
      component,
      zIndex: nextZIndex
    }]);
    setNextZIndex(prev => prev + 1);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMinimized: true } : w
    ));
  };

  const restoreWindow = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMinimized: false, zIndex: nextZIndex } : w
    ));
    setNextZIndex(prev => prev + 1);
  };

  const bringToFront = (id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, zIndex: nextZIndex } : w
    ));
    setNextZIndex(prev => prev + 1);
  };

  const dockItems = [
    { id: 'dashboard', icon: '🏠', label: language === 'fa' ? 'داشبورد' : 'Dashboard', component: <Dashboard /> },
    { id: 'invoices', icon: '📄', label: language === 'fa' ? 'فاکتورها' : 'Invoices', component: <InvoiceGenerator /> },
    { id: 'products', icon: '📦', label: language === 'fa' ? 'محصولات' : 'Products', component: <Products /> },
    { id: 'companies', icon: '🏢', label: language === 'fa' ? 'شرکت‌ها' : 'Companies', component: <Companies /> },
    { id: 'ai', icon: '🤖', label: language === 'fa' ? 'تحلیل هوشمند' : 'AI Analysis', component: <div>تحلیل هوشمند</div> },
    { id: 'settings', icon: '⚙️', label: language === 'fa' ? 'تنظیمات' : 'Settings', component: <Settings /> }
  ];

  if (!user) {
    return <Login onSuccess={() => {}} />;
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <MenuBar />
      
      <div className="relative h-[calc(100vh-48px)]">
        <AnimatePresence>
          {windows.map(window => (
            !window.isMinimized && (
              <Window
                key={window.id}
                id={window.id}
                title={window.title}
                isOpen={window.isOpen}
                isMinimized={window.isMinimized}
                zIndex={window.zIndex}
                onClose={() => closeWindow(window.id)}
                onMinimize={() => minimizeWindow(window.id)}
                onFocus={() => bringToFront(window.id)}
              >
                {window.component}
              </Window>
            )
          ))}
        </AnimatePresence>
      </div>

      <Dock 
        items={dockItems}
        onItemClick={(id) => {
          const item = dockItems.find(i => i.id === id);
          if (item) {
            openWindow(id, item.label, item.component);
          }
        }}
        minimizedWindows={windows.filter(w => w.isMinimized)}
        onRestoreWindow={restoreWindow}
      />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;