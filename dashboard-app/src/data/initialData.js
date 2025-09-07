export const initialDashboardData = {
  categories: [
    {
      id: 'cspm-executive',
      name: 'CSPM Executive Dashboard',
      widgets: [
        {
          id: 'widget-1',
          name: 'Cloud Accounts',
          type: 'donut',
          data: {
            total: 2,
            connected: 2,
            notConnected: 2
          }
        },
        {
          id: 'widget-2',
          name: 'Cloud Account Risk Assessment',
          type: 'donut',
          data: {
            total: 9659,
            failed: 1689,
            warning: 681,
            notAvailable: 36,
            passed: 7253
          }
        }
      ]
    },
    {
      id: 'cwpp-dashboard',
      name: 'CWPP Dashboard',
      widgets: [
        {
          id: 'widget-3',
          name: 'Top 5 Namespace Specific Alerts',
          type: 'empty',
          message: 'No Graph data available!'
        },
        {
          id: 'widget-4',
          name: 'Workload Alerts',
          type: 'empty',
          message: 'No Graph data available!'
        }
      ]
    },
    {
      id: 'registry-scan',
      name: 'Registry Scan',
      widgets: [
        {
          id: 'widget-5',
          name: 'Image Risk Assessment',
          type: 'bar',
          data: {
            total: 1470,
            totalText: 'Total Vulnerabilities',
            critical: 9,
            high: 150,
            medium: 451,
            low: 860
          }
        },
        {
          id: 'widget-6',
          name: 'Image Security Issues',
          type: 'bar',
          data: {
            total: 2,
            totalText: 'Total Images',
            critical: 2,
            high: 2,
            medium: 14,
            low: 42
          }
        }
      ]
    }
  ]
};