import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { Save, Download, Mail, Printer, Plus, Trash2 } from 'lucide-react';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  discount: number;
  total: number;
}

const InvoiceGenerator = () => {
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [customer, setCustomer] = useState({
    name: '',
    taxId: '',
    address: '',
    phone: ''
  });
  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Math.random().toString(36).substr(2, 9),
      description: '',
      quantity: 1,
      unitPrice: 0,
      taxRate: 9,
      discount: 0,
      total: 0
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        // Recalculate total
        updated.total = (updated.quantity * updated.unitPrice) * 
          (1 + updated.taxRate / 100) * (1 - updated.discount / 100);
        return updated;
      }
      return item;
    }));
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  };

  const calculateTax = () => {
    return items.reduce((sum, item) => {
      const subtotal = item.quantity * item.unitPrice;
      return sum + (subtotal * item.taxRate / 100);
    }, 0);
  };

  const calculateDiscount = () => {
    return items.reduce((sum, item) => {
      const subtotal = item.quantity * item.unitPrice;
      return sum + (subtotal * item.discount / 100);
    }, 0);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text('فاکتور فروش', 105, 20, { align: 'center' });
    
    // Company info
    doc.setFontSize(10);
    doc.text('شرکت نمونه', 20, 40);
    doc.text('شناسه ملی: ۱۲۳۴۵۶۷۸۹۰', 20, 45);
    doc.text('تلفن: ۰۲۱-۱۲۳۴۵۶۷۸', 20, 50);
    
    // Customer info
    doc.text(`مشتری: ${customer.name}`, 150, 40);
    doc.text(`شناسه مالیاتی: ${customer.taxId}`, 150, 45);
    doc.text(`تاریخ: ${invoiceDate.toLocaleDateString('fa-IR')}`, 150, 50);
    
    // Table
    autoTable(doc, {
      head: [['ردیف', 'شرح', 'تعداد', 'قیمت واحد', 'مالیات', 'تخفیف', 'جمع']],
      body: items.map((item, index) => [
        index + 1,
        item.description,
        item.quantity,
        item.unitPrice.toLocaleString(),
        `${item.taxRate}%`,
        `${item.discount}%`,
        item.total.toLocaleString()
      ]),
      startY: 60,
      styles: { font: 'persian', halign: 'right' },
      headStyles: { fillColor: [16, 185, 129] }
    });
    
    // Totals
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.text(`جمع خالص: ${calculateSubtotal().toLocaleString()} ریال`, 150, finalY);
    doc.text(`مالیات: ${calculateTax().toLocaleString()} ریال`, 150, finalY + 5);
    doc.text(`تخفیف: ${calculateDiscount().toLocaleString()} ریال`, 150, finalY + 10);
    doc.text(`جمع کل: ${calculateTotal().toLocaleString()} ریال`, 150, finalY + 15);
    
    doc.save('invoice.pdf');
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    
    const data = [
      ['فاکتور فروش'],
      ['مشتری:', customer.name, 'تاریخ:', invoiceDate.toLocaleDateString('fa-IR')],
      [],
      ['ردیف', 'شرح', 'تعداد', 'قیمت واحد', 'مالیات', 'تخفیف', 'جمع'],
      ...items.map((item, index) => [
        index + 1,
        item.description,
        item.quantity,
        item.unitPrice,
        `${item.taxRate}%`,
        `${item.discount}%`,
        item.total
      ]),
      [],
      ['جمع خالص:', calculateSubtotal()],
      ['مالیات:', calculateTax()],
      ['تخفیف:', calculateDiscount()],
      ['جمع کل:', calculateTotal()]
    ];
    
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'فاکتور');
    XLSX.writeFile(wb, 'invoice.xlsx');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 
        border border-gray-700/50"
    >
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">ایجاد فاکتور جدید</h2>
        <div className="flex space-x-2 space-x-reverse">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={exportToPDF}
            className="flex items-center space-x-2 space-x-reverse px-4 py-2 
              bg-emerald-600 rounded-lg text-white hover:bg-emerald-700 
              transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>PDF</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={exportToExcel}
            className="flex items-center space-x-2 space-x-reverse px-4 py-2 
              bg-green-600 rounded-lg text-white hover:bg-green-700 
              transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Excel</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 space-x-reverse px-4 py-2 
              bg-blue-600 rounded-lg text-white hover:bg-blue-700 
              transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>ذخیره</span>
          </motion.button>
        </div>
      </div>

      {/* Customer Info */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="نام مشتری"
          value={customer.name}
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          className="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 
            text-white focus:outline-none focus:border-emerald-500 
            transition-colors"
        />
        <input
          type="text"
          placeholder="شناسه مالیاتی"
          value={customer.taxId}
          onChange={(e) => setCustomer({ ...customer, taxId: e.target.value })}
          className="bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 
            text-white focus:outline-none focus:border-emerald-500 
            transition-colors"
        />
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-white">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2 px-4 text-right">شرح</th>
              <th className="py-2 px-4 text-right">تعداد</th>
              <th className="py-2 px-4 text-right">قیمت واحد</th>
              <th className="py-2 px-4 text-right">مالیات %</th>
              <th className="py-2 px-4 text-right">تخفیف %</th>
              <th className="py-2 px-4 text-right">جمع</th>
              <th className="py-2 px-4 text-right"></th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="border-b border-gray-700"
                >
                  <td className="py-2 px-4">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      className="w-full bg-gray-700/30 border border-gray-600 
                        rounded px-2 py-1 text-white"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value))}
                      className="w-20 bg-gray-700/30 border border-gray-600 
                        rounded px-2 py-1 text-white"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value))}
                      className="w-24 bg-gray-700/30 border border-gray-600 
                        rounded px-2 py-1 text-white"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="number"
                      value={item.taxRate}
                      onChange={(e) => updateItem(item.id, 'taxRate', parseFloat(e.target.value))}
                      className="w-16 bg-gray-700/30 border border-gray-600 
                        rounded px-2 py-1 text-white"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="number"
                      value={item.discount}
                      onChange={(e) => updateItem(item.id, 'discount', parseFloat(e.target.value))}
                      className="w-16 bg-gray-700/30 border border-gray-600 
                        rounded px-2 py-1 text-white"
                    />
                  </td>
                  <td className="py-2 px-4">
                    {item.total.toLocaleString()}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Add Item Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={addItem}
        className="mt-4 flex items-center space-x-2 space-x-reverse px-4 py-2 
          bg-gray-700 rounded-lg text-white hover:bg-gray-600 
          transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span>افزودن آیتم</span>
      </motion.button>

      {/* Totals */}
      <div className="mt-6 p-4 bg-gray-700/30 rounded-lg">
        <div className="flex justify-between py-1">
          <span className="text-gray-300">جمع خالص:</span>
          <span className="text-white">{calculateSubtotal().toLocaleString()} ریال</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-gray-300">مالیات:</span>
          <span className="text-white">{calculateTax().toLocaleString()} ریال</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-gray-300">تخفیف:</span>
          <span className="text-white">{calculateDiscount().toLocaleString()} ریال</span>
        </div>
        <div className="flex justify-between py-2 text-lg font-bold border-t border-gray-600 mt-2">
          <span className="text-emerald-400">جمع کل:</span>
          <span className="text-emerald-400">{calculateTotal().toLocaleString()} ریال</span>
        </div>
      </div>
    </motion.div>
  );
};

export default InvoiceGenerator;