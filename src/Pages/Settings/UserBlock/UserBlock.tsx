import React, { useEffect, useState } from "react";
import UserBlockWrapper from "./UserBlockWrapper/UserBlockWrapper";
import Select from "Components/Select/Select";
import useGetWallets from "Services/Wallets";
import PhoneIcon from "Static/icons/phone.svg";
import MailIcon from "Static/icons/mail.svg";
import DownloadIcon from "Static/icons/download.svg";
import RemoveIcon from "Static/icons/remove.svg";
import PencilIcon from "Static/icons/pencil.svg";
import { IWallet } from "Services/Interfaces";
import Modal from "Components/Modal/Modal";
import ModalPhone from "./ModalPhone/ModalPhone";
import ModalEmail from "./ModalEmail/ModalEmail";
import { useSelector } from "react-redux";
import { GetUserEmail, GetUserName } from "Redux/Selectors";
import "Styles/Pages/Settings/UserBlock/UserBlock.scss";

interface Props {}

const UserBlock: React.FunctionComponent<Props> = (props: Props) => {
  const { load, wallets } = useGetWallets();

  const userPhone = useSelector(GetUserName);
  const userEmail = useSelector(GetUserEmail);

  const [phoneModal, setPhoneModal] = useState<boolean>(false);
  const [emailModal, setEmailModal] = useState<boolean>(false);

  const [wallet, setWallet] = useState<IWallet>();

  useEffect(() => {
    if (load) setWallet(wallets[0]);
  }, [load]);

  return (
    <div className="user-block noselect">
      <UserBlockWrapper title="Аккаунт">
        <div className="user-block-item">
          <img src={PhoneIcon} alt="Phone" />
          <span>{userPhone ?? "none"}</span>
          <img
            onClick={() => setPhoneModal(true)}
            src={PencilIcon}
            alt="Edit"
          />
        </div>
        <div className="user-block-item">
          <img src={MailIcon} alt="Email" />
          <span>{userEmail ?? "none"}</span>
          <img
            onClick={() => setEmailModal(true)}
            src={PencilIcon}
            alt="Edit"
          />
        </div>
      </UserBlockWrapper>
      <UserBlockWrapper title="Данные">
        <div className="user-block-item">
          <img src={DownloadIcon} alt="Download" />
          <span>Экспортировать данные в CSV</span>
          <div></div>
        </div>
        <div className="user-block-item">
          <img src={RemoveIcon} alt="Remove" />
          <span>Удалить данные</span>
          <div></div>
        </div>
      </UserBlockWrapper>
      <UserBlockWrapper title="Валюта">
        <Select
          value={wallet?.walletDisplayName ?? ""}
          data={wallets.map((i) => ({
            label: i.walletDisplayName,
          }))}
          handler={(index) => {}}
        />
      </UserBlockWrapper>
      <Modal show={phoneModal} onClose={() => setPhoneModal(false)}>
        <ModalPhone onClose={() => setPhoneModal(false)} />
      </Modal>
      <Modal show={emailModal} onClose={() => setEmailModal(false)}>
        <ModalEmail onClose={() => setEmailModal(false)} />
      </Modal>
    </div>
  );
};

export default UserBlock;
