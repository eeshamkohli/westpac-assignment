import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  TextField,
  Pagination,
} from '@mui/material';
import { fetchEmployeeData } from '../store/EmployeeSlice';
import { AppDispatch, RootState } from '../store/store';
import { Employee } from '../interfaces/EmployeeInterface';
import EmployeeRow from './Employee';
import EmployeeDetailsModal from './EmployeeDetailsModal';

const Employees: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { employees, status, error } = useSelector((state: RootState) => state.employees);

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setModalOpen(true);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState<keyof Employee>('firstName');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');

  const employeesPerPage = 5;

  const filteredEmployees = employees.filter((employee: Employee) => {
    const query = searchQuery.toLowerCase();
    return (
      employee.firstName.toLowerCase().includes(query) ||
      employee.lastName.toLowerCase().includes(query) ||
      employee.contactNo.toLowerCase().includes(query) ||
      employee.address.toLowerCase().includes(query)
    );
  });

  const sortedEmployees = filteredEmployees.sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] > b[orderBy] ? 1 : -1;
    } else {
      return a[orderBy] < b[orderBy] ? 1 : -1;
    }
  });

  const displayedEmployees = sortedEmployees.slice(
    (page - 1) * employeesPerPage,
    page * employeesPerPage
  );

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSort = (property: keyof Employee) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  useEffect(() => {
    dispatch(fetchEmployeeData());
  }, [dispatch]);

  if (status === 'loading') return <Typography>Loading...</Typography>;
  if (status === 'failed') return <Typography color="error">Error: {error}</Typography>;

  return (
 
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography>
          Showing {displayedEmployees.length} of {filteredEmployees.length}
        </Typography>
        <Box display="flex" alignItems="center">
          <TextField
            size="small"
            variant="outlined"
            placeholder="Search by Name, Contact No, or Address"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ marginRight: 2 }}
          />
          <Button variant="contained">Search</Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'firstName'}
                  direction={order}
                  onClick={() => handleSort('firstName')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'contactNo'}
                  direction={order}
                  onClick={() => handleSort('contactNo')}
                >
                  Contact No
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'address'}
                  direction={order}
                  onClick={() => handleSort('address')}
                >
                  Address
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {displayedEmployees.map((employee) => (
                <EmployeeRow key={employee.id} employee={employee}  onClick={() => handleEmployeeClick(employee)} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={Math.ceil(filteredEmployees.length / employeesPerPage)}
          page={page}
          onChange={handlePageChange}
          shape="rounded"
        />
      </Box>
      <EmployeeDetailsModal modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)} selectedEmployee={selectedEmployee} />
    </>
  );
};

export default Employees;
