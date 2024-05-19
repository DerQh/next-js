import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import styled from "styled-components";

const LineGraph = styled(Line)`
  width: 100%;
  max-height: 500px;
`;
function LineChart() {
  const data1 = {
    labels: ["John ", "Jane ", "Alice ", "Bob ", "Emily "],
    datasets: [
      {
        label: "Contributions ",
        data: [8000, 15000, 5000, 12000, 19000],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],

        borderWidth: 2,
        tension: 0.3, // Adjust the tension for smoother line
        pointRadius: 0, // Remove the dots
        pointStyle: "none", // Remove the squares
        borderColor: "rgb(43, 229, 10)",
      },
    ],
  };
  const data = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Transactions",
        data: [65, 59, 80, 81, 86],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        tension: 0.4, // Adjust the tension for smoother line
        pointRadius: 0, // Remove the dots
        pointStyle: "none", // Remove the squares
      },
    ],
  };

  const options = {
    scales: {
      y: {
        grid: {
          display: false, // Remove the y-axis grid lines
        },
        ticks: {
          display: false,
        },
        title: {
          display: false,
        },
        borderColor: "transparent", // Remove the y-axis line
      },
      x: {
        grid: {
          display: false, // Remove the x-axis grid lines
        },
      },
    },
  };
  const options1 = {
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
          font: {
            size: 10, // Adjust the font size of y-axis labels
            family: "'Arial', sans-serif", // Specify font family
            weight: "bold", // Specify font weight
            color: "blue", // Specify font color
          },
        },
        grid: {
          display: false, // Remove the y-axis grid lines
        },
        borderColor: "transparent", // Remove the y-axis line
        scaleLabel: {
          display: true,
          labelString: "Sales in $", // Add a label to the y-axis
          font: {
            size: 1, // Adjust the font size of the axis label
            family: "'Arial', sans-serif", // Specify font family
            weight: "normal", // Specify font weight
          },
          padding: {
            top: 10, // Adjust padding if needed
          },
        },
      },
      x: {
        ticks: {
          display: false, // Hide x-axis ticks
        },
        title: {
          display: false, // Hide x-axis title
        },
        grid: {
          display: false, // Remove the x-axis grid lines
        },
        borderColor: "transparent", // Remove the x-axis line
      },
    },
  };

  return <LineGraph data={data1} options={options1} />;
}

export default LineChart;
