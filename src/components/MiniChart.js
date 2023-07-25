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
  scales: {
    x: {
      display: false,
      grid: {
        drawBorder: false,
        display: false
      }
    },
    y: {
      display: false
    }
  },

  plugins: {
    legend: {
      display: false //position: "top"
    }
  }
};

const MiniChart = ({ values, labels, value }) => {
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
        pointRadius: 0
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

MiniChart.propTypes = {
  values: PropTypes.any,
  labels: PropTypes.any,
  heading: PropTypes.any,
  value: PropTypes.any
};
export default MiniChart;

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
  height: 100px;
`;
