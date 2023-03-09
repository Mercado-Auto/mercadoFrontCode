import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Col, Form, Input, InputNumber, notification, Row } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { composeRules } from 'src/utils/compose-rules';
import { useEditProduct } from 'src/queries/reseller/product';
import { UpdateProductRequest } from 'src/interfaces/request/reseller/product';
import { getError } from 'src/utils/get-error';
import DebounceSelect from 'src/components/DebounceSelect';
import { useReadTagsCombobox } from 'src/queries/public/tag';
import { useReadSectionsCombobox } from 'src/queries/public/section';
import { Container, Space } from './styles';
import Product from 'src/interfaces/product';


export type IEditProductProps = {
  onEdit?: (newData: Product) => void;
  onCancel?: () => void;
  data: Product;
};

type FormData = {
} & Omit<UpdateProductRequest, 'id'>;

const EditProduct: React.FC<IEditProductProps> = ({
  data,
  onEdit,
  onCancel,
}) => {
  const { mutateAsync: loadTagsOptions } = useReadTagsCombobox();
  const { mutateAsync: loadSectionsOptions } = useReadSectionsCombobox();

  const [form] = Form.useForm<FormData>();
  const { mutate: mutateProduct, isLoading } = useEditProduct({
    onSuccess: () => onEdit && onEdit({ ...(data as any), ...(dataToSave as any), }),
    onError: (error) => notification.error(getError(error))
  });
  const [dataToSave, setDataToSave] = useState<Partial<FormData>>({});

  const onFinish = (values: FormData) => {
    setDataToSave({
      ...dataToSave,
      ...values
    });
    mutateProduct({
      id: data.id,
      ...values,
      price: Number(values.price),
    });
  };

  useEffect(() => {
    data && form.setFieldsValue({
      ...data,
      tags: data.tags.map((tag) => tag.id),
      sections: data.sections.map((tag) => tag.id),
    });
  }, [data, form]);

  return (
    <Container>
      <Form layout="vertical" form={ form } name="control-hooks" onFinish={ onFinish }>
        <Row gutter={ 15 }>
          <Col span={ 24 }>
            <Form.Item
              name="name"
              label="Nome"
              required
              rules={ composeRules({
                required: true,
                min: 3,
                max: 128,
              }) }
            >
              <Input
                placeholder="Digite o nome"
              />
            </Form.Item>
            <Form.Item
              name="price"
              label="Preço"
              required
              rules={ composeRules({
                required: true,
              }) }
            >
              <InputNumber
                style={ { display: 'block', width: '100%' } }
                formatter={ value => `R$ ${ value }`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') }
                parser={ value => value?.replace(/R\$\s?|(,*)/g, '') as any }
              />
            </Form.Item>
            <Form.Item
              name="sections"
              label="Secção"
              required
              rules={ composeRules({
                required: true,
              }) }
            >
              <DebounceSelect
                mode="multiple"
                placeholder="Selecione as secções"
                showSearch
                fetchOptions={ (term) => loadSectionsOptions({ filters: { name: term } }) }
                labelProp="name"
                valueProp="id"
                shouldLoadOnInit
              />
            </Form.Item>
            <Form.Item
              name="tags"
              label="Tags"
              required
              rules={ composeRules({
                required: true,
              }) }
            >
              <DebounceSelect
                mode="multiple"
                placeholder="Selecione as tags"
                showSearch
                fetchOptions={ (term) => loadTagsOptions({ filters: { name: term } }) }
                labelProp="name"
                valueProp="id"
                shouldLoadOnInit
              />
            </Form.Item>
            <Form.Item
              name="description"
              label="Descrição"
              required
              rules={ composeRules({
                required: true,
              }) }
            >
              <Input.TextArea
                placeholder="Forneça uma pequena descrição do produto..."
                rows={4}
              />
            </Form.Item>
            <Form.Item name="sell_activated" valuePropName="checked" initialValue={ false }>
              <Checkbox>Disponível para venda?</Checkbox>
            </Form.Item>
          </Col>
        </Row>

        <Space>
          <Button
            disabled={ isLoading }
            onClick={ () => onCancel && onCancel() }
          >
            Cancelar
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            loading={ isLoading }
            disabled={ isLoading }
          >
            <SaveOutlined />
            Salvar
          </Button>
        </Space>
      </Form>
    </Container>
  );
}

export default EditProduct;
