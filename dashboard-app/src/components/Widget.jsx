import React from 'react';
import { useDispatch } from 'react-redux';
import { X, Plus, BarChart3 } from 'lucide-react';
import { removeWidget } from '../store/dashboardSlice';

const DonutChart = ({ data, title }) => {
  if (title === 'Cloud Accounts') {
    return (
      <div className="donut-chart-container">
        <div className="donut-chart cloud-accounts">
          <div className="donut-center">
            <span className="donut-total">{data.total}</span>
            <span className="donut-label">Total</span>
          </div>
        </div>
        <div className="chart-legend">
          <div className="legend-item">
            <div className="legend-dot connected"></div>
            <span>Connected ({data.connected})</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot not-connected"></div>
            <span>Not Connected ({data.notConnected})</span>
          </div>
        </div>
      </div>
    );
  }

  if (title === 'Cloud Account Risk Assessment') {
    return (
      <div className="donut-chart-container">
        <div className="donut-chart risk-assessment">
          <div className="donut-center">
            <span className="donut-total">{data.total}</span>
            <span className="donut-label">Total</span>
          </div>
        </div>
        <div className="chart-legend vertical">
          <div className="legend-item">
            <div className="legend-dot failed"></div>
            <span>Failed ({data.failed})</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot warning"></div>
            <span>Warning ({data.warning})</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot not-available"></div>
            <span>Not available ({data.notAvailable})</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot passed"></div>
            <span>Passed ({data.passed})</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const BarChart = ({ data, title }) => {
  const total = data.critical + data.high + data.medium + data.low;
  const criticalWidth = (data.critical / total) * 100;
  const highWidth = (data.high / total) * 100;
  const mediumWidth = (data.medium / total) * 100;
  const lowWidth = (data.low / total) * 100;

  return (
    <div className="bar-chart-container">
      <div className="bar-chart-header">
        <div className="bar-chart-total">
          <span className="total-number">{data.total}</span>
          <span className="total-label">{data.totalText}</span>
        </div>
      </div>
      <div className="bar-chart">
        <div className="bar-segment critical" style={{ width: `${criticalWidth}%` }}></div>
        <div className="bar-segment high" style={{ width: `${highWidth}%` }}></div>
        <div className="bar-segment medium" style={{ width: `${mediumWidth}%` }}></div>
        <div className="bar-segment low" style={{ width: `${lowWidth}%` }}></div>
      </div>
      <div className="bar-legend">
        <div className="legend-item">
          <div className="legend-dot critical"></div>
          <span>Critical ({data.critical})</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot high"></div>
          <span>High ({data.high})</span>
        </div>
      </div>
    </div>
  );
};

const EmptyChart = ({ message }) => {
  return (
    <div className="empty-chart">
      <BarChart3 size={48} className="empty-icon" />
      <span className="empty-message">{message}</span>
    </div>
  );
};

const Widget = ({ widget, categoryId }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeWidget({ categoryId, widgetId: widget.id }));
  };

  const renderContent = () => {
    switch (widget.type) {
      case 'donut':
        return <DonutChart data={widget.data} title={widget.name} />;
      case 'bar':
        return <BarChart data={widget.data} title={widget.name} />;
      case 'empty':
        return <EmptyChart message={widget.message} />;
      case 'text':
        return (
          <div className="widget-text">
            {widget.text.split('\n').map((line, index) => (
              <div key={index} className="widget-text-line">
                {line}
              </div>
            ))}
          </div>
        );
      default:
        return widget.text ? (
          <div className="widget-text">
            {widget.text.split('\n').map((line, index) => (
              <div key={index} className="widget-text-line">
                {line}
              </div>
            ))}
          </div>
        ) : null;
    }
  };

  return (
    <div className="widget">
      <div className="widget-header">
        <h4 className="widget-title">{widget.name}</h4>
        <button 
          className="widget-remove-btn"
          onClick={handleRemove}
          aria-label="Remove widget"
        >
          <X size={16} />
        </button>
      </div>
      <div className="widget-content">
        {renderContent()}
      </div>
    </div>
  );
};

const AddWidgetCard = ({ onClick }) => {
  return (
    <div className="add-widget-card" onClick={onClick}>
      <div className="add-widget-content">
        <Plus size={20} className="add-icon" />
        <span>Add Widget</span>
      </div>
    </div>
  );
};

export default Widget;
export { AddWidgetCard };