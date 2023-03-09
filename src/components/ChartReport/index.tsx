import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import WatchDimentions from "../WatchDimentions";
import configChart from "src/utils/config-chart";

interface ChartReportProps {
  title: string;
  yTitle: string;
  viewDate?: "Day" | "Month";
  series: {
    name: string;
    data: any[];
  }[];
}

const ChartReport: React.FC<ChartReportProps> = ({
  title,
  yTitle,
  series,
  viewDate,
}) => {
  const chartRef = React.useRef<any>(null);
  const [options, setOptions] = React.useState<any>({});

  React.useEffect(() => {
    const _options = {
      title: {
        y: 40,
        x: 18,
        margin: 50,
        text: title,
        align: "left",
      },
      yAxis: {
        title: {
          text: yTitle,
        },
      },
      credits: {
        enabled: false,
      },
      series: series,
      lang: configChart.lang,
      chart: configChart.chart,
      xAxis: configChart.xAxis,
      legend: configChart.legend,
      subtitle: configChart.subtitle,
      responsive: configChart.responsive,
      plotOptions: {
        series: {
          ...configChart.plotOptions.series,
          pointIntervalUnit: viewDate && viewDate === "Day" ? "day" : "month",
        },
      },
      accessibility: configChart.accessibility,
    };

    setOptions(_options);
  }, [title, yTitle, series]);

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

export default ChartReport;
