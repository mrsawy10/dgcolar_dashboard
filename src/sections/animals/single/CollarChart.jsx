import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

ChartJS.register(LineElement, PointElement, LinearScale, TimeScale, Title, Tooltip, Legend);

const CollarChart = ({ data }) => {
  const timestamps = Object.keys(data.Loss_mae).map((ts) => parseInt(ts, 10));
  const labels = timestamps.map((timestamp) => new Date(timestamp).toLocaleString());
  const lossMaeData = Object.values(data.Loss_mae);
  const thresholdData = Object.values(data.Threshold);
  const anomalyData = Object.values(data.Anomaly).map((anomaly) => (anomaly ? 1 : 0));

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Loss_mae',
        data: lossMaeData,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: false,
      },
      {
        label: 'Threshold',
        data: thresholdData,
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        fill: false,
      },
      {
        label: 'Anomaly',
        data: anomalyData,
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
        fill: false,
        stepped: true, // Optional: make the anomaly data stepped
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        title: {
          display: true,
          text: 'Time',
        },
        time: {
          unit: 'second',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default CollarChart;
