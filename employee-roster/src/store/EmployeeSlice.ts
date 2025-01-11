import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { CompanyInfo, Employee } from '../interfaces/EmployeeInterface';
import companyData from "../assets/sample-data.json"

interface EmployeeState {
    companyInfo: CompanyInfo | null;
    employees: Employee[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  
export const fetchEmployeeData = createAsyncThunk(
  'employees/fetchEmployeeData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('../assets/sample-data.json');
      console.log(response)
      return companyData;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch data');
    }
  }
);

const initialState: EmployeeState = {
  companyInfo: null,
  employees: [],
  status: 'idle',
  error: null,
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmployeeData.fulfilled, (state, action: PayloadAction<{ companyInfo: CompanyInfo; employees: Employee[] }>) => {
        state.status = 'succeeded';
        state.companyInfo = action.payload.companyInfo;
        state.employees = action.payload.employees;
      })
      .addCase(fetchEmployeeData.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default employeeSlice.reducer;
