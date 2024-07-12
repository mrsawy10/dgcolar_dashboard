import React from 'react';
import { LineChart as MuiLineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from '@mui/x-charts';

const CollarMaterialChart = ({ data }) => {
  // Extracting data and labels
  const timestamps = Object.keys(data.Loss_mae).map(ts => parseInt(ts, 10));
  const labels = timestamps.map(timestamp => new Date(timestamp).toLocaleString());
  const lossMaeData = Object.values(data.Loss_mae);
  const thresholdData = Object.values(data.Threshold);
  const anomalyData = Object.values(data.Anomaly).map(anomaly => (anomaly ? 1 : 0)); // Convert boolean to 0 or 1 for charting

  // Prepare chart data
  const chartData = React.useMemo(
    () => [
      {
        name: 'Loss_mae',
        data: timestamps.map((ts, index) => ({ x: new Date(ts), y: lossMaeData[index] })),
      },
      {
        name: 'Threshold',
        data: timestamps.map((ts, index) => ({ x: new Date(ts), y: thresholdData[index] })),
      },
      {
        name: 'Anomaly',
        data: timestamps.map((ts, index) => ({ x: new Date(ts), y: anomalyData[index] })),
      },
    ],
    [timestamps, lossMaeData, thresholdData, anomalyData]
  );

  return (
    <MuiLineChart
      data={chartData}
      title="Metrics over Time"
      xLabel="Time"
      yLabel="Value"
      xAxisProps={{ dataKey: 'x', type: 'category', tickFormatter: tick => new Date(tick).toLocaleString() }}
      yAxisProps={{ dataKey: 'y', type: 'number' }}
    >
      <CartesianGrid />
      <XAxis />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line name="Loss_mae" dataKey="Loss_mae" />
      <Line name="Threshold" dataKey="Threshold" />
      <Line name="Anomaly" dataKey="Anomaly" />
    </MuiLineChart>
  );
};

export default CollarMaterialChart;
