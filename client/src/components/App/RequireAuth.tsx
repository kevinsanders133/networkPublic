import React from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from '../../redux/hooks';

const RequireAuth = ({ children }: { children: JSX.Element }) => {

  const signedIn = useAppSelector(state => state.signedIn.value);

  const location = useLocation();

  if (!signedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;