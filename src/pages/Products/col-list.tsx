import { Button, Dropdown, Menu, TableColumnProps, Tag, Tooltip } from "antd";
import { MoreOutlined, ProfileOutlined, DeleteOutlined } from '@ant-design/icons';
import Product from "src/interfaces/product";

export type IGetColumns = {
  onDelete?: (record: Product) => void;
  onDetails?: (record: Product) => void;
}

const getColumns = ({ onDelete, onDetails }: IGetColumns) => {

  return [
    {
      key: "name",
      dataIndex: "name",
      title: "Nome",
    },
    {
      key: "sell_activated",
      dataIndex: "sell_activated",
      title: "Disp. para venda?",
      render: (sell_activated) => (<Tag color={sell_activated ? 'success' : 'error'}>{sell_activated ? 'Sim' : 'Não'}</Tag>),
      width: '150px'
    },
    {
      key: "price",
      dataIndex: "price",
      title: "Preço",
      render: (price) => (<>R$ {new Intl.NumberFormat(`pt-BR`).format(price)}</>),
      width: '100px'
    },
    {
      key: "sections",
      dataIndex: "sections",
      title: "Secções",
      render: (sections: Product['sections']) => ((sections || []).map((item, index) => (<Tag key={`table-sections-${index}-${item.id}`}>{item.name}</Tag>))),
      width: '200px',
    },
    {
      key: "tags",
      dataIndex: "tags",
      title: "Tags",
      render: (tags: Product['tags']) => ((tags || []).map((item, index) => (<Tag key={`table-tags-${index}-${item.id}`}>{item.name}</Tag>))),
      width: '200px',
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
                  key: 'product-details',
                  label: 'Detalhes',
                  icon: <ProfileOutlined />,
                  onClick: () => onDetails && onDetails(record),
                },
                {
                  key: 'product-delete',
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
  ] as TableColumnProps<Product>[];
}

export default getColumns;
