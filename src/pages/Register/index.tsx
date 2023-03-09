import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Controls, Player } from "@lottiefiles/react-lottie-player";
import { Button, Form, notification, Space, Steps, Typography } from "antd";
import React, { useState, useId } from "react";
import { RegisterRequest } from "src/api/auth";
import { HTTPError } from "src/api/get-http-error";
import { useAuth } from "src/contexts/Auth";
import AccountableStep from "./AccountableStep";
import AddressStep from "./AddressStep";
import DataStep from "./DataStep";
import PasswordStep from "./PasswordStep";

import registerJSON from "src/jit-assets/animations/register.json";

import {
  Container,
  ContainerButtons,
  ContainerCreated,
  ContainerLogo,
  ContainerLottie,
  Logo,
  GoBackLink,
  HeaderContainer,
  HeaderWrapper,
} from "./styles";
import { interactRemoveMasks } from "src/utils/remove-masks-chars";
import BankAccount from "./BankAccount";

type FormData = RegisterRequest & {
  responsible_password_confirm: string;
  phone_number_ddd: string;
  phone_number_ddd_pix: string;
};

const Register: React.FC = () => {
  const $id = useId();
  const [form] = Form.useForm<FormData>();
  const [created, setCreated] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [dataToSave, setDataToSave] = useState<Partial<FormData>>({});
  const [steps] = useState([
    {
      label: "Dados",
      element: <DataStep form={form} />,
    },
    {
      label: "Endereço",
      element: <AddressStep form={form} />,
    },
    {
      label: "Responsável",
      element: <AccountableStep form={form} />,
    },
    {
      label: "Dados bancários",
      element: <BankAccount form={form} />,
    },
    {
      label: "Senha",
      element: <PasswordStep form={form} />,
    },
  ]);

  const { register } = useAuth();

  const onFinish = async (data: FormData) => {
    setDataToSave({
      ...dataToSave,
      ...data,
    });
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: dataToSave.name,
        corporate_name: dataToSave.corporate_name,
        cnpj: dataToSave.cnpj,
        im: dataToSave.im,
        address_cep: dataToSave.address_cep,
        address_street: dataToSave.address_street,
        address_city: dataToSave.address_city,
        address_number: `${dataToSave.address_number}`,
        address_district: dataToSave.address_district,
        address_complement: dataToSave.address_complement,
        responsible_name: dataToSave.responsible_name,
        responsible_email: dataToSave.responsible_email,
        responsible_phone: `${dataToSave.phone_number_ddd}${dataToSave.responsible_phone}`,
        responsible_password: dataToSave.responsible_password,
        bank_code: dataToSave.bank_code,
        bank_agency_number: dataToSave.bank_agency_number,
        bank_agency_dv: dataToSave.bank_agency_dv,
        bank_account_number: dataToSave.bank_account_number,
        bank_account_dv: dataToSave.bank_account_dv,
        bank_type_pix: dataToSave.bank_type_pix,
        bank_pix:
          dataToSave.bank_type_pix === "phone"
            ? `${dataToSave.phone_number_ddd_pix}${dataToSave.bank_pix}`
            : dataToSave.bank_pix,
      };
      const removedPayload = interactRemoveMasks(payload, [
        "cnpj",
        "address_cep",
        "im",
        "responsible_phone",
        "bank_pix",
      ]) as Required<FormData>;
      await register(removedPayload);
      setCreated(true);
    } catch (err) {
      setCreated(false);
      notification.error(err as HTTPError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <HeaderContainer>
        <HeaderWrapper>
          <div>
            <GoBackLink to="/auth/login" disabled={isLoading}>
              <ArrowLeftOutlined />
              Voltar para o login
            </GoBackLink>
            <Typography.Title
              style={{ marginLeft: 15, marginRight: 15, marginBottom: 0 }}
              level={3}
            >
              Cadastrar-se
            </Typography.Title>
            <Typography.Text
              type="secondary"
              style={{ marginLeft: 15, marginRight: 15 }}
            >
              Preencha as informações sobre a empresa
            </Typography.Text>
          </div>

          <ContainerLogo>
            <Logo />
          </ContainerLogo>
        </HeaderWrapper>
      </HeaderContainer>

      {!created && (
        <>
          <Steps current={stepIndex}>
            {steps.map((step, index) => (
              <Steps.Step key={`${$id}-step-${index}`} title={step.label} />
            ))}
          </Steps>
          <br />
          <Form form={form} onFinish={onFinish} layout="vertical">
            {steps[stepIndex]?.element}

            <Form.Item noStyle>
              <ContainerButtons>
                <Space>
                  {stepIndex > 0 && (
                    <Button
                      type="text"
                      className="register-form-button"
                      size="large"
                      disabled={isLoading}
                      onClick={() => setStepIndex(stepIndex - 1)}
                    >
                      <ArrowLeftOutlined />
                      Voltar
                    </Button>
                  )}

                  <Button
                    type="primary"
                    htmlType="submit"
                    className="register-form-button"
                    size="large"
                    loading={isLoading}
                  >
                    {stepIndex === steps.length - 1 ? "Cadastrar" : "Próximo"}
                    {stepIndex === steps.length - 1 ? (
                      <SaveOutlined />
                    ) : (
                      <ArrowRightOutlined />
                    )}
                  </Button>
                </Space>
              </ContainerButtons>
            </Form.Item>
          </Form>
        </>
      )}

      {created && (
        <ContainerCreated>
          <ContainerLottie>
            <Player autoplay loop src={registerJSON}>
              <Controls visible={false} />
            </Player>
          </ContainerLottie>
          <div>
            <Typography.Title level={3}>
              Cadastro concluído com sucesso!
            </Typography.Title>
            <Typography.Text>
              Enviaremos um e-mail de confirmação para sua caixa de entrada!
              Fique de olho nela!
            </Typography.Text>
          </div>
        </ContainerCreated>
      )}
    </Container>
  );
};

export default Register;
