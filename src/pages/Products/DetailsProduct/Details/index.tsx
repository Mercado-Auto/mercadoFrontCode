import { Alert, Descriptions, Tag, Typography } from 'antd';
import React from 'react';
import Product from 'src/interfaces/product';

export type IDetailsProps = {
  data: Product;
}

const Details: React.FC<IDetailsProps> = ({
  data,
}) => {

  return (
    <div>
      <Typography.Title level={4}>
        Dados gerais
      </Typography.Title>
      <Descriptions size="small" column={2}>
        <Descriptions.Item label="Nome">
          {data.name}
        </Descriptions.Item>
        <Descriptions.Item label="Preço">
          R$ {new Intl.NumberFormat('pt-BR').format(data.price)}
        </Descriptions.Item>
        <Descriptions.Item label="Habilidatado para venda?">
          <Tag color={data.sell_activated ? 'success' : 'error'}>{data.sell_activated ? 'Sim' : 'Não'}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Tags">
          {(data.tags || []).map((tag) => (<Tag key={tag.id} color="default">{tag.name}</Tag>))}
        </Descriptions.Item>
        <Descriptions.Item label="Secções">
          {(data.sections || []).map((section) => (<Tag key={section.id} color="default">{section.name}</Tag>))}
        </Descriptions.Item>
        <Descriptions.Item label="Descrição">
          {data.description || '---'}
        </Descriptions.Item>
      </Descriptions>
      <br />
      <Typography.Title level={4}>
        Estoque
      </Typography.Title>
      {!data.stock_quantity ? (
        <Alert
          type="warning"
          message={<>Aviso! Este produto <b>não</b> tem items em <b>estoque</b>.</>}
        />
      ) : null}
      {data.stock_quantity ? (
        <Descriptions size="small" column={2}>
          <Descriptions.Item label="Quantidade em estoque">
            {data.stock_quantity} unidades
          </Descriptions.Item>
        </Descriptions>
      ) : null}
    </div>
  );
}

export default Details;
