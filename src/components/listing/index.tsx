import { Box, Button, Typography } from '@mui/joy';
import React, { useState } from 'react';
import { IListingProps } from './types.ts';
import ListingEditDialog from './ListingEditDialog.tsx';
import EntityDeleteDialog from '../dialog/EntityDeleteDialog.tsx';
import { useApi } from '../../services/API';
import { toast } from 'react-toastify';

const Listing: React.FC<IListingProps> = ({
  id,
  title,
  description,
  price,
  isAdmin,
  isOwner,
  refreshListings,
}) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleDelete = () => setIsDeleteOpen(!isDeleteOpen);
  const toggleEdit = () => setIsEditOpen(!isEditOpen);

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      await useApi('delete', `/listing/${id}`, undefined, { requiresAuth: true });
      toast.success('Listing was deleted!');
      toggleDelete();
      refreshListings();
    } catch (err) {
      toast.error('Error while deleting the listing, try again!');
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
          {title}
        </Typography>
        <Typography>{description}</Typography>
        <Typography>Price: {price}$</Typography>
      </Box>
      <Box display='flex' flexDirection='column' gap={2}>
        {(isAdmin || isOwner) && (
          <>
            <Button onClick={toggleDelete} variant={'outlined'}>
              Delete
            </Button>
            <EntityDeleteDialog
              id={id}
              isOpen={isDeleteOpen}
              title={`Delete Listing?`}
              isLoading={isLoading}
              handleClose={toggleDelete}
              handleDelete={(id) => handleDelete(id)}
            />
          </>
        )}
        {isOwner && (
          <>
            <Button onClick={toggleEdit} variant={'outlined'}>
              Edit
            </Button>
            <ListingEditDialog
              fields={{ title, description, price }}
              isOpen={isEditOpen}
              handleClose={toggleEdit}
              refreshEntities={refreshListings}
              entityId={id}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default Listing;
