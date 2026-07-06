export const ROUTES = {
  AUTH: {
    BASE: 'auth',
    REGISTER: 'register',
    LOGIN: 'login',
    REFRESH: 'refresh',
    LOGOUT: 'logout',
    ME: 'me',
  },

  URLS: {
    BASE: 'urls',
    CREATE: '',
    GET_ALL: '',
    DELETE: ':id',
    REDIRECT: ':shortCode',
  },

  USERS: {
    BASE: 'users',
  },
} as const;
