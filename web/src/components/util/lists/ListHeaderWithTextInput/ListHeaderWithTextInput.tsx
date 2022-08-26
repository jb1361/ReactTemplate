import {Col, Form, Row} from 'react-bootstrap';
import {InputIconButton} from '../../widgets/InputIconButton/InputIconButton';
import React, { useState} from 'react';
import {CommonListHeaderProps} from '../ListHeaderWithDropDown/ListHeaderWithDropDown';
import {OnChangeFormControlType} from '../../../../common/types/util';

export type ResetValueFunc = () => void;

interface Props extends CommonListHeaderProps {
  onAdd: (value: string, resetValue: ResetValueFunc) => void;
}

export function ListHeaderWithTextInput({label, disableAddButton, onAdd, extraDropDown}: Props) {
  const [value, setFieldValue] = useState<string>('');
  return (
    <Row style={{paddingTop: '2rem'}}>
      <Form.Label column={true} sm={extraDropDown ? 6 : 8} style={{marginBottom: 20}}>{label}</Form.Label>
      {!disableAddButton && (
        <>
          {extraDropDown && <Col sm={3}>{extraDropDown}</Col>}
          <Col sm={extraDropDown ? 3 : 4}>
            <InputIconButton
              inputComponent={(
                <Form.Control
                  value={value}
                  onChange={(e: OnChangeFormControlType) => setFieldValue(e.currentTarget.value ?? '')}
                />
              )}
              icon='plus-circle'
              iconToolTip=''
              onClick={() => value !== undefined ? onAdd(value!, () => setFieldValue('')) : null}
            />
          </Col>
        </>)}
    </Row>
  );
}
