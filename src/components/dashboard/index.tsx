import React, { useEffect, useState } from 'react';
import { Box } from '@mui/joy';
import { IListingEntity } from '../forms/listing/types.ts';
import { useApi } from '../../services/API';
import Listing from '../listing';
import { useAuth } from '../../services/auth/authContext.tsx';

const Dashboard: React.FC = () => {
  const [listings, setListings] = useState<IListingEntity[]>([]);
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === 'admin';

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response: IListingEntity[] = await useApi('get', '/listing/all');

      setListings(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box display='flex' flexDirection='column' gap={2}>
      {!!listings.length && (
        <>
          {listings.map(({ _id, title, description, price, author }) => (
            <Listing
              isAdmin={isAdmin}
              key={_id}
              title={title}
              description={description}
              price={price}
              author={author}
              id={_id}
              refreshListings={fetchListings}
            />
          ))}
        </>
      )}
    </Box>
  );
};

export default Dashboard;
