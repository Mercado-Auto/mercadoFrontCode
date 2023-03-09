import React from 'react';
import { Typography } from 'antd';
import { Container } from './styles';

const NotFound: React.FC = () => {
  return (
    <Container>
      <Typography.Title level={ 4 }>
        Página não encontrada!
      </Typography.Title>
    </Container>
  );
}

export default NotFound;
