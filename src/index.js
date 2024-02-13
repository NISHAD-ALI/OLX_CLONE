import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Context,{ FirebaseContext } from './store/FirebaseContext';
import { auth } from './firebase/config'; 

ReactDOM.render(
    <Context>
  <FirebaseContext.Provider value={{auth}}>
    <App />
  </FirebaseContext.Provider>,

  </Context>,
  document.getElementById('root')
);

