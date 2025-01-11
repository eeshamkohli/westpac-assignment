import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchEmployeeData } from '../store/EmployeeSlice';
import EmployeeList from './EmployeeList'
import { Employee } from '../interfaces/EmployeeInterface';

jest.mock('../store/EmployeeSlice', () => ({
  fetchEmployeeData: jest.fn(),
}));

const mockStore = configureStore([thunk]);

export const mockEmployees: Employee[] = [
    {
      id: "e1",
      avatar: "https://example.com/avatar1.jpg",
      firstName: "John",
      lastName: "Doe",
      jobTitle: "Software Engineer",
      contactNo: "+1 123-456-7890",
      address: "123 Elm Street, Springfield, IL, USA",
      age: 28,
      bio: "A passionate software engineer with expertise in front-end development and a knack for problem-solving.",
      dateJoined: "2020-06-15",
    },
    {
      id: "e2",
      avatar: "https://example.com/avatar2.jpg",
      firstName: "Jane",
      lastName: "Smith",
      jobTitle: "Product Manager",
      contactNo: "+44 20 7946 0958",
      address: "45 Baker Street, London, UK",
      age: 35,
      bio: "A dedicated product manager with over a decade of experience in delivering innovative solutions and driving cross-functional teams.",
      dateJoined: "2018-09-01",
    }
  ];
  

describe('Employees Component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      employees: {
        employees: mockEmployees,
        status: 'idle',
        error: null,
      },
    });

    fetchEmployeeData.mockClear();
  });

  it('renders the component and displays employees', () => {
    render(
      <Provider store={store}>
        <EmployeeList />
      </Provider>
    );

    expect(screen.getByText(/Showing 2 of 2/)).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
  });

  it('fetches employee data on mount', () => {
    render(
      <Provider store={store}>
        <EmployeeList />
      </Provider>
    );

    expect(fetchEmployeeData).toHaveBeenCalled();
  });

  it('filters employees based on search query', () => {
    render(
      <Provider store={store}>
        <EmployeeList />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'John' } });

    expect(screen.getByText(/Showing 1 of 2/)).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.queryByText('Jane')).not.toBeInTheDocument();
  });

  it('sorts employees by name', () => {
    render(
      <Provider store={store}>
        <EmployeeList />
      </Provider>
    );

    const nameSortLabel = screen.getByText('Name');
    fireEvent.click(nameSortLabel);

    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Jane');
    expect(rows[2]).toHaveTextContent('John');
  });

  it('handles pagination', () => {
    store = mockStore({
      employees: {
        employees: Array.from({ length: 15 }, (_, i) => ({
          id: i + 1,
          firstName: `Employee${i + 1}`,
          lastName: 'LastName',
          contactNo: `12345${i}`,
          address: `Address${i}`,
        })),
        status: 'idle',
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <EmployeeList />
      </Provider>
    );

    expect(screen.getByText(/Showing 5 of 15/)).toBeInTheDocument();

    const nextPageButton = screen.getByRole('button', { name: 'Go to page 2' });
    fireEvent.click(nextPageButton);

    expect(screen.getByText(/Showing 5 of 15/)).toBeInTheDocument();
    expect(screen.getByText('Employee6')).toBeInTheDocument();
  });

  it('opens and closes the employee details modal', async () => {

    render(
      <Provider store={store}>
        <EmployeeList />
      </Provider>
    );

    const employeeRow = screen.getByText('John');
    fireEvent.click(employeeRow);

    await waitFor(() => {
      expect(screen.getByText('Employee Details')).toBeInTheDocument();
    });

    const closeModalButton = screen.getByRole('button', { name: 'Close' });
    fireEvent.click(closeModalButton);

    await waitFor(() => {
      expect(screen.queryByText('Employee Details')).not.toBeInTheDocument();
    });
  });
});
