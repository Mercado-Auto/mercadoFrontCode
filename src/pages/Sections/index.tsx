import React, { useId, useMemo, useState } from "react";
import {
  Modal,
  Table,
  Button,
  Result,
  Breadcrumb,
  notification,
  TablePaginationConfig,
} from "antd";
import {
  FilterOutlined,
  ReloadOutlined,
  PartitionOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";

import { useDeleteSection, useReadSections } from "src/queries/admin/section";

import { isNil } from "ramda";
import getColumns from "./col-list";
import { Container } from "./styles";
import NewSection from "./NewSection";
import { Link } from "react-router-dom";
import EditSection from "./EditSection";
import { remove } from "src/utils/remove";
import { queryClient } from "src/queries";
import EditPosition from "./EditPosition";
import FilterSection from "./FilterSection";
import Section from "src/interfaces/section";
import { getError } from "src/utils/get-error";
import FilterBadges from "src/components/FilterBadges";
import { clearEmpties } from "src/utils/clear-empties";
import { FilterSectionRequest } from "src/interfaces/request/admin/section";

const Sections: React.FC = () => {
  const $id = useId();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [inserting, setInserting] = useState(false);
  const [filtering, setFiltering] = useState(false);
  const [edit, setEdit] = useState<Section | null>(null);
  const [filters, setFilters] = useState<FilterSectionRequest>({});
  const [editSectionPosition, setEditSectionPosition] = useState<{
    id: string;
    index: number;
  } | null>(null);
  const {
    error,
    refetch,
    isLoading,
    data: response,
  } = useReadSections({
    filters: clearEmpties(filters),
  });
  const { isLoading: isLoadingDeleting, mutateAsync: mudateAsyncDelete } =
    useDeleteSection({
      onSuccess: () => queryClient.invalidateQueries(),
      onError: (error) => notification.error(getError(error)),
    });

  const colList = useMemo(() => {
    return getColumns({
      onDelete: (record) => {
        Modal.confirm({
          title: "Deletar secção",
          content: (
            <span>
              Tem certeza que deseja deletar a secção: <b>{record.name}</b>{" "}
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
      onEditPosition: (index, id) => {
        setEditSectionPosition({ index, id });
      },
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
              <Link to="/sections">Secções</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        }
        avatar={{
          icon: <ApartmentOutlined />,
        }}
        extra={[
          <Button
            key={`${$id}-new`}
            type="primary"
            icon={<PartitionOutlined />}
            onClick={() => setInserting(true)}
          >
            Nova secção
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
        <NewSection
          onClose={(reason) => {
            setInserting(false);
            reason && handlerReload();
          }}
        />
      )}
      {filtering && (
        <FilterSection
          values={filters}
          onFilter={(newFilters) => {
            setFiltering(false);
            setFilters(() => newFilters);
            handlerReload();
          }}
        />
      )}
      {edit && (
        <EditSection
          section={edit}
          onClose={(edited) => {
            edited && queryClient.invalidateQueries();
            setEdit(null);
          }}
        />
      )}

      {editSectionPosition && (
        <EditPosition
          id={editSectionPosition.id}
          index={editSectionPosition.index}
          onClose={(edited) => {
            edited && queryClient.invalidateQueries();
            setEditSectionPosition(null);
          }}
        />
      )}
    </>
  );
};

export default Sections;
