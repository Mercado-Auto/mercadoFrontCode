import React from "react";
import Transaction, {
  TransactionOperation,
} from "../../../../interfaces/transaction";
import {
  Container,
  DateText,
  MoneyText,
  Timeline,
  TimelineItem,
} from "./styles";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Spin, Typography, Empty } from "antd";
import { BaseType } from "antd/es/typography/Base";
import { formatMoney } from "src/utils/format";

export type TransactionsListProps = {
  transactions?: Transaction[];
  isLoading?: boolean;
  isError?: boolean;

  onLoadMore?: () => void;
};

const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
  isLoading,
  isError,
  onLoadMore,
}) => {
  const id$ = React.useId();
  const scrollContainer = React.useRef<HTMLDivElement>();

  const Items = React.useMemo(
    () =>
      transactions?.map((item) => {
        const _date = format(new Date(item.createdAt), "PP", { locale: ptBR });
        const name =
          item.operation === TransactionOperation.DEBIT
            ? item.processed
              ? "Pagamento processado"
              : "Pagamento não processado"
            : (item as any).name || (item as any).description || item.id;

        const type: BaseType | undefined =
          item.operation === TransactionOperation.DEBIT
            ? item.processed
              ? "success"
              : "danger"
            : undefined;

        const color =
          item.operation === TransactionOperation.DEBIT
            ? item.processed
              ? "green"
              : "red"
            : "gray";

        return (
          <TimelineItem key={`${id$}-transaction-${item.id}`} color={color}>
            <span>
              <DateText>{_date}</DateText>
              <Typography.Text type={type}>{name}</Typography.Text>
            </span>
            <MoneyText>
              {item.operation === TransactionOperation.DEBIT ? "+" : ""} {formatMoney(Number(item.amount))}
            </MoneyText>
          </TimelineItem>
        );
      }),
    [transactions?.length]
  );

  const Template = React.useMemo(() => {
    if (isLoading && !transactions?.length) {
      return (
        <div style={{ textAlign: "center", padding: 100 }}>
          <Spin tip="Carregando transações" />
        </div>
      );
    }

    if (isError) {
      return (
        <div style={{ textAlign: "center", padding: 100 }}>
          <Typography.Text>Erro ao carregar transações!</Typography.Text>
        </div>
      );
    }

    if (!transactions?.length) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Não há transações!"
        />
      );
    }

    return (
      <Timeline pending={isLoading ? "Carregando..." : null}>
        {Items}
      </Timeline>
    );
  }, [isLoading, isError, transactions]);

  const onScroll = () => {
    if (scrollContainer.current && onLoadMore) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer.current;
      if (scrollTop + clientHeight >= scrollHeight * 0.6) {
        onLoadMore();
      }
    }
  };

  return <Container ref={() => scrollContainer} onScroll={onScroll}>{Template}</Container>;
};

export default TransactionsList;
