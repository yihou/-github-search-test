const AUTH_TOKEN = 'auth_token';

export function getToken() {
    return localStorage.getItem(AUTH_TOKEN);
}
export function hasToken() {
    return !!getToken();
}

export function setToken(token) {
    return localStorage.setItem(AUTH_TOKEN, token);
}

export function removeToken() {
    return localStorage.removeItem(AUTH_TOKEN);
}
