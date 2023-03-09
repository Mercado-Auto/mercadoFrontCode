import React from "react";

import { Container } from "./styles";
import { UserType } from "src/api/auth";
import DashboardAdmin from "../DashboardAdmin";
import DashboardReseller from "../DashboardReseller";
import ValidateComponent from "src/components/ValidateUserComponent";
import { useAuth } from "src/contexts/Auth";
import { Navigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const { isType } = useAuth();

  if (isType(UserType.ADMIN)) return <Navigate to={"/resellers"} replace />;
  if (isType(UserType.USER)) return <Navigate to={"/sales"} replace />;

  return (
    <Container>
      <ValidateComponent
        type={[UserType.RESELLER]}
        component={DashboardReseller}
      />
      <ValidateComponent
        type={[UserType.SYSADMIN]}
        component={DashboardAdmin}
      />
    </Container>
  );
};

export default Dashboard;
