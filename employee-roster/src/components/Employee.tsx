import React from 'react';
import { TableRow, TableCell, Box, Avatar, Typography, Button } from '@mui/material';
import { Employee } from '../interfaces/EmployeeInterface';

interface EmployeeRowProps {
  employee: Employee;
  onClick: () => void;
}

const EmployeeRow: React.FC<EmployeeRowProps> = ({ employee, onClick }) => {
  return (
    <TableRow onClick={onClick} style={{ cursor: 'pointer' }}>
      <TableCell>{employee.id}</TableCell>
      <TableCell>
        <Box display="flex" alignItems="center">
          <Avatar
            src={employee.avatar}
            alt={`${employee.firstName} ${employee.lastName}`}
            sx={{ marginRight: 2 }}
          />
          <Box>
            <Typography>{`${employee.firstName} ${employee.lastName}`}</Typography>
            <Typography variant="caption" color="textSecondary">
              Cust name
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell>{employee.contactNo}</TableCell>
      <TableCell>{employee.address}</TableCell>
      <TableCell>
        <Button size="small">...</Button>
      </TableCell>
    </TableRow>
  );
};

export default EmployeeRow;
