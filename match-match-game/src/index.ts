import './styles.scss';
import { userParams, userScoreParams } from './params/test-users';
import paramsOfInitStorage from './params/init-storage-params';
import Storage from './storage/storage';
import { Router, EventProvider } from './libs/index';
import App from './app';

const storage = new Storage(paramsOfInitStorage);

setTimeout(() => {
  storage.add(userParams, 'users', 'readwrite', ()=> {}, ()=>{});
  storage.add(userScoreParams, 'scores', 'readwrite', ()=> {}, ()=>{});
}, 100)

const rootElement = document.body;
const eventProvider = new EventProvider();
const routingConfig = [
  {
    pattern: /score/,
    target: 'score',
  },
  {
    pattern: /settings/,
    target: 'settings',
  },
  {
    pattern: /game/,
    target: 'game',
  },
  {
    pattern: '',
    target: 'about',
  },
];
const router = new Router(routingConfig);

window.onload = () => {
  
const application = new App(rootElement, router, eventProvider, storage);

application.init();
}