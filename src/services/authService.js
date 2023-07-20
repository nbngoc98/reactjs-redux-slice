import * as api from "./index";

const csrf = () => api.httpGet('sanctum/csrf-cookie');

export const signin = async (params) => {
    await csrf();
    return await api.httpPost('/api/login', params);
}

export const logout = async () => {
    return await api.httpPost('/api/logout');
}
