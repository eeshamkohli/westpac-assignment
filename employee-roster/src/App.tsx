import { Provider } from 'react-redux';
import './App.css'
import EmployeeList from './components/EmployeeList';
import store from './store/store';
import CompanyInfo from './components/CompanyInfo';
import { Box } from '@mui/material';

function App() {

  return (
    <Provider store={store}>
    <div>
    <Box sx={{ padding: 3 }}>
     <CompanyInfo />

      <EmployeeList />
      </Box>
    </div>
  </Provider>
  )
}

export default App
