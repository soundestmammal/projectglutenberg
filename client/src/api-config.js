let backendHost;
const hostname = window && window.location && window.location.hostname;

if (hostname === 'http://localhost:3050') {
    backendHost = 'http://localhost:3050/api';
} else {
    backendHost = '/api';
}

export const API_ROOT = `${backendHost}`;
