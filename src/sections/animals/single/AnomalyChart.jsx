import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Import Chart.js

const AnomalyChart = ({ data }) => {
  // Convert timestamps to readable date format
  const convertTimestampToDate = (timestamp) => {
    const date = new Date(parseInt(timestamp , 10   ));
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  // Extract data for chart
  const labels = Object.keys(data.Loss_mae).map(convertTimestampToDate);
  const lossMaeData = Object.values(data.Loss_mae);
  const thresholdData = Object.values(data.Threshold);
  const anomalyData = Object.values(data.Anomaly);  

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Loss MAE',
        data: lossMaeData,
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'Threshold',
        data: thresholdData,
        borderColor: 'red',
        borderDash: [5, 5],
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      annotation: {
        annotations: anomalyData
          .map((isAnomaly, index) => isAnomaly && ({
            type: 'line',
            mode: 'vertical',
            scaleID: 'x-axis-0',
            value: labels[index],
            borderColor: 'orange',
            borderWidth: 2,
          }))
          .filter(Boolean),
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default AnomalyChart;
