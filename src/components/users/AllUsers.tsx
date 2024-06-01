import { Box } from '@mui/joy';
import { useEffect, useState } from 'react';
import { useApi } from '../../services/API';
import { IUserEntity, IUserResponseEntity } from './type.ts';
import User from './User.tsx';

const AllUsers = () => {
  const [users, setUsers] = useState<IUserEntity[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response: IUserResponseEntity[] = await useApi('get', '/user/all', undefined, {
        requiresAuth: true,
      });

      setUsers(
        response.map(({ _id, name, email, phone, isVerified, role }) => ({
          _id,
          name,
          email,
          phone,
          isVerified,
          role,
        })),
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box display='flex' flexDirection='column' gap={2}>
      {!!users.length && (
        <>
          {users.map((user) => (
            <User key={user._id} user={user} refreshUsers={fetchUsers} />
          ))}
        </>
      )}
    </Box>
  );
};

export default AllUsers;
