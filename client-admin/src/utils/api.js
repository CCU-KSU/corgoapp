import { auth } from "../configs/firebase";

const getBaseUrl = () => {
    const BACKEND_PORT_PATH = ":5000/api";
    const currentHostname = window.location.hostname;
    if (currentHostname === 'localhost' || currentHostname === '127.0.0.1') {
        return process.env.REACT_APP_API_BASE_URL; 
    } else {
        return `http://${currentHostname}${BACKEND_PORT_PATH}`;
    }
}

export const apiCall = async (endpoint, options = {}) => {
    const user = auth.currentUser;
    const token = user && (await user.getIdToken());

    const method = options.method || 'GET';

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers
    };

    const requestBody = options.body ? JSON.stringify(options.body) : undefined;

    const payload = {
        method,
        headers,
        body: requestBody,
    };

    const BASE_API_URL = getBaseUrl();
    const url = `${BASE_API_URL}${endpoint}`;

    const response = await fetch(url, payload);

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
        return response.json()
    }

    return response.text();
}