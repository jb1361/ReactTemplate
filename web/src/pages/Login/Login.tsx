import React, {ChangeEventHandler, FormEvent, useEffect, useState} from 'react';
import styles from './Login.module.scss';
import {Alert, Form, Image, Row} from 'react-bootstrap';
import {Link, Navigate} from 'react-router-dom';
import {
  BootstrapFormEvent,
  isEmailValid
} from '../../util';
import {isAuthenticated, userStore, UserWithToken} from '../../common/redux/entities/user';
import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux';
import {RoutePaths} from '../../router/RoutePaths';
import {AxiosResponse} from 'axios';
import {WebState} from '../../redux/types/WebState';
import {LoadingButton} from '../../components/util/widgets/LoadingButton/LoadingButton';
import {
  ErrorResponse,
  getErrorResponseMessage,
  getResponseData, isBadRequest,
  isServerError,
  isUnknownError
} from '../../common/util/http';
import {getLogoLink} from '../../appTheme';
import {login} from '../../api/authApi';
import {OnChangeFormControlType} from '../../common/types/util';

interface LoginForm {
  email: string;
  password: string;
}

export type UserErrorResponse = ErrorResponse<LoginForm>;

interface LoginPageState {
  redirectUrl: string;
  errorMessage: string;
  submitted: boolean;
  emailTouched: boolean;
  submitting: boolean;
  form: LoginForm;
  errors?: UserErrorResponse;
}

type Props = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>;

function Login(props: Props) {
  const {authenticated, actions: {setCurrentUser}} = props;

  const [redirectUrl, setRedirectUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<LoginForm>({email: '', password: ''});
  const [errors, setErrors] = useState<UserErrorResponse>();


  useEffect(() => {
    if (authenticated) {
      setRedirectUrl(RoutePaths.home);
    }
  });

  // Promise<AxiosResponse<UserWithToken>>
  const makeRequest = async () => {
      return await login(form);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!isEmailValid(form.email)) {
      setErrorMessage('Email address not valid.');
      return;
    }
    if (form.email.length === 0) {
      setErrorMessage('You must enter an email address.');
      return;
    }
    await trySubmit();
  };

  const trySubmit = async () => {
    try {
      setSubmitting(true);
      const resp = await makeRequest();
      setCurrentUser(resp.data);
      setRedirectUrl(RoutePaths.home);
    } catch (e) {
      if (isBadRequest(e)) {
        setSubmitting(false);
        setErrorMessage(getErrorResponseMessage(e));
        setErrors(getResponseData(e));
      } else if (isUnknownError(e) || isServerError(e)) {
        setSubmitting(false);
        setErrorMessage(isUnknownError(e) ? 'Could not make a connection!' : 'A server error has occurred');
      }
    }
  };

  const renderRedirect = () => {
    if (redirectUrl.length !== 0) {
      return <Navigate to={redirectUrl} />;
    }
    return null;
  };

    return (
      <div className={styles['login-page']}>
        {renderRedirect()}
        <div className={styles['logo']}>
          <Image alt='|ProjectName| Logo' src={getLogoLink()}/>
        </div>
        <div className={styles['login-form']}>
          <Form onSubmit={onSubmit}>
            <Row>
              <Form.Control
                required={true}
                type='text'
                name='email'
                placeholder='Email'
                onChange={(value: OnChangeFormControlType) => setForm({email: value.target.value, password: form.password})}
                value={form.email}
              />
            </Row>
            <br/>
            <Row>
              <Form.Control
                required={true}
                type='password'
                name='password'
                placeholder='Password'
                onChange={(value: OnChangeFormControlType) => setForm({email: form.email, password: value.target.value})}
                value={form.password}
              />
            </Row>
            <Row className={styles['login-button']}>
              <LoadingButton type='submit' loading={submitting} label='Login'/>
            </Row>
            {errorMessage ?
              <Alert style={{marginTop: '1rem'}} variant='danger'>{errorMessage}</Alert> : null}
          </Form>
        </div>
        <div className={styles['forgot-password']}>
          <Link to={RoutePaths.forgotPassword}>Forgot Password</Link>
        </div>
      </div>
    );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({actions: bindActionCreators({setCurrentUser: userStore.actions.setCurrentUser}, dispatch)});
const mapStateToProps = (state: WebState) => ({ authenticated: isAuthenticated(state)});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
