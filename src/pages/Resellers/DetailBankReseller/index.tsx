import {
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import React, { useId } from "react";
import Reseller from "src/interfaces/reseller";
import { DDD_LIST } from "src/utils/ddd-list";
import banks from "bancos-brasileiros/bancos.json";
import { formatString } from "src/utils/format";

interface Props {
  reseller: Reseller;
  onCancel?: () => void;
}

const DetailBankReseller: React.FC<Props> = ({ reseller, onCancel }) => {
  const $id = useId();
  const [form] = Form.useForm<FormData>();
  const bank = banks.find((bank) => bank.COMPE === reseller.bank_code);

  const SelectDigitVef = ({ field }: { field: string }) => {
    return (
      <Form.Item noStyle name={field}>
        <Select disabled style={{ width: 65 }}></Select>
      </Form.Item>
    );
  };

  const phoneDDDSelect = (
    <Form.Item noStyle shouldUpdate={() => true}>
      {(form) => (
        <Form.Item noStyle name={"phone_number_ddd_pix"}>
          <Select
            options={DDD_LIST}
            defaultValue={form.getFieldValue("phone_number_ddd_pix") || "88"}
            className="select-ddd"
          />
        </Form.Item>
      )}
    </Form.Item>
  );

  return (
    <Modal
      open={true}
      footer={null}
      title={null}
      bodyStyle={{ paddingBottom: 15 }}
      onCancel={() => onCancel && onCancel()}
    >
      <Typography.Title level={4}>Dados bancário</Typography.Title>
      <Row gutter={15}>
        <Col span={24}>
          <Row gutter={15}>
            <Col md={24} sm={24}>
              <Typography.Title level={5}>Banco</Typography.Title>
              <Typography.Text>
                {bank ? bank.LongName : "--"} ({bank ? bank!.COMPE : "--"})
              </Typography.Text>
            </Col>
            <Divider />
            <Col span={24}>
              <Row>
                <Col span={12}>
                  <Typography.Title level={5}>
                    Número da agência
                  </Typography.Title>
                  <Typography.Text>
                    {reseller.bank_agency_number}
                  </Typography.Text>
                </Col>
                <Col span={12}>
                  <Typography.Title level={5}>
                    Dígito verificador da agência
                  </Typography.Title>
                  <Typography.Text>{reseller.bank_agency_dv}</Typography.Text>
                </Col>
              </Row>
            </Col>
            <Divider />
            <Col span={24}>
              <Row>
                <Col span={12}>
                  <Typography.Title level={5}>Número da conta</Typography.Title>
                  <Typography.Text>
                    {reseller.bank_account_number}
                  </Typography.Text>
                </Col>
                <Col span={12}>
                  <Typography.Title level={5}>
                    Dígito verificador da conta
                  </Typography.Title>
                  <Typography.Text>{reseller.bank_account_dv}</Typography.Text>
                </Col>
              </Row>
            </Col>
            <Divider />

            <Col span={24}>
              <Row>
                <Col span={12}>
                  <Typography.Title level={5}>Tipo da chave</Typography.Title>
                  <Typography.Text>{reseller.bank_type_pix}</Typography.Text>
                </Col>
                <Col span={12}>
                  <Typography.Title level={5}>PIX</Typography.Title>
                  <Typography.Text>
                    {formatString(
                      reseller.bank_type_pix as any,
                      reseller.bank_pix
                    )}
                  </Typography.Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};

export default DetailBankReseller;
