import { MinusOutlined } from '@ant-design/icons';
import { Alert, Col, Form, InputNumber, Modal, notification, Row } from 'antd';
import React from 'react';
import Product from 'src/interfaces/product';
import { RemoveItemsProductFromStockRequest } from 'src/interfaces/request/reseller/product';
import { useRemoveProductFromStock } from 'src/queries/reseller/product';
import { composeRules } from 'src/utils/compose-rules';
import { getError } from 'src/utils/get-error';

export type IRemoveItemsFromStockProps = {
  data: Product;
  onRemoved: (quantity: number) => void;
  onCancel: () => void;
}

type FormData = {
} & Omit<RemoveItemsProductFromStockRequest, 'product_id'>;

const RemoveItemsFromStock: React.FC<IRemoveItemsFromStockProps> = ({
  data,
  onRemoved,
  onCancel
}) => {
  const [form] = Form.useForm<FormData>();
  const { mutate: mutateProduct, isLoading } = useRemoveProductFromStock({
    onSuccess: () => onRemoved && onRemoved(form.getFieldValue('quantity')),
    onError: (error) => notification.error(getError(error))
  });

  const onFinish = (values: FormData) => {
    mutateProduct({
      product_id: data.id,
      quantity: Number(values.quantity),
    });
  };

  return (
    <Modal
      open={true}
      title="Baixa no estoque"
      maskClosable={false}

      closable={false}

      okText="Remover"
      okButtonProps={{
        htmlType: 'submit',
        disabled: isLoading,
        loading: isLoading,
        icon: <MinusOutlined />,
        danger: true,
      }}
      cancelButtonProps={{
        disabled: isLoading,
      }}
      onOk={() => {
        form
          .validateFields()
          .then(() => {
            form.submit();
          })
          .catch(info => {
            console.log('Validate Failed: ', info);
          });
      }}

      onCancel={() => onCancel && onCancel()}
    >
      <Form layout="vertical" form={form} name="control-hooks" onFinish={onFinish}>
        <Row gutter={15}>
          <Col span={24}>
            <Form.Item
              name="quantity"
              label="Quantidade de items"
              required
              rules={composeRules([
                { required: true, },
                { type: 'number', },
                { type: 'number', min: 1, },
                { type: 'number', max: data.stock_quantity }
              ])}
            >
              <InputNumber
                className="i-num-block"
                placeholder="Digite a quantidade de items que quer remover ao estoque"
                min={1}
                max={data.stock_quantity}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <br />
            <Form.Item
              noStyle
              shouldUpdate={(prev, cur) => prev.quantity !== cur.quantity}
            >
              {(form) => (<Alert
                type="info"
                message={
                  (<>Diferença dos items no estoque com os que serão removidos: <br /><b>{(data.stock_quantity || 0) - (isNaN(form.getFieldValue('quantity')) ? 0 : form.getFieldValue('quantity'))} unidades</b></>)
                }
              />)}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export default RemoveItemsFromStock;
