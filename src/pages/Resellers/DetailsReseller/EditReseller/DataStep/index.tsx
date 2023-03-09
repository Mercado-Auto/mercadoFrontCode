import React from 'react';
import { Col, Form, FormInstance, Input, Row } from 'antd';
import { composeRules } from 'src/utils/compose-rules';
import { MaskedInput } from 'antd-mask-input';

export type DataStepProps = {
  form: FormInstance<any>;
}

const DataStep: React.FC<DataStepProps> = ({
  form,
}) => {
  return (
    <Row gutter={ 15 }>
      <Col md={ 12 } sm={ 24 }>
        <Form.Item
          name="cnpj"
          label="CNPJ"
          required
          rules={ composeRules({
            required: true,
            cnpj: true,
          }) }
        >
          <MaskedInput
            mask="00.000.000/0000-00"
          />
        </Form.Item>
      </Col>
      <Col md={ 12 } sm={ 24 }>
        <Form.Item
          name="name"
          label="Razão social"
          required
          rules={ composeRules('basic') }
        >
          <Input placeholder='Ex.: Céu azul LTDA' />
        </Form.Item>
      </Col>
      <Col md={ 12 } sm={ 24 }>
        <Form.Item
          name="corporate_name"
          label="Nome fantasisa"
          required
          rules={ composeRules('basic') }
        >
          <Input placeholder='Ex.: Céu azul' />
        </Form.Item>
      </Col>
      <Col md={ 12 } sm={ 24 }>
        <Form.Item
          name="im"
          label="Inscrição municipal"
          required
          rules={ composeRules({
            required: true,
            im: true,
          }) }
        >
          <MaskedInput
            mask="00000-0"
          />
        </Form.Item>
      </Col>
    </Row>
  );
}

export default DataStep;
