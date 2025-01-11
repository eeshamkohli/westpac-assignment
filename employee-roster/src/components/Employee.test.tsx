import { render, screen, fireEvent } from '@testing-library/react';
import { Employee } from '../interfaces/EmployeeInterface.ts';
import EmployeeRow from './Employee.tsx'

describe('EmployeeRows', () => {
  const mockEmployee: Employee = {
    id: '123',
    firstName: 'John',
    lastName: 'Doe',
    avatar: 'https://via.placeholder.com/150',
    contactNo: '123-456-7890',
    address: '123 Test Street',
    jobTitle: "manager",
    dateJoined: "sdasd",
    age:29,
    bio:"champion"
  };

  const mockOnClick = jest.fn();

  test('renders employee details correctly', () => {
    render(<EmployeeRow employee={mockEmployee} onClick={mockOnClick} />);
    expect(screen.getByText(mockEmployee.id)).toBeInTheDocument()
    expect(screen.getByText(`${mockEmployee.firstName} ${mockEmployee.lastName}`)).toBeTruthy();
    expect(screen.getByText(mockEmployee.contactNo)).toBeTruthy();
    expect(screen.getByText(mockEmployee.address)).toBeTruthy();
    expect(
      screen.getByAltText(`${mockEmployee.firstName} ${mockEmployee.lastName}`)
    ).toBeTruthy();
    expect(screen.getByText('Cust name')).toBeTruthy();
    expect(screen.getByRole('button', { name: '...' })).toBeInTheDocument();
  });

  test('calls onClick when the row is clicked', () => {
    render(<EmployeeRow employee={mockEmployee} onClick={mockOnClick} />);

    const row = screen.getByText(mockEmployee.id).closest('tr');
    fireEvent.click(row!);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
