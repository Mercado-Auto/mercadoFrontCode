import React from 'react';
import { Container, PrimarySummaryContent, SecondarySummaryContent } from "./styles";
import { Typography, Skeleton } from "antd";
import Transaction from "../../../../interfaces/transaction";
import ToIncome from "./ToIncome";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { formatMoney } from 'src/utils/format';


export type TransactionsSummaryProps = {
  unprocessedTransactions?: Transaction[];
  isLoadingUnprocessedTransactions?: boolean;
  errorOnLoadUnprocessedTransactions?: boolean;

  balance?: number;
  nextDateToPay?: Date;
  isLoadingBalance?: boolean;
  errorOnLoadBalance?: boolean;

};

const TransactionsSummary: React.FC<TransactionsSummaryProps> = ({
  unprocessedTransactions,
  isLoadingUnprocessedTransactions,
  errorOnLoadUnprocessedTransactions,

  balance,
  nextDateToPay,
  isLoadingBalance,
  errorOnLoadBalance,
}) => {

  const BalanceTemplate = React.useMemo(() => {
    if (isLoadingBalance) {
      return (
        <>
          <Skeleton.Input active={true} /> <br />
          <Skeleton.Input style={{ marginTop: 10 }} block active={true} size={'small'} />
        </>
      );
    }

    if (errorOnLoadBalance) {
      return (
        <Typography.Text type={'danger'} strong>
          Error ao buscar o saldo!
        </Typography.Text>
      );
    }

    return (
      <>
        <Typography.Title level={3} style={{ margin: 0, padding: 0 }}>
          {formatMoney(Number(balance))}
        </Typography.Title>

        <Typography.Text>
          Próxima data para pagamento: {" "}
          {nextDateToPay ? (<Typography.Text strong>
            {format(nextDateToPay as never, 'P', { locale: ptBR })}
          </Typography.Text>) : '---'}
        </Typography.Text>
      </>
    );
  }, [isLoadingBalance, errorOnLoadBalance, balance, nextDateToPay])

  return (
    <Container>
      <PrimarySummaryContent>
        <Typography.Title level={3} style={{ margin: 0, padding: 0 }}>
          Saldo
        </Typography.Title>

        {BalanceTemplate}
      </PrimarySummaryContent>
      <SecondarySummaryContent>
        <ToIncome
          transactions={(unprocessedTransactions || [])}
          isLoading={isLoadingUnprocessedTransactions}
          error={errorOnLoadUnprocessedTransactions}
        />
      </SecondarySummaryContent>
    </Container>
  );
};

export default TransactionsSummary;
