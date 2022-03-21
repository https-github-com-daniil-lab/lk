import React, { useEffect, useState } from "react";
import useGetBaseCategory from "Services/BaseCategory";
import { IBaseCategory, TransactionType, IBalances } from "Services/Interfaces";
import CalendarDark from "Static/icons/calendar-dark.svg";
import { API_URL } from "Utils/Config";
import HexToRgbA from "Utils/HexToRgbA";
import ScanQr from "Static/icons/scan-qr.svg";
import ContextButton from "Components/ContextButton/ContextButton";
import DatePicker from "Components/DatePicker/DatePicker";
import CategoryListModal from "./CategoryListModal/CategoryListModal";
import BillList from "./BillList/BillList";

import "Styles/Pages/Main/ChartBlock/AddOperationModal/AddOperationModal.scss";

interface Props {
  onClose: () => void;
}

const AddOperationModal: React.FunctionComponent<Props> = ({
  onClose,
}: Props) => {
  const { categories, load } = useGetBaseCategory();

  const [date, setDate] = useState<null | string>(null);

  const [operationType, setOperationType] =
    useState<TransactionType>("WITHDRAW");

  const [selectedCategory, setSelectedCategory] =
    useState<IBaseCategory | null>(null);

  const [bill, setBill] = useState<IBalances | null>(null);

  const [summ, setSumm] = useState<string>("");

  const [description, setDescription] = useState<string>("");

  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    if (load) setSelectedCategory(categories[0]);
  }, [load]);

  return (
    <div className="add-operation-modal">
      <h1 className="add-operation-modal-title">Добавить операцию</h1>
      <div className="add-operation-modal-row">
        <span>{date ?? "Дата и время"}</span>
        <ContextButton
          button={<img src={CalendarDark} alt="Calendar" />}
          content={({}, onClose) => (
            <DatePicker {...{ onClose }} onEnter={setDate} />
          )}
        />
      </div>
      <div className="add-operation-modal-block">
        <span className="add-operation-modal-block-title">Тип операции</span>
        <div className="add-operation-modal-operation-type-container">
          <label>
            <input
              type="radio"
              name="radio"
              defaultChecked
              onChange={(e) => setOperationType("WITHDRAW")}
            />
            <span>Расход</span>
          </label>
          <label>
            <input
              type="radio"
              name="radio"
              onChange={(e) => setOperationType("DEPOSIT")}
            />
            <span>Доход</span>
          </label>
        </div>
      </div>

      <div className="add-operation-modal-block">
        <span className="add-operation-modal-block-title">Категория</span>
        <div className="add-operation-modal-base-category-container">
          <div
            className="image"
            style={{
              background: `linear-gradient(135deg, ${
                selectedCategory?.color.hex ?? "#8fe87b"
              } 0%, ${HexToRgbA(
                selectedCategory?.color.hex ?? "#8fe87b"
              )} 100%)`,
            }}
          >
            <img
              src={`${API_URL}api/v1/image/content/${selectedCategory?.icon.name}`}
              alt="Category base icon"
            />
          </div>
          <span>{selectedCategory?.name}</span>
          <ContextButton
            button={<button className="button-primary">Выбрать</button>}
            content={({}, onClose) => (
              <CategoryListModal
                {...{ onClose }}
                handler={(v) => setSelectedCategory(v)}
              />
            )}
          />
        </div>
      </div>
      <div className="add-operation-modal-block">
        <span className="add-operation-modal-block-title">Счет</span>
        <div
          className="add-operation-modal-base-category-container"
          style={{
            display: "grid",
            gridAutoColumns: "1fr",
            gridAutoRows: "1fr",
            gridTemplateColumns: "1.5fr 0.5fr",
            gridTemplateRows: "1fr",
            gap: "0px 0px",
            gridTemplateAreas: ". .",
          }}
        >
          <span>{selectedCategory?.name}</span>
          <ContextButton
            button={<button className="button-primary">Выбрать</button>}
            content={({}, onClose) => (
              <BillList {...{ onClose }} handler={(v) => setBill(v)} />
            )}
          />
        </div>
      </div>

      <div className="add-operation-modal-block">
        <span className="add-operation-modal-block-title">Суммма</span>
        <input
          type="text"
          placeholder="Введите сумму"
          className="add-operation-modal-input"
          value={summ}
          onChange={(e) => setSumm(e.target.value)}
        />
      </div>

      <div className="add-operation-modal-block">
        <span className="add-operation-modal-block-title">Описание</span>
        <textarea
          rows={4}
          placeholder="Введите описание"
          className="add-operation-modal-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="add-operation-modal-block">
        <span className="add-operation-modal-block-title">Местоположение</span>
        <span>Адресс еще не указан</span>
      </div>

      <div className="add-operation-modal-scan">
        <img src={ScanQr} alt="Scan qr icon" />
        <span>Сканировать чек</span>
      </div>

      <div className="add-operation-modal-controll">
        <button className="button-secondary" onClick={onClose}>
          Отмена
        </button>
        <button className="button-primary" onClick={() => {}}>
          Добавить
        </button>
      </div>
    </div>
  );
};

export default AddOperationModal;
