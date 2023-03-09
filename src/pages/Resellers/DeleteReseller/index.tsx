import { WarningOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Form, message, Modal, notification, Typography } from 'antd';
import React from 'react';
import { composeRules } from 'src/utils/compose-rules';
import { maskToCNPJ } from 'src/utils/masks';
import { MaskedInput } from 'antd-mask-input';
import { removeMasksChars } from 'src/utils/remove-masks-chars';
import { ConfirmMessage, Header, Space } from './styles';
import { useDeleteReseller } from 'src/queries/admin/reseller';
import { getError } from 'src/utils/get-error';

export type IDeleteResellerProps = {
  resellerId: string;
  resellerCnpj: string;

  onDelete?: (resellerId: string) => void;
  onCancel?: () => void;
};

const DeleteReseller: React.FC<IDeleteResellerProps> = ({
  resellerId,
  resellerCnpj,

  onDelete,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const { isLoading, mutate: deleteReseller } = useDeleteReseller({
    onSuccess: () => onDelete && onDelete(resellerId),
    onError: (err) => notification.error(getError(err)),
  });

  const finishForm = (value: { ct: string }): void => {
    if (removeMasksChars(value.ct) === removeMasksChars(resellerCnpj)) {
      deleteReseller({ id: resellerId, });
    } else {
      message.error("O texto de confirmação não conincide com o original!");
    }
  };

  return (
    <Modal
      open={ true }
      footer={ null }
      title={ null }
      bodyStyle={ { paddingBottom: 15 } }

      onCancel={ () => onCancel && onCancel() }
    >
      <Header>
        <Typography.Title level={ 1 } type="danger">
          <WarningOutlined />
        </Typography.Title>
        <Typography.Title level={ 3 } type="danger">
          Deletar revendedor?!
        </Typography.Title>
      </Header>

      <ConfirmMessage>
        Está e uma confirmação de segurança, após realizar esta ação, os dados não poderam ser restaurados. Para confirmar digite o texto: <br /> <b>{ maskToCNPJ(resellerCnpj) }</b>
      </ConfirmMessage>

      <Form form={ form } onFinish={ finishForm } layout="vertical">
        <Form.Item
          name="ct"
          label="Texto de confirmação"
          required
          rules={ composeRules({
            required: true,
            cnpj: true,
          }) }
        >
          <MaskedInput
            mask="00.000.000/0000-00"
            disabled={ isLoading }
          />
        </Form.Item>

        <Form.Item noStyle shouldUpdate={ (prev, next) => prev.ct !== next.ct }>
          { () => (
            <Space>
              <Button
                onClick={ () => onCancel && onCancel() }
                disabled={ isLoading }
              >
                Cancelar
              </Button>
              <Button
                danger
                htmlType='submit'
                type='primary'
                disabled={ isLoading && (removeMasksChars(form.getFieldValue('ct')) !== removeMasksChars(resellerCnpj)) }
                loading={ isLoading }
              >
                <DeleteOutlined />
                Deletar
              </Button>
            </Space>
          ) }
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default DeleteReseller;
