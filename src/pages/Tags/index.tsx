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
  TagsOutlined,
  TagOutlined,
  FilterOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import { useDeleteTag, useReadTags } from "src/queries/admin/tag";

import getColumns from "./col-list";
import { Container } from "./styles";
import { Link } from "react-router-dom";
import NewTag from "./NewTag";
import FilterTag from "./FilterTag";
import { FilterTagRequest } from "src/interfaces/request/admin/tag";
import FilterBadges from "src/components/FilterBadges";
import { remove } from "src/utils/remove";
import { isNil } from "ramda";
import { getError } from "src/utils/get-error";
import { queryClient } from "src/queries";
import EditTag from "./EditTag";
import Tag from "src/interfaces/tag";
import { clearEmpties } from "src/utils/clear-empties";

const Tags: React.FC = () => {
  const $id = useId();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [inserting, setInserting] = useState(false);
  const [filtering, setFiltering] = useState(false);
  const [edit, setEdit] = useState<Tag | null>(null);
  const [filters, setFilters] = useState<FilterTagRequest>({});
  const {
    error,
    refetch,
    isLoading,
    data: response,
  } = useReadTags({
    filters: clearEmpties(filters),
  });
  const { isLoading: isLoadingDeleting, mutateAsync: mudateAsyncDelete } =
    useDeleteTag({
      onSuccess: () => queryClient.invalidateQueries(),
      onError: (error) => notification.error(getError(error)),
    });

  const colList = useMemo(() => {
    return getColumns({
      onDelete: (record) => {
        Modal.confirm({
          title: "Deletar tag",
          content: (
            <span>
              Tem certeza que deseja deletar a tag: <b>{record.name}</b>{" "}
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
              <Link to="/tags">Tags</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        }
        avatar={{
          icon: <TagsOutlined />,
        }}
        extra={[
          <Button
            key={`${$id}-new`}
            type="primary"
            icon={<TagOutlined />}
            onClick={() => setInserting(true)}
          >
            Nova tag
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
        <NewTag
          onClose={(reason) => {
            setInserting(false);
            reason && handlerReload();
          }}
        />
      )}
      {filtering && (
        <FilterTag
          values={filters}
          onFilter={(newFilters) => {
            setFiltering(false);
            setFilters(() => newFilters);
            handlerReload();
          }}
        />
      )}
      {edit && (
        <EditTag
          tag={edit}
          onClose={(edited) => {
            edited && queryClient.invalidateQueries();
            setEdit(null);
          }}
        />
      )}
    </>
  );
};

export default Tags;
