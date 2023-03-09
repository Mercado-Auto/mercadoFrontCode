import { InfoCircleOutlined } from "@ant-design/icons";
import { Col, Form, FormInstance, Row, Select, Typography } from "antd";
import React, { useId } from "react";
import { composeRules } from "src/utils/compose-rules";

import { MaskedInput } from "antd-mask-input";
import banks from "bancos-brasileiros/bancos.json";
import PixField from "src/components/PixField";

export type BankAccountProps = {
  form: FormInstance<any>;
};

const BankAccount: React.FC<BankAccountProps> = ({ form }) => {
  const $id = useId();

  const SelectDigitVef = ({ field }: { field: string }) => {
    return (
      <Form.Item initialValue={"0"} noStyle name={field}>
        <Select style={{ width: 65 }}>
          {new Array(10).fill(Number).map((_, index) => (
            <Select.Option key={`${$id}-dv-${index}`} value={`${index}`}>
              -{index}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    );
  };

  return (
    <Row gutter={15}>
      <Col md={12} sm={24}>
        <Row gutter={15}>
          <Col md={24} sm={24}>
            <Form.Item
              name="bank_code"
              label="Banco"
              required
              rules={composeRules({
                required: true,
              })}
            >
              <Select
                placeholder="Selecione o banco"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  `${option?.label || option?.children?.join("") || ""}`
                    .toLowerCase()
                    ?.includes(input.toLowerCase())
                }
              >
                {banks.map((bank, index) => (
                  <Select.Option
                    key={`${$id}-bank-${index}`}
                    value={bank.COMPE}
                  >
                    {bank.LongName} ({bank.COMPE})
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col md={12} sm={24}>
            <Form.Item
              name="bank_agency_number"
              label="Agência"
              rules={[
                ...composeRules({
                  required: true,
                  bankAgency: true,
                  min: 4,
                  max: 4,
                }),
              ]}
            >
              <MaskedInput
                mask="0000"
                maskOptions={{ placeholderChar: "X" }}
                addonAfter={<SelectDigitVef field="bank_agency_dv" />}
              />
            </Form.Item>
          </Col>
          <Col md={12} sm={24}>
            <Form.Item
              name="bank_account_number"
              label="Conta"
              rules={[
                ...composeRules({
                  required: true,
                  bankAccount: true,
                  min: 7,
                  max: 7,
                }),
              ]}
            >
              <MaskedInput
                mask="0000000"
                maskOptions={{ placeholderChar: "X" }}
                addonAfter={<SelectDigitVef field="bank_account_dv" />}
              />
            </Form.Item>
          </Col>
          <Col md={24} sm={24}>
            <PixField />
          </Col>
        </Row>
      </Col>

      <Col md={12} sm={24}>
        <Typography.Paragraph type="secondary">
          <Typography.Text style={{ color: "#355894", marginRight: 5 }}>
            <InfoCircleOutlined />
          </Typography.Text>
          Algumas <b>agências bancárias</b> possuem um dígito verificador após o
          número da agência (Ex.: 0000<b>-0</b>). Caso sua agência não o possua,
          selecione a opção "<b>-0</b>" no campo "<b>Agência</b>".
        </Typography.Paragraph>
        <Typography.Paragraph type="secondary">
          <Typography.Text style={{ color: "#355894", marginRight: 5 }}>
            <InfoCircleOutlined />
          </Typography.Text>
          Algumas <b>contas bancárias</b> possuem um dígito verificador após o
          número da conta (Ex.: 0000000<b>-0</b>). Caso sua agência não o
          possua, selecione a opção "<b>-0</b>" no campo "<b>Conta</b>".
        </Typography.Paragraph>
      </Col>
    </Row>
  );
};

export default BankAccount;
