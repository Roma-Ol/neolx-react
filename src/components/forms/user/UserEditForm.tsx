import { Box, Button, Input, Select, Option } from '@mui/joy';
import { IUserEditFields } from '../../users/type.ts';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IUserEditFormProps, UserEditSchema } from './types.ts';
import Fieldset from '../Fieldset.tsx';
import React, { useState } from 'react';
import { useApi } from '../../../services/API';
import { toast } from 'react-toastify';

const UserEditForm: React.FC<IUserEditFormProps> = ({ values, entityId, handleSave }) => {
  const { name, email, phone, role, isVerified } = values;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<IUserEditFields>({
    defaultValues: {
      name,
      email,
      role,
      phone,
      isVerified,
    },
    resolver: zodResolver(UserEditSchema),
  });

  const onFormSubmit = async (data: IUserEditFields) => {
    setIsLoading(true);
    const { name, email, role, phone } = data;

    const body = { name, email, phone, role };

    try {
      await useApi('put', `/user/${entityId}`, body, { requiresAuth: true });
      toast.success('User was updated!');
      handleSave();
    } catch (err) {
      toast.error('Cannot update user, try again later.');
    }

    setIsLoading(false);
  };

  return (
    <Box display='flex' gap={2} flexDirection='column' maxWidth={600} width='100%'>
      {/* User Name. */}
      <Controller
        name='name'
        control={control}
        render={({ field: { value, onChange } }) => (
          <Fieldset
            label='Name'
            error={errors.name && errors.name.message}
            inputComponent={
              <Input
                placeholder='Name'
                required={true}
                onChange={onChange}
                value={value}
                error={!!errors.name}
              />
            }
          />
        )}
      />
      {/* User Email. */}
      <Controller
        name='email'
        control={control}
        render={({ field: { value, onChange } }) => (
          <Fieldset
            label='Email'
            error={errors.email && errors.email.message}
            inputComponent={
              <Input
                placeholder='Email'
                required={true}
                onChange={onChange}
                value={value}
                error={!!errors.email}
              />
            }
          />
        )}
      />
      {/* User Phone. */}
      <Controller
        name='phone'
        control={control}
        render={({ field: { value, onChange } }) => (
          <Fieldset
            label='Phone'
            error={errors.phone && errors.phone.message}
            inputComponent={
              <Input
                placeholder='Phone'
                required={true}
                onChange={onChange}
                value={value}
                error={!!errors.phone}
              />
            }
          />
        )}
      />

      {/* User Role. */}
      <Controller
        name='role'
        control={control}
        render={({ field: { value, onChange } }) => (
          <Fieldset
            label='Role'
            error={errors.role && errors.role.message}
            inputComponent={
              <Select
                placeholder='User role'
                value={value}
                onChange={(_e, newValue) => onChange(newValue)}
              >
                <Option value='admin'>Admin</Option>
                <Option value='manager'>Manager</Option>
              </Select>
            }
          />
        )}
      />

      <Button
        variant='solid'
        onClick={handleSubmit(onFormSubmit)}
        sx={{ marginLeft: 'auto' }}
        loading={isLoading}
      >
        Update
      </Button>
    </Box>
  );
};

export default UserEditForm;
