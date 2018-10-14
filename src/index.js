import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Mitter } from '@mitter-io/web';

const regex = /^\/user\/(@[a-zA-Z0-9-]+)/
const loggedUser = (new URL(document.location.href).pathname.match(regex)[1])
const userAuth = {
	'@john':  'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJtaXR0ZXItaW8iLCJ1c2VyVG9rZW5JZCI6ImRBUGttVkVPekhlWmVVWDAiLCJ1c2VydG9rZW4iOiJmdnE4ams0a3RlcmQwc29xZzNhc25hZnZhOSIsImFwcGxpY2F0aW9uSWQiOiIxNFdIdi1oMzlDZi14b09SMy1OZGx6MyIsInVzZXJJZCI6Ik8yN2l4LWJXa2tLLWE5cGtFLWlsaE4xIn0.1shttdgelBDK35lBAJ6UVp1CuAsA5pYZtHT7mTXtf3earpZkoavWAYa-5KZ2Asv8ygD9lm1J1Vk2B3R8VIuONA',
	'@amy': 'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJtaXR0ZXItaW8iLCJ1c2VyVG9rZW5JZCI6IlJyREU1ZEllM0VXcHB5Y2QiLCJ1c2VydG9rZW4iOiJxcjE1bXBlN3RzYWhvOGJmZGo5c2YyanBxNCIsImFwcGxpY2F0aW9uSWQiOiIxNFdIdi1oMzlDZi14b09SMy1OZGx6MyIsInVzZXJJZCI6IkpCSlV4LWUyeFhPLVFORDRxLVVYb3BoIn0.G9VZt5-uDcQ-ZPtGqA0CAKW5Li00LsZUlsrHQeD5Nb9idgp4rC5ydttFOhMX8RJ0xGHWl4u0-jAXSBv62XcClw',
	'@candice': 'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJtaXR0ZXItaW8iLCJ1c2VyVG9rZW5JZCI6Im1NN1ZuQjNocTZ3WlZDOEUiLCJ1c2VydG9rZW4iOiJyY28wbnFhMGVzdWc0N211ZmEzcXNkc3BhayIsImFwcGxpY2F0aW9uSWQiOiIxNFdIdi1oMzlDZi14b09SMy1OZGx6MyIsInVzZXJJZCI6IlZqVEFaLW1ISmF6LWRPRnVuLWxyOVZ4In0.3dmC-Jc8SIniKwsFKsexDM5z3dqPh3sK-12Au2FtSX7CeAgjWlfmdT_OBm-Q1akoQsu0hbMljwiVBjdBnV7MhQ'
}
const mitter = Mitter.forWeb('14WHv-h39Cf-xoOR3-Ndlz3');

mitter.setUserAuthorization(userAuth[loggedUser]);

ReactDOM.render(<App loggedUser={loggedUser} mitter={mitter}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
