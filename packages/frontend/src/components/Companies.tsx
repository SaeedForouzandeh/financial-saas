import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Users, DollarSign, Calendar, Plus, Edit, Trash2, Briefcase } from 'lucide-react';
import { Company, Employee } from '../types';

const Companies = () => {
  const [companies, setCompanies] = useState<Company[]>([
    { 
      id: '1', 
      name: 'شرکت نمونه', 
      taxNumber: '۱۲۳۴۵۶۷۸۹۰', 
      address: 'تهران، خیابان ولیعصر',
      phone: '۰۲۱-۱۲۳۴۵۶۷۸',
      employees: [
        { id: '1', firstName: 'علی', lastName: 'محمدی', nationalId: '۰۰۱۲۳۴۵۶۷۸', salary: 15000000, position: 'برنامه‌نویس' },
        { id: '2', firstName: 'مریم', lastName: 'احمدی', nationalId: '۰۰۹۸۷۶۵۴۳۲', salary: 18000000, position: 'مدیر پروژه' },
      ]
    },
    { 
      id: '2', 
      name: 'فروشگاه اینترنتی', 
      taxNumber: '۵۵۴۴۳۳۲۲۱۱', 
      address: 'اصفهان، خیابان چهارباغ',
      phone: '۰۳۱-۱۲۳۴۵۶۷',
      employees: [
        { id: '3', firstName: 'رضا', lastName: 'کریمی', nationalId: '۰۰۵۵۶۶۷۷۸۸', salary: 12000000, position: 'فروشنده' },
      ]
    },
  ]);

  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({});

  const totalEmployees = companies.reduce((acc, c) => acc + c.employees.length, 0);
  const totalSalary = companies.reduce((acc: number, c: Company) => 
  acc + c.employees.reduce((sum: number, e: Employee) => sum + e.salary, 0), 0);

  const handleAddEmployee = () => {
    if (selectedCompany && newEmployee.firstName && newEmployee.lastName) {
      const updatedCompanies = companies.map(c => {
        if (c.id === selectedCompany.id) {
          return {
            ...c,
            employees: [...c.employees, {
              id: Date.now().toString(),
              firstName: newEmployee.firstName!,
              lastName: newEmployee.lastName!,
              nationalId: newEmployee.nationalId || '',
              salary: newEmployee.salary || 0,
              position: newEmployee.position || '',
            }]
          };
        }
        return c;
      });
      setCompanies(updatedCompanies);
      setShowEmployeeModal(false);
      setNewEmployee({});
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-white h-full flex flex-col"
    >
      {/* آمار کلی */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-4 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">تعداد شرکت‌ها</p>
              <p className="text-2xl font-bold mt-1">{companies.length}</p>
            </div>
            <Building className="w-8 h-8 text-emerald-400" />
          </div>
        </div>

        <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-4 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">تعداد کارمندان</p>
              <p className="text-2xl font-bold mt-1">{totalEmployees}</p>
            </div>
            <Users className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-4 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">مجموع حقوق</p>
              <p className="text-2xl font-bold mt-1">{totalSalary.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-4 border border-gray-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">پرداخت ماه جاری</p>
              <p className="text-2xl font-bold mt-1">۰</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* لیست شرکت‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        {companies.map(company => (
          <motion.div
            key={company.id}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{company.name}</h3>
                <p className="text-gray-400 text-sm mt-1">{company.address}</p>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-gray-700 rounded-lg">
                  <Edit className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-700 rounded-lg">
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-gray-400 text-xs">شناسه ملی</p>
                <p className="text-sm">{company.taxNumber}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs">تلفن</p>
                <p className="text-sm">{company.phone}</p>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold flex items-center">
                  <Briefcase className="w-4 h-4 ml-2" />
                  کارمندان ({company.employees.length})
                </h4>
                <button
                  onClick={() => {
                    setSelectedCompany(company);
                    setShowEmployeeModal(true);
                  }}
                  className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center"
                >
                  <Plus className="w-3 h-3 ml-1" />
                  افزودن
                </button>
              </div>

              <div className="space-y-2 max-h-40 overflow-auto">
                {company.employees.map((emp: Employee) => (
                  <div key={emp.id} className="bg-gray-700/30 rounded-lg p-2 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">{emp.firstName} {emp.lastName}</p>
                      <p className="text-xs text-gray-400">{emp.position}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-emerald-400">{emp.salary.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">حقوق</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
              <button className="text-emerald-400 hover:text-emerald-300 text-sm">
                پرداخت حقوق
              </button>
              <button className="text-blue-400 hover:text-blue-300 text-sm">
                مشاهده جزئیات
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* مودال افزودن کارمند */}
      {showEmployeeModal && selectedCompany && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowEmployeeModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-gray-800 rounded-2xl p-6 w-96 border border-gray-700"
            onClick={(e: React.MouseEvent) => setShowEmployeeModal(false)}
          >
            <h3 className="text-xl font-bold mb-4">افزودن کارمند جدید به {selectedCompany.name}</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block mb-2">نام</label>
                <input
                  type="text"
                  value={newEmployee.firstName || ''}
                  onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
              </div>
              
              <div>
                <label className="text-gray-400 text-sm block mb-2">نام خانوادگی</label>
                <input
                  type="text"
                  value={newEmployee.lastName || ''}
                  onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">کد ملی</label>
                <input
                  type="text"
                  value={newEmployee.nationalId || ''}
                  onChange={(e) => setNewEmployee({ ...newEmployee, nationalId: e.target.value })}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">سمت</label>
                <input
                  type="text"
                  value={newEmployee.position || ''}
                  onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm block mb-2">حقوق</label>
                <input
                  type="number"
                  value={newEmployee.salary || ''}
                  onChange={(e) => setNewEmployee({ ...newEmployee, salary: Number(e.target.value) })}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 space-x-reverse mt-6">
              <button
                onClick={() => setShowEmployeeModal(false)}
                className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
              >
                انصراف
              </button>
              <button
                onClick={handleAddEmployee}
                className="px-4 py-2 bg-emerald-600 rounded-lg hover:bg-emerald-700"
              >
                افزودن
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Companies;