import jsPDF from 'jspdf';
import 'jspdf-autotable';

// فونت فارسی رو باید اضافه کنی
const PersianFont = 'IRANSans';

export const generateInvoicePDF = (invoiceData: any) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true,
    hotfix: true // برای رفع مشکل یونیکد
  } as any);

  // تنظیم فونت فارسی
  doc.setFont('helvetica', 'normal'); // فونت پیش‌فرض
  doc.setR2L(true); // راست به چپ

  // هدر
  doc.setFontSize(20);
  doc.text('فاکتور فروش', 105, 20, { align: 'center' });

  // اطلاعات شرکت
  doc.setFontSize(10);
  doc.text('شرکت نمونه', 20, 40);
  doc.text(`شناسه ملی: ۱۲۳۴۵۶۷۸۹۰`, 20, 45);
  doc.text(`تاریخ: ${new Date().toLocaleDateString('fa-IR')}`, 20, 50);

  // اطلاعات مشتری
  doc.text(`مشتری: ${invoiceData.customerName || 'مشتری عادی'}`, 150, 40);
  doc.text(`شماره فاکتور: ${invoiceData.number || '۱۲۳۴'}`, 150, 45);

  // جدول
  const tableData = invoiceData.items?.map((item: any, index: number) => [
    (index + 1).toString(),
    item.description || 'شرح کالا',
    item.quantity?.toString() || '1',
    item.price?.toLocaleString() || '۰',
    ((item.quantity || 1) * (item.price || 0)).toLocaleString()
  ]) || [];

  (doc as any).autoTable({
    head: [['ردیف', 'شرح', 'تعداد', 'قیمت واحد', 'جمع']],
    body: tableData,
    startY: 60,
    styles: {
      font: 'helvetica',
      halign: 'right',
      cellPadding: 2,
      fontSize: 9
    },
    headStyles: {
      fillColor: [16, 185, 129],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 15 },
      1: { halign: 'right', cellWidth: 60 },
      2: { halign: 'center', cellWidth: 20 },
      3: { halign: 'left', cellWidth: 30 },
      4: { halign: 'left', cellWidth: 30 }
    }
  });

  // جمع کل
  const finalY = (doc as any).lastAutoTable.finalY + 10;
  
  doc.setFontSize(11);
  doc.text(`جمع کل: ${invoiceData.total?.toLocaleString() || '۰'} ریال`, 150, finalY);
  doc.text(`مالیات: ${((invoiceData.total || 0) * 0.09).toLocaleString()} ریال`, 150, finalY + 5);
  doc.text(`قابل پرداخت: ${((invoiceData.total || 0) * 1.09).toLocaleString()} ریال`, 150, finalY + 10);

  // ذخیره فایل
  doc.save(`invoice-${invoiceData.number || Date.now()}.pdf`);
};