import React, { useState } from 'react';
import { IUserProps } from './type.ts';
import { Box, Button, Typography } from '@mui/joy';
import DoneIcon from '@mui/icons-material/Done';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EntityDeleteDialog from '../dialog/EntityDeleteDialog.tsx';
import { useApi } from '../../services/API';
import { toast } from 'react-toastify';
import EntityEditDialog from '../dialog/EntityEditDialog.tsx';
import UserEditForm from '../forms/user/UserEditForm.tsx';

const User: React.FC<IUserProps> = ({ user, refreshUsers }) => {
  const { _id, name, email, phone, isVerified, role } = user;
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleDelete = () => setIsDeleteOpen(!isDeleteOpen);
  const toggleEdit = () => setIsEditOpen(!isEditOpen);

  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      await useApi('delete', `/user/${id}`, undefined, { requiresAuth: true });
      toast.success(`User ${name} was deleted!`);
      toggleDelete();
      refreshUsers();
    } catch (err) {
      toast.error('Error while deleting the user, try again!');
    }

    setIsLoading(false);
  };

  const handleUpdate = async () => {
    toast.success('Updated successfully!');
    toggleEdit();
    refreshUsers();
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
          {name}
        </Typography>
        <Typography>{email}</Typography>
        <Typography>{phone}</Typography>
        <Typography>Role: {role}</Typography>
        <Typography
          color={isVerified ? 'success' : 'danger'}
          display='flex'
          alignItems='center'
          gap={2}
        >
          {isVerified ? (
            <>
              <DoneIcon /> Verified user
            </>
          ) : (
            <>
              <ErrorOutlineIcon />
              This user is not verified.
            </>
          )}
        </Typography>
      </Box>

      <Box display='flex' flexDirection='column' gap={2}>
        <Button onClick={toggleEdit} variant={'outlined'}>
          <CreateIcon sx={{ marginRight: 2 }} />
          Edit
        </Button>
        <Button onClick={toggleDelete} variant={'outlined'}>
          <DeleteOutlineIcon sx={{ marginRight: 2 }} />
          Delete
        </Button>
      </Box>

      <EntityDeleteDialog
        id={_id}
        isOpen={isDeleteOpen}
        isLoading={isLoading}
        title={`Delete user ${name}?`}
        handleClose={toggleDelete}
        handleDelete={(id) => handleDelete(id)}
      />

      <EntityEditDialog
        isOpen={isEditOpen}
        handleClose={toggleEdit}
        form={
          <UserEditForm
            values={{ name, phone, email, isVerified }}
            entityId={_id}
            handleSave={handleUpdate}
          />
        }
      />
    </Box>
  );
};

export default User;
