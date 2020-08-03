let backendHost;
const hostname = window && window.location && window.location.hostname;

if(hostname === 'oasisglutenfree.com') {
    backendHost = 'https://api.oasisglutenfree.com';
  } else {
    backendHost = 'http://localhost:5001';
  }
  
  export const API_ROOT = `${backendHost}`;
  