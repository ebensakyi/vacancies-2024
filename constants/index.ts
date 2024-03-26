

export const logo = "/img/logo.png"
const dev = process.env.NODE_ENV !== 'production';

const PROD_SERVER_BASE_URL = 'https://vacancies.waecgh.org'

export const SERVER_BASE_URL = dev ? PROD_SERVER_BASE_URL : PROD_SERVER_BASE_URL
export const LOGIN_URL = dev ? "/auth/login" : `${PROD_SERVER_BASE_URL}/auth/login`
export const ADMIN_LOGIN_URL = dev ? "/auth/admin/login" : `${PROD_SERVER_BASE_URL}/auth/admin/login`
