import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Package, Edit, Trash2, Save } from 'lucide-react';
import { Product } from '../types';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: '1', code: 'PR001', name: 'لپ تاپ ایسوس', price: 15000000, cost: 12000000, stock: 15, category: 'الکترونیک' },
    { id: '2', code: 'PR002', name: 'ماوس بی‌سیم', price: 450000, cost: 350000, stock: 42, category: 'الکترونیک' },
    { id: '3', code: 'PR003', name: 'مانیتور سامسونگ', price: 8500000, cost: 7000000, stock: 8, category: 'الکترونیک' },
    { id: '4', code: 'PR004', name: 'کیبورد مکانیکی', price: 1250000, cost: 950000, stock: 23, category: 'الکترونیک' },
  ]);

  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});

  const filteredProducts = products.filter(p => 
    p.name.includes(search) || p.code.includes(search)
  );

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.code) {
      setProducts([...products, { 
        id: Date.now().toString(),
        code: newProduct.code,
        name: newProduct.name,
        price: newProduct.price || 0,
        cost: newProduct.cost || 0,
        stock: newProduct.stock || 0,
        category: newProduct.category || 'عمومی'
      }]);
      setShowAddModal(false);
      setNewProduct({});
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-white h-full flex flex-col"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">مدیریت محصولات</h2>
        <div className="flex space-x-2 space-x-reverse">
          <div className="relative">
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="جستجوی محصول..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-gray-700/50 border border-gray-600 rounded-lg pr-10 pl-4 py-2 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            className="bg-emerald-600 px-4 py-2 rounded-lg flex items-center"
          >
            <Plus className="w-4 h-4 ml-2" />
            محصول جدید
          </motion.button>
        </div>
      </div>

      {/* جدول محصولات */}
      <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden flex-1">
        <table className="w-full text-right">
          <thead className="bg-gray-900/50">
            <tr>
              <th className="py-3 px-4">کد</th>
              <th className="py-3 px-4">نام محصول</th>
              <th className="py-3 px-4">دسته‌بندی</th>
              <th className="py-3 px-4">قیمت فروش</th>
              <th className="py-3 px-4">قیمت خرید</th>
              <th className="py-3 px-4">سود</th>
              <th className="py-3 px-4">موجودی</th>
              <th className="py-3 px-4">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-t border-gray-700/50 hover:bg-gray-700/30">
                <td className="py-3 px-4">{product.code}</td>
                <td className="py-3 px-4 font-medium">{product.name}</td>
                <td className="py-3 px-4">{product.category}</td>
                <td className="py-3 px-4 text-emerald-400">{product.price.toLocaleString()}</td>
                <td className="py-3 px-4">{product.cost.toLocaleString()}</td>
                <td className="py-3 px-4 text-emerald-400">{(product.price - product.cost).toLocaleString()}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    product.stock > 20 ? 'bg-green-500/20 text-green-300' :
                    product.stock > 5 ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {product.stock}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button className="text-blue-400 hover:text-blue-300 ml-3">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* مودال افزودن محصول */}
      {showAddModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowAddModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-gray-800 rounded-2xl p-6 w-96 border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">افزودن محصول جدید</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block mb-2">کد محصول</label>
                <input
                  type="text"
                  value={newProduct.code || ''}
                  onChange={(e) => setNewProduct({ ...newProduct, code: e.target.value })}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
              </div>
              
              <div>
                <label className="text-gray-400 text-sm block mb-2">نام محصول</label>
                <input
                  type="text"
                  value={newProduct.name || ''}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">قیمت فروش</label>
                <input
                  type="number"
                  value={newProduct.price || ''}
                  onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">قیمت خرید</label>
                <input
                  type="number"
                  value={newProduct.cost || ''}
                  onChange={(e) => setNewProduct({ ...newProduct, cost: Number(e.target.value) })}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">موجودی</label>
                <input
                  type="number"
                  value={newProduct.stock || ''}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 space-x-reverse mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
              >
                انصراف
              </button>
              <button
                onClick={handleAddProduct}
                className="px-4 py-2 bg-emerald-600 rounded-lg hover:bg-emerald-700 flex items-center"
              >
                <Save className="w-4 h-4 ml-2" />
                ذخیره
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Products;