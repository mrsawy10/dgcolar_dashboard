import React from 'react';
import { Chart } from 'react-charts';

const CollarReactChart = ({ data }) => {
  // Extracting data and labels
  const timestamps = Object.keys(data.Loss_mae).map(ts => parseInt(ts, 10));
  const labels = timestamps.map(timestamp => new Date(timestamp).toLocaleString());
  const lossMaeData = Object.values(data.Loss_mae);
  const thresholdData = Object.values(data.Threshold);
  const anomalyData = Object.values(data.Anomaly).map(anomaly => (anomaly ? 1 : 0)); // Convert boolean to 0 or 1 for charting

  // Define series data
  const series = React.useMemo(
    () => [
      {
        label: 'Loss_mae',
        data: lossMaeData.map((value, index) => ({ x: timestamps[index], y: value })),
      },
      {
        label: 'Threshold',
        data: thresholdData.map((value, index) => ({ x: timestamps[index], y: value })),
      },
      {
        label: 'Anomaly',
        data: anomalyData.map((value, index) => ({ x: timestamps[index], y: value })),
      },
    ],
    [timestamps, lossMaeData, thresholdData, anomalyData]
  );

  // Define chart options
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom', show: true },
      { type: 'linear', position: 'left', show: true },
    ],
    []
  );

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Chart data={series} axes={axes} tooltip />
    </div>
  );
};

export default CollarReactChart;
