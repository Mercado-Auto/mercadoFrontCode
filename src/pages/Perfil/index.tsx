import React, { useEffect } from "react";
import {
  ArrowLeftOutlined,
  UserOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Typography,
  Avatar,
  Upload,
  UploadProps,
  message,
  Form,
  Input,
  notification,
} from "antd";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Header,
  ContainerAvatar,
  ContainerForms,
  Space,
} from "./styles";
import { useAuth } from "src/contexts/Auth";
import { getError } from "src/utils/get-error";
import { useUpdateUser } from "src/queries/auth";
import { clearEmpties } from "src/utils/clear-empties";
import { queryClient } from "src/queries";
import { UserType } from "src/interfaces/user";

const Perfil: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { token, email, name } = useAuth();
  const { mutate: mutateUser } = useUpdateUser({
    onSuccess: () => queryClient.invalidateQueries(),
    onError: (error) => notification.error(getError(error)),
  });

  // const onChangeFile: UploadProps["onChange"] = (info): void => {
  //   if (info.file.status !== "uploading") {
  //     console.log(info.file, info.fileList);
  //   }
  //   if (info.file.status === "done") {
  //     message.success(`Foto de perfil atualizada com sucesso!`);
  //   } else if (info.file.status === "error") {
  //     message.error(`Erro ao tentar trocar a foto do perfil!`);
  //   }
  // };

  const onFinishForm = async (values: any) => {
    mutateUser({
      ...clearEmpties(values),
    });
  };

  return (
    <Container>
      <Header>
        <div>
          <Button
            type="link"
            size="small"
            style={{
              marginLeft: 5,
              marginTop: 10,
              marginBottom: 2,
            }}
            onClick={() => navigate(-1)}
          >
            <ArrowLeftOutlined />
            Voltar
          </Button>
          <Typography.Title
            style={{ marginLeft: 15, marginRight: 15 }}
            level={3}
          >
            Editar perfil
          </Typography.Title>
        </div>
      </Header>

      <ContainerAvatar>
        <Avatar
          size={{ xs: 64, sm: 128, md: 128, lg: 128, xl: 128, xxl: 128 }}
          icon={<UserOutlined />}
        />
        <br />
        <span
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            message.info("Desabilitado para debug! Em breve!");
          }}
        >
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            headers={{
              authorization: `Bearer ${token}`,
            }}
          ></Upload>
        </span>
      </ContainerAvatar>
      <ContainerForms>
        <Form
          form={form}
          onFinish={onFinishForm}
          layout="vertical"
          initialValues={{
            name,
            email,
          }}
        >
          <Form.Item
            name="name"
            label="Nome"
            rules={[{ required: true }]}
            required
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[{ required: true }, { type: "email" }]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="link">Trocar senha</Button>
              <Button type="primary" htmlType="submit">
                Atualizar dados
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </ContainerForms>
    </Container>
  );
};

export default Perfil;
