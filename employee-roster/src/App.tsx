import { Provider } from 'react-redux';
import './App.css'
import EmployeeList from './components/EmployeeList';
import store from './store/store';

function App() {

  return (
    <Provider store={store}>
    <div>
      <EmployeeList />
    </div>
  </Provider>
  )
}

export default App
