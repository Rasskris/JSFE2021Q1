// import { EventHandler } from '../types';
import { EventProvider, Loader } from '../libs';

export type EventHandler = (target: HTMLElement, loader: Loader) => Promise<void> | void;

const registerEvent = (
  element: HTMLElement,
  eventName: string,
  customEventName: string,
  eventHandler: EventHandler,
  eventProvider: EventProvider,
  loader: Loader,
): void => {
  eventProvider.addEventListener(customEventName, eventHandler);

  element.addEventListener(`${eventName}`, (event) => {
    if (eventName === 'submit') {
      event.preventDefault();
    }

    const targetElement = event.target as HTMLLIElement;

    eventProvider.dispatchEvent(customEventName, targetElement, loader);
  });
};

export default registerEvent;
