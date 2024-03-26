

export const logo = "/img/logo.png"
const dev = process.env.NODE_ENV !== 'production';




export const SERVER_BASE_URL = 'https://vacancies.waecgh.org'
//export const SERVER_BASE_URL = 'https://vacancies.waecgh.org'

export const LOGIN_URL = dev ? "/auth/login" : `${SERVER_BASE_URL}/auth/login`
export const ADMIN_LOGIN_URL = dev ? "/auth/admin/login" : `${SERVER_BASE_URL}/auth/admin/login`
