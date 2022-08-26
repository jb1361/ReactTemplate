import React, {CSSProperties} from 'react';
import {Col, Form, Row} from 'react-bootstrap';

type Props = React.PropsWithChildren & {
  label: string;
  columnSize?: number;
  labelSize?: number;
  hidden?: boolean;
  style?: CSSProperties;
  hintText?: string;
};

export const InputRow = ({columnSize, labelSize, hidden, label, style, hintText, children}: Props) => {
  return (
    <Form.Group as={Row} hidden={hidden} style={style}>
      <Form.Label column={true} sm={labelSize || 2}>{label}</Form.Label>
      <Col sm={columnSize || 4}>
        {children}
      </Col>
      {!!hintText &&
        <Col sm={6}>
          <span>{hintText}</span>
        </Col>
      }
    </Form.Group>
  );
};
