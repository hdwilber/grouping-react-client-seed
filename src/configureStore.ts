import { createStore, compose, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/index';


declare var window: {
  __REDUX_DEVTOOLS_EXTENSION__: Function
};

export default function configureStore(): Store<any> {

  const initDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
  const store = createStore(reducer, initDevtools, applyMiddleware(thunk));
  return store;
}
