import React, { FC } from 'react';

import { anyFunction } from '../../lib/util';

import Icon from '../icon';

import { SInput } from './styled';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  reset?: anyFunction;
}

const Input: FC<Props> = props => (
  <SInput>
    <Icon iconType="cross" onClick={props.reset} />
    <input {...{ ...props, reset: undefined }} />
  </SInput>
);

export default Input;
