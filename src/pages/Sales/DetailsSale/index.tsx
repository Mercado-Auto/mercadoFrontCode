import { ShoppingOutlined } from "@ant-design/icons";
import { Breadcrumb, notification, Spin, Tabs } from "antd";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SaleStatus } from "src/interfaces/sale";
import { useReadSale } from "src/queries/reseller/sale";
import { getError } from "src/utils/get-error";
import Details from "./Details";
import NF from "./NF";
import Products from "./Products";
import { Container, ContainerSpin } from "./styles";
import UpdateStatus from "./UpdateStatus";

const DetailsSale: React.FC = () => {
  const $id = React.useId();
  const params = useParams();
  const navigate = useNavigate();
  const [id] = useState<string>(params.id!);
  const { data, isLoading, error } = useReadSale(id);

  const allowShowNF = () => {
    const nowAllows: SaleStatus[] = [
      SaleStatus.WAITING_PAYMENT,
      SaleStatus.CANCELED,
    ];
    if (nowAllows.includes(data!.status)) return false;
    return true;
  };

  if (error) {
    console.error(error);
    notification.error(getError(error));
    navigate(-1);
  }

  if (isLoading) {
    return (
      <Spin tip="Carregando dados..." delay={200}>
        <ContainerSpin />
      </Spin>
    );
  }

  return (
    <Container
      title={`${data?.customer.name || `Cosme`}`}
      onBack={() => navigate(-1)}
      breadcrumb={
        <Breadcrumb>
          <Breadcrumb.Item>Início</Breadcrumb.Item>
          <Breadcrumb.Item>Administração</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/sales">Vendas</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={`/sales/${data?.id}`}>
              {data?.customer.name || `Cosme`}
            </Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      }
      avatar={{
        icon: <ShoppingOutlined />,
      }}
      footer={
        <Tabs
          defaultActiveKey="1"
          items={
            [
              {
                key: `1`,
                label: `Produtos`,
                children: <Products data={data!} />,
              },
              allowShowNF()
                ? {
                    key: `2`,
                    label: `Nota Fiscal`,
                    children: <NF data={data!} />,
                  }
                : null,
            ].filter((item) => !!item) as any
          }
        />
      }
      extra={[<UpdateStatus key={`${$id}-status-button`} data={data!} />]}
    >
      <Details data={data!} />
    </Container>
  );
};

export default DetailsSale;
