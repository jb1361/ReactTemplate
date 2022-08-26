import {Alert, Button, Col, Form, Row} from 'react-bootstrap';
import styles from './FormFooter.module.scss';
import {LoadingButton} from '../../widgets/LoadingButton/LoadingButton';
import React, {SyntheticEvent, useCallback} from 'react';
import IconButton from '../../widgets/IconButton/IconButton';
import {Navigate} from 'react-router-dom';
import {combineClasses} from '../../../../util';
import {Prompt} from '../../../../util/Prompt';

interface FormFooterProps {
  title: string;
  backUrl?: string;
  editable: boolean;
  isNew: boolean;
  saving: boolean;
  onCancel: () => void;
  onEdit?: () => void;
  onClone?: () => void;
  onDelete?: () => void;
  errorMessage?: string;
  redirectUrl?: string;
  iconButtons: boolean;
}

export function FormFooter(props: FormFooterProps) {
  const {editable, saving, onCancel, onClone, onDelete, redirectUrl, iconButtons} = props;
  const onEdit = useCallback(
    (e: SyntheticEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (props.onEdit) {
        props.onEdit();
      }
    }, [props]);

  const renderButtons = () => {
    if (!iconButtons) {
      return (
        <>
          {onDelete && !editable && <Button onClick={onDelete} className={combineClasses(styles['btn-with-margin'], 'btn-danger')}>Delete</Button>}
          {onClone && !editable && <IconButton size='2x' icon='copy' onClick={onClone} className={styles['btn-with-margin']} iconToolTipText='Clone'/>}
          {editable && <Button className={styles['form-buttons']} variant='danger' onClick={onCancel}>Cancel</Button>}
        </>
      );
    } else {
      return (
        <>
          {editable && <IconButton onClick={onCancel} icon={'times'} color={'#005A9C'} customSize={22}/>}
          {onDelete && !editable &&  <IconButton onClick={onDelete} icon={'minus'} color={'#005A9C'}/>}
        </>
      );
    }
  };

  return (
    <>
      <Row style={{marginBottom: '1rem', marginTop: 'auto'}}>
        <Col className='d-flex align-items-center justify-content-start'>
          <LoadingButton
            loading={saving}
            label={editable ? 'Save' : 'Edit'}
            className={iconButtons ? styles['form-button-icons'] : styles['form-buttons']}
            type={editable ? 'submit' : 'button'}
            variant='primary'
            disabled={saving || (!editable && !props.onEdit)}
            onClick={!editable ? onEdit : undefined}
            iconButtons={iconButtons}
          />
          {renderButtons()}
        </Col>
      </Row>
      <Prompt when={editable && !redirectUrl} message='Are you sure you want to leave and cancel changes?' />
      <Alert show={!!props.errorMessage} variant='danger'>{props.errorMessage}</Alert>
      {redirectUrl ? <Navigate to={redirectUrl}/> : null}
    </>
  );
}
