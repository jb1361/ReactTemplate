import {Navigate} from 'react-router';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {RoutePaths} from '../../router/RoutePaths';
import {logout} from '../../api/authApi';

type LogoutProps = ReturnType<typeof mapDispatchToProps>;

export function LogOutComponent(props: LogoutProps) {
  props.logout();
  return (
    <Navigate
      to={{
        pathname: RoutePaths.home
      }}
    />
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({logout: logout}, dispatch);

export const LogOut = connect(undefined, mapDispatchToProps)(LogOutComponent);
