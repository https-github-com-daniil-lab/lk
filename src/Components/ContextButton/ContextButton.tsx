import React, { useMemo, useState } from "react";

import "Styles/Components/ContextButton/ContextButton.scss";

interface Props {
  content: React.FunctionComponent;
  button: React.ReactNode;
}

const ContextButton: React.FunctionComponent<Props> = ({
  content,
  button,
}: Props) => {
  const [expand, setExpand] = useState<boolean>(false);

  const onClose = (): void => setExpand(false);

  return (
    <div className={`context-button`}>
      <div className="context-button-wrapper" onClick={() => setExpand(true)}>
        {button}
      </div>
      <div
        className={`context-button-container ${expand ? "active" : "inactive"}`}
      >
        {content({}, onClose)}
      </div>
      {expand && (
        <div
          onClick={onClose}
          className={`context-button-backdrop ${
            expand ? "active" : "inactive"
          }`}
        ></div>
      )}
    </div>
  );
};

export default ContextButton;
