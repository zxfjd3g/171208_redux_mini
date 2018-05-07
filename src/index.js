import React from 'react'
import ReactDOM from 'react-dom'
// import {Provider} from 'react-redux'
import {Provider} from './libs/react-redux'

import App from './components/app'

import store from './redux/store'

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'))
