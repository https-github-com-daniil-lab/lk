import React from "react";
import { IBonusBlank } from "Services/Interfaces";
import { API_URL } from "Utils/Config";

interface Props {
  blank: IBonusBlank;
  setActiveBlank: (blank: IBonusBlank) => void;
  openAddCardModal: () => void;
}

const AddModalBlank: React.FC<Props> = ({
  blank,
  setActiveBlank,
  openAddCardModal,
}) => {
  const handleCardClick = () => {
    setActiveBlank(blank);
    openAddCardModal();
  };

  return (
    <img
      src={`${API_URL}api/v1/image/content/${blank.image.name}`}
      alt=""
      className="bonus-add-modal-blank"
      onClick={handleCardClick}
    />
  );
};

export default AddModalBlank;
