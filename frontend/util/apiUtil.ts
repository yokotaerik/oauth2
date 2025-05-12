import { ACCESS_TOKEN, API_BASE_URL } from "@/app/token";

const request = (options: any) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    if (typeof localStorage !== "undefined" && localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
    }

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function getCurrentUser() {
    if (typeof localStorage === "undefined" || !localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function login(loginRequest: any) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest: any) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function logout() {
    if (typeof localStorage !== "undefined") {
        localStorage.removeItem(ACCESS_TOKEN);
    }
    return;
}

// metodo para verificar se tem token
export function isAuthenticated() {
    return typeof localStorage !== "undefined" && localStorage.getItem(ACCESS_TOKEN) !== null;
}