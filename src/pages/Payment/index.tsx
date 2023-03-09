import React, { useId, useMemo, useState } from "react";
import {
  Breadcrumb,
  Button, List, Modal,
  notification,
  Result,
  Table,
  TablePaginationConfig, Tag,
  Typography,
} from "antd";
import {
  FilterOutlined,
  ReloadOutlined,
  PayCircleOutlined,
  SwapOutlined,
} from "@ant-design/icons";

import getColumns from "./col-list";
import { Container } from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { FilterPaymentRequest } from "src/interfaces/request/admin/payment";
import FilterBadges from "src/components/FilterBadges";
import { remove } from "src/utils/remove";
import { isNil } from "ramda";
import FilterExchange from "./Filter";
import { useReadPayments, useUpdatePaymentStatus } from "../../queries/admin/payment";
import IPayment from "../../interfaces/payment";

const Payment: React.FC = () => {
  const $id = useId();
  const [filters, setFilters] = useState<FilterPaymentRequest>({});
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const {
    mutateAsync: updateStatus
  } = useUpdatePaymentStatus({
    onError: () => notification.error({
      message: "Erro ao atualizar o(s) status do(s) pagamento(s)!",
    }),
  });
  const {
    isLoading,
    data: response,
    error,
    refetch,
  } = useReadPayments({
    filters,
    page,
    pageSize,
    order_by: 'processed',
    sort_by: 'ascend',
  });
  const [filtering, setFiltering] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const colList = useMemo(() => {
    const columns = getColumns({
      onPay: (record) => handlerUpdatePayment([record]),
    });
    if (selectedRowKeys?.length > 0) {
      columns.splice(-1, 1);
    }
    return columns;
  }, [navigate, selectedRowKeys]);

  const handlerReload = async () => {
    await refetch();
  };

  const handlerTableChange = (pag: TablePaginationConfig) => {
    if (pag.current !== page && !isNil(pag.current)) setPage(pag.current);
    if (pag.pageSize !== pageSize && !isNil(pag.pageSize))
      setPageSize(pag.pageSize);

    handlerReload();
  };

  const handlerUpdatePayment = (records: IPayment[]): void => {
    Modal
      .confirm({
        title: 'Alterar status do pagamento?!',
        content: (
          <>
            <Typography.Text>Tem certeza que deseja marcar esse pagamento como <Tag color="green">Processado</Tag>?</Typography.Text>

            <List
              size="small"
              dataSource={records}
              renderItem={item => (
                <List.Item
                  className="li-no-margin"
                  extra={
                    <Typography.Text strong type="success">R$ {new Intl.NumberFormat("br").format(item.amount || 0)}{
                      Number.isInteger(item.amount || 0) ? ",00" : ""
                    }</Typography.Text>
                  }
                >
                  <Typography.Text strong type="secondary">{item?.reseller?.name}</Typography.Text>
                </List.Item>
              )}
            />
          </>
        ),
        okText: 'Sim, Marcar',
        onOk: async () => {
          await updateStatus(records.map((item) => item.id));
        },
      });
  };

  const handlerPaySelected = () => {
    const records = (response?.data || []).filter((record) => selectedRowKeys.includes(record.id));
    if (records.length) {
      handlerUpdatePayment(records);
    }
  };

  if (error) {
    console.error(error);
    notification.error({
      message: "Erro ao carregar registros!",
    });
  }

  return (
    <>
      <Container
        breadcrumb={(
          <Breadcrumb>
            <Breadcrumb.Item>Início</Breadcrumb.Item>
            <Breadcrumb.Item>Administração</Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/payment">Pagamentos</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        )}
        avatar={{
          icon: <PayCircleOutlined />,
        }}
        extra={[
          <Button
            key={`${$id}-filters`}
            type="default"
            icon={<FilterOutlined />}
            onClick={() => setFiltering(true)}
            disabled={selectedRowKeys.length > 0}
          >
            Filtros
          </Button>,
          <Button
            key={`${$id}-reload`}
            type="default"
            icon={<ReloadOutlined />}
            onClick={handlerReload}
            disabled={isLoading || selectedRowKeys.length > 0}
          >
            Recarregar dados
          </Button>,
          selectedRowKeys.length > 0 ? (
            <Button
              key={`${$id}-pay-all-selected`}
              type="primary"
              icon={<SwapOutlined />}
              onClick={handlerPaySelected}
              disabled={isLoading}
            >
              Atualizar status dos selecionados
            </Button>
          ) : null,
        ]}
      >
        {!selectedRowKeys.length ? (
          <FilterBadges
            value={filters}
            reMapsKeys={{
              id: "Id. da transação",
            }}
            onRemove={(key) => {
              setFilters(remove<any>(filters, key));
              handlerReload();
            }}
          />
        ) : null}
        {error ? (
          <Result
            status="500"
            title="Erro ao carregar os registros!"
            subTitle={error.toString()}
            extra={
              <Button type="primary" onClick={handlerReload}>
                Tentar novamente?
              </Button>
            }
          />
        ) : (
          <Table
            rowKey={(row) => row.id}
            columns={colList}
            loading={isLoading}
            dataSource={
              (response?.data ? response?.data || [] : response || []) as any
            }
            onChange={(pag, _, srt) => handlerTableChange(pag)}
            pagination={{
              total: response?.total ?? 0,
              showTotal: (total) => `${total} registro(s)`,
              showSizeChanger: true,
              showQuickJumper: true,
              pageSize: pageSize,
              current: page,
              disabled: selectedRowKeys.length > 0
            }}
            rowSelection={{
              selectedRowKeys,
              onChange: (newSelectedRowKeys: React.Key[]) => setSelectedRowKeys(newSelectedRowKeys),
              getCheckboxProps: (record: IPayment) => record.processed ? { disabled: true, } : {}
            }}
          />
        )}
      </Container>
      {filtering && (
        <FilterExchange
          values={filters}
          onFilter={(newFilters) => {
            setFiltering(false);
            setFilters(() => newFilters);
            handlerReload();
          }}
        />
      )}
    </>
  );
};

export default Payment;
