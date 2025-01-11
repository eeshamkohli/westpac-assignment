import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './EmployeeSlice';

const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
