import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../services/auth/authContext.tsx';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ILoginFields, LoginUserSchema } from './types.ts';
import { Box, Button, Input, Typography } from '@mui/joy';
import Fieldset from '../../forms/Fieldset.tsx';
import { toast } from 'react-toastify';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (data: ILoginFields) => {
    try {
      const { email, password } = data;
      await login(email, password);
      navigate('/');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<ILoginFields>({
    resolver: zodResolver(LoginUserSchema),
  });

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
        Log in
      </Typography>

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
      <Button variant='outlined' component={Link} to='/register'>
        Register
      </Button>

      <Button variant='solid' onClick={handleSubmit(handleLogin)}>
        Log In
      </Button>
    </Box>
  );
};

export default Login;
