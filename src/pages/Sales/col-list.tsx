import { Button, Dropdown, Menu, TableColumnProps, Tooltip } from "antd";
import { MoreOutlined, ProfileOutlined } from "@ant-design/icons";
import Sale from "src/interfaces/sale";
import SaleStatusBadge from "src/components/SaleStatusBadge";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export type IGetColumns = {
  onDetails?: (record: Sale) => void;
};

const getColumns = ({ onDetails }: IGetColumns) => {
  return [
    {
      key: "customer.name",
      dataIndex: "customer.name",
      title: "Cliente",
      render: (_, record) => record.customer.name,
    },
    {
      key: "createdAt",
      dataIndex: "createdAt",
      title: "Data da venda",
      render: (createdAt) =>
        format(new Date(createdAt), "dd/MM/yyyy, p", {
          locale: ptBR,
        }),

      width: "200px",
    },
    {
      key: "amount",
      dataIndex: "amount",
      title: "Valor da venda",
      render: (amount) =>
        `R$ ${new Intl.NumberFormat("br").format(amount)}${
          Number.isInteger(amount) ? ",00" : ""
        }`,
      width: "200px",
    },
    {
      key: "status",
      dataIndex: "status",
      title: "Status",
      render: (status) => <SaleStatusBadge status={status} />,
      width: "200px",
    },
    {
      key: "actions",
      width: "50px",
      render: (record) => (
        <Dropdown
          overlay={
            <Menu
              items={[
                {
                  key: "sale-details",
                  label: "Detalhes",
                  icon: <ProfileOutlined />,
                  onClick: () => onDetails && onDetails(record),
                },
              ]}
            />
          }
          trigger={["click"]}
          placement="bottomRight"
          arrow
        >
          <Tooltip title="Mais ações">
            <Button type="ghost" size="small" shape="circle">
              <MoreOutlined />
            </Button>
          </Tooltip>
        </Dropdown>
      ),
    },
  ] as TableColumnProps<Sale>[];
};

export default getColumns;
