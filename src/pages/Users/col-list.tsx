import { Button, Dropdown, Menu, TableColumnProps, Tooltip } from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import User from "src/interfaces/user";
import { UserType } from "./styles";

export type IGetColumns = {
  onDelete?: (record: User) => void;
  onEdit?: (record: User) => void;
};

const getColumns = ({ onDelete, onEdit }: IGetColumns) => {
  const userType: any = {
    user: "operador",
    admin: "administrador",
    sysadmin: "administrador de sistema",
    reseller: "administrador da revenda",
  };

  return [
    {
      key: "name",
      dataIndex: "name",
      title: "Nome",
    },
    {
      key: "email",
      dataIndex: "email",
      title: "E-Mail",
    },
    {
      width: 210,
      title: "Tipo",
      key: "access_type",
      render: (record) => <UserType>{userType[record.access_type]}</UserType>,
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
                  key: "user-edit",
                  label: "Editar",
                  icon: <EditOutlined />,
                  onClick: () => onEdit && onEdit(record),
                },
                {
                  key: "user-delete",
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
  ] as TableColumnProps<User>[];
};

export default getColumns;
