import React from 'react';
import createStore from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import NowWhat from './components/NowWhat';
import Dashboard from './components/Dashboard/Dashboard';
import MultiSelect from './components/Dashboard/MultiSelect';
import { createClient, useQuery } from 'urql';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const getMetricsquery = `
query{
  getMetrics
}
`;
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

const App = () => {
  // const [result] = useQuery({
  //   getMetricsquery
  // });
  // const { fetching, data, error } = result;

  return (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Wrapper>
        <Header />
        <NowWhat />
        {/* <MultiSelect metrics={[]} selection={[]} setSelection={null} /> */}
        <ToastContainer />
      </Wrapper>
    </Provider>
  </MuiThemeProvider>
)
}
  

export default App;
