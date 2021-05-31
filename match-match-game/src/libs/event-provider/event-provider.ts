import Storage from '../../storage/storage';
import { EventHandler } from '../../types/types';

export default class EventProvider {
  channels: { [key: string]: EventHandler[] };

  constructor() {
    this.channels = {};
  }

  addEventListener(event: string, eventHandler: EventHandler): void {
    if (!this.channels[event]) {
      this.channels[event] = [];
    }

    this.channels[event].push(eventHandler);
  }

  removeEventListener(event: string, eventHandler: EventHandler): void {
    if (!this.channels[event]) {
      return;
    }

    this.channels[event] = this.channels[event].filter((handler) => handler !== eventHandler);
  }

  dispatchEvent(event: string, targetElement: HTMLElement, data?: Storage): void {
    const channel = this.channels[event];

    if (!channel || !channel.length) {
      return;
    }

    channel.forEach((eventHandler) => eventHandler(targetElement, data));
  }
}
