import React from 'react';
import { Checkbox, Col, Form, Input, InputNumber, Modal, notification, Row } from 'antd';
import { composeRules } from 'src/utils/compose-rules';
import { SaveOutlined } from '@ant-design/icons';
import { useCreateProduct } from 'src/queries/reseller/product';
import { CreateProductRequest } from 'src/interfaces/request/reseller/product';
import { getError } from 'src/utils/get-error';
import DebounceSelect from 'src/components/DebounceSelect';
import { useReadTagsCombobox } from 'src/queries/public/tag';
import { useReadSectionsCombobox } from 'src/queries/public/section';


export type INewProductProps = {
  onClose?: (reason?: boolean) => void;
};

type FormData = {
} & CreateProductRequest;

const NewProduct: React.FC<INewProductProps> = ({
  onClose,
}) => {
  const { mutateAsync: loadTagsOptions } = useReadTagsCombobox();
  const { mutateAsync: loadSectionsOptions } = useReadSectionsCombobox();

  const [form] = Form.useForm<FormData>();
  const { mutate: mutateProduct, isLoading } = useCreateProduct({
    onSuccess: () => onClose && onClose(true),
    onError: (error) => notification.error(getError(error))
  });

  const onFinish = (values: FormData) => {
    mutateProduct(values);
  };

  return (
    <Modal
      open={ true }
      title="Adicionar produto"
      maskClosable={ false }

      closable={ false }

      okText="Adicionar"
      okButtonProps={ {
        htmlType: 'submit',
        disabled: isLoading,
        loading: isLoading,
        icon: <SaveOutlined />
      } }
      cancelButtonProps={ {
        disabled: isLoading,
      } }
      onOk={ () => {
        form
          .validateFields()
          .then(() => {
            form.submit();
          })
          .catch(info => {
            console.log('Validate Failed: ', info);
          });
      } }

      onCancel={ () => onClose && onClose(false) }
    >
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
      </Form>
    </Modal>
  );
}

export default NewProduct;
