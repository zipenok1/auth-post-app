import { Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes, auhtRoutes } from '../router/index.js';
import { checkAuth } from '../utils/auth.js';

function AppRouter() {
  const isAuth = checkAuth();

  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route path={route.path} element={<route.component />} key={route.path} />
      ))}
      {isAuth && auhtRoutes.map((route) => <Route path={route.path} element={<route.component />} key={route.path} />)}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRouter;
