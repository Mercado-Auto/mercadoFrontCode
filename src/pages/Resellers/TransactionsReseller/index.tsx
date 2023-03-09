import React from "react";
import TransactionsSummary from "./TransactionsSummary";
import { CenteredContent } from "./styles";
import TransactionsList from "./TransactionsList";
import { useReadTransactions } from "../../../queries/reseller/transaction";
import { notification } from "antd";
import Transaction from "src/interfaces/transaction";

const TransactionsReseller: React.FC = () => {
  const [pageSize] = React.useState(500);
  const [page, setPage] = React.useState(1);
  const [currentAmount, setCurrentAmount] = React.useState<number>(0);
  const [nextDateToPay, setNextDateToPay] = React.useState<Date | undefined>(
    undefined
  );
  const [noMoreItems, setNoMoreItems] = React.useState(false);
  const [data, setData] = React.useState<Transaction[]>([]);
  const {
    isLoading: isLoadingResponse,
    data: response,
    refetch: refetchResponse,
    error: errorResponse,
    isError: isErrorResponse,
  } = useReadTransactions({
    pageSize: pageSize,
    page: page,
    order_by: "createdAt",
    sort_by: "descend",
  });

  const loadMore = React.useCallback(() => {
    setPage(() => page + 1);
    if (!noMoreItems) refetchResponse();
  }, [refetchResponse]);

  React.useEffect(() => {
    setNoMoreItems((response?.data?.length || 0) > 0);
    setNextDateToPay(
      response?.amount_next_payment?.createdAt
        ? new Date(response?.amount_next_payment?.createdAt)
        : undefined
    );
    setCurrentAmount(response?.balance || 0);
    setData([...data, ...(response?.data || [])]);
  }, [response?.data?.length]);

  if (errorResponse) {
    notification.error({
      message: "Erro ao carregar registros!",
    });
  }

  return (
    <CenteredContent>
      <TransactionsSummary
        unprocessedTransactions={response?.debit_unpaid || []}
        isLoadingUnprocessedTransactions={isLoadingResponse}
        errorOnLoadUnprocessedTransactions={isErrorResponse}
        balance={currentAmount}
        nextDateToPay={nextDateToPay}
        isLoadingBalance={isLoadingResponse}
        errorOnLoadBalance={isErrorResponse}
      />
      <TransactionsList
        isLoading={isLoadingResponse}
        transactions={data || []}
        onLoadMore={loadMore}
      />
    </CenteredContent>
  );
};

export default TransactionsReseller;
