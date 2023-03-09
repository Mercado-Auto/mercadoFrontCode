import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import WatchDimentions from "../WatchDimentions";

interface PieReportProps {
  title: string;
  plotBorderWidth: boolean;
  series: {
    name: string;
    colorByPoint: boolean;
    data: {
      name: string;
      y: number;
    }[];
  }[];
}

const PieReport: React.FC<PieReportProps> = ({
  title,
  series,
  plotBorderWidth,
}) => {
  const [options, setOptions] = React.useState<any>({});
  const chartRef = React.useRef<any>(null);

  React.useEffect(() => {
    const _options = {
      series: series,
      chart: {
        type: "pie",
        plotShadow: false,
        plotBackgroundColor: null,
        plotBorderColor: "#f0f0f0",
        plotBorderWidth: plotBorderWidth ? 1 : null,
      },
      title: {
        text: title,
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      },
      plotOptions: {
        pie: {
          cursor: "pointer",
          allowPointSelect: true,
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          },
        },
      },
    };

    setOptions(_options);
  }, [title, series?.length]);

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

export default PieReport;
