import * as React from 'react';
import {unstable_HistoryRouter as HistoryRouter, Route, Routes} from 'react-router-dom';
import History from './history';
import NotFound from '../pages/NotFound/NotFound';
import {PrivateRoute} from '../components/util/PrivateRoute/PrivateRoute';
import Login from '../pages/Login/Login';
import {RoutePaths} from './RoutePaths';
import {LogOut} from '../pages/Logout/Logout';
import {Home} from '../pages/Home/Home';

const AppRoutes = () => (
    <Routes>
      <Route path={RoutePaths.login} element={<Login/>}/>
      <Route path={RoutePaths.logout} element={<LogOut/>}/>


      <Route
        path={RoutePaths.root}
        element={
          <PrivateRoute>
            <Routes>
              <Route path={RoutePaths.home} element={<Home/>}/>
              <Route path={RoutePaths.hometwo} element={<Home/>}/>
              <Route path={RoutePaths.all} element={<NotFound/>}/>
            </Routes>
          </PrivateRoute>
        }
      />

      <Route path={RoutePaths.all} element={<NotFound/>}/>
    </Routes>
);

export default AppRoutes;
