import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/app/app';
import "./index.css";
import '@ya.praktikum/react-developer-burger-ui-components';
import { compose, applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer } from './services/reducers';

const rootElement: HTMLElement | null = document.getElementById('root');

if(!rootElement){
  throw new Error("Не найден root элемент");
}

const root: ReactDOM.Root = ReactDOM.createRoot(rootElement);

const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as any
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer as any, enhancer);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  // </React.StrictMode>
);