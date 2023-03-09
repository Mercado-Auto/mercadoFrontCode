import {
  FilterOutlined,
  ReloadOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  notification,
  Result,
  Table,
  TablePaginationConfig,
} from "antd";
import React, { useId, useMemo, useState } from "react";

import { useReadResellers } from "src/queries/admin/reseller";

import { isNil } from "ramda";
import { Link, useNavigate } from "react-router-dom";
import FilterBadges from "src/components/FilterBadges";
import { FilterResellerRequest } from "src/interfaces/request/admin/reseller";
import { queryClient } from "src/queries";
import { remove } from "src/utils/remove";
import getColumns from "./col-list";
import FilterReseller from "./FilterReseller";
import { Container } from "./styles";
import Reseller from "src/interfaces/reseller";
import DeleteReseller from "./DeleteReseller";
import DetailBankReseller from "./DetailBankReseller";

const Resellers: React.FC = () => {
  const $id = useId();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filtering, setFiltering] = useState(false);
  const [filters, setFilters] = useState<FilterResellerRequest>({});
  const [detailBank, setDetailBank] = useState<Reseller | null>(null);
  const { isLoading, data: response, error, refetch } = useReadResellers();
  const [deleteReseller, setDeleteReseller] = useState<Reseller | null>(null);

  const colList = useMemo(() => {
    return getColumns({
      onDetails: (record) => navigate(record.id),
      onDelete: (record) => setDeleteReseller(record),
      onDetailsBank: (record) => setDetailBank(record),
    });
  }, [setDeleteReseller, navigate]);

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
              <Link to="/resellers">Revendedores</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        }
        avatar={{
          icon: <ShoppingCartOutlined />,
        }}
        extra={[
          <Button
            type="default"
            key={`${$id}-filters`}
            icon={<FilterOutlined />}
            onClick={() => setFiltering(true)}
          >
            Filtros
          </Button>,
          <Button
            type="default"
            disabled={isLoading}
            key={`${$id}-reload`}
            onClick={handlerReload}
            icon={<ReloadOutlined />}
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
          reMapsKeys={{
            name: "Nome fantasia",
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
            dataSource={response?.data ?? []}
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
        <FilterReseller
          values={filters}
          onFilter={(newFilters) => {
            setFiltering(false);
            setFilters(() => newFilters);
            handlerReload();
          }}
        />
      )}
      {detailBank && (
        <DetailBankReseller
          reseller={detailBank}
          onCancel={() => setDetailBank(null)}
        />
      )}
      {deleteReseller && (
        <DeleteReseller
          resellerId={deleteReseller!.id}
          resellerCnpj={deleteReseller!.cnpj}
          onCancel={() => setDeleteReseller(null)}
          onDelete={() => {
            queryClient.invalidateQueries();
            setDeleteReseller(null);
          }}
        />
      )}
    </>
  );
};

export default Resellers;
