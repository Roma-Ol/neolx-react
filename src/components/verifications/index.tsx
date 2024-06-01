import { Box, Typography } from '@mui/joy';
import { useEffect, useState } from 'react';
import { useApi } from '../../services/API';
import Verification from '../verification';

export interface IVerificationEntity {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  code: string;
}

export interface IVerificationResponseEntity {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  code: string;
  createdAt: string;
  updatedAt: string;
}

const Verifications = () => {
  const [verifications, setVerifications] = useState<IVerificationEntity[]>([]);

  useEffect(() => {
    fetchVerifications();
  }, []);

  const fetchVerifications = async () => {
    try {
      const response: IVerificationResponseEntity[] = await useApi(
        'get',
        '/verifications',
        undefined,
        { requiresAuth: true },
      );

      setVerifications(
        response.map(({ _id, userId, userName, userEmail, code }) => ({
          _id,
          userId,
          userName,
          userEmail,
          code,
        })),
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <Typography level='h2' sx={{ color: 'primary.500' }}>
        Verifications:
      </Typography>
      {!!verifications.length && (
        <>
          {verifications.map((verification) => (
            <Verification
              verificationData={verification}
              refreshVerifications={fetchVerifications}
            />
          ))}
        </>
      )}
    </Box>
  );
};

export default Verifications;
