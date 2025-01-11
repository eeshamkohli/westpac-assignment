import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchEmployeeData } from '../store/EmployeeSlice';

const EmployeeList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { companyInfo, employees, status, error } = useSelector((state: RootState) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployeeData());
  }, [dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Company Information</h1>
      <p>
        <strong>Name:</strong> {companyInfo?.companyName}
      </p>
      <p>
        <strong>Motto:</strong> {companyInfo?.companyMotto}
      </p>

      <h2>Employees</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id} style={{ marginBottom: '20px' }}>
            <img
              src={employee.avatar}
              alt={`${employee.firstName} ${employee.lastName}`}
            />
            <div>
              <p>
                <strong>Name:</strong> {employee.firstName} {employee.lastName}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
