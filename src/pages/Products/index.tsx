import React, { useCallback, useEffect, useId, useMemo, useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Empty,
  Modal,
  notification,
  Result,
  Row,
  Table,
  TablePaginationConfig,
  Tag,
  Typography,
} from "antd";
import {
  ShoppingOutlined,
  FilterOutlined,
  ReloadOutlined,
  DeleteOutlined,
  ProfileOutlined,
  TableOutlined,
  BorderOutlined,
} from "@ant-design/icons";

import {
  useDeleteProduct,
  useReadProducts,
} from "src/queries/reseller/product";

import getColumns from "./col-list";
import { Container } from "./styles";
import { Link, useNavigate } from "react-router-dom";
import NewProduct from "./NewProduct";
import FilterProduct from "./FilterProduct";
import { FilterProductRequest } from "src/interfaces/request/reseller/product";
import FilterBadges from "src/components/FilterBadges";
import { remove } from "src/utils/remove";
import { isNil } from "ramda";
import { getError } from "src/utils/get-error";
import { queryClient } from "src/queries";
import Product from "src/interfaces/product";
import { Storage } from "src/utils/storage";
import { clearEmpties } from "src/utils/clear-empties";

const DEFAULT_COVER = "https://via.placeholder.com/250";

const Products: React.FC = () => {
  const $id = useId();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filtering, setFiltering] = useState(false);
  const [inserting, setInserting] = useState(false);
  const [filters, setFilters] = useState<FilterProductRequest>({});
  const {
    error,
    refetch,
    isLoading,
    data: response,
  } = useReadProducts({
    filters: clearEmpties(filters),
  });
  const [viewTable, setViewTable] = useState<boolean>(
    Storage.getItem(`$$-products-page-view-table`) === true
  );
  const { mutateAsync: deleteProduct } = useDeleteProduct({
    onSuccess: () => queryClient.invalidateQueries(),
    onError: (error) => notification.error(getError(error)),
  });

  const openConfirmDelete = useCallback(
    (record: Product) => {
      Modal.confirm({
        title: `Deletar o produto?!`,
        content: (
          <span>
            Tem certeza que deseja deletar o produto <b>{record?.name}</b> ?!
            Está ação não poderá ser defeita!
          </span>
        ),

        autoFocusButton: `cancel`,
        okText: `Deletar`,
        okButtonProps: {
          danger: true,
          type: `primary`,
          icon: <DeleteOutlined />,
        },
        onOk: async () => {
          return await deleteProduct({ id: record!.id });
        },
        maskClosable: false,
        closable: false,
        keyboard: false,
      });
    },
    [deleteProduct]
  );

  const colList = useMemo(() => {
    return getColumns({
      onDelete: (record) => openConfirmDelete(record),
      onDetails: (record) => navigate(record.id),
    });
  }, [openConfirmDelete, navigate]);

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

  useEffect(() => {
    Storage.setItem(`$$-products-page-view-table`, viewTable);
  }, [viewTable]);

  return (
    <>
      <Container
        breadcrumb={
          <Breadcrumb>
            <Breadcrumb.Item>Início</Breadcrumb.Item>
            <Breadcrumb.Item>Administração</Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/products">Produtos</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        }
        avatar={{
          icon: <ShoppingOutlined />,
        }}
        extra={[
          <Button
            key={`${$id}-new`}
            type="primary"
            icon={<ShoppingOutlined />}
            onClick={() => setInserting(true)}
          >
            Novo produto
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
          <Button
            key={`${$id}-toggle-view`}
            type="default"
            icon={viewTable ? <BorderOutlined /> : <TableOutlined />}
            onClick={() => setViewTable(!viewTable)}
            disabled={isLoading}
          >
            {viewTable ? "Ver em cartões" : "Ver em tabela"}
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
        ) : !viewTable ? (
          <>
            <br />
            {!response?.data?.length && <Empty />}
            <Row gutter={15}>
              {(response?.data ?? []).map((item, index) => {
                return (
                  <Col md={6} sm={10} lg={4} key={`${$id}-${index}-card-item`}>
                    <Card
                      style={{ width: `100%` }}
                      cover={
                        <img
                          alt="example"
                          src={item.photos[0] || DEFAULT_COVER}
                          style={{ maxWidth: "100%" }}
                          onError={(event) =>
                            (event.currentTarget.src = DEFAULT_COVER)
                          }
                        />
                      }
                      actions={[
                        <ProfileOutlined
                          key="edit"
                          onClick={() => navigate(`${item.id}`)}
                        />,
                        <DeleteOutlined
                          key="delete"
                          onClick={() => openConfirmDelete(item)}
                          style={{ color: "red" }}
                        />,
                      ]}
                    >
                      <Card.Meta
                        title={
                          <Typography.Text
                            style={{ maxWidth: "100%", wordBreak: "break-all" }}
                            title={item.name}
                          >
                            {item.name}
                          </Typography.Text>
                        }
                      />

                      <p style={{ marginBottom: 5 }}>
                        Preço: R${" "}
                        {new Intl.NumberFormat(`pt-BR`).format(item.price)}
                      </p>
                      <p style={{ marginBottom: 5 }}>
                        Disponivel para venda:{" "}
                        <Tag color={item.sell_activated ? "success" : "error"}>
                          {item.sell_activated ? "Sim" : "Não"}
                        </Tag>
                      </p>
                      <p style={{ marginBottom: 5 }}>
                        Tags:{" "}
                        {(item.tags || []).map((item, index) => (
                          <Tag key={`${$id}-tag-${index}`}>{item.name}</Tag>
                        ))}
                      </p>
                      <p style={{ marginBottom: 5 }}>
                        Secções:{" "}
                        {(item.sections || []).map((item, index) => (
                          <Tag key={`${$id}-section-${index}`}>{item.name}</Tag>
                        ))}
                      </p>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </>
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
        <NewProduct
          onClose={(reason) => {
            setInserting(false);
            reason && handlerReload();
          }}
        />
      )}
      {filtering && (
        <FilterProduct
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

export default Products;
