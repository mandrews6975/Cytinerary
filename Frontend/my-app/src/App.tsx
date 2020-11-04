import React, { useState } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from './state/RootReducer'
import URLRouter from './components/routes/URLRouter'

const store = createStore(RootReducer);

function App() {
  return (
    <Provider store={store}>
      <URLRouter />
    </Provider>
  );
}

export default App;
