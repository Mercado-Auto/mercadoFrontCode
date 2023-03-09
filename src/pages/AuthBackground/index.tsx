import React from 'react';
import { Outlet } from 'react-router-dom';

import { Container } from './styles';

const AuthBackground: React.FC = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
}

export default AuthBackground;

