import { useState, useEffect } from 'react';
import { RegisteredExtension, findExtension, fireEvent, ExtensionEvent, registerEvent } from '../extensions';

let staticInstalledExtensions: RegisteredExtension[] = [];

export const useInstalledExtensions = (extensions: RegisteredExtension[], reload?: boolean) => {
  const [installedExtensions, setInstalledExtensions] = useState<RegisteredExtension[]>([]);

  const retrieveInstalledExtensions = async () => {
    const foundinstalledExtensions = await extensions.reduce(async (accumulator, extension) => {
      const foundInstalledExtension = !!extension.shortName && (await findExtension(extension.shortName));
      if (foundInstalledExtension) {
        return [...(await accumulator), { ...extension, id: foundInstalledExtension.id }];
      } else {
        return accumulator;
      }
    }, Promise.resolve([] as RegisteredExtension[]));

    staticInstalledExtensions = [...foundinstalledExtensions];
    setInstalledExtensions(foundinstalledExtensions.sort((a, b) => a.index - b.index));
  };

  useEffect(() => {
    if (reload || !staticInstalledExtensions.length) {
      retrieveInstalledExtensions();
    }
  });

  useEffect(() => {
    installedExtensions.forEach(extension => {
      registerEvent({ type: ExtensionEvent.RenderReady, token: extension.id }, () => {
        fireEvent({ type: ExtensionEvent.InjectMenu, token: extension.id });
        fireEvent({ type: ExtensionEvent.InjectContent, token: extension.id });
      });
      fireEvent({ type: ExtensionEvent.InjectMenu, token: extension.id });
      fireEvent({ type: ExtensionEvent.InjectContent, token: extension.id });
    });
  }, [installedExtensions]);

  return installedExtensions;
};
