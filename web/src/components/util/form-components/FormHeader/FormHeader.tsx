import {Alert, Button, Card, Col, Form, Row} from 'react-bootstrap';
import styles from './FormHeader.module.scss';
import {LoadingButton} from '../../widgets/LoadingButton/LoadingButton';
import React, {SyntheticEvent, useCallback} from 'react';
import IconButton from '../../widgets/IconButton/IconButton';
import {Link, Navigate} from 'react-router-dom';
import {Prompt} from '../../../../util/Prompt';
import {combineClasses} from '../../../../util';

interface FormHeaderProps {
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
}

export function FormHeader(props: FormHeaderProps) {
  const {title, editable, isNew, saving, onCancel, onClone, onDelete, redirectUrl, backUrl} = props;
  const onEdit = useCallback(
    (e: SyntheticEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (props.onEdit) {
        props.onEdit();
      }
    }, [props]);
  return (
    <>
      <Row style={{marginBottom: '1rem'}}>
        {backUrl ?
          (
            <Link
              to={backUrl}
            >
              <IconButton
                icon={'angle-left'}
                size={'2x'}
                iconToolTipText={'Back'}
                color={'#005A9C'}
              />
            </Link>
          )
          : null}
        <div style={{display: 'flex', alignItems: 'center', marginLeft: '20px'}}>
          <Card.Title>{(isNew ? 'New' : editable ? 'Edit' : 'View') + ` ${title}`}</Card.Title>
        </div>
        <Col className='d-flex align-items-center justify-content-end'>
          {onDelete && !editable && <Button onClick={onDelete} className={combineClasses(styles['btn-with-margin'], 'btn-danger')}>Delete</Button>}
          {onClone && !editable && <IconButton size='2x' icon='copy' onClick={onClone} className={styles['btn-with-margin']} iconToolTipText='Clone'/>}
          {editable && <Button className={styles['form-buttons']} variant='danger' onClick={onCancel}>Cancel</Button>}
          <LoadingButton
            loading={saving}
            label={editable ? 'Save' : 'Edit'}
            className={styles['form-buttons']}
            type={editable ? 'submit' : 'button'}
            variant='primary'
            disabled={saving || (!editable && !props.onEdit)}
            onClick={!editable ? onEdit : undefined}
          />
        </Col>

      </Row>
      <Prompt when={editable && !redirectUrl} message='Are you sure you want to leave and cancel changes?' />
      <Alert show={!!props.errorMessage} variant='danger'>{props.errorMessage}</Alert>
      {redirectUrl ? <Navigate to={redirectUrl}/> : null}
    </>
  );
}
