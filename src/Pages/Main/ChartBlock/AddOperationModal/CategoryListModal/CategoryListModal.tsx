import React, { useRef } from "react";
import { IBaseCategory } from "Services/Interfaces";
import useGetBaseCategory from "Services/BaseCategory";

import "Styles/Pages/Main/ChartBlock/AddOperationModal/CategoryListModal/CategoryListModal.scss";
import useDraggableScroll from "Utils/Hooks/useDraggableScroll";

interface Props {
  onClose: () => void;
  handler: (v: IBaseCategory) => void;
}

const CategoryListModal: React.FunctionComponent<Props> = ({
  onClose,
  handler,
}: Props) => {
  const ref = useRef(null);

  const { onMouseDown } = useDraggableScroll(ref, { direction: "vertical" });

  const { categories, load } = useGetBaseCategory();

  const _selectBaseCategory = (category: IBaseCategory): void => {
    handler(category);
    onClose();
  };

  if (!load) return null;

  return (
    <div
      className="category-list-modal noselect"
      ref={ref}
      onMouseDown={onMouseDown}
    >
      {categories.map((category, i) => {
        return (
          <div
            key={i}
            className="category-list-modal-item"
            onClick={() => _selectBaseCategory(category)}
          >
            {category.name}
          </div>
        );
      })}
    </div>
  );
};

export default CategoryListModal;
