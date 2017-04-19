import './app.less';

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Main from './main.jsx';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
};

render(Main);

if (module.hot) {
  module.hot.accept('./main.jsx', () => { render(Main) });
}