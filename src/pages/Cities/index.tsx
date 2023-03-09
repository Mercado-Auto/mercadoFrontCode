import React, { useId, useMemo, useState } from "react";
import {
  Breadcrumb,
  Button,
  Modal,
  notification,
  Result,
  Table,
  TablePaginationConfig,
} from "antd";
import {
  PushpinOutlined,
  PushpinFilled,
  FilterOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import { useDeleteCity, useReadCities } from "src/queries/admin/city";

import getColumns from "./col-list";
import { Container } from "./styles";
import { Link } from "react-router-dom";
import NewCity from "./NewCity";
import FilterCity from "./FilterCity";
import { FilterCityRequest } from "src/interfaces/request/admin/city";
import FilterBadges from "src/components/FilterBadges";
import { remove } from "src/utils/remove";
import { isNil } from "ramda";
import { getError } from "src/utils/get-error";
import { queryClient } from "src/queries";
import EditCity from "./EditCity";
import City from "src/interfaces/city";
import { clearEmpties } from "src/utils/clear-empties";

const Cities: React.FC = () => {
  const $id = useId();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [inserting, setInserting] = useState(false);
  const [filtering, setFiltering] = useState(false);
  const [edit, setEdit] = useState<City | null>(null);
  const [filters, setFilters] = useState<FilterCityRequest>({});
  const {
    isLoading,
    data: response,
    error,
    refetch,
  } = useReadCities({
    filters: clearEmpties(filters),
  });
  const { isLoading: isLoadingDeleting, mutateAsync: mudateAsyncDelete } =
    useDeleteCity({
      onSuccess: () => queryClient.invalidateQueries(),
      onError: (error) => notification.error(getError(error)),
    });

  const colList = useMemo(() => {
    return getColumns({
      onDelete: (record) => {
        Modal.confirm({
          title: "Deletar cidade",
          content: (
            <span>
              Tem certeza que deseja deletar a cidade: <b>{record.name}</b>{" "}
            </span>
          ),
          okText: "Deletar",
          autoFocusButton: "cancel",
          okButtonProps: {
            danger: true,
            disabled: isLoadingDeleting,
          },
          cancelButtonProps: {
            disabled: isLoadingDeleting,
          },
          onOk: async () => await mudateAsyncDelete({ id: record.id }),
          maskClosable: false,
          closable: false,
          keyboard: false,
        });
      },
      onEdit: (record) => setEdit(record),
    });
  }, [isLoadingDeleting, mudateAsyncDelete]);

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
              <Link to="/cities">Cidades</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        }
        avatar={{
          icon: <PushpinOutlined />,
        }}
        extra={[
          <Button
            key={`${$id}-new`}
            type="primary"
            icon={<PushpinFilled />}
            onClick={() => setInserting(true)}
          >
            Nova cidade
          </Button>,
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
      {inserting && (
        <NewCity
          onClose={(reason) => {
            setInserting(false);
            reason && handlerReload();
          }}
        />
      )}
      {filtering && (
        <FilterCity
          values={filters}
          onFilter={(newFilters) => {
            setFiltering(false);
            setFilters(() => newFilters);
            handlerReload();
          }}
        />
      )}
      {edit && (
        <EditCity
          city={edit}
          onClose={(edited) => {
            edited && queryClient.invalidateQueries();
            setEdit(null);
          }}
        />
      )}
    </>
  );
};

export default Cities;
