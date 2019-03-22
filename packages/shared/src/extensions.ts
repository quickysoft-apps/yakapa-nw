import { ReactElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

export const renderExtension = <P>(element: ReactElement<P>, hotModule: NodeModule) => {
  const injectEvent = JSON.stringify({ inject: chrome.runtime.id });
  const removeEvent = JSON.stringify({ remove: chrome.runtime.id });

  const onInject = (e: Event) => {
    console.log('Injecting extension component');
    inject(element);
  };

  const onRemove = (e: Event) => {
    console.log('Removing extension component');
    remove(element);
  };

  document.removeEventListener(injectEvent, onInject);
  document.addEventListener(injectEvent, onInject);

  document.removeEventListener(removeEvent, onRemove);
  document.addEventListener(removeEvent, onRemove);

  if (hotModule.hot) {
    hotModule.hot.accept(function() {
      const id = chrome.runtime.id;
      console.log('Hot reload extension', chrome.runtime.getManifest().name, `(chrome-extension://${id})`);
      inject(element);
    });
  }
};

const inject = <P>(element: ReactElement<P>) => {
  const root = document.getElementById('extension');
  if (root) {
    render(element, root);
  }
};

const remove = <P>(element: ReactElement<P>) => {
  const root = document.getElementById('extension');
  if (root) {
    unmountComponentAtNode(root);
  }
};
