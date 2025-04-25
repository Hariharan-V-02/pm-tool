// src/routes/Router.tsx
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/mainlayout';
import UserFormPage from '../components/pages/employes';
import Projectmanagement from '../components/pages/project-management';
import Dashboard from '../components/pages/dashboard';
import Assigne from '../components/pages/assign';
import LoginPage from '../components/pages/login'; 
import PrivateRoute from '../components/pages/private-route';

function Router() {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/',
      element: (
        <PrivateRoute>
          <MainLayout />
        </PrivateRoute>
      ),
      children: [
        { path: '/', element: <Dashboard /> },
        { path: '/Projectmanagement', element: <Projectmanagement /> },
        { path: '/Empolyes', element: <UserFormPage /> },
        { path: '/assignment', element: <Assigne /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
