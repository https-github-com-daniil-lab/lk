import DateField from "Components/DateField/DateField";
import React, {
  createRef,
  MutableRefObject,
  RefObject,
  useRef,
  useState,
} from "react";
import "Styles/Pages/Settings/UserBlock/UserModal/UserModal.scss";
import User from "Services/User";
import { CSVDownload, CSVLink } from "react-csv";

interface Props {
  onClose: () => void;
}

const ModalExportData: React.FunctionComponent<Props> = ({
  onClose,
}: Props) => {
  const { useExportData } = User;

  const csvLinkRef = useRef<
    CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }
  >(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [csv, setCsv] = useState<string | null>();

  const { getExportableData } = useExportData(startDate, endDate);

  const download = async () => {
    setCsv(await getExportableData());
    csvLinkRef.current?.link.click()
  };

  const handleStartDate = (state: string | null) => {
    setStartDate(state);
    setCsv(null);
  };

  const handleEndDate = (state: string | null) => {
    setEndDate(state);
    setCsv(null);
  };

  return (
    <div className="user-modal">
      <span>Экспорт в CSV</span>
      <DateField
        label="Начало периода"
        date={startDate}
        setDate={handleStartDate}
      />
      <DateField label="Конец периода" date={endDate} setDate={handleEndDate} />
      <div className="buttons">
        <button className="button-secondary" onClick={onClose}>
          Отмена
        </button>
        <button className="button-primary" onClick={download}>
          Скачать
        </button>
        {csv && startDate && endDate && (
          <CSVLink
            data={csv}
            filename={`Операции с ${startDate[0]} по ${endDate[0]}.csv`}
            style={{ display: "none" }}
            ref={csvLinkRef}
          >
            Скачать
          </CSVLink>
        )}
      </div>
    </div>
  );
};

export default ModalExportData;
