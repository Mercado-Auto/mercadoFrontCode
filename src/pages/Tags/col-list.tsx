import { Button, Dropdown, Menu, TableColumnProps, Tooltip } from "antd";
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Tag from "src/interfaces/tag";

export type IGetColumns = {
  onDelete?: (record: Tag) => void;
  onEdit?: (record: Tag) => void;
}

const getColumns = ({ onDelete, onEdit }: IGetColumns) => {

  return [
    {
      key: "name",
      dataIndex: "name",
      title: "Nome",
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
                  key: 'tag-edit',
                  label: 'Editar',
                  icon: <EditOutlined />,
                  onClick: () => onEdit && onEdit(record),
                },
                {
                  key: 'tag-delete',
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
  ] as TableColumnProps<Tag>[];
}

export default getColumns;
