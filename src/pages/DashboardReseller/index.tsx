import React from "react";
import {
  Card,
  Col,
  DatePicker,
  notification,
  PageHeader,
  Row,
  Spin,
  Statistic,
  Tooltip,
  Typography,
} from "antd";

import ChartReport from "src/components/ChartReport";
import ChartFunnel from "src/components/ChartFunnel";
import { Item, GraphicBar } from "./styles";
import { useReadDashboardReseller } from "src/queries/reseller/dashboard";
import {
  lastDayOfMonth,
  startOfMonth,
  startOfDay,
  endOfDay,
  getTime,
} from "date-fns";
import moment from "moment";
import type { Moment } from "moment";
import { formatMoney } from "src/utils/format";
import Highcharts from "highcharts";

type RangeValue = [Moment | null, Moment | null] | null;

export const DashboardReseller: React.FC = () => {
  const _now = new Date();
  const $id = React.useId();
  const time = new Highcharts.Time();
  const [filters, setFilters] = React.useState([
    startOfMonth(_now),
    lastDayOfMonth(_now),
  ]);

  const {
    data: response,
    isLoading,
    error,
  } = useReadDashboardReseller({
    filters: {
      initial_date: filters[0],
      end_date: filters[1],
    },
  });

  if (error) {
    console.error(error);
    notification.error({
      message: "Erro ao carregar dados do dashboard!",
    });
  }

  const handleFilterChange = (values: RangeValue) => {
    if (values) {
      setFilters([
        startOfDay(moment(values[0]).toDate()),
        endOfDay(moment(values[1]).toDate()),
      ]);
    }
  };

  const TemplateTopFiveSales = React.useMemo(() => {
    if (!response?.top_most_sold?.length) {
      return (
        <div style={{ padding: 30, textAlign: "center" }}>
          <Typography.Text type="secondary" strong>
            Sem dados!
          </Typography.Text>
        </div>
      );
    }
    const sorted = response?.top_most_sold?.sort(
      (a, b) => b.sale_qty - a.sale_qty
    );
    return sorted?.map((el, idx) => {
      return (
        <Item
          key={`${$id}-best-sale-${idx}`}
          title={`${el.sale_qty} quantidades`}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <Typography.Text>{el.name}</Typography.Text>
            </div>
            <div>
              <Typography.Text type="secondary" strong>
                {el.sale_qty}x
              </Typography.Text>
            </div>
          </div>
          <GraphicBar valueItem={el.sale_qty} valueBase={sorted?.[0]?.sale_qty}>
            <div></div>
          </GraphicBar>
        </Item>
      );
    });
  }, [response?.top_most_sold?.length]);

  const TemplateTopFiveLessSales = React.useMemo(() => {
    if (!response?.top_less_sold?.length) {
      return (
        <div style={{ padding: 30, textAlign: "center" }}>
          <Typography.Text type="secondary" strong>
            Sem dados!
          </Typography.Text>
        </div>
      );
    }
    const sorted = response?.top_less_sold?.sort(
      (a, b) => b.sale_qty - a.sale_qty
    );
    return sorted?.map((el, idx) => {
      return (
        <Item
          key={`${$id}-worst-sale-${idx}`}
          title={`${el.sale_qty} quantidades`}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <Typography.Text>{el.name}</Typography.Text>
            </div>
            <div>
              <Typography.Text type="secondary" strong>
                {el.sale_qty}x
              </Typography.Text>
            </div>
          </div>
          <GraphicBar valueItem={el.sale_qty} valueBase={sorted?.[0]?.sale_qty}>
            <div></div>
          </GraphicBar>
        </Item>
      );
    });
  }, [response?.top_less_sold?.length]);

  const FilterDate = (
    <DatePicker.RangePicker
      value={[moment(filters[0]), moment(filters[1])] as RangeValue}
      onChange={(values) => handleFilterChange(values)}
      allowClear={false}
      disabled={isLoading}
    />
  );

  return (
    <PageHeader title={"Dashboard"} extra={FilterDate}>
      <Row gutter={[15, 15]}>
        <Col md={4} sm={12}>
          <Card>
            <Statistic
              style={{ minHeight: 80 }}
              title="Faturamento Bruto"
              valueRender={() => (
                <Tooltip placement="bottom" title={"Valor total de vendas"}>
                  {formatMoney(Number(response?.gross_profit || 0))}
                </Tooltip>
              )}
              loading={isLoading}
              valueStyle={{
                fontSize: 34,
                fontWeight: "bold",
              }}
            />
          </Card>
        </Col>
        <Col md={4} sm={12}>
          <Card>
            <Statistic
              style={{ minHeight: 80 }}
              title="Faturamento Líquido"
              valueRender={() => (
                <Tooltip
                  placement="bottom"
                  title={"Faturamento Bruto menos as taxas da plataforma"}
                >
                  {formatMoney(Number(response?.net_profit || 0))}
                </Tooltip>
              )}
              loading={isLoading}
              valueStyle={{
                fontSize: 34,
                fontWeight: "bold",
              }}
            />
          </Card>
        </Col>
        <Col md={4} sm={12}>
          <Card>
            <Statistic
              title="Pagamentos pendentes"
              value={response?.pending_payments || 0}
              style={{ minHeight: 80 }}
              loading={isLoading}
              valueStyle={{
                fontSize: 34,
                fontWeight: "bold",
              }}
            />
          </Card>
        </Col>
        <Col md={4} sm={12}>
          <Card>
            <Statistic
              title="Pagamentos recebidos"
              value={response?.processed_payments || 0}
              style={{ minHeight: 80 }}
              loading={isLoading}
              valueStyle={{
                fontSize: 34,
                fontWeight: "bold",
              }}
            />
          </Card>
        </Col>
        <Col md={4} sm={24}>
          <Card>
            <Statistic
              title="Valor total de recebido"
              valueRender={() => (
                <Tooltip
                  placement="bottom"
                  title={"Valor total recebido da plataforma"}
                >
                  {formatMoney(Number(response?.transferred_total_amount || 0))}
                </Tooltip>
              )}
              style={{ minHeight: 80 }}
              loading={isLoading}
              valueStyle={{
                fontSize: 34,
                fontWeight: "bold",
              }}
            />
          </Card>
        </Col>
        <Col md={4} sm={12}>
          <Card>
            <Statistic
              title="Total de vendas"
              value={response?.sales?.total || 0}
              style={{ minHeight: 80 }}
              loading={isLoading}
              valueStyle={{
                fontSize: 34,
                fontWeight: "bold",
              }}
            />
          </Card>
        </Col>
        <Col md={6} sm={12}>
          <Card>
            <Statistic
              style={{ minHeight: 80 }}
              title="Produto mais vendido"
              value={response?.best_product || "---"}
              loading={isLoading}
              valueStyle={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            />
          </Card>
        </Col>
        <Col md={6} sm={12}>
          <Card>
            <Statistic
              style={{ minHeight: 80 }}
              title="Produto menos vendido"
              value={response?.worst_product || "---"}
              loading={isLoading}
              valueStyle={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <h1>Top 5 produtos mais vendidos</h1>
            <Spin spinning={isLoading}>
              <div>{TemplateTopFiveSales}</div>
            </Spin>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <h1>Top 5 produtos menos vendidos</h1>
            <Spin spinning={isLoading}>
              <div>{TemplateTopFiveLessSales}</div>
            </Spin>
          </Card>
        </Col>
      </Row>

      <br />

      <Row
        gutter={[15, 15]}
        style={{
          height: 400,
        }}
      >
        <Col md={8} sm={24}>
          <ChartFunnel
            title="Funil de vendas"
            series={[
              {
                name: "Vendas",
                data: [
                  ["Total", Number(response?.sales?.total ?? 0)],
                  [
                    "Aguardando pagamento",
                    Number(response?.sales?.waiting_payment ?? 0),
                  ],
                  [
                    "Separando pedido",
                    Number(response?.sales?.separating_order ?? 0),
                  ],
                  ["Cancelado", Number(response?.sales?.canceled ?? 0)],
                  ["Enviado", Number(response?.sales?.delivery_transit ?? 0)],
                  ["Entregue", Number(response?.sales?.delivered ?? 0)],
                ],
              },
            ]}
          />
        </Col>
        <Col md={16} sm={24}>
          <ChartReport
            yTitle="vendas"
            title="Vendas x Periodo"
            viewDate={response?.data_grafic.type}
            series={[
              {
                name: "Total de vendas",
                data:
                  (response?.data_grafic?.data?.map((item) => [
                    time.dateFormat(
                      "%d/%m/%Y %H:%M:%S",
                      getTime(new Date(item.date))
                    ),
                    Number(item.total_of_sales),
                  ]) as any) || [],
              },
            ]}
          />
        </Col>
      </Row>
    </PageHeader>
  );
};

export default DashboardReseller;
