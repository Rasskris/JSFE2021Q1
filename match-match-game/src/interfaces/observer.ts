export default interface Observer {
  addEventListener(fn: VoidFunction): void;
  removeEventListener(fn: VoidFunction): void;
  dispatchEvent(data: string): void;
}