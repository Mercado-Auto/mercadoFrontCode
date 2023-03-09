import React from "react";
import SaleStatusBadge from "src/components/SaleStatusBadge";
import { Alert, Button, Form, Input, Modal, notification } from "antd";
import {
  SaveOutlined,
  SplitCellsOutlined,
  CarOutlined,
} from "@ant-design/icons";
import { UpdateTrackerCodeSaleRequest } from "src/interfaces/request/reseller/sale";
import Sale, { SaleStatus } from "src/interfaces/sale";
import { useUpdateSaleStatus } from "src/queries/reseller/sale";
import { composeRules } from "src/utils/compose-rules";
import { getError } from "src/utils/get-error";
import { queryClient } from "src/queries";

export type IUpdateStatusProps = {
  data: Sale;
};

export type IFormTracker = {} & Omit<UpdateTrackerCodeSaleRequest, "sale_id">;

const UpdateStatus: React.FC<IUpdateStatusProps> = ({ data }) => {
  const [isAddTrackerCode, setIsAddTrackerCode] = React.useState(false);
  const [trackerCodeForm] = Form.useForm<IFormTracker>();
  const { mutateAsync: updateStatus, isLoading: isLoadingUpdateStatus } =
    useUpdateSaleStatus({
      onSuccess: () => {
        notification.success({
          message: "Status atualizado com sucesso!",
        });
        trackerCodeForm.resetFields();
        setIsAddTrackerCode(false);
        queryClient.invalidateQueries();
      },
      onError: (error) => {
        notification.error(getError(error));
      },
    });

  const collectTrackerCode = () => {
    const pickup = data?.pickup_in_store;
    if (pickup) return void 0;
    setIsAddTrackerCode(true);
  };

  const onFinishTrackerCode = async (values: IFormTracker) => {
    await updateStatus({
      sale_id: data.id,
      tracker_code: values.tracker_code,
    });
  };

  const separetedOrders = () => {
    if (data?.status === SaleStatus.SEPARATING_ORDER) {
      const pickup = data?.pickup_in_store;

      Modal.confirm({
        title: "Atualizar status",
        content: (
          <span>
            Tem certeza que deseja atualizar o status da venda para:{" "}
            <SaleStatusBadge
              status={
                pickup ? SaleStatus.WAITING_PICKUP : SaleStatus.DELIVERY_TRANSIT
              }
              icon={false}
            />
          </span>
        ),
        autoFocusButton: "cancel",
        okText: pickup
          ? "Sim, alterar status"
          : "Sim, incluir cód. de rastreio",
        onOk: async () => {
          if (pickup) {
            return await updateStatus({ sale_id: data.id });
          }
          collectTrackerCode();
        },
      });
    }
  };

  const setOrdersOk = () => {
    if (data?.status === SaleStatus.DELIVERY_TRANSIT) {
      Modal.confirm({
        title: "Atualizar status",
        content: (
          <span>
            Tem certeza que deseja atualizar o status da venda para: &nbsp;
            <SaleStatusBadge status={SaleStatus.DELIVERED} />
          </span>
        ),
        autoFocusButton: "cancel",
        okText: "Pedido entregue",
        onOk: async () => {
          await updateStatus({ sale_id: data.id });
        },
      });
    }
  };

  const statusButton = React.useMemo(() => {
    switch (data?.status) {
      case SaleStatus.SEPARATING_ORDER:
        return (
          <Button
            type="primary"
            icon={<SplitCellsOutlined />}
            onClick={separetedOrders}
          >
            Produtos separados
          </Button>
        );
      case SaleStatus.DELIVERY_TRANSIT:
        return (
          <Button type="primary" onClick={setOrdersOk} icon={<CarOutlined />}>
            Atualizar entrega
          </Button>
        );
      default:
        break;
    }
  }, [data, data.status]);

  return (
    <>
      {statusButton}

      {isAddTrackerCode && (
        <Modal
          open={true}
          title="Adicionar código de rastreio"
          maskClosable={false}
          keyboard={false}
          onCancel={() => setIsAddTrackerCode(false)}
          okText="Incluir cód. de rastreio"
          closable={false}
          okButtonProps={{
            htmlType: "submit",
            disabled: isLoadingUpdateStatus,
            loading: isLoadingUpdateStatus,
            icon: <SaveOutlined />,
          }}
          cancelButtonProps={{
            disabled: isLoadingUpdateStatus,
          }}
          onOk={() => {
            trackerCodeForm
              .validateFields()
              .then(() => {
                trackerCodeForm.submit();
              })
              .catch((info) => {
                console.log("Validate Failed: ", info);
              });
          }}
        >
          <Form
            form={trackerCodeForm}
            layout="vertical"
            onFinish={onFinishTrackerCode}
            initialValues={{
              tracker_code: "",
            }}
          >
            <Form.Item
              name="tracker_code"
              label="Código de rastreio"
              rules={composeRules({
                required: true,
              })}
            >
              <Input placeholder="Digite o código de rastreio aqui..." />
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prev, cur) =>
                prev.tracker_code !== cur.tracker_code
              }
            >
              {(form) => (
                <Alert
                  type="info"
                  message={
                    <>
                      Aviso! Após está ação o status da venda será atualizado
                      para:{" "}
                      <SaleStatusBadge
                        status={SaleStatus.DELIVERY_TRANSIT}
                        icon={false}
                      />
                      . <br /> Também será{" "}
                      <b>enviado um e-mail para o cliente</b> informando o
                      código de rastreio.
                    </>
                  }
                />
              )}
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default UpdateStatus;
