import { Route, Routes } from 'react-router-dom';
import Dashboard from '../components/dashboard';
import Login from '../components/auth/login';
import { useAuth } from '../services/auth/authContext.tsx';
import ListingCreateForm from '../components/forms/listing/ListingCreateForm.tsx';
import ProtectedRoute from './protectedRoute.tsx';
import MyListings from '../components/myListings';
import AllUsers from '../components/users/AllUsers.tsx';
import Verifications from '../components/verifications';
import Register from '../components/auth/register';

const Pages = () => {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route
        path='listing/create'
        element={
          <ProtectedRoute user={currentUser}>
            <ListingCreateForm />
          </ProtectedRoute>
        }
      />
      <Route
        path='user/listings'
        element={
          <ProtectedRoute user={currentUser}>
            <MyListings />
          </ProtectedRoute>
        }
      />
      <Route
        path='user/all'
        element={
          <ProtectedRoute user={currentUser} adminOnly>
            <AllUsers />
          </ProtectedRoute>
        }
      />
      <Route
        path='user/verifications'
        element={
          <ProtectedRoute user={currentUser} adminOnly>
            <Verifications />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Pages;
