import { Provider } from 'react-redux';
import './App.css'
import EmployeeList from './components/EmployeeList';
import store from './store/store';
import CompanyInfo from './components/CompanyInfo';
import { Box } from '@mui/material';

function App() {

  return (
    <Provider store={store}>
    <Box border={"1px solid lightgrey"}>
    <Box sx={{ padding: 3 }}>
     <CompanyInfo />

      <EmployeeList />
      </Box>
    </Box>
  </Provider>
  )
}

export default App
