import React, {useEffect, useState} from 'react';
import {useField, useFormikContext} from 'formik';
import {getFieldValue} from '../../../../../util';
import {RedErrorMessage} from '../../RedErrorMessage/RedErrorMessage';

interface InputProps {
  name: string;
  type?: 'number' | 'text' | 'password' | 'email' | 'textarea' | 'color';
  disabled?: boolean;
  rows?: number;
  defaultValue?: any;
  emptyAsNull?: boolean;
  placeholder?: string;
  autoComplete?: string;
  overrideDebouncePeriod?: number;
}

const StaticHeading = (props: InputProps) => {
  const {name} = props;
  const [{value}] = useField(name);
  const {setFieldValue} = useFormikContext<any>();
  if (!value && props.defaultValue) {
    setFieldValue(name, props.defaultValue, true);
  }
  const [localValue, setLocalValue] = useState('');
  useEffect(() => {
    setLocalValue(getFieldValue(value));
  }, [value]);
  return (
    <React.Fragment>
      <h4>{localValue}</h4>
      <RedErrorMessage name={props.name}/>
    </React.Fragment>
  );
};

export default StaticHeading;
