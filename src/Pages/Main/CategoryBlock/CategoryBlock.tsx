import React, { useState } from "react";
import CategoryItem from "./CategoryItem/CategoryItem";
import Category from "Services/Category";
import Load from "Components/Load/Load";

import "Styles/Pages/Main/CategoryBlock/CategoryBlock.scss";
import Modal from "Components/Modal/Modal";
import DeleteModal from "../BalanceBlock/DeleteModal/DeleteModal";

interface Props {}

const CategoryBlock: React.FunctionComponent<Props> = (props: Props) => {
  const { useGetCategory } = Category;
  const { categories, load } = useGetCategory();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  return (
    <Load {...{ load }}>
      <div className="category-block">
        <div className="category-block-wrapper">
          {categories.map((category, i) => {
            return (
              <CategoryItem
                key={i}
                icon={category.icon.name}
                color={category.color.hex}
                name={category.name}
                onClick={() => {
                  setShowDeleteModal(true);
                  setCategoryId(category.id);
                }}
              />
            );
          })}
        </div>
      </div>
      <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <DeleteModal
          closeModal={() => setShowDeleteModal(false)}
          transactionId={categoryId}
        />
      </Modal>
    </Load>
  );
};

export default CategoryBlock;
