import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserType } from 'src/api/auth';
import { useAuth } from 'src/contexts/Auth';

export type IValidateUserTypeProps = {
  type: UserType | UserType[];
  redirectTo?: string | false;
  element?: any;
}

const ValidateUserType: React.FC<IValidateUserTypeProps> = ({
  type,
  redirectTo = `/404`,
  element: Element,
}) => {
  const { isType } = useAuth();
  const isValid = isType(type);
  const navigate = useNavigate();

  if (!isValid) {
    if (redirectTo) {

      navigate(redirectTo, {
        replace: true,
      });
    }

    return <div />
  }

  if (Element) {
    return <Element />;
  }

  return (<Outlet />);
}

export default ValidateUserType;
