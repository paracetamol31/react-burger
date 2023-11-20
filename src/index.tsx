import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import App from './components/app/app';
import "./index.css";
import '@ya.praktikum/react-developer-burger-ui-components';
import { Provider } from 'react-redux';
import { store } from './services/store';

const rootElement: HTMLElement | null = document.getElementById('root');

if (!rootElement) {
  throw new Error("Не найден root элемент");
}
const root: ReactDOM.Root = ReactDOM.createRoot(rootElement);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  // </React.StrictMode>
);