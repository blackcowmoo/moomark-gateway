interface LoginInput {
  token: string;
  refreshToken: string;
}

interface LoginTokens {
  token: string;
  refreshToken: string;
}

interface User {
  authProvider: string;
  id: string;
  name: string;
  email: string;
  nickname: string;
  picture: string;
  role: string;
}

interface Passport {
  key: string;
  passport: string;
}

type UserId = Pick<User, 'authProvider' | 'id'>;
type UserPartial = UserId & Partial<User>;
