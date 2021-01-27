import React from 'react';
import createStore from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { CardContent, Grid } from '@material-ui/core';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import Switches from './components/Switches';
import MultiChart from './components/MultiChart';
import Subscription from './Features/Subscription/subscription';
import MultipleMetrics from './Features/MultipleMetrics/multipleMetrics';

const store = createStore();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Wrapper>
        <MultipleMetrics />
        <Subscription />
        <Header />              
        <Grid container spacing={4} justify="space-between">
        <Grid item xs={12} sm={7}>
        <MultiChart />
        </Grid>
        <Grid item xs={12} sm={4}>
        <Switches />
        </Grid>
      </Grid>
    
        <ToastContainer />
      </Wrapper>
    </Provider>
  </MuiThemeProvider>
);

export default App;
