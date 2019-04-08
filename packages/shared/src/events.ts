export const registerEvent = <K extends keyof DocumentEventMap>(name: string, token: string, eventListener: (this: Document, ev: DocumentEventMap[K]) => any) => {
  const eventId = JSON.stringify({ [name]: token });
  document.removeEventListener(eventId, eventListener);
  document.addEventListener(eventId, eventListener);
};

export const fireEvent = (name: string, token: string) => {
  const event = document.createEvent('Event');
  event.initEvent(JSON.stringify({ [name]: token }));
  document.dispatchEvent(event);
};
