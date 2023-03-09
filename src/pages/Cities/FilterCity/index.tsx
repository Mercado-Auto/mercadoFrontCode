import { Button, Col, Drawer, Form, Input, Row, Space } from 'antd';
import React from 'react';
import { useEffectOnlyOnce } from 'src/hooks/use-effect-only-once';
import { FilterCityRequest } from 'src/interfaces/request/admin/city';



export type IFilterCityProps = {
  values?: FilterCityRequest;
  onFilter?: ((values: FilterCityRequest) => void);
}

const FilterCity: React.FC<IFilterCityProps> = ({
  values,
  onFilter,
}) => {
  const [form] = Form.useForm<FilterCityRequest>();

  const cleanFilters = () => {
    form.resetFields();
  };

  const emitfilter = (values: FilterCityRequest) => {
    onFilter && onFilter(values);
  };

  useEffectOnlyOnce(() => {
    values && form.setFieldsValue(values);
  }, []);

  return (
    <Drawer
      title="Filtrar cidades"
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
          <Col span={ 24 }>
            <Form.Item
              name="uf"
              label="UF"
            >
              <Input
                placeholder="Pesquisar por UF"
                maxLength={ 2 }
              />
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

export default FilterCity;
