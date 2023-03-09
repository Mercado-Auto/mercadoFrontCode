import { Button, TableColumnProps, Tag } from "antd";
import Transaction, { TransactionOperation } from "src/interfaces/transaction";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export type IGetColumns = {
  onPay?: (record: Transaction) => void;
};

const getColumns = ({ onPay }: IGetColumns) => {
  return [
    {
      key: "id",
      dataIndex: "id",
      title: "Id. da transação",
    },
    {
      key: "reseller.name",
      dataIndex: "reseller.name",
      title: "Revendedor",
      render: (_, row) => (<Link to={`/resellers/${row?.reseller?.id}`}>{row?.reseller?.name}</Link>),
    },
    {
      key: "amount",
      dataIndex: "amount",
      title: "Valor da transação",
      width: 150,
      render: (amount) =>
        `R$ ${new Intl.NumberFormat("br").format(amount)}${Number.isInteger(amount) ? ",00" : ""
        }`,
    },
    {
      key: "processed",
      dataIndex: "processed",
      title: "Processado",
      width: "120px",
      render: (value) => (
        <Tag color={value ? "success" : "error"}>{value ? "Sim" : "Não"}</Tag>
      ),
    },
    {
      key: "createdAt",
      dataIndex: "createdAt",
      title: "Criado em",
      width: 170,
      render: (value) => format(new Date(value), `Pp`),
    },
    {
      key: "updatedAt",
      dataIndex: "updatedAt",
      title: "Atualizado em",
      width: 170,
      render: (value) => format(new Date(value), `Pp`),
    },
    {
      key: 'actions',
      title: '',
      width: 100,
      render: (_, row) => (
        <Button size={'small'} type={'primary'} onClick={() => onPay && onPay(row)}>
          Marcar como processado
        </Button>
      ),
      align: 'right'
    }
  ] as TableColumnProps<Transaction>[];
};

export default getColumns;
