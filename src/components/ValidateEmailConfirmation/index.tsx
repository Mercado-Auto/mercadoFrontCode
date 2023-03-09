import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserType } from 'src/api/auth';
import { useAuth } from 'src/contexts/Auth';

export type IValidateEmailConfirmationProps = {
  redirectTo?: string | false;
  element?: any;
}

const ValidateEmailConfirmation: React.FC<IValidateEmailConfirmationProps> = ({
  redirectTo = `/check-your-confirm-email`,
  element: Element,
}) => {
  const { verified_email } = useAuth();
  const navigate = useNavigate();

  if (!verified_email) {
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

export default ValidateEmailConfirmation;
