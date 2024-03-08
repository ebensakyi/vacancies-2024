

export const logo = "/img/logo.png"
const dev = process.env.NODE_ENV !== 'production';

export const SERVER_BASE_URL = dev ? 'http://localhost:3000' : 'https://vacancies.waecgh.org'
export const LOGIN_URL = dev ? "/auth/login" : "https://vacancies.waecgh.org/auth/login"
export const ADMIN_LOGIN_URL = dev ? "/auth/admin/login" : "https://vacancies.waecgh.org/auth/admin/login"
