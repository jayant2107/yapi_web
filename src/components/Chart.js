import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import PropTypes from "prop-types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  tooltips: {
    enabled: true,
    mode: "nearest",
    intersect: false,
    backgroundColor: "rgba(0,0,0,0.8)",
    titleFontColor: "#fff",
    titleFontSize: 16,
    bodyFontColor: "#fff",
    bodyFontSize: 14,
    callbacks: {
      title: function (tooltipItems) {
        // Customize the title of the tooltip
        return "Month: " + tooltipItems[0].xLabel;
      },
      label: function (tooltipItem) {
        // Customize the label of each tooltip item

        return "Value: " + tooltipItem.yLabel;
      }
    }
  },
  scales: {
    x: {
      display: true,
      grid: {
        drawBorder: false,
        display: false
      }
    },
    y: {
      display: true
    }
  },

  plugins: {
    legend: {
      display: false //position: "top"
    }
  }
};

const AreaChart = ({ values, labels, value }) => {
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        PointElement: false,
        data: values,
        borderColor: "#02133C",
        backgroundColor: "#01133d1f",
        tension: 0.5,
        pointRadius: 5
      }
    ]
  };
  return (
    <>
      <Count>{value}</Count>
      <Chart>
        <Line options={options} data={data} />
      </Chart>
    </>
  );
};

AreaChart.propTypes = {
  values: PropTypes.any,
  labels: PropTypes.any,
  heading: PropTypes.any,
  value: PropTypes.any
};
export default AreaChart;

const Count = styled.div`
  font-weight: 500;
  display: flex;
  padding: 5px 0px;
  color: gray;
  margin-bottom: 10px;
  font-size: 24px;
`;

const Chart = styled.div`
  width: 100%;
  height: 300px;
`;
