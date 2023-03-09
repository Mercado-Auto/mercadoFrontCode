import { ArrowRightOutlined, SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Form, notification, Steps } from 'antd';
import React, { useEffect, useState } from 'react';
import { UpdateResellerRequest } from 'src/interfaces/request/admin/reseller';
import Reseller from 'src/interfaces/reseller';
import { useEditReseller } from 'src/queries/admin/reseller';
import { getError } from 'src/utils/get-error';
import AccountableStep from './AccountableStep';
import AddressStep from './AddressStep';
import DataStep from './DataStep';
import { Container, Space } from './styles';


export type IEditProps = {
  onEdit?: (newData: Reseller) => void;
  onCancel?: () => void;
  data: Reseller;
};

type FormData = {
} & Omit<UpdateResellerRequest, 'id'>;

const Edit: React.FC<IEditProps> = ({
  data,
  onEdit,
  onCancel,
}) => {
  const [form] = Form.useForm<FormData>();
  const { mutate: mutateReseller, isLoading } = useEditReseller({
    onSuccess: () => onEdit && onEdit({ ...(data as any), ...(dataToSave as any), }),
    onError: (error) => notification.error(getError(error))
  });
  const [stepIndex, setStepIndex] = useState(0);
  const [dataToSave, setDataToSave] = useState<Partial<FormData>>({});

  const onFinish = (values: FormData) => {
    setDataToSave({
      ...dataToSave,
      ...values
    });

    if (stepIndex < 2) {
      setStepIndex(stepIndex + 1)
      return;
    }
    mutateReseller({
      id: data.id,
      ...values,
      ...dataToSave,
    });
  };

  useEffect(() => {
    data && form.setFieldsValue({ ...data, address_city: data.address_city.id });
  }, [data, form]);

  return (
    <Container>
      <Steps current={ stepIndex }>
        <Steps.Step title="Dados" />
        <Steps.Step title="Endereço" />
        <Steps.Step title="Responsável" />
      </Steps>
      <br />
      <Form form={ form } onFinish={ onFinish } layout='vertical'>
        { stepIndex === 0 && (<DataStep form={ form } />) }
        { stepIndex === 1 && (<AddressStep form={ form } />) }
        { stepIndex === 2 && (<AccountableStep form={ form } />) }

        <Space>
          <Button
            disabled={ isLoading }
            onClick={ () => onCancel && onCancel() }
          >
            Cancelar
          </Button>
          { stepIndex > 0 && (
            <Button
              disabled={ isLoading }
              onClick={ () => setStepIndex(stepIndex - 1) }
              type="text"
            >
              <ArrowLeftOutlined />
              Voltar
            </Button>
          ) }
          <Button
            htmlType="submit"
            type="primary"
            loading={ isLoading }
            disabled={ isLoading }
          >
            { stepIndex === 2 ? <SaveOutlined /> : <ArrowRightOutlined /> }
            { stepIndex === 2 ? 'Salvar' : 'Próximo' }
          </Button>
        </Space>
      </Form>
    </Container>
  );
}

export default Edit;
