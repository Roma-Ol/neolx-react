import { Box, Button, Input, Textarea, Typography } from '@mui/joy';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { IListingCreateFormFields, ListingCreateValidationSchema } from './types.ts';
import Fieldset from '../Fieldset.tsx';
import { useApi } from '../../../services/API';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ListingCreateForm = () => {
  const navigate = useNavigate();

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<IListingCreateFormFields>({
    resolver: zodResolver(ListingCreateValidationSchema),
  });

  const onFormSubmit = async (data: IListingCreateFormFields) => {
    const { title, description, price } = data;

    const body = { title, description, price };

    try {
      await useApi('post', '/listing', body, { requiresAuth: true });
      toast.success('New listing created!');
      navigate('/');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  return (
    <Box
      display='flex'
      gap={2}
      flexDirection='column'
      maxWidth={600}
      width='100%'
      margin='32px auto'
    >
      <Typography level='h3'>Create new Listing</Typography>

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
        Create
      </Button>
    </Box>
  );
};

export default ListingCreateForm;
