import Modal from "Components/Modal/Modal";
import React, { ChangeEvent, FC, useState } from "react";
import searchIcon from "../../../Static/icons/search-gery.svg";
import AddModal from "../AddModal/AddModal";

const BonusNav: FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const openModal = () => setShowAddModal(true);
  const closeModal = () => setShowAddModal(false);

  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  return (
    <div className="bonuscard-nav">
      <div className="bonuscard-input">
        <img src={searchIcon} alt="" />
        <input
          type="text"
          value={searchValue}
          onChange={onChangeHandler}
          placeholder="Поиск"
        />
      </div>
      <div className="bonuscard-btns">
        <button
          onClick={openModal}
          className="button-primary bonuscard-btns-add"
        >
          Добавить карту
        </button>
      </div>

      <Modal show={showAddModal} onClose={closeModal}>
        <AddModal closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default BonusNav;
