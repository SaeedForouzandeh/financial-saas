import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { LogIn, UserPlus, Languages, Moon, Sun } from 'lucide-react';

interface LoginProps {
  onSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const { login, register } = useAuth();
  const { theme, language, toggleTheme, toggleLanguage, t } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const success = await login(username, password);
      if (success) {
        onSuccess();
      } else {
        setError('نام کاربری یا رمز عبور اشتباه است');
      }
    } else {
      const success = await register({ username, password, email });
      if (success) {
        setIsLogin(true);
        setError('ثبت نام با موفقیت انجام شد');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800"
    >
      <div className="absolute top-4 left-4 flex space-x-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-800/50 backdrop-blur text-gray-300 hover:text-white"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button
          onClick={toggleLanguage}
          className="p-2 rounded-lg bg-gray-800/50 backdrop-blur text-gray-300 hover:text-white"
        >
          <Languages size={20} />
          <span className="mr-1 text-sm">{language === 'fa' ? 'EN' : 'FA'}</span>
        </button>
      </div>

      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-gray-800/50 backdrop-blur-xl p-8 rounded-2xl border border-gray-700 w-96 shadow-2xl"
      >
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
            {isLogin ? <LogIn className="w-10 h-10 text-emerald-400" /> : <UserPlus className="w-10 h-10 text-emerald-400" />}
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          {isLogin ? t('login') : t('register')}
        </h2>

        {error && (
          <div className={`mb-4 p-3 rounded-lg text-center ${error.includes('موفق') ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-300 text-sm block mb-2">{t('username')}</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label className="text-gray-300 text-sm block mb-2">ایمیل</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                required
              />
            </div>
          )}

          <div>
            <label className="text-gray-300 text-sm block mb-2">{t('password')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500 transition-colors"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
          >
            {isLogin ? t('login') : t('register')}
          </motion.button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-emerald-400 hover:text-emerald-300 text-sm transition-colors"
          >
            {isLogin ? 'ثبت نام نکرده‌اید؟ کلیک کنید' : 'قبلاً ثبت نام کرده‌اید؟ وارد شوید'}
          </button>
        </div>

        <div className="mt-4 text-xs text-gray-500 text-center">
          admin / admin
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;