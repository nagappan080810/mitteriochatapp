import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Mitter } from '@mitter-io/web';

const regex = /^\/user\/(@[a-zA-Z0-9-]+)/
const loggedUser = (new URL(document.location.href).pathname.match(regex)[1])
const userAuth = {
	'@john':  'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJtaXR0ZXItaW8iLCJ1c2VyVG9rZW5JZCI6InFIRWt5NlhlekdXc1JOaHUiLCJ1c2VydG9rZW4iOiI1czNwZDI1c3JkcmE4ZXJpcHBtMzI1MDU4MSIsImFwcGxpY2F0aW9uSWQiOiIxNFdIdi1oMzlDZi14b09SMy1OZGx6MyIsInVzZXJJZCI6Ik8yN2l4LWJXa2tLLWE5cGtFLWlsaE4xIn0.BO_ySahVk0wdmwpJMsK7Ee7lvsXkw3YsyO9VFi8iV7-4c4wtLQIYfhsvvuLd7EpS-tA2ia02Zuxm-0raLkrOlA',
	'@amy': 'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJtaXR0ZXItaW8iLCJ1c2VyVG9rZW5JZCI6IklPaFZ2MmpsbzA1U3dJRTMiLCJ1c2VydG9rZW4iOiJrMzM1dXZyczVpN3FkcTNwY3VobTJkYzAxYSIsImFwcGxpY2F0aW9uSWQiOiIxNFdIdi1oMzlDZi14b09SMy1OZGx6MyIsInVzZXJJZCI6IkpCSlV4LWUyeFhPLVFORDRxLVVYb3BoIn0.LM7aj6fIH7yaIKescmKN06XENJlA6tmc5G7G4EKhXIQpTDl2_9UOvFJT6oSU54jo4iFdrctvJh0A2zN6_EeOdA',
	'@candice': 'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJtaXR0ZXItaW8iLCJ1c2VyVG9rZW5JZCI6InJtOUxNQ0JwRnc4dFNubXMiLCJ1c2VydG9rZW4iOiJ0c2JkamMxamxiNzUzNWE3YW1xOGt2NWppZCIsImFwcGxpY2F0aW9uSWQiOiIxNFdIdi1oMzlDZi14b09SMy1OZGx6MyIsInVzZXJJZCI6IlZqVEFaLW1ISmF6LWRPRnVuLWxyOVZ4In0.SCFr97xRmmh5BmWf0y_09ZCBG3CFsrRAJA_T5zfjQQaxqYRL1jn7yfev6driEXHnjrz1_wStU-xOqKvDxF7xcA'
}
const mitter = Mitter.forWeb('14WHv-h39Cf-xoOR3-Ndlz3');

mitter.setUserAuthorization(userAuth[loggedUser]);

ReactDOM.render(<App loggedUser={loggedUser} mitter={mitter}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
