import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const CompanyInfo: React.FC = () => {
    const companyInfo = useSelector((state: RootState) => state.employees.companyInfo);
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
      <Box>
        <Typography variant="h4" fontWeight="bold">
          {companyInfo?.companyName}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {companyInfo?.companyMotto}
        </Typography>
      </Box>
      <Typography variant="subtitle2" color="textSecondary">
        Since {companyInfo ? new Date(companyInfo.companyEst).toLocaleDateString() : ''}
      </Typography>
    </Box>
  );
};

export default CompanyInfo;
