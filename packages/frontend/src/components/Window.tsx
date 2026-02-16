import React, { useState } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { Minus, Square, X, Maximize2 } from 'lucide-react';

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
}

const Window: React.FC<WindowProps> = ({
  id,
  title,
  children,
  isOpen,
  isMinimized,
  zIndex,
  onClose,
  onMinimize,
  onFocus
}) => {
  const dragControls = useDragControls();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  if (!isOpen || isMinimized) return null;

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleDragEnd = (event: any, info: any) => {
    setPosition({ x: info.point.x, y: info.point.y });
  };

  return (
    <motion.div
      drag={!isFullscreen}
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0}
      dragListener={false}
      initial={{ scale: 0.9, opacity: 0, y: 50 }}
      animate={{ 
        scale: 1, 
        opacity: 1, 
        y: 0,
        x: position.x,
        width: isFullscreen ? '100%' : '90%',
        height: isFullscreen ? '100%' : '85%',
        top: isFullscreen ? 0 : '7.5%',
        left: isFullscreen ? 0 : '5%',
        right: isFullscreen ? 0 : '5%',
      }}
      exit={{ scale: 0.9, opacity: 0, y: 50 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      style={{ zIndex }}
      className={`fixed bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl 
        border border-gray-700/50 overflow-hidden
        ${isFullscreen ? 'w-full h-full top-0 left-0' : ''}`}
      onClick={onFocus}
    >
      {/* macOS-style window header با دکمه‌های وسط */}
      <div 
        className="h-12 bg-gray-900/50 backdrop-blur border-b border-gray-700/50 
          flex items-center justify-between px-4 cursor-move"
        onPointerDown={(e) => dragControls.start(e)}
      >
        <div className="w-20" /> {/* اسپیسر راست */}
        
        <span className="text-sm font-medium text-gray-400">
          {title}
        </span>
        
        {/* دکمه‌های کنترل در وسط */}
        <div className="flex space-x-2 space-x-reverse w-20 justify-end">
          <button 
            onClick={onMinimize}
            className="w-7 h-7 rounded-full bg-yellow-500/80 hover:bg-yellow-500 
              flex items-center justify-center transition-all group relative"
            title="Minimize"
          >
            <Minus className="w-3 h-3 text-white" />
          </button>
          <button 
            onClick={toggleFullscreen}
            className="w-7 h-7 rounded-full bg-green-500/80 hover:bg-green-500 
              flex items-center justify-center transition-all group relative"
            title={isFullscreen ? "Restore" : "Maximize"}
          >
            {isFullscreen ? <Square className="w-3 h-3 text-white" /> : <Maximize2 className="w-3 h-3 text-white" />}
          </button>
          <button 
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-red-500/80 hover:bg-red-500 
              flex items-center justify-center transition-all group relative"
            title="Close"
          >
            <X className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>

      {/* Window content with scroll */}
      <div className="h-[calc(100%-3rem)] overflow-auto p-6 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {children}
      </div>
    </motion.div>
  );
};

export default Window;