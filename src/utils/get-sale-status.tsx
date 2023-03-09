import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import React from "react";

const STATUS: Record<string, string> = {
  finished: "Venda concluída",
  error: "Erro ao concluir venda",
  delivered: "Entregue",
  delivery_transit: "Em trânsito para entrega",
  separating_order: "Separando pedido",
  waiting_pickup: "Aguardando retirada na loja",
  waiting_payment: "Aguardando pagamento",
  unknown: "Desconhecido",
};
const COLOR: Record<string, string> = {
  finished: "success",
  error: "error",
  delivered: "success",
  delivery_transit: "processing",
  separating_order: "processing",
  waiting_pickup: "processing",
  waiting_payment: "processing",
  unknown: "default",
};
const ICONS: Record<string, React.ReactNode | null> = {
  finished: <CheckCircleOutlined />,
  error: <CloseCircleOutlined />,
  delivered: <ExclamationCircleOutlined />,
  delivery_transit: <SyncOutlined spin />,
  separating_order: <SyncOutlined spin />,
  waiting_pickup: <SyncOutlined spin />,
  waiting_payment: <SyncOutlined spin />,
  unknown: null,
};

export const getSaleStatusLabel = (status?: string): string => {
  return (status ? STATUS[status] : "") || (STATUS.unknown as string);
};

export const getSaleStatusColor = (status?: string): string => {
  return (status ? COLOR[status] : "") || (COLOR.unknown as string);
};

export const getSaleStatusIcon = (status?: string): React.ReactNode | null => {
  return (
    (status ? ICONS[status] : "") || (ICONS.unknown as React.ReactNode | null)
  );
};

export const getSaleStatus = (status?: string) => ({
  label: getSaleStatusLabel(status),
  color: getSaleStatusColor(status),
  icon: getSaleStatusIcon(status),
});
