import React, { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

import AuthProvider from "../Auth";

type Props = {
  // Determine if the children will be rendered
  // using the `children` prop, or will render in under route
  useOutlet?: boolean;
};

const GlobalContexts: React.FC<PropsWithChildren<Props>> = ({
  children,
  useOutlet,
}) => {
  return (
    <AuthProvider>{useOutlet ? <Outlet /> : <>{children}</>}</AuthProvider>
  );
};

export default GlobalContexts;
