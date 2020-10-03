import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as Sentry from '@sentry/browser';
import * as serviceWorker from './serviceWorker';
import 'suneditor/dist/css/suneditor.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.scss';

//console.log(process.env.NODE_ENV)
/** error tracking */

if (process.env.NODE_ENV === 'production') {
    Sentry.init({dsn: "https://0972e238c5004bab9c9eef06f7f3d7d0@o375013.ingest.sentry.io/5193857"});
}

ReactDOM.render(<App/>, document.getElementById('root'));

serviceWorker.unregister();
