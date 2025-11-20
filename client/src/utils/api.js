import { auth } from "../configs/firebase";

export const apiCall = async (endpoint, options = {}) => {
    const user = auth.currentUser;
    const token = user && (await user.getIdToken());

    const method = options.method || "GET";

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

    const url = `${process.env.REACT_APP_API_BASE_URL}${endpoint}`;

    const response = await fetch(url, payload);

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
        return response.json()
    }

    return response.text();
}