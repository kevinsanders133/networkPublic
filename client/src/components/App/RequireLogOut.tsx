import React from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from '../../redux/hooks';

const RequireLogOut = ({ children }: { children: JSX.Element }) => {

  const signedIn = useAppSelector(state => state.signedIn.value);

  const location = useLocation();

  if (!signedIn) {
    return children;
  }

  return <Navigate to='/' state={{ from: location }} replace />;
};

export default RequireLogOut;