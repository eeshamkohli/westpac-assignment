import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CompanyInfo from './CompanyInfo';

describe('CompanyInfo Component', () => {
  const mockStore = configureStore([]);

  it('renders company information correctly', () => {
    const initialState = {
      employees: {
        companyInfo: {
          companyName: 'Tech Corp',
          companyMotto: 'Innovate and Inspire',
          companyEst: '2000-01-01T00:00:00.000Z',
        },
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <CompanyInfo />
      </Provider>
    );

    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('Innovate and Inspire')).toBeInTheDocument();
    expect(screen.getByText('Since 1/1/2000')).toBeInTheDocument(); // Adjust 
  });

  it('renders empty state when companyInfo is null', () => {

    const initialState = {
      employees: {
        companyInfo: null,
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <CompanyInfo />
      </Provider>
    );

    expect(screen.queryByText('Tech Corp')).not.toBeInTheDocument();
    expect(screen.queryByText('Innovate and Inspire')).not.toBeInTheDocument();
    expect(screen.queryByText('Since')).not.toBeInTheDocument();
  });
});
