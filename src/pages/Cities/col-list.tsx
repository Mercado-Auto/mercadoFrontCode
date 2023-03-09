import { Button, Dropdown, Menu, TableColumnProps, Tooltip } from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import City from "src/interfaces/city";

export type IGetColumns = {
  onDelete?: (record: City) => void;
  onEdit?: (record: City) => void;
}

const getColumns = ({ onDelete, onEdit }: IGetColumns) => {

  return [
    {
      key: "name",
      dataIndex: "name",
      title: "Nome",
    },
    {
      key: "uf",
      dataIndex: "uf",
      title: "UF",
    },
    {
      key: "actions",
      width: '50px',
      render: (record) => (
        <Dropdown
          overlay={
            <Menu
              items={ [
                {
                  key: 'city-edit',
                  label: 'Editar',
                  icon: <EditOutlined />,
                  onClick: () => onEdit && onEdit(record),
                },
                {
                  key: 'city-delete',
                  label: 'Deletar',
                  icon: <DeleteOutlined />,
                  danger: true,
                  onClick: () => onDelete && onDelete(record),
                },
              ] }
            />
          }
          trigger={ ['click'] }
          placement="bottomRight"
          arrow
        >
          <Tooltip title="Mais ações">
            <Button
              type="ghost"
              size="small"
              shape="circle"
            >
              <MoreOutlined />
            </Button>
          </Tooltip>
        </Dropdown>
      )
    },
  ] as TableColumnProps<City>[];
}

export default getColumns;
