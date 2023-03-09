import { Button, Col, Drawer, Form, Input, Row, Space } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import React from 'react';
import { useEffectOnlyOnce } from 'src/hooks/use-effect-only-once';
import { FilterResellerRequest } from 'src/interfaces/request/admin/reseller';



export type IFilterResellerProps = {
  values?: FilterResellerRequest;
  onFilter?: ((values: FilterResellerRequest) => void);
}

const FilterReseller: React.FC<IFilterResellerProps> = ({
  values,
  onFilter,
}) => {
  const [form] = Form.useForm<FilterResellerRequest>();

  const cleanFilters = () => {
    form.resetFields();
  };

  const emitfilter = (values: FilterResellerRequest) => {
    onFilter && onFilter(values);
  };

  useEffectOnlyOnce(() => {
    values && form.setFieldsValue(values);
  }, []);

  return (
    <Drawer
      title="Filtrar revendedores"
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
              name="corporate_name"
              label="Razão social"
            >
              <Input placeholder='Pesquisar por razão social' />
            </Form.Item>
          </Col>
          <Col span={ 24 }>
            <Form.Item
              name="name"
              label="Nome fantasia"
            >
              <Input placeholder='Pesquisar por nome fantasia' />
            </Form.Item>
          </Col>
          <Col span={ 24 }>
            <Form.Item
              name="cnpj"
              label="CNPJ"
            >
              <MaskedInput
                mask="00.000.000/0000-00"
              />
            </Form.Item>
          </Col>
          <Col span={ 24 }>
            <Form.Item
              name="responsible_name"
              label="Nome do responsável"
            >
              <Input placeholder='Pesquisar por nome do responsável' />
            </Form.Item>
          </Col>
          <Col span={ 24 }>
            <Form.Item
              name="responsible_phone"
              label="Telefone do responsável"
            >
              <MaskedInput
                mask="(00) 0000-0000"
              />
            </Form.Item>
          </Col>
          <Col span={ 24 }>
            <Form.Item
              name="responsible_email"
              label="E-mail do responsável"
            >
              <Input placeholder='Pesquisar por e-mail do responsável' />
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

export default FilterReseller;
