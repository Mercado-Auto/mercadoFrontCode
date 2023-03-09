import { Descriptions, Tag, Typography } from "antd";
import React from "react";
import SaleStatusBadge from "src/components/SaleStatusBadge";
import Sale, { SaleStatus } from "src/interfaces/sale";
import { formatMoney } from "src/utils/format";

export type IDetailsProps = {
  data: Sale;
};

const Details: React.FC<IDetailsProps> = ({ data }) => {
  return (
    <div>
      <Typography.Title level={4}>Dados gerais</Typography.Title>
      <Descriptions size="small" column={2}>
        <Descriptions.Item label="Status">
          <SaleStatusBadge status={data.status} />
        </Descriptions.Item>
        <Descriptions.Item label="Valor da venda">
          {formatMoney(Number(data.amount))}
        </Descriptions.Item>
        <Descriptions.Item label="Cód. Autorização do pag.">
          {data.payment_auth_code}
        </Descriptions.Item>
        <Descriptions.Item label="Status do pagamento">
          {!data.payment_st_code && (
            <SaleStatusBadge status={SaleStatus.WAITING_PAYMENT} icon={false} />
          )}
          {data.payment_st_code && (
            <Tag color={data.payment_st_code === "2" ? "success" : "error"}>
              {data.payment_st_code === "2" ? "Aprovado" : "Reprovado"}
            </Tag>
          )}
        </Descriptions.Item>
        <Descriptions.Item label="NSU do pagamento">
          {data.payment_nsu}
        </Descriptions.Item>
        <Descriptions.Item label="Cód. de Rastreio">
          {data.tracker_code || "---"}
        </Descriptions.Item>
      </Descriptions>
      <br />
      <Typography.Title level={4}>Dados do cliente</Typography.Title>
      <Descriptions size="small" column={2}>
        <Descriptions.Item label="Cliente">
          {data?.customer.name}
        </Descriptions.Item>
        <Descriptions.Item label="E-mail">
          {data?.customer.email}
        </Descriptions.Item>
      </Descriptions>
      <br />
      <Typography.Title level={4}>Dados do endereço</Typography.Title>
      <Descriptions size="small" column={2}>
        <Descriptions.Item label="Logradouro">
          {data?.shipping_address?.street || 'n/a'}
        </Descriptions.Item>
        <Descriptions.Item label="Bairro">
          {data?.shipping_address?.district || 'n/a'}
        </Descriptions.Item>
        <Descriptions.Item label="Número">
          {data?.shipping_address?.number || 'n/a'}
        </Descriptions.Item>
        <Descriptions.Item label="Complemento">
          {data?.shipping_address?.complement || 'n/a'}
        </Descriptions.Item>
        <Descriptions.Item label="Cidade/UF">
          {data?.shipping_address?.city?.name && data?.shipping_address?.city?.uf ? `${data?.shipping_address?.city?.name}/${data?.shipping_address?.city?.uf}` : 'n/a'}
        </Descriptions.Item>
        <Descriptions.Item label="CEP">
          {data?.shipping_address?.cep || 'n/a'}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default Details;
