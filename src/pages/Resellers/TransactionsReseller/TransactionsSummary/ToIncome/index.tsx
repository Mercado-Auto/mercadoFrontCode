import { List, Typography, Empty, Spin } from "antd";
import React from "react";
import Transaction from "../../../../../interfaces/transaction";
import { Container, DateText, ListItem, Title, PaymentsInOrder } from "./styles";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { formatMoney } from "src/utils/format";


export type ToIncomeProps = {
  transactions?: Transaction[];
  isLoading?: boolean;
  error?: boolean;
}

const Index: React.FC<ToIncomeProps> = ({
  isLoading,
  transactions,
  error
}) => {

  const Template = React.useMemo(() => {
    if (isLoading) {
      return (
        <div style={{ textAlign: 'center' }}>
          <Spin tip="Carregando pagamentos atrasados" />
        </div>
      );
    }

    if (error) {
      return (
        <div style={{ textAlign: 'center' }}>
          <Typography.Text type="danger">Erro ao buscar os pagamentos em atraso!</Typography.Text>
        </div>
      );
    }

    if (!error && !transactions?.length) {
      return (
        <PaymentsInOrder>
          <Typography.Text type="secondary" strong>Não há pagamentos atrasados!</Typography.Text>
        </PaymentsInOrder>
      );
    }

    return (
      <div>
        <Title>
          Pagamentos em atraso para recebimento:
        </Title>

        <List
          loading={isLoading}
          dataSource={transactions}
          size={'small'}
          renderItem={(item: Transaction) => {
            const date = format(new Date(item.createdAt), 'PP', { locale: ptBR });
            const amount = formatMoney(Number(item.amount))

            return (<ListItem key={item.id}>
              <div>
                <DateText type="secondary">{date}</DateText>
                <Typography.Text type="secondary">A receber</Typography.Text>
              </div>
              <Typography.Text type="danger" strong>{amount}</Typography.Text>
            </ListItem>);
          }}
        />
      </div>
    )
  }, [isLoading, transactions, error]);

  return (
    <Container>
      {Template}
    </Container>
  );
};

export default Index;
