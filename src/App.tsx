import "moment/locale/pt-br";
import React from "react";

import Highcharts from "highcharts";
import HighchartsFunnel from 'highcharts/modules/funnel'

import { ConfigProvider } from "antd";

import ptBR from "antd/es/locale/pt_BR";
import moment from "moment";

import RoutesManager from "./setup/routes-manager";

if (typeof Highcharts === 'object') {
  HighchartsFunnel(Highcharts)
}

moment.locale("pt-br");
function App() {
  return (
    <ConfigProvider locale={ptBR}>
      <RoutesManager />
    </ConfigProvider>
  );
}

export default App;
