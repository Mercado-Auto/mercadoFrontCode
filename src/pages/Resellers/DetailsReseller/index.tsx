import { DeleteOutlined, EditOutlined, ShopOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, notification, Spin } from 'antd';
import React, { useId, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { queryClient } from 'src/queries';
import { useReadReseller } from 'src/queries/admin/reseller';
import { getError } from 'src/utils/get-error';
import DeleteReseller from '../DeleteReseller';
import Details from './Details';
import Edit from './EditReseller';
import { Container, ContainerSpin } from './styles';

const DetailsReseller: React.FC = () => {
  const $id = useId();
  const params = useParams();
  const navigate = useNavigate()
  const [id] = useState<string>(params.id!);
  const { data, isLoading, error } = useReadReseller(id);
  const [isEditting, setIsEditting] = useState(false);
  const [isDeletting, setIsDeletting] = useState(false);

  if (error) {
    console.error(error);
    notification.error(getError(error));
    navigate(-1);
  }

  if (isLoading) {
    return (
      <Spin
        tip="Carregando dados..."
        delay={ 200 }
      >
        <ContainerSpin />
      </Spin>
    );
  }

  return (
    <Container
      title={ `${ data?.corporate_name }` }
      onBack={ () => navigate(-1) }
      breadcrumb={
        <Breadcrumb>
          <Breadcrumb.Item>Início</Breadcrumb.Item>
          <Breadcrumb.Item>Administração</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/resellers">Revendedores</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={ `/resellers/${ data?.id }` }>{ data?.corporate_name }</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      }
      avatar={ {
        icon: <ShopOutlined />,
      } }
      extra={ !isEditting ? [
        <Button
          key={ `${ $id }-delete` }
          type="default"
          icon={ <DeleteOutlined /> }
          danger
          onClick={ () => setIsDeletting(true) }
        >
          Deletar
        </Button>,
        <Button
          key={ `${ $id }-edit` }
          type="primary"
          icon={ <EditOutlined /> }
          onClick={ () => setIsEditting(true) }
        >
          Editar
        </Button>,
      ] : null }
    >
      { !isEditting && <Details data={ data! } /> }
      { isEditting && <Edit
        data={ data! }
        onCancel={ () => setIsEditting(false) }
        onEdit={ () => {
          setIsEditting(false);
          queryClient.invalidateQueries();
        } }
      /> }
      { isDeletting && <DeleteReseller
        resellerId={ data!.id }
        resellerCnpj={ data!.cnpj }
        onCancel={ () => setIsDeletting(false) }
        onDelete={ () => {
          navigate(`/resellers`);
          setIsDeletting(false);
        } }
      /> }
    </Container>
  );
}

export default DetailsReseller;
