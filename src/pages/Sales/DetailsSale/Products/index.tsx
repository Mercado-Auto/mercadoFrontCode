import { Table } from 'antd';
import React, { useMemo } from 'react';
import Sale from 'src/interfaces/sale';
import getColumns from './col-list';
import { IProductCustom } from './type';

export type IProductsProps = {
  data: Sale;
}

const Products: React.FC<IProductsProps> = ({
  data,
}) => {

  const colList = useMemo(() => {
    return getColumns();
  }, []);

  const records = useMemo(() => {
    return (data
      .products || [])
      .map((record) => ({
        ...record,
        quantity: (data.quantity_products || []).find((item) => item.product_id === record.id)?.quantity || 0,
      })) as IProductCustom[];
  }, [data]);

  return (
    <>
      <br />
      <Table
        rowKey={(row) => row.id}
        columns={colList}
        dataSource={records || []}
        pagination={false}
      />
    </>
  );
}

export default Products;
