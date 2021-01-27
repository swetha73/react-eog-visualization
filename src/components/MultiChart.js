import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useSelector } from 'react-redux';

export default function MultiChart() {
  const [dataArr, dataCon] = useState([]);
  const multiData = useSelector(state => state.multipleData.multipleData);
  const injValveData = useSelector(state => state.injValve.injValveData);
  const oilTempData = useSelector(state => state.oilTemp.oilTempData);
  const flareTempData = useSelector(state => state.flareTemp.flareTempData);
  const waterTempData = useSelector(state => state.waterTemp.waterTempData);
  const casingPressureData = useSelector(state => state.casingPressure.casingPressureData);
  const tubingPressureData = useSelector(state => state.tubingPressure.tubingPressureData);
  const activeMetrics = useSelector(state => state.activeMetrics.selectedMetrics);

  const filterByActive = data => {
    for (let i = 0; i < activeMetrics.length; i++) {
      if (data.metric === activeMetrics[i].metricName) {
        return true;
      }
    }
  };

  const dataForChart = dataArr.filter(filterByActive);

  useEffect(() => {
    if (multiData.length > 0) {
      return dataCon([
        {
          metric: 'injValveOpen',
          measurements: multiData[0].measurements.concat(injValveData),
        },
        {
          metric: 'oilTemp',
          measurements: multiData[1].measurements.concat(oilTempData),
        },
        {
          metric: 'casingPressure',
          measurements: multiData[2].measurements.concat(casingPressureData),
        },
        {
          metric: 'tubingPressure',
          measurements: multiData[3].measurements.concat(tubingPressureData),
        },
        {
          metric: 'flareTemp',
          measurements: multiData[4].measurements.concat(flareTempData),
        },
        {
          metric: 'waterTemp',
          measurements: multiData[5].measurements.concat(waterTempData),
        },
      ]);
    }
  }, [injValveData, casingPressureData, flareTempData, multiData, oilTempData, tubingPressureData, waterTempData]);

  const names = {
    injValveOpen: 'INJ Valve Open',
    oilTemp: 'Oil Temp',
    tubingPressure: 'Tubing Pressure',
    flareTemp: 'Flare Temp',
    casingPressure: 'Casing Pressure',
    waterTemp: 'Water Temp',
    default: 'metric',
  };

  const colors = {
    injValveOpen: '#1BD82A',
    oilTemp: '#000000',
    tubingPressure: '#FF0000',
    flareTemp: '#FFB201',
    casingPressure: '#830BEE',
    waterTemp: '#000CFF',
    default: '#00FFE0',
  };

  return (
    <div style={{ margin: "20px" }}>

      <LineChart width={1000} height={600}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="at" type="category" allowDuplicatedCategory={false} />
        <YAxis dataKey="value" />
        <Tooltip />
        <Legend layout="vertical" verticalAlign="middle" align="right" />
        {dataForChart.map(i => {
          return (
            <Line
              dataKey="value"
              data={i.measurements}
              name={names[i.metric]}
              key={i.metric}
              dot={false}
              stroke={colors[i.metric]}
            />
          );
        })}
      </LineChart>
    </div>
  );
}
