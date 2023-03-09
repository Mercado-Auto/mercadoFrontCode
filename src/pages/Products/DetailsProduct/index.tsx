import { DeleteOutlined, EditOutlined, ShoppingOutlined, DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Menu, Breadcrumb, Button, Dropdown, Modal, notification, Spin, Tabs } from 'antd';
import React, { useId, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDeleteProduct, useReadProduct } from 'src/queries/reseller/product';
import { getError } from 'src/utils/get-error';
import Details from './Details';
import Gallery from './Gallery';
import Edit from './EditProduct';
import { Container, ContainerSpin } from './styles';
import { queryClient } from 'src/queries';
import AddItemsToStock from './AddItemsToStock';

const DetailsProduct: React.FC = () => {
  const $id = useId();
  const params = useParams();
  const navigate = useNavigate()
  const [id] = useState<string>(params.id!);
  const { data, isLoading, error } = useReadProduct(id);
  const [isEditting, setIsEditting] = useState(false);
  const [isAddStock, setIsAddStock] = useState(false);
  const { mutateAsync: deleteProduct } = useDeleteProduct({
    onSuccess: () => navigate('/products'),
    onError: (error) => notification.error(getError(error)),
  });

  const openConfirmDelete = () => {
    Modal
      .confirm({
        title: `Deletar o produto?!`,
        content: (
          <span>Tem certeza que deseja deletar o produto <b>{data?.name}</b> ?! Está ação não poderá ser defeita!</span>
        ),

        autoFocusButton: `cancel`,
        okText: `Deletar`,
        okButtonProps: {
          danger: true,
          type: `primary`,
          icon: <DeleteOutlined />,
        },
        onOk: async () => {
          return await deleteProduct({ id: data!.id });
        },
        maskClosable: false,
        closable: false,
        keyboard: false
      });
  };

  if (error) {
    console.error(error);
    notification.error(getError(error));
    navigate(-1);
  }

  // See: https://ant.design/components/dropdown/#Usage-upgrade-after-4.24.0
  const StockButton = () => {
    const menu = (
      <Menu>
        <Menu.Item key={`${$id}-menu-overlay-1`} icon={<PlusOutlined />} onClick={() => setIsAddStock(true)}>
          Adicionar items
        </Menu.Item>
      </Menu >
    );

    return (
      <Dropdown overlay={menu}>
        <Button key={`${$id}-stoke`}>
          Estoque
          <DownOutlined />
        </Button>
      </Dropdown>
    );
  };

  if (isLoading) {
    return (
      <Spin
        tip="Carregando dados..."
        delay={200}
      >
        <ContainerSpin />
      </Spin>
    );
  }

  return (
    <Container
      title={`${data?.name}`}
      onBack={() => navigate(-1)}
      breadcrumb={
        <Breadcrumb>
          <Breadcrumb.Item>Início</Breadcrumb.Item>
          <Breadcrumb.Item>Administração</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/products">Produtos</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={`/products/${data?.id}`}>{data?.name}</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      }
      avatar={{
        icon: <ShoppingOutlined />,
      }}
      extra={!isEditting ? [
        <StockButton key={`${$id}-stoke`} />,
        <Button
          key={`${$id}-delete`}
          type="default"
          icon={<DeleteOutlined />}
          danger
          onClick={() => openConfirmDelete()}
        >
          Deletar
        </Button>,
        <Button
          key={`${$id}-edit`}
          type="primary"
          icon={<EditOutlined />}
          onClick={() => setIsEditting(true)}
        >
          Editar
        </Button>,
      ] : null}
      footer={
        !isEditting ?
          <Tabs
            defaultActiveKey="1"
            items={[
              {
                key: `1`,
                label: `Galeria`,
                children: <Gallery data={data!} />
              }
            ]}
          />
          : null
      }
    >
      {!isEditting && <Details data={data!} />}
      {isEditting && <Edit
        data={data!}
        onCancel={() => setIsEditting(false)}
        onEdit={() => {
          setIsEditting(false);
          queryClient.invalidateQueries();
        }}
      />}
      {isAddStock && <AddItemsToStock
        data={data!}
        onCancel={() => setIsAddStock(false)}
        onAdded={() => {
          setIsAddStock(false);
          queryClient.invalidateQueries();
        }}
      />}
    </Container>
  );
}

export default DetailsProduct;
