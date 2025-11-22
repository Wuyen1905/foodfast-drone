/**
 * Export Helper Utility
 * Functions for exporting data to CSV or PDF
 * No UI components - just utility functions
 */

export interface ExportData {
  headers: string[];
  rows: (string | number)[][];
  title?: string;
}

/**
 * Export data to CSV
 */
export const exportToCSV = (data: ExportData, filename: string = 'export.csv'): void => {
  try {
    // Create CSV content
    const csvContent = [
      data.headers.join(','),
      ...data.rows.map(row => 
        row.map(cell => {
          // Escape commas and quotes in cell content
          const cellStr = String(cell);
          if (cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')) {
            return `"${cellStr.replace(/"/g, '""')}"`;
          }
          return cellStr;
        }).join(',')
      )
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log(`[exportHelper] Exported CSV: ${filename}`);
  } catch (error) {
    console.error('[exportHelper] Error exporting to CSV:', error);
    throw error;
  }
};

/**
 * Export data to JSON
 */
export const exportToJSON = (data: any, filename: string = 'export.json'): void => {
  try {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log(`[exportHelper] Exported JSON: ${filename}`);
  } catch (error) {
    console.error('[exportHelper] Error exporting to JSON:', error);
    throw error;
  }
};

/**
 * Export report to PDF (requires jsPDF - will check if available)
 */
export const exportReport = async (
  data: ExportData,
  filename: string = 'report.pdf'
): Promise<void> => {
  try {
    // Check if jsPDF is available
    // Dynamic import to avoid breaking if not installed
    const jsPDF = await import('jspdf').catch(() => null);
    
    if (!jsPDF || !jsPDF.default) {
      console.warn('[exportHelper] jsPDF not available, falling back to CSV export');
      exportToCSV(data, filename.replace('.pdf', '.csv'));
      return;
    }

    const { default: jsPDFLib } = jsPDF;
    const doc = new jsPDFLib.default();
    
    // Add title if provided
    if (data.title) {
      doc.setFontSize(16);
      doc.text(data.title, 14, 20);
      doc.setFontSize(10);
    }

    // Add table
    let yPosition = data.title ? 35 : 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 14;
    const rowHeight = 7;
    const colWidth = (pageWidth - 2 * margin) / data.headers.length;

    // Headers
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    data.headers.forEach((header, index) => {
      doc.text(header, margin + index * colWidth, yPosition);
    });
    yPosition += rowHeight;

    // Draw header line
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition - 3, pageWidth - margin, yPosition - 3);

    // Rows
    doc.setFont(undefined, 'normal');
    data.rows.forEach(row => {
      // Check if we need a new page
      if (yPosition > pageHeight - 20) {
        doc.addPage();
        yPosition = 20;
      }

      row.forEach((cell, index) => {
        const cellText = String(cell).substring(0, 20); // Truncate long text
        doc.text(cellText, margin + index * colWidth, yPosition);
      });
      yPosition += rowHeight;
    });

    // Save PDF
    doc.save(filename);
    console.log(`[exportHelper] Exported PDF: ${filename}`);
  } catch (error) {
    console.error('[exportHelper] Error exporting to PDF:', error);
    // Fallback to CSV
    console.log('[exportHelper] Falling back to CSV export');
    exportToCSV(data, filename.replace('.pdf', '.csv'));
  }
};

/**
 * Export orders report
 */
export const exportOrdersReport = (orders: any[]): void => {
  const data: ExportData = {
    title: 'Orders Report',
    headers: ['Order ID', 'Customer', 'Restaurant', 'Status', 'Total', 'Date'],
    rows: orders.map(order => [
      order.id || '',
      order.customerName || '',
      order.restaurantId || '',
      order.status || '',
      order.total || 0,
      order.orderTime || ''
    ])
  };

  const timestamp = new Date().toISOString().split('T')[0];
  exportToCSV(data, `orders_report_${timestamp}.csv`);
};

/**
 * Export drones report
 */
export const exportDronesReport = (drones: any[]): void => {
  const data: ExportData = {
    title: 'Drones Report',
    headers: ['Drone Code', 'Status', 'Battery', 'Missions', 'Last Maintenance', 'Health Score'],
    rows: drones.map(drone => [
      drone.code || drone.droneCode || '',
      drone.status || '',
      drone.battery || 0,
      drone.missionsCompleted || 0,
      drone.lastMaintenance || '',
      drone.healthScore || 0
    ])
  };

  const timestamp = new Date().toISOString().split('T')[0];
  exportToCSV(data, `drones_report_${timestamp}.csv`);
};

/**
 * Export analytics report
 */
export const exportAnalyticsReport = (analytics: any): void => {
  const data: ExportData = {
    title: 'Analytics Report',
    headers: ['Metric', 'Value'],
    rows: Object.entries(analytics).map(([key, value]) => [
      key,
      String(value)
    ])
  };

  const timestamp = new Date().toISOString().split('T')[0];
  exportToCSV(data, `analytics_report_${timestamp}.csv`);
};

