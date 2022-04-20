import { createContext } from "react";

interface IBonusCardContext {
  deleteBonusCard: (cardId: string) => void;
  createBonusCard: (
    blankId: string,
    code: string,
    onSuccess: () => void
  ) => void;
}

const BonusCardContext = createContext<IBonusCardContext>({
  deleteBonusCard: () => {},
  createBonusCard: () => {},
});

export default BonusCardContext;
