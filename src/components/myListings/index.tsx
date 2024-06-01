import React, { useEffect, useState } from 'react';
import { Box } from '@mui/joy';
import { IListingEntity } from '../forms/listing/types.ts';
import { useApi } from '../../services/API';
import Listing from '../listing';

const MyListings: React.FC = () => {
  const [listings, setListings] = useState<IListingEntity[]>([]);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response: IListingEntity[] = await useApi('get', '/listing/my', undefined, {
        requiresAuth: true,
      });

      console.log(response);
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
              isOwner={true}
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

export default MyListings;
