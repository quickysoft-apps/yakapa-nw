import { ReactElement } from 'react';
import { render } from 'react-dom';

export const renderExtension = <P>(element: ReactElement<P>, hotModule: NodeModule) => {
  const eventType = JSON.stringify({ inject: chrome.runtime.id });

  const onInject = (e: Event) => {
    console.log('Injecting extension component');
    inject(element);
  };

  document.removeEventListener(eventType, onInject);
  document.addEventListener(eventType, onInject);

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
