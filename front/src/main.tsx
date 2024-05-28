import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// trying to send request to grace via ngrok, am confused
let link = 'https://cffc-149-115-69-102.ngrok-free.app/boinay';

var xhr = new XMLHttpRequest();
xhr.open('GET', link, true);

// Set up event handler
xhr.onreadystatechange = function() {
  // Check if the request is complete
  if (xhr.readyState === 4) {
    // Check if the request was successful
    if (xhr.status === 200) {
      // Access the response data
      var responseData = xhr.responseText;
      console.log('responseData is', responseData);
    } else {
      console.error('Request failed with status:', xhr.status);
    }
  }
};

xhr.send();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App data={xhr.response}/>
  </React.StrictMode>,
)
