import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import Clock from './Clock.jsx';
import './index.css';
import store from './store';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Clock />
  </Provider>
);
