import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import StepperForm from './StepperForm/StepperForm';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<React.StrictMode>
		<StepperForm />
	</React.StrictMode>,
	document.getElementById('root')
);
serviceWorker.unregister();
