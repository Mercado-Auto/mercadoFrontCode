import { Button, Dropdown, Menu, TableColumnProps, Tooltip } from "antd";
import {
  MoreOutlined,
  ProfileOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Reseller from "src/interfaces/reseller";

export type IGetColumns = {
  onDelete?: (record: Reseller) => void;
  onDetails?: (record: Reseller) => void;
  onDetailsBank?: (record: Reseller) => void;
};

const getColumns = ({ onDelete, onDetails, onDetailsBank }: IGetColumns) => {
  return [
    {
      key: "corporate_name",
      dataIndex: "corporate_name",
      title: "Razão social",
    },
    {
      key: "name",
      dataIndex: "name",
      title: "Nome fantasia",
    },
    {
      key: "cnpj",
      dataIndex: "cnpj",
      title: "CNPJ",
    },
    {
      key: "responsible_name",
      dataIndex: "responsible_name",
      title: "Nome do responsável",
    },
    {
      key: "responsible_phone",
      dataIndex: "responsible_phone",
      title: "Telefone do responsável",
    },
    {
      key: "responsible_email",
      dataIndex: "responsible_email",
      title: "E-mail do responsável",
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
                  key: "reseller-details",
                  label: "Detalhes",
                  icon: <ProfileOutlined />,
                  onClick: () => onDetails && onDetails(record),
                },
                {
                  key: "banker-details",
                  label: "Dados bancário",
                  icon: <ProfileOutlined />,
                  onClick: () => onDetailsBank && onDetailsBank(record),
                },
                {
                  key: "reseller-delete",
                  label: "Deletar",
                  icon: <DeleteOutlined />,
                  danger: true,
                  onClick: () => onDelete && onDelete(record),
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
  ] as TableColumnProps<Reseller>[];
};

export default getColumns;
