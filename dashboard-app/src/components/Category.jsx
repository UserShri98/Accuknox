import React, { useState } from 'react';
import Widget, { AddWidgetCard } from './Widget';
import AddWidgetModal from './AddWidgetModal';

const Category = ({ category }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const visibleWidgets = category.widgets.filter(widget => widget.isVisible !== false);

  return (
    <div className="category">
      <h3 className="category-title">{category.name}</h3>
      <div className="widgets-grid">
        {visibleWidgets.map(widget => (
          <Widget 
            key={widget.id} 
            widget={widget} 
            categoryId={category.id}
          />
        ))}
        <AddWidgetCard onClick={() => setIsModalOpen(true)} />
      </div>
      <AddWidgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categoryId={category.id}
        categoryName={category.name}
      />
    </div>
  );
};

export default Category;