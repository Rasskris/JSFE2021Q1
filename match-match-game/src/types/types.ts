import Storage from "../storage/storage";

export type EventHandler = (target: HTMLElement, storage?: Storage) => void;