export const baseUrl = "https://api.quizatty.com/api/v1";
// export const baseUrl = "http://localhost:8000/api/v1";
export const token = sessionStorage.getItem("token");
export const userData = JSON.parse(sessionStorage.getItem("user"));

// Frontend URLs
export const DASHBOARD_URL = "/";
export const LOGIN_URL = "/login";
export const VERIFY_URL = "/verify";
export const VERIFY_TOKEN_URL = "/verify/:token";
export const FORGOT_PASSWORD_URL = "/forgot-password";
export const RESET_PASSWORD_URL = "/reset-password";
export const RESET_PASSWORD_TOKEN_URL = "/reset-password/:token";
export const BANNERS_URL = "/banners";
export const PERMISSION_GROUPS_URL = "/permission-groups";
export const ADMINS_URL = "/admins";
export const USERS_URL = "/users";
export const NOTIFICATIONS_URL = "/notifications";
export const PACKAGES_URL = "/packages";
export const FEEDBACK_URL = "/feedback";

// Backend URLs
export const BACK_CONSTANTS_URL = "/constants";
export const ADMIN_LOGIN_URL = "/admin/auth/login";
export const ADMIN_VERIFY_URL = "/admin/auth/verifyAccount";
export const ADMIN_FORGOT_PASSWORD_URL = "/admin/auth/forgotPassword";
export const ADMIN_RESET_PASSWORD_URL = "/admin/auth/resetPassword";
export const ADMIN_LOGOUT_URL = "/admin/auth/logout";
export const BACK_USERS_URL = "/user";
export const BACK_USER_NOTIFICATIONS_URL = "/notifications/users";
export const BACK_SEND_USER_GLOBAL_NOTIFICATION_URL =
  "/notifications/users/global";
export const BACK_BANNER_URL = "/banner";
export const BACK_PACKAGE_URL = "/package";
export const BACK_USER_URL = "/user";
export const BACK_ADMIN_URL = "/admin";
export const BACK_PERMISSION_GROUP_URL = "/permissionGroup";
export const BACK_TOGGLE_BLOCK_STATE_ADMIN_URL = "/admin/toggleIsBlockedState";
export const BACK_TOGGLE_BLOCK_STATE_USER_URL = "/user/toggleIsBlockState";
