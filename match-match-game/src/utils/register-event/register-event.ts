import { EventProvider } from '../../libs/index';
import Storage from '../../storage/storage';
import { EventHandler } from '../../types/types';


const registerEvent = (
    element: HTMLElement, 
    eventName: string, 
    customEventName: string, 
    eventHandler: EventHandler,
    eventProvider: EventProvider,
    storage?: Storage): void => {
        
    eventProvider.addEventListener(customEventName, eventHandler);
    
    element.addEventListener(`${eventName}`, (event) => {
        if (eventName === 'submit') {
          event.preventDefault();
        }
        const targetElement = event.target as HTMLLIElement;
        if (storage) {
          eventProvider.dispatchEvent(customEventName, targetElement, storage);
        } else {
          eventProvider.dispatchEvent(customEventName, targetElement);
        }
        
    });
};

export default registerEvent;