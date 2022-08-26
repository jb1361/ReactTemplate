import {Form} from 'react-bootstrap';
import React, {CSSProperties, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';


interface InputProps {
  disabled?: boolean;
  label: string;
  id?: string;
  className?: string;
  onChange: (value: boolean) => void;
  value: boolean;
  style?: CSSProperties;
}

export function CheckBox({id, label, onChange, value, disabled, className, style}: InputProps) {
  const [genId] = useState(uuidv4());
  return (
    <Form.Check
      className={className}
      type='checkbox'
      label={label}
      style={style}
      id={`${id ?? 'checkbox'}-${genId}`}
      checked={value}
      onChange={() => onChange(!value)}
      disabled={disabled}
    />
  );
}
