import React from "react";
import ChartistGraph from "react-chartist";
import Chartist from "chartist";
import ChartistTooltip from "chartist-plugin-tooltips-updated";

const TotalChart = () => {
  

  var data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    series: [
      [
        { meta: "Jan", value: 1 },
        { meta: "Feb", value: 2 },
        { meta: "Mar", value: 4 },
        { meta: "Apr", value: 8 },
        { meta: "May", value: 6 },
        { meta: "Jun", value: 10 },
        { meta: "Jul", value: 2 },
        { meta: "Aug", value: 3 },
        { meta: "Sep", value: 5 },
        { meta: "Oct", value: 7 },
        { meta: "Nov", value: 3 },
        { meta: "Dec", value: 10 },
      ],
    ],
  };

  var options = {
    height: "500px",
    width: "1500px",
    // fullWidth: true,
    high: 10,
    low: 0,
    axisX: {
      showLabel: true,
      showGrid: true,
    },
    axisY: {
      showLabel: false,
      showGrid: false,
    },

    showArea: true,

    // plugins: [ChartistTooltip()],
  };

  var type = "Line";

  var listener = {
    draw: function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 2000 * data.index,
            dur: 2000,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      }
    },
  };

  return (
    <div>
      <ChartistGraph
        data={data}
        options={options}
        type={type}
        listener={listener}
      />
    </div>
  );
};

export default TotalChart;
