import { useState, useEffect } from 'react';
import { RegisteredExtension, findExtension, registerEvent, fireExtensionInjectEvent, ExtensionPart, getExtensionInjectEventType, ExtensionEventKind } from '../extensions';

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
      registerEvent({ type: getExtensionInjectEventType(ExtensionEventKind.Inject, ExtensionPart.All), token: extension.id }, () => {
        injectAllParts(extension.id);
      });
      injectAllParts(extension.id);
    });
  }, [installedExtensions]);

  return installedExtensions;
};

const injectAllParts = (extensionId?: string) => {
  if (extensionId) {
    fireExtensionInjectEvent(ExtensionPart.Menu, extensionId);
    fireExtensionInjectEvent(ExtensionPart.Content, extensionId);
  }
};
