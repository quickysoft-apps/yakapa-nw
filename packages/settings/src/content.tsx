import React from 'react';
import { renderExtension } from '@yakapa/shared';
import { ChatForm } from './components/ChatForm';

const Content = () => {
  return <ChatForm />;
};

renderExtension(<Content />, module);
