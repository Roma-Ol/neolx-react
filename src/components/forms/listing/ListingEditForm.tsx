import { Box, Button, Input, Textarea } from '@mui/joy';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  IListingCreateFormFields,
  IListingEditFormProps,
  ListingCreateValidationSchema,
} from './types.ts';
import Fieldset from '../Fieldset.tsx';
import { useApi } from '../../../services/API';
import { toast } from 'react-toastify';
import React from 'react';

const ListingEditForm: React.FC<IListingEditFormProps> = ({ values, entityId, handleSave }) => {
  const { title, description, price } = values;

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<IListingCreateFormFields>({
    defaultValues: {
      title,
      description,
      price,
    },
    resolver: zodResolver(ListingCreateValidationSchema),
  });

  const onFormSubmit = async (data: IListingCreateFormFields) => {
    const { title, description, price } = data;

    const body = { title, description, price };

    try {
      await useApi('put', `/listing/${entityId}`, body, { requiresAuth: true });
      toast.success('Listing was updated!');
      handleSave();
    } catch (err) {
      toast.error('Cannot update listing, try again later.');
    }
  };

  return (
    <Box display='flex' gap={2} flexDirection='column' maxWidth={600} width='100%'>
      {/* Title field. */}
      <Controller
        name='title'
        control={control}
        render={({ field: { value, onChange } }) => (
          <Fieldset
            label='Title'
            error={errors.title && errors.title.message}
            inputComponent={
              <Input
                placeholder='Title'
                required={true}
                onChange={onChange}
                value={value}
                error={!!errors.title}
              />
            }
          />
        )}
      />

      {/* Description field. */}
      <Controller
        name='description'
        control={control}
        render={({ field: { value, onChange } }) => (
          <Fieldset
            label='Description'
            error={errors.description && errors.description.message}
            inputComponent={
              <Textarea
                placeholder='Description'
                required={true}
                onChange={onChange}
                value={value}
                error={!!errors.title}
                minRows={4}
              />
            }
          />
        )}
      />

      {/* Price field. */}
      <Controller
        name='price'
        control={control}
        render={({ field: { value, onChange } }) => (
          <Fieldset
            label='Price'
            error={errors.price && errors.price.message}
            inputComponent={
              <Input
                type='number'
                placeholder='Price'
                required={true}
                onChange={onChange}
                value={value}
                error={!!errors.title}
              />
            }
          />
        )}
      />

      <Button variant='solid' onClick={handleSubmit(onFormSubmit)} sx={{ marginLeft: 'auto' }}>
        Update
      </Button>
    </Box>
  );
};

export default ListingEditForm;
