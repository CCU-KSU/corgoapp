import { auth } from "../configs/firebase";
import { signOut } from "firebase/auth";

const getBaseUrl = () => {
    if (process.env.REACT_APP_ENVIRONMENT === "development") {
        const currentHostname = window.location.hostname;
        let backendHost = "localhost";
        if (process.env.REACT_APP_NETWORK_IP && currentHostname !== "localhost") {
            backendHost = process.env.REACT_APP_NETWORK_IP;
        }
        return `http://${backendHost}:5000/api`;
    } else {
        return process.env.REACT_APP_API_BASE_URL;
    }
}

/**
 * @typedef {Object} ApiCallOptions
 * @property {string} [method] - HTTP method (GET, POST, etc.)
 * @property {Object} [headers] - Additional headers
 * @property {Object} [body] - Request body for POST/PUT requests
 */

/**
 * Makes an authenticated API call to the backend.
 * @param {string} endpoint - API endpoint (e.g., "/users/profile")
 * @param {ApiCallOptions} options - Options for the API call
 * @returns {Promise<Object>} - Parsed JSON response
 */

export const apiCall = async (endpoint, options = {}) => {
    const user = auth.currentUser;
    const token = user ? await user.getIdToken() : null;

    const method = options.method || 'GET';

    const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
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

    if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
            console.warn("API call failed due to 401/403. Likely a revoked/invalid session. Forcing client logout.");
            await signOut(auth);
            throw new Error("Session Invalid: Token was rejected by the server.");
        } else {
            throw new Error(response.message || `API call failed with status ${response.status}`);
        }
    }

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
        return response.json()
    }

    return response.text();
}