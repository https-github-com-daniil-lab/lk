import React from "react";
import CategoryItem from "./CategoryItem/CategoryItem";
import Category from "Services/Category";
import Load from "Components/Load/Load";

import "Styles/Pages/Main/CategoryBlock/CategoryBlock.scss";

interface Props {}

const CategoryBlock: React.FunctionComponent<Props> = (props: Props) => {
  const { useGetCategory } = Category;
  const { categories, load } = useGetCategory();

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
              />
            );
          })}
        </div>
      </div>
    </Load>
  );
};

export default CategoryBlock;
