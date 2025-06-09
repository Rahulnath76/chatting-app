export const auth = {
  SIGNUP_API: "/auth/signup",
  LOGIN_API: "/auth/login",
  LOGOUT_API: "/auth/logout",
  ME_API: "/auth/me",
};

export const messageRoutes = {
  SEND_MESSAGE: (id: string) => `/message/send/${id}`,
  GET_MESSAGE: (id: string) => `/message/get/${id}`,
}

export const friendRoutes = {
  FIND_FRIEND: "/friend/addfriend"
}