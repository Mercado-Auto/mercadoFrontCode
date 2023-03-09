import { TableColumnProps } from "antd";
import { format } from "date-fns";
import SaleStatusBadge from "src/components/SaleStatusBadge";
import { formatMoney } from "src/utils/format";
import { IProductCustom } from "./type";

const getColumns = () => {

  return [
    {
      key: "name",
      dataIndex: "name",
      title: "Nome"
    },
    {
      key: "price",
      dataIndex: "price",
      title: "Preço da unidade",
      render: (price) => formatMoney(Number(price)),
      width: '200px'
    },
    {
      key: "quantity",
      dataIndex: "quantity",
      title: "Qntd. de itens",
      width: '140px'
    },
    {
      key: "stock_quantity",
      dataIndex: "stock_quantity",
      title: "Items em estoque",
      width: '150px'
    },
    {
      key: "updatedAt",
      dataIndex: "updatedAt",
      title: "Ult. atualização",
      render: (createdAt) => format(new Date(createdAt), `Pp`),
      width: '200px'
    },
  ] as TableColumnProps<IProductCustom>[];
}

export default getColumns;
