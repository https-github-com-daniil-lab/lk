import Load from "Components/Load/Load";
import Modal from "Components/Modal/Modal";
import React, { useState } from "react";
import { ISubscriptionGroup } from "Services/Interfaces";
import { useGetSubscriptionGroups } from "Services/Subscription";
import "Styles/Pages/Settings/SubscriptionBlock/SubscriptionBlock.scss";
import SubscribeModal from "./SubscribeModal/SubscribeModal";
import SubscriptionItem from "./SubscriptionItem/SubscriptionItem";

const SubscriptionBlock: React.FC = () => {
  const { load, subscriptionGroups } = useGetSubscriptionGroups();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedSubscriptionGroup, setSelectedSubscriptionGroup] =
    useState<ISubscriptionGroup>();

  return (
    <>
      <Load {...{ load }} className="subscription-block">
        {subscriptionGroups.map((subscriptionGroup) => (
          <SubscriptionItem
            key={subscriptionGroup.id}
            subscriptionGroup={subscriptionGroup}
            list={lists[subscriptionGroup.name]}
          />
        ))}
      </Load>
    </>
  );
};

const lists = {
  Pro: [
    "Быстрый старт",
    "Touch ID / Face ID",
    "Уникальный интерфейс",
    "Светлая и темная тема",
    "Встроенный калькулятор+ конвертер валют",
    "Синхронизация личных устройств",
    "Ведение совместного учета",
    "Экспорт в CSV-файлы",
    "Синхронизация с банками",
    "Автоматическое резервное копирование",
    "Автоплатежи",
    "Геометки",
  ],
  Premium: [
    "Быстрый старт",
    "Touch ID / Face ID",
    "Уникальный интерфейс",
    "Светлая и темная тема",
    "Встроенный калькулятор+ конвертер валют",
    "Синхронизация личных устройств",
    "Ведение совместного учета",
    "Экспорт в CSV-файлы",
    "Синхронизация с банками",
    "Автоматическое резервное копирование",
    "Автоплатежи",
    "Геометки",
    "Виджет для быстрого ввода расходов/доходов",
    "Анализ активов",
  ],
};

export default SubscriptionBlock;
