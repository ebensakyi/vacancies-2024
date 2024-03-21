

export const logo = "/img/logo.png"
const dev = process.env.NODE_ENV !== 'production';

export const SERVER_BASE_URL = dev ? 'http://localhost:3000' : process.env.BASE_URL
export const LOGIN_URL = dev ? "/auth/login" :`${ process.env.BASE_URL}/auth/login`
export const ADMIN_LOGIN_URL = dev ? "/auth/admin/login" : `${ process.env.BASE_URL}/auth/admin/login`
