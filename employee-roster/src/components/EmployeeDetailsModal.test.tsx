import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EmployeeDetailsModal from './EmployeeDetailsModal';
import { Employee } from '../interfaces/EmployeeInterface';

describe('EmployeeDetailsModal Component', () => {
  const mockHandleModalClose = jest.fn();

  const mockEmployee: Employee = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    avatar: 'https://via.placeholder.com/100',
    age: 30,
    dateJoined: '2020-01-01T00:00:00.000Z',
    jobTitle: 'Software Engineer',
    bio: 'An experienced developer who loves coding.',
    contactNo: "+1 123-456-7890",
    address: "123 Elm Street, Springfield, IL, USA",
  };

  it('renders employee details when modal is open', () => {
    render(
      <EmployeeDetailsModal
        modalOpen={true}
        handleModalClose={mockHandleModalClose}
        selectedEmployee={mockEmployee}
      />
    );
    expect(
      screen.getByText(`${mockEmployee.firstName} ${mockEmployee.lastName}`)
    ).toBeInTheDocument();
    expect(screen.getByText(mockEmployee.jobTitle)).toBeInTheDocument();
    expect(screen.getByText(mockEmployee.bio)).toBeInTheDocument();
    expect(screen.getByText(`Age: ${mockEmployee.age}`)).toBeInTheDocument();

    expect(
      screen.getByText(`Joined: ${new Date(mockEmployee.dateJoined).toLocaleDateString()}`)
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(`${mockEmployee.firstName} ${mockEmployee.lastName}`)
    ).toBeInTheDocument();
  });

  it('does not render employee details when modal is closed', () => {
    render(
      <EmployeeDetailsModal
        modalOpen={false}
        handleModalClose={mockHandleModalClose}
        selectedEmployee={mockEmployee}
      />
    );

    expect(
      screen.queryByText(`${mockEmployee.firstName} ${mockEmployee.lastName}`)
    ).not.toBeInTheDocument();
  });

  it('calls handleModalClose when the modal is closed', () => {
    render(
      <EmployeeDetailsModal
        modalOpen={true}
        handleModalClose={mockHandleModalClose}
        selectedEmployee={mockEmployee}
      />
    );
    fireEvent.click(screen.getByRole('presentation'))
    expect(mockHandleModalClose).toHaveBeenCalledTimes(1);
  });
});
