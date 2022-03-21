import React, { useState } from "react";

import { ColorType, IconType } from "Services/Interfaces";
import { API_URL } from "Utils/Config";
import Category from "Services/Category";

import ColorsBlock from "./ColorsBlock/ColorsBlock";
import IconsBlock from "./IconsBlock/IconsBlock";

import "Styles/Pages/Main/CategoryBlock/CategoryConstructor/CategoryConstructor.scss";
import { useDispatch, useSelector } from "react-redux";
import { GetUserId } from "Redux/Selectors";
import { AppDispatch } from "Redux/Store";

interface Props {
  ctx: () => void;
}

export type CategoryType = {
  color: ColorType | null;
  icon: IconType | null;
  name: string;
};

const CategoryConstructor: React.FunctionComponent<Props> = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const userId = useSelector(GetUserId);

  const { addCategory } = Category;

  const [category, setCategory] = useState<CategoryType>({
    icon: null,
    color: null,
    name: "",
  });

  const setIcon = (icon: IconType): void => setCategory({ ...category, icon });

  const setColor = (color: ColorType): void =>
    setCategory({ ...category, color });

  return (
    <div className="category-constructor">
      <div className="category-constructor-selected">
        <div
          style={{
            backgroundColor: category.color
              ? category.color.hex
              : "rgb(223, 223, 223)",
          }}
        >
          {category.icon && (
            <img src={`${API_URL}api/v1/image/content/${category.icon.name}`} />
          )}
        </div>
        <input
          type="text"
          placeholder="Название"
          value={category.name}
          onChange={(e) => setCategory({ ...category, name: e.target.value })}
        />
      </div>
      <div className="category-constructor-row">
        <span>Иконка</span>
        <IconsBlock onIconChange={setIcon} icon={category.icon} />
      </div>
      <div className="category-constructor-row">
        <span>Цвет</span>
        <ColorsBlock onColorChange={setColor} color={category.color} />
      </div>
      <div className="category-constructor-controll">
        <button
          className="button-primary"
          onClick={() => {
            addCategory(category, userId!, dispatch);
            props.ctx();
          }}
        >
          Добавить
        </button>
        <button className="button-secondary" onClick={props.ctx}>
          Отмена
        </button>
      </div>
    </div>
  );
};

export default CategoryConstructor;
