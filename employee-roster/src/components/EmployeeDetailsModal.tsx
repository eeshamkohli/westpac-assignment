import { Avatar, Box, Modal, Stack, Typography } from '@mui/material'
import { Employee } from '../interfaces/EmployeeInterface';

const styles={
    modalContainer:{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      },
    avatar:{ width: 100, height: 100 },
    bio: { marginTop: 2 },
    job: { marginBottom: 1 }
}

type EmployeeDetailsModalProps = {
    modalOpen: boolean;
    handleModalClose: ()=>void;
    selectedEmployee: Employee | null;
}

const EmployeeDetailsModal: React.FC<EmployeeDetailsModalProps> = ({modalOpen,handleModalClose,selectedEmployee}) => {
  return (
<Modal open={modalOpen} onClose={handleModalClose}>
  <Box
    sx={styles.modalContainer}
  >
    {selectedEmployee && (
      <Box display="flex">
        <Stack alignItems="center" justifyContent={"center"} sx={{ marginRight: 3 }} flexBasis={"30%"}>
          <Avatar
            src={selectedEmployee.avatar}
            alt={`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
            sx={styles.avatar}
          />
          <Stack alignItems="center" justifyContent={"center"}>
            <Typography variant="body2" color="textSecondary">
            <strong>Age:</strong> {selectedEmployee.age}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Joined:</strong> {new Date(selectedEmployee.dateJoined).toLocaleDateString()}
          </Typography>
          </Stack>
        </Stack>
        <Box flexBasis={"70%"}>
          <Typography variant="h6" fontWeight="bold">
            {`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={styles.job}>
            {selectedEmployee.jobTitle}
          </Typography>
      
          <Typography variant="body2" sx={styles.bio}>
            {selectedEmployee.bio}
          </Typography>
        </Box>
      </Box>
    )}
  </Box>
</Modal>

  )
}

export default EmployeeDetailsModal