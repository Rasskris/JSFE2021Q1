import Loader from './loader';
// import { EventHandler } from '../types';

export type EventHandler = (target: HTMLElement, loader: Loader) => Promise<void> | void;

export default class EventProvider {
  channels: { [key: string]: EventHandler };

  constructor() {
    this.channels = {};
  }

  addEventListener(event: string, eventHandler: EventHandler): void {
    if (!this.channels[event]) {
      this.channels[event] = eventHandler;
    }
  }

  removeEventListener(event: string): void {
    if (!this.channels[event]) {
      return;
    }

    delete this.channels[event];
  }

  dispatchEvent(event: string, targetElement: HTMLElement, loader: Loader): void {
    const channel = this.channels[event];

    if (!channel) {
      return;
    }

    channel(targetElement, loader);
  }
}
