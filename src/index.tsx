import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './root'

import configureStore from './configureStore'
import dotenv from 'dotenv'

dotenv.config()

const store = configureStore(); 

render(
  <Provider store={store} >
    <App />
  </Provider>
  ,
  document.getElementById('ReactRoot')
);
