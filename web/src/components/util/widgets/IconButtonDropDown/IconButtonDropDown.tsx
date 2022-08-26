import IconButton from '../IconButton/IconButton';
import {Dropdown, DropdownProps} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import React, {useState} from 'react';
import {ToggleEvent} from '@restart/ui/Dropdown';

export type IconButtonDropDownOption = {
  link?: string;
  onClick?: () => void | string;
  label: string;
};

interface ToggleMetadata {
  source: string | undefined;
  originalEvent: ToggleEvent | undefined;
}

interface Props {
  drop?: DropdownProps['drop'];
  options: IconButtonDropDownOption[];
}

export function IconButtonDropDown({options, drop}: Props) {
  const [show, setShow] = useState(false);
  const onToggle = (  nextShow: boolean,
                      meta: ToggleMetadata ) => {
    setShow(nextShow);
  };
  return (
    <Dropdown show={show} onToggle={onToggle} drop={drop}>
      <IconButton
        icon={'plus-circle'}
        size={'1x'}
        styles={{marginLeft: 20}}
        onClick={() => setShow(true)}
      />
      <Dropdown.Menu>
        {options.map((o, i) => {
          const inner = <Dropdown.Item key={i}>{o.label}</Dropdown.Item>;
          return !!o.link ? (<LinkContainer key={i} to={o.link}>{inner}</LinkContainer>) : inner;
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}
