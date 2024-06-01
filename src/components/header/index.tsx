import { Box, Button } from '@mui/joy';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/auth/authContext.tsx';
import AddIcon from '@mui/icons-material/Add';

const Header = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const isAdmin = currentUser?.role === 'admin';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box
      color='typography.white'
      padding={2}
      borderRadius={5}
      display='flex'
      alignItems='center'
      gap={2}
      sx={{
        backgroundColor: 'primary.400',
        a: { color: 'typography.white' },
      }}
    >
      <Link to={'/'}>Dashboard</Link>
      {currentUser && <Link to={'/user/listings'}>My listings</Link>}
      {isAdmin && <Link to={'/user/all'}>Users</Link>}
      {isAdmin && <Link to={'/user/verifications'}>Verifications</Link>}

      <Box display='flex' alignItems='center' gap={2} sx={{ marginLeft: 'auto' }}>
        {currentUser && (
          <Button component={Link} to={'/listing/create'}>
            <AddIcon />
            Listing
          </Button>
        )}

        {currentUser ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Button component={Link} to={'/login'}>
            Login
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Header;
