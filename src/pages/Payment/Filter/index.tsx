import { Button, Col, Drawer, Form, Input, Row, Select, Space } from 'antd';
import React from 'react';
import { useEffectOnlyOnce } from 'src/hooks/use-effect-only-once';
import { FilterTransactionRequest } from 'src/interfaces/request/reseller/transaction';
import { TransactionOperation } from "../../../interfaces/transaction";



export type IFilterExchangeProps = {
  values?: FilterTransactionRequest;
  onFilter?: ((values: FilterTransactionRequest) => void);
}

const FilterExchange: React.FC<IFilterExchangeProps> = ({
  values,
  onFilter,
}) => {
  const [form] = Form.useForm<FilterTransactionRequest>();

  const cleanFilters = () => {
    form.resetFields();
  };

  const emitfilter = (values: FilterTransactionRequest) => {
    onFilter && onFilter(values);
  };

  useEffectOnlyOnce(() => {
    values && form.setFieldsValue(values);
  }, []);

  return (
    <Drawer
      title="Filtrar repasses"
      open={true}
      maskClosable={false}
      onClose={() => onFilter && onFilter(form.getFieldsValue())}
    >
      <Form
        form={form}
        onFinish={emitfilter}
        layout="vertical"
      >
        <Row gutter={15}>
          <Col span={24}>
            <Form.Item
              name="id"
              label="Id. da transação"
            >
              <Input placeholder='xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="processed"
              label="Processado?"
            >
              <Select allowClear placeholder={'Selecione...'}>
                <Select.Option value={true}>
                  Sim
                </Select.Option>
                <Select.Option value={false}>
                  Não
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Space direction='horizontal' align="center" style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={cleanFilters}>
                Limpar
              </Button>
              <Button type="primary" htmlType='submit' onClick={() => emitfilter(form.getFieldsValue())}>
                Filtrar
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}

export default FilterExchange;
