import React from "react";
import {
  Card,
  Col,
  Row,
  Spin,
  Tooltip,
  Statistic,
  PageHeader,
  Typography,
  DatePicker,
} from "antd";

import { GraphicBar, Item } from "./styles";
import { formatMoney } from "src/utils/format";
import moment, { Moment } from "moment/moment";
import { useReadDashboardAdmin } from "src/queries/admin/dashboard";
import { endOfDay, lastDayOfMonth, startOfDay, startOfMonth } from "date-fns";

type RangeValue = [Moment | null, Moment | null] | null;

export const DashboardAdmin: React.FC = () => {
  const _now = new Date();
  const $id = React.useId();
  const [filters, setFilters] = React.useState([
    startOfMonth(_now),
    lastDayOfMonth(_now),
  ]);
  const {
    data: response,
    isLoading,
    error,
  } = useReadDashboardAdmin({
    initial_date: filters[0],
    end_date: filters[1],
  });

  const handleFilterChange = (values: RangeValue) => {
    if (values) {
      setFilters([
        startOfDay(moment(values[0]).toDate()),
        endOfDay(moment(values[1]).toDate()),
      ]);
    }
  };

  const FilterDate = (
    <DatePicker.RangePicker
      value={[moment(filters[0]), moment(filters[1])] as RangeValue}
      onChange={(values) => handleFilterChange(values)}
      allowClear={false}
      disabled={isLoading}
    />
  );

  const TemplateTopFiveReseller = React.useMemo(() => {
    if (!response?.top_most_resellers?.length) {
      return (
        <div style={{ padding: 30, textAlign: "center" }}>
          <Typography.Text type="secondary" strong>
            Sem dados!
          </Typography.Text>
        </div>
      );
    }
    const sorted = response?.top_most_resellers?.sort(
      (a, b) => b.sale_qty - a.sale_qty
    );
    return sorted?.map((el, idx) => {
      return (
        <Item
          key={`${$id}-best-sale-${idx}`}
          title={`${el.sale_qty} quantidade de pesquisa`}
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
  }, [response?.top_most_resellers?.length]);

  const TemplateTopFiveSearch = React.useMemo(() => {
    if (!response?.top_most_searched?.length) {
      return (
        <div style={{ padding: 30, textAlign: "center" }}>
          <Typography.Text type="secondary" strong>
            Sem dados!
          </Typography.Text>
        </div>
      );
    }
    const sorted = response?.top_most_searched?.sort((a, b) => b.qty - a.qty);
    return sorted?.map((el, idx) => {
      return (
        <Item
          key={`${$id}-best-sale-${idx}`}
          title={`${el.qty} quantidade de pesquisa`}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <Typography.Text>{el.description}</Typography.Text>
            </div>
            <div>
              <Typography.Text type="secondary" strong>
                {el.qty}x
              </Typography.Text>
            </div>
          </div>
          <GraphicBar valueItem={el.qty} valueBase={sorted?.[0]?.qty}>
            <div></div>
          </GraphicBar>
        </Item>
      );
    });
  }, [response?.top_most_searched?.length]);

  return (
    <PageHeader title={"Dashboard"} extra={FilterDate}>
      <Row gutter={[15, 15]}>
        <Col md={4} sm={12}>
          <Card>
            <Statistic
              style={{ minHeight: 80 }}
              title="Total de revendedores"
              value={response?.resellers_qty || 0}
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
                  title={"Valor total das taxas de cada venda"}
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
              title="Pagamentos feitos"
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
              title="Valor total de repasses"
              valueRender={() => (
                <Tooltip
                  placement="bottom"
                  title={"Valor total pago aos revendedores"}
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
      </Row>

      <br />

      <Row gutter={[15, 15]}>
        <Col span={12}>
          <Row gutter={[15, 15]}>
            <Col span={24}>
              <Card>
                <h1>Top 5 produtos mais pesquisados</h1>
                <Spin spinning={isLoading}>
                  <div>{TemplateTopFiveSearch}</div>
                </Spin>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row gutter={[15, 15]}>
            <Col span={24}>
              <Card>
                <h1>Top 5 revendedores</h1>
                <Spin spinning={isLoading}>
                  <div>{TemplateTopFiveReseller}</div>
                </Spin>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </PageHeader>
  );
};

export default DashboardAdmin;
