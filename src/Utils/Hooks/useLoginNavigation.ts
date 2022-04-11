import { useEffect, useState } from "react";

export type PassParamasType = {
  id?: string | null;
  phone?: string | null;
  type?: "signin" | "signup";
  password?: string;
};

export interface LoginSwitcherParams {
  navigate: (name: string, params: PassParamasType) => void;
  back: () => void;
  params: PassParamasType;
}

interface NavigationParams {
  initialRoute: string;
}

const useLoginNavigation = (navigationParams: NavigationParams) => {
  const [location, setLocation] = useState<string[]>([]);

  const [transition, setTransition] = useState<boolean>(false);

  const [params, setParams] = useState<any>({});

  const navigate = (name: string, passParamas?: PassParamasType): void => {
    if (passParamas) setParams(passParamas);
    setTransition(true);
    setTimeout(() => {
      setLocation([...location, name]);
      setTransition(false);
    }, 1000);
  };

  const back = (): void => {
    setParams({});
    setTransition(true);

    setTimeout(() => {
      const tmpLocation = location;
      tmpLocation.splice(-1);
      setLocation([...tmpLocation]);
      setTransition(false);
    }, 1000);
  };

  useEffect(() => {
    if (navigationParams.initialRoute)
      setLocation([navigationParams.initialRoute]);
  }, [navigationParams.initialRoute]);

  return {
    navigate,
    back,
    params,
    transition,
    location,
  };
};

export default useLoginNavigation;
