import React, { useState, useEffect } from 'react';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../Features/ActiveMetrics/sliceReducer';
import Card from '../components/Card';

export default function Switches() {
  const [dataArr, dataCon] = useState([]);
  const [state, setState] = useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
    checkedD: false,
    checkedE: false,
    checkedF: false,
  });

  const timeStamp = useSelector(state => state.heartbeat);
  const dispatch = useDispatch();
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

  const handleChange = name => event => {
    const metric = event.target.value;
    const isChecked = event.target.checked;
    setState({ ...state, [name]: event.target.checked });

    if (isChecked) {
      dispatch(
        actions.active({
          metricName: metric,
          before: timeStamp.current,
          after: timeStamp.past,
        }),
      );
    } else {
      const metricIndex = activeMetrics.find(element => element.metricName === metric);
      dispatch(actions.remove(metricIndex.metricName));
    }
  };

  return (
    <div style={{ height: "400px" }}>
      <h1>Select Metrics</h1>
      <FormControl component="fieldset">
        <FormGroup aria-label="position" row>
          <FormControlLabel
            value="top"
            control={
              <Switch
                checked={state.checkedA}
                onChange={handleChange('checkedA')}
                value="injValveOpen"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label="INJ Valve Open"
            labelPlacement="top"
          />
          <FormControlLabel
            value="start"
            control={
              <Switch
                checked={state.checkedB}
                onChange={handleChange('checkedB')}
                value="oilTemp"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label="Oil Temp"
            labelPlacement="top"
          />
          <FormControlLabel
            value="bottom"
            control={
              <Switch
                checked={state.checkedC}
                onChange={handleChange('checkedC')}
                value="tubingPressure"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label="Tubing Pressure"
            labelPlacement="top"
          />
          <FormControlLabel
            value="end"
            control={
              <Switch
                checked={state.checkedD}
                onChange={handleChange('checkedD')}
                value="flareTemp"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label="Flare Temp"
            labelPlacement="top"
          />
          <FormControlLabel
            value="end"
            control={
              <Switch
                checked={state.checkedE}
                onChange={handleChange('checkedE')}
                value="casingPressure"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label="Casing Pressure"
            labelPlacement="top"
          />
          <FormControlLabel
            value="end"
            control={
              <Switch
                checked={state.checkedF}
                onChange={handleChange('checkedF')}
                value="waterTemp"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label="Water Temp"
            labelPlacement="top"
          />
        </FormGroup>
      </FormControl>
      {activeMetrics.map(i => {
        if (i.metricName === injValveData[0].metric) {
          return (
            <Card
              color={colors[i.metricName]}
              metric={names[i.metricName]}
              data={`${injValveData[injValveData.length - 1].value}${injValveData[0].unit}`}
            />
          );
        } else if (i.metricName === oilTempData[0].metric) {
          return (
            <Card
              color={colors[i.metricName]}
              metric={names[i.metricName]}
              data={`${oilTempData[oilTempData.length - 1].value} ${oilTempData[0].unit}`}
            />
          );
        } else if (i.metricName === flareTempData[0].metric) {
          return (
            <Card
              color={colors[i.metricName]}
              metric={names[i.metricName]}
              data={`${flareTempData[flareTempData.length - 1].value} ${flareTempData[0].unit}`}
            />
          );
        } else if (i.metricName === waterTempData[0].metric) {
          return (
            <Card
              color={colors[i.metricName]}
              metric={names[i.metricName]}
              data={`${waterTempData[waterTempData.length - 1].value} ${waterTempData[0].unit}`}
            />
          );
        } else if (i.metricName === casingPressureData[0].metric) {
          return (
            <Card
              color={colors[i.metricName]}
              metric={names[i.metricName]}
              data={`${casingPressureData[casingPressureData.length - 1].value} ${casingPressureData[0].unit}`}
            />
          );
        } else if (i.metricName === tubingPressureData[0].metric) {
          return (
            <Card
              color={colors[i.metricName]}
              metric={names[i.metricName]}
              data={`${tubingPressureData[tubingPressureData.length - 1].value} ${tubingPressureData[0].unit}`}
            />
          );
        }
      })}
    </div>
  );
}
