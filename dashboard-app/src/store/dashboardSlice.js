import { createSlice } from '@reduxjs/toolkit';
import { initialDashboardData } from '../data/initialData';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    categories: initialDashboardData.categories,
    searchTerm: ''
  },
  reducers: {
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.widgets.push({
          ...widget,
          id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        });
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
      }
    },
    toggleWidget: (state, action) => {
      const { categoryId, widgetId, isVisible } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) {
        const widget = category.widgets.find(w => w.id === widgetId);
        if (widget) {
          widget.isVisible = isVisible;
        }
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    }
  }
});

export const { addWidget, removeWidget, toggleWidget, setSearchTerm } = dashboardSlice.actions;

export const selectFilteredWidgets = (state) => {
  const { categories, searchTerm } = state.dashboard;
  if (!searchTerm) return categories;
  
  return categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget =>
      (widget.name && widget.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (widget.text && widget.text.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (widget.message && widget.message.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })).filter(category => category.widgets.length > 0);
};

export default dashboardSlice.reducer;