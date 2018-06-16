import React from 'react';
import { render } from 'react-dom';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
