import * as React from 'react';
import {Button, Spinner} from 'react-bootstrap';
// tslint:disable-next-line:no-submodule-imports
import {ButtonProps} from 'react-bootstrap/Button';
import {SyntheticEvent} from 'react';
import IconButton from '../IconButton/IconButton';

interface LoadingButtonProps {
  loading: boolean;
  label: string;
  className?: string;
  type?: ButtonProps['type'];
  variant?: ButtonProps['variant'];
  disabled?: boolean;
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void;
  iconButtons?: boolean;
}

export const LoadingButton = ({variant, onClick, className, disabled, label, loading, type, iconButtons = false}: LoadingButtonProps) => {
  if (!iconButtons) {
    return (
      <Button disabled={loading || disabled} variant={variant ?? 'primary'} type={type || 'button'} className={className} onClick={onClick}>
        { loading ?
          <Spinner
            as='span'
            animation='border'
            size='sm'
            role='status'
            aria-hidden='true'
          /> : label}
      </Button>
    );
  } else {
    return (
      <>
        {loading ?
          (
            <Spinner
              as='span'
              animation='border'
              size='sm'
              role='status'
              aria-hidden='true'
            />
          )
            :
          <>
            <Button disabled={loading || disabled} variant={variant ?? 'primary'} type={type || 'button'} className={className} onClick={onClick}>
              <IconButton
                icon={label === 'Edit' ? 'pen' : 'check'}
                color={'#005A9C'}
                customSize={label !== 'Edit' ? 20 : undefined}
              />
            </Button>
          </>
        }
      </>
    );
  }
};
