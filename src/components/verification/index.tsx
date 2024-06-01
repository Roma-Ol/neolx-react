import { IVerificationEntity } from '../verifications';
import { Box, Button, Typography } from '@mui/joy';
import React, { useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import { toast } from 'react-toastify';
import { useApi } from '../../services/API';

interface IVerificationProps {
  verificationData: IVerificationEntity;
  refreshVerifications: () => void;
}

const Verification: React.FC<IVerificationProps> = ({ verificationData, refreshVerifications }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userName, userEmail, code } = verificationData;

  const handleVerify = async () => {
    setIsLoading(true);
    try {
      await useApi('get', `/verify/${code}`, undefined, { requiresAuth: true });
      toast.success(`User ${userName} was verified!`);
      refreshVerifications();
    } catch (err) {
      toast.error('Unexpected error, try again later.');
    }
    setIsLoading(false);
  };

  return (
    <Box
      padding={2}
      border='1px solid'
      borderRadius={8}
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      gap={1}
      sx={{ borderColor: 'primary.200', backgroundColor: 'primary.50' }}
    >
      <Box display='flex' flexDirection='column' gap={1}>
        <Typography level='h3' sx={{ color: 'primary.500' }}>
          {userName}
        </Typography>
        <Typography>{userEmail}</Typography>
      </Box>
      <Button onClick={handleVerify} variant={'outlined'} loading={isLoading}>
        <DoneIcon sx={{ marginRight: 2 }} />
        Verify user
      </Button>
    </Box>
  );
};

export default Verification;
