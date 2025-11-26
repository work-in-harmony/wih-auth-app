const BASE_URL = "https://api.zonion.fun";
const ALT_BASE_URL = import.meta.env.VITE_API_ALT_BASE_URL || BASE_URL;

export const URL = BASE_URL;

// Auth endpoints
export const LOGIN_URL = `${BASE_URL}/auth/auth/login`;
export const CHECK_MAIL_URL = `${BASE_URL}/auth/auth/check-mail`;
export const VERIFY_OTP_URL = `${BASE_URL}/auth/auth/verify-otp`;
export const SIGN_UP_URL = `${BASE_URL}/auth/auth/signup`;
export const LOGOUT_URL = `${BASE_URL}/auth/auth/logout`;
export const JWT_TEST_URL = `${BASE_URL}/auth/auth/jwt/test`;
export const ALT_JWT_TEST_URL = `${ALT_BASE_URL}/auth/auth/jwt/test`;
export const GOOGLE_OAUTH_URL = `${BASE_URL}/auth/oauth2/authorization/google`;

// Assets / external resources
export const IMAGE_URL_DARK = import.meta.env.VITE_IMAGE_URL_DARK || "https://i.ibb.co/s9rf1nCJ/logo.png";
export const IMAGE_URL_LIGHT = import.meta.env.VITE_IMAGE_URL_LIGHT || "https://i.ibb.co/BKFt5pPW/logo-dark.png";
export const CLOUDINARY_WIDGET_URL = import.meta.env.VITE_CLOUDINARY_WIDGET_URL || "https://upload-widget.cloudinary.com/global/all.js";

