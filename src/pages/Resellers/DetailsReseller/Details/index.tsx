import { Descriptions, Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import Reseller from 'src/interfaces/reseller';
import { maskToCEP, maskToCNPJ, maskToIM, maskToPhone } from 'src/utils/masks';

import banks from 'bancos-brasileiros/bancos.json';

export type IDetailsProps = {
  data: Reseller;
}

const Details: React.FC<IDetailsProps> = ({
  data,
}) => {
  const [bank, setBank] = useState<any>(null);

  useEffect(() => {
    if (data) {
      const _bank = banks.find((bank) => bank.COMPE === data.bank_code);
      setBank(_bank);
    }
  }, [data]);

  return (
    <div>
      <Typography.Title level={4}>
        Dados empresariais
      </Typography.Title>
      <Descriptions size="small" column={2}>
        <Descriptions.Item label="Razão social">
          {data.corporate_name}
        </Descriptions.Item>
        <Descriptions.Item label="Nome fantasia">
          {data.name}
        </Descriptions.Item>
        <Descriptions.Item label="Inscrição municipal">
          {maskToIM(data.im)}
        </Descriptions.Item>
        <Descriptions.Item label="CNPJ">
          {maskToCNPJ(data.cnpj)}
        </Descriptions.Item>
      </Descriptions>
      <br />
      <Typography.Title level={4}>
        Dados do responsável
      </Typography.Title>
      <Descriptions size="small" column={2}>
        <Descriptions.Item label="Nome">
          {data.responsible_name}
        </Descriptions.Item>
        <Descriptions.Item label="E-mail">
          {data.responsible_email}
        </Descriptions.Item>
        <Descriptions.Item label="Telefone">
          {maskToPhone(data.responsible_phone)}
        </Descriptions.Item>
      </Descriptions>
      <br />
      <Typography.Title level={4}>
        Dados do endereço
      </Typography.Title>
      <Descriptions size="small" column={2}>
        <Descriptions.Item label="CEP">
          {maskToCEP(data.address_cep)}
        </Descriptions.Item>
        <Descriptions.Item label="Rua">
          {data.address_street}
        </Descriptions.Item>
        <Descriptions.Item label="Número">
          {data.address_number}
        </Descriptions.Item>
        <Descriptions.Item label="Bairro">
          {data.address_district}
        </Descriptions.Item>
        <Descriptions.Item label="Cidade">
          {data.address_city?.name ? `${data.address_city?.name} / ${data.address_city?.uf}` : '---'}
        </Descriptions.Item>
        <Descriptions.Item label="Complemento">
          {data.address_complement || '---'}
        </Descriptions.Item>
      </Descriptions>
      <br />
      <Typography.Title level={4}>
        Dados bancários
      </Typography.Title>
      <Descriptions size="small" column={2}>
        <Descriptions.Item label="Banco">
          {bank? <>{bank.LongName} ({bank.COMPE})</> : '---'}
        </Descriptions.Item>
        <Descriptions.Item label="Número da agência">
          {data.bank_agency_number ? `${data.bank_agency_number}${data.bank_agency_dv ? `-${data.bank_agency_dv}` : ''}` : '---'}
        </Descriptions.Item>
        <Descriptions.Item label="Número da conta">
          {data.bank_account_number ? `${data.bank_account_number}${data.bank_account_dv ? `-${data.bank_account_dv}` : ''}` : '---'}
        </Descriptions.Item>
        <Descriptions.Item label="Chave pix">
          {data.bank_pix ? data.bank_pix : '---'}
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
}

export default Details;
