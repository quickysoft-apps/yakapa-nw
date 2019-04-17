export const registerEvent = <K extends keyof DocumentEventMap>(name: string, token: string, eventListener: (this: Document, ev: DocumentEventMap[K]) => any) => {
  const eventId = JSON.stringify({ [name]: token });
  console.log('Register event', eventId);
  document.removeEventListener(eventId, eventListener);
  document.addEventListener(eventId, eventListener);
};

export const fireEvent = (name: string, token: string) => {
  const event = document.createEvent('Event');
  const eventId = JSON.stringify({ [name]: token });
  console.log('Fire event', eventId);
  event.initEvent(eventId);
  document.dispatchEvent(event);
};
