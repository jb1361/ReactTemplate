import {Route, RouteProps, Navigate} from 'react-router';
import React from 'react';
import {
  mapIsAuthenticatedToProps,
  mapIsAuthenticatedToPropsType
} from '../../../common/redux/entities/user';
import {connect} from 'react-redux';
import { useLocation } from 'react-router-dom';
import {RoutePaths} from '../../../router/RoutePaths';

type PrivateRouteProps = mapIsAuthenticatedToPropsType & {
  children: JSX.Element;
};

function PrivateRouteComponent({children, authenticated}: PrivateRouteProps) {
  const location = useLocation();
  return (
    authenticated ? children : (
      <Navigate to={RoutePaths.login} state={{ from: location }} replace={true}/>
    )
  );
}

export const PrivateRoute = connect(mapIsAuthenticatedToProps)(PrivateRouteComponent);
