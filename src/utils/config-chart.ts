import Highcharts from "highcharts";

const configChart = {
  subtitle: {
    text: "",
  },
  xAxis: {
    crosshair: {
      width: 1,
    },
    type: "datetime",
    labels: {
      format: "{text}",
    },
  },
  legend: {
    align: "center",
    layout: "horizontal",
    verticalAlign: "bottom",
  },
  responsive: {},
  chart: {
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  accessibility: {
    enabled: false,
  },
  plotOptions: {
    series: {
      label: {
        connectorAllowed: false,
      },
      pointStart: Date.UTC(2023, 0, 1),
    },
  },
  lang: {
    decimalPoint: ",",
    thousandsSep: ".",
    rangeSelectorFrom: "De",
    rangeSelectorTo: "Para",
    rangeSelectorZoom: "Zoom",
    resetZoom: "Limpar Zoom",
    contextButtonTitle: "Exportar gráfico",
    loading: ["Atualizando o gráfico...aguarde"],
    resetZoomTitle: "Voltar Zoom para nível 1:1",
    weekdays: [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ],
    shortMonths: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ],
    months: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
  },
};

export default configChart;
