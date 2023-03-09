import { SaveOutlined } from "@ant-design/icons";
import { Col, Form, InputNumber, Modal, notification, Row, Select } from "antd";
import React from "react";
import { useEditPosition, useReadSections } from "src/queries/admin/section";
import { composeRules } from "src/utils/compose-rules";
import { getError } from "src/utils/get-error";

export type IEditPositionProps = {
  id: string;
  index: number;
  onClose?: (reason?: boolean) => void;
};

type FormData = {
  position: string;
};

const EditPosition: React.FC<IEditPositionProps> = ({ id, index, onClose }) => {
  const {
    refetch,
    data: response,
    isLoading: isLoadingSections,
  } = useReadSections({});
  const [form] = Form.useForm<FormData>();
  const { mutate: mutateSection, isLoading } = useEditPosition({
    onSuccess: () => onClose && onClose(true),
    onError: (error) => notification.error(getError(error)),
  });

  const onFinish = (values: FormData) => {
    mutateSection({
      section_id: id,
      to_section_id: values.position,
    });
  };

  return (
    <Modal
      okText="Salvar"
      closable={false}
      maskClosable={false}
      title="Editar posição"
      open={true && !isLoadingSections}
      okButtonProps={{
        htmlType: "submit",
        disabled: isLoading,
        loading: isLoading,
        icon: <SaveOutlined />,
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
          .catch((info) => {
            console.log("Validate Failed: ", info);
          });
      }}
      onCancel={() => onClose && onClose(false)}
    >
      <Form
        form={form}
        layout="vertical"
        name="control-hooks"
        onFinish={onFinish}
        initialValues={{
          position: [id],
        }}
      >
        <Row gutter={15}>
          <Col span={24}>
            <Form.Item
              required
              name="position"
              label="Trocar posição com"
              rules={composeRules({
                required: true,
              })}
            >
              <Select
                options={response?.data.map((val) => ({
                  value: val.id,
                  label: val.name,
                }))}
              ></Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default EditPosition;
