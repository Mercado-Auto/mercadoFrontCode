import React from "react";
import { UserType } from "src/api/auth";
import { useAuth } from "src/contexts/Auth";

interface IValidateUserTypeProps {
  component: any;
  type: UserType | UserType[];
}

const ValidateComponent: React.FC<IValidateUserTypeProps> = ({
  type,
  component: Component,
}) => {
  const { isType } = useAuth();
  const isValid = isType(type);

  if (!isValid) {
    return <></>;
  }

  if (Component) {
    return <Component />;
  }

  return <></>;
};

export default ValidateComponent;
