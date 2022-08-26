import React, {useState} from 'react';
import {Container} from 'react-bootstrap';
import styles from './PublicRouter.module.scss';
import {connect} from 'react-redux';
import {useMount} from '../../hooks/useMount';
import {CenteredSpinner} from '../../components/util/widgets/CenteredSpinner/CenteredSpinner';
import {bindActionCreators, Dispatch} from 'redux';
import {WebState} from '../../redux/types/WebState';
import {RoutePaths} from '../../router/RoutePaths';
import {Navigate, useSearchParams} from 'react-router-dom';
import PublicRouterRoutes from './PublicRouterRoutes';

type Props = {id: string} & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

function PublicRouter(props: Props) {
  const {id} = props;

  const [params] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [redirectUrl, setRedirectUrl] = useState('');


  const renderRedirect = () => {
    if (redirectUrl.length !== 0) {
      return <Navigate to={redirectUrl} />;
    }
    return null;
  };

  const renderContent = () => {
    return (
      <>
        {renderRedirect()}
        <PublicRouterRoutes/>
      </>
    );
  };

  return (
      <Container fluid={true} className={styles['config-container']}>
        {loading ?  <CenteredSpinner/> : renderContent()}
      </Container>
  );

}

const mapDispatchToProps = (dispatch: Dispatch) => ({});
const mapStateToProps = (state: WebState) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(PublicRouter);
