import React from "react";

import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";

import { GetUserToken } from "Redux/Selectors";

interface Props {
  children: any;
}

const RequireAuth: React.FunctionComponent<Props> = ({ children }: Props) => {
  const token = useSelector(GetUserToken);

  return token ? children : <Navigate to="/login" replace />;
};

export default RequireAuth;
