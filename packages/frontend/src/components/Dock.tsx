import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DockItem {
  id: string;
  icon: string;
  label: string;
  component?: React.ReactNode;
}

interface DockProps {
  items: DockItem[];
  onItemClick: (id: string) => void;
  minimizedWindows: { id: string; title: string }[];
  onRestoreWindow: (id: string) => void;
}

const Dock: React.FC<DockProps> = ({ items, onItemClick, minimizedWindows, onRestoreWindow }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="flex items-end space-x-2 space-x-reverse 
        bg-gray-800/60 backdrop-blur-2xl rounded-2xl p-2 
        border border-gray-700/50 shadow-2xl"
      >
        {/* آیتم‌های اصلی داک */}
        {items.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ y: -10 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              scale: hoveredId === item.id ? 1.2 : 1,
              y: hoveredId === item.id ? -8 : 0
            }}
            transition={{ type: 'spring', damping: 15 }}
            onClick={() => onItemClick(item.id)}
            onHoverStart={() => setHoveredId(item.id)}
            onHoverEnd={() => setHoveredId(null)}
            className="relative group"
          >
            <div className="w-14 h-14 rounded-xl bg-gray-700/50 backdrop-blur 
              flex items-center justify-center text-2xl
              border border-gray-600/50 hover:border-emerald-500/50 
              transition-colors duration-200">
              {item.icon}
            </div>
            
            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: hoveredId === item.id ? 1 : 0,
                y: hoveredId === item.id ? 0 : 10
              }}
              className="absolute -top-10 left-1/2 transform -translate-x-1/2
                bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap
                border border-gray-700 shadow-lg z-50"
            >
              {item.label}
            </motion.div>
          </motion.button>
        ))}

        {/* جداکننده اگه پنجره minimized داریم */}
        {minimizedWindows.length > 0 && (
          <div className="w-px h-10 bg-gray-700 mx-2" />
        )}

        {/* پنجره‌های minimized شده */}
        <AnimatePresence>
          {minimizedWindows.map((win) => (
            <motion.button
              key={win.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ y: -5 }}
              onClick={() => onRestoreWindow(win.id)}
              className="relative group"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-700/50 backdrop-blur 
                flex items-center justify-center text-xl
                border border-gray-600/50 hover:border-emerald-500/50 
                transition-colors duration-200">
                📌
              </div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2
                bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap
                border border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                {win.title}
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Dock;