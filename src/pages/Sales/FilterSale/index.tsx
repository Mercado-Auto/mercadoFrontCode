import { Button, Col, Drawer, Form, Input, Row, Select, Space } from "antd";
import React from "react";
import { useEffectOnlyOnce } from "src/hooks/use-effect-only-once";
import { FilterSaleRequest } from "src/interfaces/request/reseller/sale";
import { SaleStatus } from "src/interfaces/sale";

export type IFilterSaleProps = {
  values?: FilterSaleRequest;
  onFilter?: (values: FilterSaleRequest) => void;
};

const FilterSale: React.FC<IFilterSaleProps> = ({ values, onFilter }) => {
  const [form] = Form.useForm<FilterSaleRequest>();

  const cleanFilters = () => {
    form.resetFields();
  };

  const emitfilter = (values: FilterSaleRequest) => {
    onFilter && onFilter(values);
  };

  useEffectOnlyOnce(() => {
    values && form.setFieldsValue(values);
  }, []);

  return (
    <Drawer
      title="Filtrar produtos"
      open={true}
      maskClosable={false}
      onClose={() => onFilter && onFilter(form.getFieldsValue())}
    >
      <Form form={form} onFinish={emitfilter} layout="vertical">
        <Row gutter={15}>
          <Col span={24}>
            <Form.Item name="status" label="Status">
              <Select defaultValue={""}>
                <Select.Option value={""}>Todos</Select.Option>
                <Select.Option value={SaleStatus.WAITING_PAYMENT}>
                  Aguardando Pagamento
                </Select.Option>
                <Select.Option value={SaleStatus.SEPARATING_ORDER}>
                  Separando pedido
                </Select.Option>
                <Select.Option value={SaleStatus.WAITING_PICKUP}>
                  Aguardando coleta
                </Select.Option>
                <Select.Option value={SaleStatus.CANCELED}>
                  Cancelado
                </Select.Option>
                <Select.Option value={SaleStatus.DELIVERY_TRANSIT}>
                  Em trânsito
                </Select.Option>
                <Select.Option value={SaleStatus.DELIVERED}>
                  Entregue
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Space
              direction="horizontal"
              align="center"
              style={{ width: "100%", justifyContent: "flex-end" }}
            >
              <Button onClick={cleanFilters}>Limpar</Button>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => emitfilter(form.getFieldsValue())}
              >
                Filtrar
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default FilterSale;
