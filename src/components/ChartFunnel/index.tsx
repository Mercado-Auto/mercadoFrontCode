import React from "react";
import Highcharts from "highcharts";
import Funnel from 'highcharts/modules/funnel'
import HighchartsReact from "highcharts-react-official";
import WatchDimentions from "../WatchDimentions";
import configChart from "src/utils/config-chart";

interface ChartFunnelProps {
  title: string;
  series: {
    name: string;
    data: any[];
  }[];
}

const ChartFunnel: React.FC<ChartFunnelProps> = ({ title, series }) => {
  const [options, setOptions] = React.useState<any>({});
  const chartRef = React.useRef<any>(null);
  Funnel(Highcharts);

  React.useEffect(() => {
    const _options = {
      chart: {
        type: 'funnel'
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b> ({point.y:,.0f})',
            softConnector: true
          },
          center: ['40%', '50%'],
          neckWidth: '30%',
          neckHeight: '25%',
          width: '80%'
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false,
      },
      series: series,
      title: {
        text: title,
        align: "left",
        margin: 50,
        x: 18,
        y: 40
      },
      lang: configChart.lang,
      subtitle: configChart.subtitle,
      responsive: configChart.responsive,
      accessibility: configChart.accessibility,
    };

    setOptions(_options);
  }, [title, series]);

  return (
    <WatchDimentions>
      {(dimentions) => {
        if (chartRef)
          chartRef?.current?.chart?.setSize(
            dimentions.width,
            dimentions.height
          );

        return (
          <div style={{ ...dimentions }}>
            <HighchartsReact
              ref={chartRef}
              options={options}
              highcharts={Highcharts}
              style={{ height: "100%", width: "100%" }}
            />
          </div>
        );
      }}
    </WatchDimentions>
  );
};

export default ChartFunnel;
