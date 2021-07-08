import React from "react";
import ChartistGraph from "react-chartist";
import Chartist from "chartist";

const TotalBookChart = () => {
  var data = {
    series: [[2, 15, 10, 18, 20, 26, 30]],
  };

  var options = {
    // height: 120,
    fullWidth: true,
    width: 230,
    high: 30,
    low: 2,
    axisX: {
      labelInterpolationFnc: function (value, index) {
        return index % 2 === 0 ? value : null;
      },
      showGrid: false,
      showLabel: false,
    },
    axisY: {
      showGrid: false,
      showLabel: false,
    },
    showArea: true,
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
      <ChartistGraph data={data} options={options} type={type} listener={listener}/>
    </div>
  );
};

export default TotalBookChart;
