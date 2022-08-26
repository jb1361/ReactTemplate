import Input from '../form-components/formik-inputs/Input/Input';
import React from 'react';
import {Form} from 'react-bootstrap';
import styles from '../form-components/formik-inputs/Input/Input.module.scss';
import {OnChangeFormControlType} from '../../../common/types/util';

export interface EditableProps {
  editable: boolean;
}

type ExpandableTextBoxProps = {
  value: string;
  rows: number;
  onChange: (v: string) => void;
} & EditableProps;

export function ExpandableTextBox({value, rows, onChange, editable}: ExpandableTextBoxProps) {
  return (
    <Form.Control
      as='textarea'
      className={styles['form-inputs']}
      rows={rows}
      value={value}
      onChange={(e: OnChangeFormControlType) => onChange(e.currentTarget.value!)}
      disabled={!editable}
      type='textarea'
    />
  );
}

type ExpandableTextBoxInputProps = {
  rows: number;
  name: string;
} & EditableProps;

export function ExpandableTextBoxInput({name, rows, editable}: ExpandableTextBoxInputProps) {
  return (
    <Input type='textarea' rows={rows} name={name} disabled={!editable}/>
  );
}
