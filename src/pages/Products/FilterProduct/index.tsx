import { Button, Col, Drawer, Form, Input, Row, Space } from 'antd';
import React from 'react';
import { useEffectOnlyOnce } from 'src/hooks/use-effect-only-once';
import { FilterProductRequest } from 'src/interfaces/request/reseller/product';



export type IFilterProductProps = {
  values?: FilterProductRequest;
  onFilter?: ((values: FilterProductRequest) => void);
}

const FilterProduct: React.FC<IFilterProductProps> = ({
  values,
  onFilter,
}) => {
  const [form] = Form.useForm<FilterProductRequest>();

  const cleanFilters = () => {
    form.resetFields();
  };

  const emitfilter = (values: FilterProductRequest) => {
    onFilter && onFilter(values);
  };

  useEffectOnlyOnce(() => {
    values && form.setFieldsValue(values);
  }, []);

  return (
    <Drawer
      title="Filtrar produtos"
      open={ true }
      maskClosable={ false }
      onClose={ () => onFilter && onFilter(form.getFieldsValue()) }
    >
      <Form
        form={ form }
        onFinish={ emitfilter }
        layout="vertical"
      >
        <Row gutter={ 15 }>
          <Col span={ 24 }>
            <Form.Item
              name="name"
              label="Nome"
            >
              <Input placeholder='Pesquisar por nome' />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={ 24 }>
            <Space direction='horizontal' align="center" style={ { width: '100%', justifyContent: 'flex-end' } }>
              <Button onClick={ cleanFilters }>
                Limpar
              </Button>
              <Button type="primary" htmlType='submit' onClick={ () => emitfilter(form.getFieldsValue()) }>
                Filtrar
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}

export default FilterProduct;
