import React from 'react';
import {usePrompt} from './useBlocker';

type PromptProps = {
  message: string;
  when: boolean;
};

export function Prompt({message, when}: PromptProps) {
  return <>{usePrompt(message, when)}</>;
}
