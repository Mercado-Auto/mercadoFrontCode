import { Button, Dropdown, Menu, TableColumnProps, Tooltip } from "antd";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  AlignCenterOutlined,
} from "@ant-design/icons";
import Section from "src/interfaces/section";

export type IGetColumns = {
  onEdit?: (record: Section) => void;
  onDelete?: (record: Section) => void;
  onEditPosition?: (idx: number, id: string) => void;
};

const getColumns = ({ onEdit, onDelete, onEditPosition }: IGetColumns) => {
  return [
    {
      key: "name",
      dataIndex: "name",
      title: "Nome",
    },
    {
      key: "actions",
      width: "50px",
      render: (record, _r, index) => (
        <Dropdown
          overlay={
            <Menu
              items={[
                {
                  key: "section-edit",
                  label: "Editar",
                  icon: <EditOutlined />,
                  onClick: () => onEdit && onEdit(record),
                },
                {
                  label: "Posição",
                  key: "position-edit",
                  icon: <AlignCenterOutlined />,
                  onClick: () =>
                    onEditPosition && onEditPosition(index, record.id),
                },
                {
                  key: "section-delete",
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
  ] as TableColumnProps<Section>[];
};

export default getColumns;
