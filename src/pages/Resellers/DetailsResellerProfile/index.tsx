import { ShopOutlined } from '@ant-design/icons';
import { Breadcrumb, Empty, notification } from 'antd';
import React from 'react';
import { useAuth } from 'src/contexts/Auth';
import Details from './../DetailsReseller/Details';
import { Container } from './styles';

const DetailsReseller: React.FC = () => {
  const { reseller } = useAuth();

  if (!reseller) {
    notification.error({ message: `Dados do revendedor não disponiveis!` });
    return <Empty description="Sem dados..."></Empty>
  }

  return (
    <Container
      title={ `${ reseller?.corporate_name }` }
      onBack={ undefined }
      breadcrumb={
        <Breadcrumb>
          <Breadcrumb.Item>Início</Breadcrumb.Item>
          <Breadcrumb.Item>Administração</Breadcrumb.Item>
          <Breadcrumb.Item>
            { reseller?.corporate_name }
          </Breadcrumb.Item>
        </Breadcrumb>
      }
      avatar={ {
        icon: <ShopOutlined />,
      } }
    >
      { <Details data={ reseller! } /> }
    </Container>
  );
}

export default DetailsReseller;
