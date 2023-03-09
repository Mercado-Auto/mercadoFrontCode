import React, { useId, useMemo, useState } from "react";
import {
  Breadcrumb,
  Button,
  notification,
  Result,
  Table,
  TablePaginationConfig,
} from "antd";
import {
  ShoppingCartOutlined,
  FilterOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import { useReadSales } from "src/queries/reseller/sale";

import getColumns from "./col-list";
import { Container } from "./styles";
import { Link, useNavigate } from "react-router-dom";
import FilterSale from "./FilterSale";
import { FilterSaleRequest } from "src/interfaces/request/reseller/sale";
import FilterBadges from "src/components/FilterBadges";
import { remove } from "src/utils/remove";
import { isNil } from "ramda";
import { clearEmpties } from "src/utils/clear-empties";

const Sales: React.FC = () => {
  const $id = useId();
  const navigate = useNavigate();
  const [filtering, setFiltering] = useState(false);
  const [filters, setFilters] = useState<FilterSaleRequest>({});
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const {
    isLoading,
    data: response,
    error,
    refetch,
  } = useReadSales({
    page: page,
    pageSize: pageSize,
    sort_by: "descend",
    order_by: "createdAt",
    filters: clearEmpties(filters),
  });

  const colList = useMemo(() => {
    return getColumns({
      onDetails: (record) => navigate(record.id),
    });
  }, [navigate]);

  const handlerReload = async () => {
    await refetch();
  };

  const handlerTableChange = (pag: TablePaginationConfig) => {
    if (pag.current !== page && !isNil(pag.current)) setPage(pag.current);
    if (pag.pageSize !== pageSize && !isNil(pag.pageSize))
      setPageSize(pag.pageSize);

    handlerReload();
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
        breadcrumb={
          <Breadcrumb>
            <Breadcrumb.Item>Início</Breadcrumb.Item>
            <Breadcrumb.Item>Administração</Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/sales">Vendas</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        }
        avatar={{
          icon: <ShoppingCartOutlined />,
        }}
        extra={[
          <Button
            key={`${$id}-filters`}
            type="default"
            icon={<FilterOutlined />}
            onClick={() => setFiltering(true)}
          >
            Filtros
          </Button>,
          <Button
            key={`${$id}-reload`}
            type="default"
            icon={<ReloadOutlined />}
            onClick={handlerReload}
            disabled={isLoading}
          >
            Recarregar dados
          </Button>,
        ]}
      >
        <FilterBadges
          value={filters}
          onRemove={(key) => {
            setFilters(remove<any>(filters, key));
            handlerReload();
          }}
        />
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
            }}
          />
        )}
      </Container>
      {filtering && (
        <FilterSale
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

export default Sales;
