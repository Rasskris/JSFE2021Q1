import './styles.scss';
import { EventProvider, Loader } from './libs';
import App from './app';

const rootElement = document.getElementById('root') as HTMLDivElement;

const loader = new Loader();

const eventProvider = new EventProvider();

const app = new App(rootElement, loader, eventProvider);

app.init();
