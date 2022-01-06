import React from 'react';
import ReactDOM from 'react-dom';

// import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';
import Home from './components/Home';
import Firebase, {FirebaseContext} from './components/Firebase';
import './index.scss';
import './index.css';

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <App/>
    </FirebaseContext.Provider>  
    // <Home/>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
if(module.hot) {
    module.hot.accept();
}
