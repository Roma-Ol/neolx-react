import { Box, Button, Input, Typography } from '@mui/joy';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Fieldset from '../../forms/Fieldset.tsx';
import { IRegisterFields, RegisterUserSchema } from './types.ts';
import { useApi } from '../../../services/API';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<IRegisterFields>({
    resolver: zodResolver(RegisterUserSchema),
  });

  const handleRegister = async (data: IRegisterFields) => {
    try {
      const response = await useApi('post', '/register', data);
      toast.success('Successfully registered, now you can log in');
      console.log(response);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      gap={2}
      maxWidth={600}
      width='100%'
      margin='32px auto'
    >
      <Typography level='h2' sx={{ color: 'primary.500' }}>
        Register
      </Typography>
      {/* Name Field. */}
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

      {/* Phone Field. */}
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
      {/* Email Field. */}
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
      {/* Password Field. */}
      <Controller
        name='password'
        control={control}
        render={({ field: { value, onChange } }) => (
          <Fieldset
            label='Password'
            error={errors.password && errors.password.message}
            inputComponent={
              <Input
                placeholder='Password'
                required={true}
                onChange={onChange}
                value={value}
                error={!!errors.password}
              />
            }
          />
        )}
      />
      <Button variant='outlined' component={Link} to='/login'>
        Log In
      </Button>
      <Button variant='solid' onClick={handleSubmit(handleRegister)}>
        Register
      </Button>
    </Box>
  );
};

export default Register;
