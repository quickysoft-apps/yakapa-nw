export interface RegisteredExtensionCollection {
  extensions: RegisteredExtension[];
}

export type RegisteredExtension = Partial<chrome.management.ExtensionInfo> & {
  hidden?: boolean;
};
