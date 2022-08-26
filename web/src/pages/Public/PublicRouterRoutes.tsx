import * as React from 'react';
import {Route, Routes} from 'react-router-dom';
import {convertComponentPaths, RoutePath, RoutePaths} from '../../router/RoutePaths';
import {RouteRenderer} from '../../router/RouteRenderer';
import NotFound from '../NotFound/NotFound';

interface Props {
}

const routes: RoutePath[] = [
  ...convertComponentPaths()
];

const PublicRouterRoutes = (props: Props) => (
  <Routes>
    <RouteRenderer routePaths={routes}/>
    <Route element={<NotFound/>}/>
  </Routes>
);

export default PublicRouterRoutes;
